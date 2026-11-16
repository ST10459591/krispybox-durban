const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    loginError.style.display = "none";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        // Authenticate with Supabase
        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {
            loginError.textContent = "Invalid email or password.";
            loginError.style.display = "block";
            return;
        }

        // Verify administrator permissions
        const { data: admin, error: adminError } =
            await supabaseClient
                .from("admin_users")
                .select("user_id")
                .eq("user_id", data.user.id)
                .maybeSingle();

        if (adminError || !admin) {
            await supabaseClient.auth.signOut();

            loginError.textContent =
                "This account is not authorized as an administrator.";

            loginError.style.display = "block";
            return;
        }

        // Login successful
        window.location.href = "dashboard.html";

    } catch (err) {
        console.error("Login error:", err);

        loginError.textContent =
            "Unable to connect. Please try again.";

        loginError.style.display = "block";
    }
});
