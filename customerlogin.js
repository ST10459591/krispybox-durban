
import { auth, db } from "../../firebase.js";

import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

function showMessage(message, isError = true) {
    loginMessage.textContent = message;
    loginMessage.style.display = "block";
    loginMessage.style.color = isError ? "#ff1645" : "#27c982";
}

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const submitButton = loginForm.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    showMessage("Signing in...", false);

    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = credential.user;

        const userSnapshot = await getDoc(
            doc(db, "users", user.uid)
        );

        if (!userSnapshot.exists()) {
            await signOut(auth);
            showMessage(
                "Your account profile was not found. Please contact support."
            );
            return;
        }

        const userData = userSnapshot.data();

        if (userData.email !== user.email) {
            await signOut(auth);
            showMessage(
                "Your account details could not be verified. Please contact support."
            );
            return;
        }

        if (userData.role === "admin") {
            window.location.href = "admin/dashboard.html";
        } else if (userData.role === "customer") {
            window.location.href = "index.html";
        } else {
            await signOut(auth);
            showMessage(
                "Your account role is invalid. Please contact support."
            );
        }

    } catch (error) {
        console.error("Login error:", error);

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {
            showMessage("Incorrect email address or password.");
        } else {
            showMessage("Login failed. Please try again.");
        }
    } finally {
        submitButton.disabled = false;
    }
});
