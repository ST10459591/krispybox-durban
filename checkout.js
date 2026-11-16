const API_URL = "http://127.0.0.1:3000";

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

// =====================================================
// CALCULATE CART TOTAL
// =====================================================

function calculateTotal() {
    let total = 0;

    cart.forEach(function(item) {
        const quantity = Number(item.quantity ?? 1);

        total += Number(item.price) * quantity;
    });

    return total;
}

const total = calculateTotal();

document.getElementById(
    "checkoutTotal"
).textContent = total.toFixed(2);

const checkoutForm = document.getElementById(
    "checkoutForm"
);

const submitButton = checkoutForm.querySelector(
    'button[type="submit"]'
);

// =====================================================
// PAYFAST REDIRECT
// =====================================================

function redirectToPayFast(paymentUrl, paymentData) {
    const url = new URL(paymentUrl);

    // Only allow the official PayFast sandbox endpoint.
    if (
        url.origin !== "https://sandbox.payfast.co.za" ||
        url.pathname !== "/eng/process"
    ) {
        throw new Error("Invalid PayFast payment URL.");
    }

    const paymentForm = document.createElement("form");

    paymentForm.method = "POST";
    paymentForm.action = url.href;
    paymentForm.style.display = "none";

    for (const [key, value] of Object.entries(paymentData)) {
        const input = document.createElement("input");

        input.type = "hidden";
        input.name = key;
        input.value = String(value);

        paymentForm.appendChild(input);
    }

    document.body.appendChild(paymentForm);
    paymentForm.submit();
}

// =====================================================
// SUBMIT ORDER
// =====================================================

checkoutForm.addEventListener(
    "submit",
    async function(event) {
        event.preventDefault();

        if (submitButton.disabled) {
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            window.location.href = "menu.html";
            return;
        }

        const payment = document.getElementById(
            "payment"
        ).value;

        if (!payment) {
            alert("Please select a payment method.");
            return;
        }

        if (
            payment !== "Cash Collection" &&
            payment !== "Card Payment"
        ) {
            alert("Invalid payment method.");
            return;
        }

        submitButton.disabled = true;

        submitButton.textContent =
            payment === "Card Payment"
                ? "Preparing Payment..."
                : "Placing Order...";

        try {
            // Send product IDs and quantities only.
            // The backend verifies prices using Firestore.
            const orderItems = cart.map(function(item) {
                return {
                    id: item.id,
                    quantity: Number(item.quantity ?? 1)
                };
            });

            // =================================================
            // CARD PAYMENT - PAYFAST SANDBOX
            // =================================================

            if (payment === "Card Payment") {
                const response = await fetch(
                    `${API_URL}/api/payfast/create-payment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            items: orderItems
                        })
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        "Unable to start card payment."
                    );
                }

                if (
                    !result.paymentUrl ||
                    !result.paymentData ||
                    !result.orderId
                ) {
                    throw new Error(
                        "Incomplete PayFast payment response."
                    );
                }

                // Keep the cart until payment is confirmed.
                // This also allows the customer to retry
                // if they cancel the PayFast payment.
                sessionStorage.setItem(
                    "pendingPayfastOrderId",
                    result.orderId
                );

                console.log(
                    "PayFast sandbox payment prepared:",
                    result.orderId
                );

                redirectToPayFast(
                    result.paymentUrl,
                    result.paymentData
                );

                return;
            }

            // =================================================
            // CASH COLLECTION
            // =================================================

            const response = await fetch(
                `${API_URL}/api/orders/cash`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        items: orderItems
                    })
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "Unable to place your order."
                );
            }

            console.log(
                "Order saved to Firestore:",
                result.orderId
            );

            document.getElementById(
                "checkoutTotal"
            ).textContent = Number(
                result.total
            ).toFixed(2);

            const order = {
                id: result.orderId,
                items: cart,
                total: result.total,
                paymentMethod: "Cash Collection",
                paymentStatus: "Pending",
                date: new Date().toLocaleString(),
                status: "Order Placed"
            };

            let orders = JSON.parse(
                localStorage.getItem("orders")
            ) || [];

            orders.push(order);

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );

            // Clear cart after successful Cash Collection order.
            localStorage.removeItem("cart");
            cart = [];

            document.querySelector(
                ".form-container"
            ).style.display = "none";

            document.getElementById(
                "orderSuccess"
            ).style.display = "flex";

        } catch (error) {
            console.error(
                "Checkout error:",
                error
            );

            alert(
                error.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Place Order →";
        }
    }
);
