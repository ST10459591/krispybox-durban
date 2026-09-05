const registerForm =
    document.getElementById(
        "registerForm"
    );


const registerMessage =
    document.getElementById(
        "registerMessage"
    );


registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const fullname =
            document.getElementById(
                "fullname"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        // Check passwords

        if (
            password !==
            confirmPassword
        ) {

            registerMessage.textContent =
                "Passwords do not match.";

            registerMessage.style.color =
                "red";

            registerMessage.style.display =
                "block";

            return;

        }


        // Get existing users

        let users =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];


        // Check existing email

        const existingUser =
            users.find(
                user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            );


        if (existingUser) {

            registerMessage.textContent =
                "Email already exists.";

            registerMessage.style.color =
                "red";

            registerMessage.style.display =
                "block";

            return;

        }


        // Create user

        const newUser = {

            id: Date.now(),

            fullname:
                fullname,

            email:
                email,

            password:
                password

        };


        users.push(newUser);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        registerMessage.textContent =
            "Account created successfully! Redirecting to login...";


        registerMessage.style.color =
            "green";


        registerMessage.style.display =
            "block";


        setTimeout(
            function() {

                window.location.href =
                    "login.html";

            },
            1500
        );

    }
);