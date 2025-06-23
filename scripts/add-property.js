document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-property-form");
  const fileInput = document.getElementById("property-image");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const location = document.getElementById("location").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const description = document.getElementById("description").value.trim();
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || user.role !== "seller") {
      alert("Only sellers can add properties.");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Please select an image file.");
      return;
    }

    const fileName = fileInput.files[0].name;
    const imageUrl = `../assets/images/${fileName}`;

    const listing = {
      title,
      location,
      price,
      imageUrl,
      description,
      sellerEmail: user.email
    };

    const existingListings = JSON.parse(localStorage.getItem("propertyListings")) || [];
    existingListings.push(listing);
    localStorage.setItem("propertyListings", JSON.stringify(existingListings));

    alert("Listing added successfully!");
    window.location.href = "../listings/listings.html";
  });
});
