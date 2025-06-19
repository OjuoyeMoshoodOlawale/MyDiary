const userData = JSON.parse(localStorage.getItem("user"));

if (!userData) {
  window.location.href = "./login.html";
}

document.getElementById("user_email").innerText = userData.data.user.email;

const btnLoader = document.getElementById("btnLoader");
const diaryForm = document.querySelector(".diary-entry-form");

function showLoader(show) {
  btnLoader.style.display = show ? "inline-block" : "none";
}

function getFormData() {
  return {
    title: document.getElementById("title").value.trim(),
    content: document.getElementById("content").value.trim(),
  };
}

function handleSuccess() {
  alert("Diary entry added successfully!");
  diaryForm.reset();
}

function handleError(error) {
  console.error("Error creating diary entry:", error);
  alert("Failed to add diary entry.");
}

async function submitDiaryEntry(event) {
  event.preventDefault();
  showLoader(true);

  try {
    const response = await fetch(
      "https://tunga-diary-api.onrender.com/api/fullstack/diary/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(getFormData()),
      }
    );
    const data = await response.json();

    if (response.ok) {
      handleSuccess();
    } else {
      handleError(data);
    }
  } catch (error) {
    handleError(error);
  } finally {
    showLoader(false);
  }
}

diaryForm.addEventListener("submit", submitDiaryEntry);
