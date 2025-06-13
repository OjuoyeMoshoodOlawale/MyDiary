function logout(user) {
  // Send logout request to server with Bearer authentication
  fetch("https://tunga-diary-api.onrender.com/api/fullstack/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  }).finally(() => {
    // Clear the session storage
    localStorage.clear();

    // Redirect to the login page
    window.location.href = "./login.html";
  });
}
