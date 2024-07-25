const socket = io();

//Envia el front
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const id = event.target.getAttribute("id");

    const card = event.target.closest(".card");

    const userEmail = card.querySelector(".email").innerText;
    const userRole = card.querySelector(".role").innerText;

    if (userRole !== "admin") {
      socket.emit("client:deleteUser", {id, userEmail});
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You do not have permission to delete this user",
      });
    }
  }
});

//Respuesta del back
socket.on("server:list-users", (data) => {
  const divList = document.getElementById("list-users");
  let cards = "";
  data.forEach((content) => {
    cards += `
        <div class="card" style="margin: 20px 20px; width: 350px;">
            <div style="display: flex; justify-content: center; align-items: center; height: 75px">
                <img src="https://i.ibb.co/3WdFcqG/profile.png" alt="profile" width="50px" alt="img - no img">
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div>
                        <b>First Name:</b>
                        ${content.first_name} ${content.last_name}
                    </div>
                </li>
                <li class="list-group-item">
                    <div>
                        <b>Email:</b>
                        ${content.email}
                    </div>
                </li>
                <li class="list-group-item">
                    <div>
                        <b>Social:</b>
                        ${content.social}
                    </div>
                </li>
                <li class="list-group-item">
                    <div>
                        <b>Role:</b>
                        ${content.role}
                    </div>
                </li>
            </ul>
            <div class="p-3" style="display: flex; justify-content: space-between;">
                <div class="delete">
                    <button class="btn btn-danger delete" id=${content.id}>
                        Delete
                    </button>
                </div>
                <div class="change">
                    <button class="btn btn-warning change" id=${content.id}>
                        Change Role
                    </button>
                </div>
            </div>
        </div>    
      `;
  });

  divList.innerHTML = cards;
});

socket.on("server:error", (data) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${data}`,
  });
});
