function logout(user) {
  const API_URL =
    "https://tunga-diary-api.onrender.com/api/fullstack/auth/logout";
  const token = user?.token;

  if (!token) {
    redirectToLogin();
    return;
  }

  fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).finally(() => {
    clearSessionAndRedirect();
  });
}

function clearSessionAndRedirect() {
  localStorage.clear();
  redirectToLogin();
}

function redirectToLogin() {
  window.location.href = "./login.html";
}
