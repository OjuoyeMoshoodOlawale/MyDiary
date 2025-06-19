l; //et userData = JSON.parse(localStorage.getItem("user"));
function deleteDiaryEntry(id) {
  if (!confirm("Are you sure you want to delete this diary entry?")) {
    return;
  }
  fetch(
    `https://tunga-diary-api.onrender.com/api/fullstack/diary/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      alert(data.message || "Diary entry deleted successfully");
      getDiaryEntries();
    })
    .catch((error) => {
      console.error("Error deleting diary entry:", error);
    });
}
