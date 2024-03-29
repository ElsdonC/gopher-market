// Demo Account Login
document.querySelector("#demo-login-btn").addEventListener("click", async () => {
    await fetch(`${URL}auth/demo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": "demo",
            "password": "demo"
        })
    })
    window.location = '/'
})
// Google Account Login
document.querySelector("#google-login-btn").addEventListener("click", async () => {
    window.location = "/auth/google"
})