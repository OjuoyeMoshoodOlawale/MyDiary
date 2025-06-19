// Handle form submission to update the diary entry
const btnLoader = document.getElementById("btnLoader");
document
  .querySelector(".diary-entry-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    btnLoader.style.display = "inline-block";
    fetch(
      `https://tunga-diary-api.onrender.com/api/fullstack/diary/update/${entryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          title: document.getElementById("title").value,
          content: document.getElementById("content").value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          alert("Diary entry updated successfully!");
        } else {
          alert("Failed to update diary entry.");
        }
      })
      .catch((error) => {
        console.error("Error updating diary entry:", error);
        alert("Failed to update diary entry.");
      })
      .finally(() => {
        btnLoader.style.display = "none";
      });
  });
