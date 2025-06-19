document.addEventListener("DOMContentLoaded", () => {
  const listingsContainer = document.getElementById("listings-container");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("price-filter");

  function getListings() {
    const listings = JSON.parse(localStorage.getItem("propertyListings")) || [];
    return listings;
  }

  function renderListings(listings) {
    listingsContainer.innerHTML = "";
    listings.forEach(listing => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${listing.imageUrl}" alt="Property Image" />
        <div class="card-body">
          <h3>${listing.title}</h3>
          <p>${listing.location}</p>
          <p><strong>$${listing.price}</strong></p>
        </div>
      `;
      listingsContainer.appendChild(card);
    });
  }

  function applyFilters() {
    let filtered = getListings();
    const query = searchInput.value.toLowerCase();
    filtered = filtered.filter(l =>
      l.title.toLowerCase().includes(query) ||
      l.location.toLowerCase().includes(query)
    );

    const sortOrder = sortSelect.value;
   if (sortOrder === "low-to-high") {
  filtered.sort((a, b) => a.price - b.price);
} else if (sortOrder === "high-to-low") {
  filtered.sort((a, b) => b.price - a.price);
}


    renderListings(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  renderListings(getListings());
});



 