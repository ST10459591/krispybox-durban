let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// Calculate total

function calculateTotal() {

    let total = 0;


    cart.forEach(
        function(item) {

            const quantity =
                item.quantity || 1;

            total +=
                Number(item.price) *
                quantity;

        }
    );


    return total;

}


const total =
    calculateTotal();


document.getElementById(
    "checkoutTotal"
).textContent =
    total.toFixed(2);


const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );


// Submit order

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            window.location.href =
                "menu.html";

            return;

        }


        const payment =
            document.getElementById(
                "payment"
            ).value;


        if (!payment) {

            alert(
                "Please select a payment method."
            );

            return;

        }


        const order = {

            id:
                "ORD-" +
                Date.now(),

            items: cart,

            total: total,

            paymentMethod:
                payment,

            date:
                new Date()
                .toLocaleString(),

            status:
                "Order Placed"

        };


        let orders =
            JSON.parse(
                localStorage.getItem(
                    "orders"
                )
            ) || [];


        orders.push(order);


        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        localStorage.removeItem(
            "cart"
        );


        checkoutForm
            .parentElement
            .parentElement
            .style.display =
            "none";


        document.getElementById(
            "orderSuccess"
        ).style.display =
            "flex";

    }
);