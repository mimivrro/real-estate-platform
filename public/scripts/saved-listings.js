document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("saved-listings-container");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || user.role.toLowerCase() !== "buyer") {
    alert("Unauthorized access.");
    window.location.href = "../auth/login.html";
    return;
  }

  const likedListings = JSON.parse(localStorage.getItem(`liked_${user.email}`)) || [];

  if (likedListings.length === 0) {
    container.innerHTML = `<p class="empty-msg">You have no saved properties yet.</p>`;
    return;
  }

  likedListings.forEach((listing) => {
    const card = document.createElement("div");
    card.className = "property-card";

    card.innerHTML = `
      <img src="${listing.imageUrl}" alt="Property Image">
      <div class="card-content">
        <h3>${listing.title}</h3>
        <p>Location: ${listing.location}</p>
        <p>Price: $${listing.price.toLocaleString()}</p>
        <p>${listing.description}</p>
      </div>
    `;

    container.appendChild(card);
  });

  // Back to dashboard
  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "../dashboards/buyer.html";
  });
});
