let userData = JSON.parse(localStorage.getItem("user"));
if (!userData) {
  alert("e");
  window.location.href = "./login.html";
}
user_email = document.getElementById("user_email").innerText =
  userData.data.user.email;

function getDiaryEntries() {
  fetch("https://tunga-diary-api.onrender.com/api/fullstack/diary/entries", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle diary entries data here

      const result = data.data;
      // document.write(result[0].title);
      let diaryList = document.getElementById("diary_list");
      diaryList.innerHTML = "";

      for (entry of result) {
        let card = `<div class="card diary-card">
       <h2>${entry.title}</h2>
       <p class="date" ><i>Last Modified ${new Date(
         entry.updatedAt
       ).toLocaleString()}</i></p>
     
       <p>
         ${entry.content.substring(0, 100)}...
       </p>
       <div class="card-action">
           <a href="edit.html?id=${
             entry.id
           }" class="btn btn-primary-outline">View/Edit</a>
         <a href="#0" class="btn btn-danger-outline" onclick="deleteDiaryEntry('${
           entry.id
         }')" rel="">Delete</a>
       </div>
     </div>`;
        diaryList.innerHTML += card;
      }
      // Example: render entries to the page
      //
    })
    .catch((error) => {
      console.error("Error fetching diary entries:", error);
    });
}

getDiaryEntries();
