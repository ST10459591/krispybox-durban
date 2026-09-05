const loginForm = document.getElementById("loginForm");

const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const demoUsername = "admin";

    const demoPassword = "admin123";

    if (
        username === demoUsername &&
        password === demoPassword
    ) {

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        localStorage.setItem(
            "adminUsername",
            username
        );

        window.location.href =
            "dashboard.html";

    } else {

        loginError.style.display = "block";

    }

});