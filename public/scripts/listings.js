document.addEventListener("DOMContentLoaded", () => {
  const listingsContainer = document.getElementById("listings-container");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("price-filter");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const isBuyer = user && user.role.toLowerCase() === "buyer";

  let allListings = [];

  function getLikedListings() {
    if (!isBuyer) return [];
    return JSON.parse(localStorage.getItem(`liked_${user.email}`)) || [];
  }

  function isAlreadySaved(listing) {
    const liked = getLikedListings();
    return liked.some(item => item.title === listing.title && item.price === listing.price);
  }

  function saveListing(listing, button) {
    if (!isBuyer) return;

    const key = `liked_${user.email}`;
    const liked = getLikedListings();

    if (!isAlreadySaved(listing)) {
      liked.push(listing);
      localStorage.setItem(key, JSON.stringify(liked));

      // Update button
      button.textContent = "Saved!";
      button.disabled = true;
    }
  }

  function renderListings(listings) {
    listingsContainer.innerHTML = "";

    listings.forEach((listing, index) => {
      const card = document.createElement("div");
      card.className = "property-card";

      const alreadySaved = isBuyer && isAlreadySaved(listing);
      const saveButtonHTML = isBuyer
        ? `<button class="save-btn" data-index="${index}" ${alreadySaved ? "disabled" : ""}>
             ${alreadySaved ? "Saved!" : "Save"}
           </button>`
        : "";

      card.innerHTML = `
        <img src="${listing.imageUrl}" alt="Property Image" />
        <div class="card-content">
          <h3>${listing.title}</h3>
          <p>Location: ${listing.location}</p>
          <p>Price: $${listing.price.toLocaleString()}</p>
          <p>${listing.description}</p>
          ${saveButtonHTML}
        </div>
      `;

      listingsContainer.appendChild(card);
    });

    // Attach event listeners AFTER rendering
    if (isBuyer) {
      document.querySelectorAll(".save-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = parseInt(e.target.getAttribute("data-index"));
          const listingToSave = listings[index];
          saveListing(listingToSave, e.target);
        });
      });
    }
  }

  function applyFilters() {
    let filtered = [...allListings];
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

  // Event listeners for filters
  searchInput.addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  // Fetch listings from API
  fetch("http://localhost:3000/api/listings")
    .then(res => res.json())
    .then(data => {
      allListings = data;
      renderListings(allListings);
    })
    .catch(err => {
      console.error("Error fetching listings:", err);
      listingsContainer.innerHTML = "<p>Error loading listings.</p>";
    });
});
