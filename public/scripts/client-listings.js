document.addEventListener("DOMContentLoaded", () => {
  const tableContainer = document.getElementById("client-listings-table");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const allListings = [];

  users.forEach(user => {
    if (user.role.toLowerCase() === "buyer") {
      const key = `liked_${user.email}`;
      const likedListings = JSON.parse(localStorage.getItem(key)) || [];

      likedListings.forEach(listing => {
        allListings.push({
          ...listing,
          buyerEmail: user.email
        });
      });
    }
  });

  if (allListings.length === 0) {
    tableContainer.innerHTML = "<p>No saved listings found.</p>";
    return;
  }

  const table = document.createElement("table");
  table.classList.add("styled-table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Title</th>
        <th>Location</th>
        <th>Price</th>
        <th>Buyer Email</th>
        <th>Seller Email</th>
      </tr>
    </thead>
    <tbody>
      ${allListings.map(l => `
        <tr>
          <td>${l.title}</td>
          <td>${l.location}</td>
          <td>$${l.price.toLocaleString()}</td>
          <td>${l.buyerEmail}</td>
          <td>${l.sellerEmail || "N/A"}</td>
        </tr>
      `).join("")}
    </tbody>
  `;

  tableContainer.appendChild(table);

  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../index.html";
  });
});
