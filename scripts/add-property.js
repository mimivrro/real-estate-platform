document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-property-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const price = parseFloat(document.getElementById("price").value);
    const imageUrl = document.getElementById("imageUrl").value;
    const description = document.getElementById("description").value;

    const listing = { title, location, price, imageUrl, description };

    const existingListings = JSON.parse(localStorage.getItem("propertyListings")) || [];
    existingListings.push(listing);
    localStorage.setItem("propertyListings", JSON.stringify(existingListings));

    alert("Listing added successfully!");
    window.location.href = "listings.html";
  });
});
