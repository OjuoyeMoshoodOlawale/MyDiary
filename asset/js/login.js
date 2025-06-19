const btnLoader = document.getElementById("btnLoader");
document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    btnLoader.style.display = "inline-block";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("https://tunga-diary-api.onrender.com/api/fullstack/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const text = await response.text();
        return text ? JSON.parse(text) : {};
      })
      .then((data) => {
        //document.write(JSON.stringify(data));

        if (data.status === "success") {
          localStorage.setItem("user", JSON.stringify(data));

          window.location.href = "./dashboard.html";
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch((error) => {
        alert(error.message || "An error occurred during login");
        console.error(error);
      })
      .finally(() => {
        btnLoader.style.display = "none";
      });
  });
