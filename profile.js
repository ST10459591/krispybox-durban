const user =
    JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );


if (!user) {

    window.location.href =
        "login.html";

} else {

    document.getElementById(
        "profileName"
    ).textContent =
        user.fullname;


    document.getElementById(
        "profileEmail"
    ).textContent =
        user.email;

}


// Logout

function logout() {

    localStorage.removeItem(
        "currentUser"
    );


    localStorage.removeItem(
        "userLoggedIn"
    );


    window.location.href =
        "login.html";

}