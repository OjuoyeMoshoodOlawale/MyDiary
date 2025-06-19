const btnLoader = document.getElementById("btnLoader");
const loginForm = document.querySelector(".login-form");

function showLoader(show) {
  btnLoader.style.display = show ? "inline-block" : "none";
}

function getFormData() {
  return {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
}

async function loginUser(credentials) {
  const response = await fetch(
    "https://tunga-diary-api.onrender.com/api/fullstack/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

function handleLoginSuccess(data) {
  localStorage.setItem("user", JSON.stringify(data));
  window.location.href = "./dashboard.html";
}

function handleLoginError(message) {
  alert(message || "Login failed");
}

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  showLoader(true);

  try {
    const credentials = getFormData();
    const data = await loginUser(credentials);

    if (data.status === "success") {
      handleLoginSuccess(data);
    } else {
      handleLoginError(data.message);
    }
  } catch (error) {
    alert(error.message || "An error occurred during login");
    console.error(error);
  } finally {
    showLoader(false);
  }
});
