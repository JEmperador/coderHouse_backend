const socket = io();

const selectSort = document.getElementById("selectSort");
const cartId = document.getElementById("cartId").innerText;

selectSort.addEventListener("change", () => {
  const limit = document.getElementById("limit").value;
  const page = document.getElementById("page").value;
  const sort = selectSort.value;

  const url = `/products?limit=${limit}&page=${page}&sort=${sort}`;
  window.location.href = url;
});

//Envia el front
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add")) {
    const id = event.target.getAttribute("id");

    const buttonBox = event.target.closest(".buttonBox");

    const publicationOwner = buttonBox.querySelector(".publicationOwner").innerText;
    const loggedUser = document.getElementById("owner").innerText;
    const loggedRole = document.getElementById("role").innerText;

    console.log("desde el front", publicationOwner, loggedUser);

    if (publicationOwner === loggedUser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You do not have permissions to add this product to your cart",
      });
    } else {
      socket.emit("client:addProductOnCart", {
        id,
        cartId,
        selectedQuantity: 1,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        text: "Your product was added to the cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
});
