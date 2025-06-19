// Constants
const loaderOverlay = document.getElementById("loaderOverlay");
const diaryList = document.getElementById("diary_list");
const userEmailDisplay = document.getElementById("user_email");

// Utilities
function showLoader() {
  loaderOverlay.style.display = "flex";
}

function hideLoader() {
  loaderOverlay.style.display = "none";
}

function redirectToLogin() {
  window.location.href = "./login.html";
}

function createDiaryCard(entry) {
  const updatedAt = new Date(entry.updatedAt).toLocaleString();

  return ` 
    <div class="card diary-card">
      <h2>${entry.title}</h2>
      <p class="date"><i>Last Modified ${updatedAt}</i></p>
      <p>${entry.content.substring(0, 100)}...</p>
      <div class="card-action">
        <a href="edit.html?id=${
          entry.id
        }" class="btn btn-primary-outline">View/Edit</a>
        <a href="#0" class="btn btn-danger-outline" onclick="deleteDiaryEntry('${
          entry.id
        }')">Delete</a>
      </div>
    </div>
  `;
}

function renderDiaryEntries(entries) {
  diaryList.innerHTML = "";

  if (!entries || entries.length === 0) {
    diaryList.innerHTML = `<p style="text-align: center;">No Existing Records</p>`;
    return;
  }

  const cards = entries.map(createDiaryCard).join("");
  diaryList.innerHTML = cards;
}

// Main
function getDiaryEntries() {
  showLoader();

  fetch("https://tunga-diary-api.onrender.com/api/fullstack/diary/entries", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => renderDiaryEntries(data.data))
    .catch((error) => {
      console.error("Error fetching diary entries:", error);
    })
    .finally(hideLoader);
}

// Initialization
const userData = JSON.parse(localStorage.getItem("user"));

if (!userData || !userData.data || !userData.token) {
  redirectToLogin();
} else {
  userEmailDisplay.innerText = userData.data.user.email;
  getDiaryEntries();
}
