import { auth, db } from "../../firebase.js";
import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm?.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (!fullname || !email || !password || !confirmPassword) {
        showRegisterMessage("Please complete all fields.", "red");
        return;
    }

    if (password !== confirmPassword) {
        showRegisterMessage("Passwords do not match.", "red");
        return;
    }

    const submitButton = registerForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) submitButton.disabled = true;

    showRegisterMessage("Creating your account...", "black");

    try {
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(credential.user, {
            displayName: fullname
        });

        await setDoc(doc(db, "users", credential.user.uid), {
            fullname: fullname,
            email: credential.user.email,
            role: "customer",
            createdAt: new Date().toISOString()
        });

        showRegisterMessage(
            "Account created successfully! Redirecting to login...",
            "green"
        );

        // Registration signs the customer in automatically.
        // Sign out so they can use the shared login page.
        await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js")
            .then(({ signOut }) => signOut(auth));

        window.location.href = "login.html";

    } catch (error) {
        console.error("Registration error:", error);

        if (error.code === "auth/email-already-in-use") {
            showRegisterMessage(
                "This email address already has an account.",
                "red"
            );
        } else if (error.code === "auth/weak-password") {
            showRegisterMessage(
                "Please choose a stronger password.",
                "red"
            );
        } else if (error.code === "auth/invalid-email") {
            showRegisterMessage(
                "Please enter a valid email address.",
                "red"
            );
        } else {
            showRegisterMessage(
                "We couldn't create your account. Please try again.",
                "red"
            );
        }

    } finally {
        if (submitButton) submitButton.disabled = false;
    }
});

function showRegisterMessage(message, color) {
    if (!registerMessage) return;

    registerMessage.textContent = message;
    registerMessage.style.color = color;
    registerMessage.style.display = "block";
}
