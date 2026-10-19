const loginForm = document.getElementById("loginForm");

const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function(user) {

        return (
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );

    });

    if (user) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                id: user.id,
                fullname: user.fullname,
                email: user.email
            })
        );

        localStorage.setItem(
            "userLoggedIn",
            "true"
        );

        // Go to home page
        window.location.href = "index.html";

    } else {

        loginMessage.textContent =
            "Invalid email or password.";

        loginMessage.style.color = "red";

        loginMessage.style.display = "block";
    }

});