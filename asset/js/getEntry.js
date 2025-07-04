const userData = JSON.parse(localStorage.getItem("user"));
if (!userData) {
  window.location.href = "./login.html";
}
document.getElementById("user_email").innerText = userData.data.user.email;

const urlParams = new URLSearchParams(window.location.search);
let entryId = urlParams.get("id");

fetch(
  `https://tunga-diary-api.onrender.com/api/fullstack/diary/entry/${entryId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    if (data.status == 200) {
      document.getElementById("title").value = data.data.title;
      document.getElementById("content").value = data.data.content;
      document.getElementById(
        "last-modified"
      ).innerText = `Last Modified: ${new Date(
        data.data.updatedAt
      ).toLocaleString()}`;
    } else {
      alert("Failed to load diary entry.");
    }
  });
