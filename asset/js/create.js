const userData = JSON.parse(localStorage.getItem("user"));

if (!userData) {
  window.location.href = "./login.html";
}
document.getElementById("user_email").innerText = userData.data.user.email;
const btnLoader = document.getElementById("btnLoader");
document
  .querySelector(".diary-entry-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    btnLoader.style.display = "inline-block";

    fetch("https://tunga-diary-api.onrender.com/api/fullstack/diary/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response after creating entry
        alert("Diary entry added successfully!");
        // Optionally, redirect or clear form
        document.querySelector(".diary-entry-form").reset();
      })
      .catch((error) => {
        console.error("Error creating diary entry:", error);
        alert("Failed to add diary entry.");
      })
      .finally(() => {
        btnLoader.style.display = "none";
      });
  });
