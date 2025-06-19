document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Redirect to login if user is not authenticated
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  // Populate dashboard user info if elements exist
  const roleElement = document.getElementById("user-role");
  const nameElement = document.getElementById("user-name");
  if (roleElement) roleElement.textContent = user.role;
  if (nameElement) nameElement.textContent = user.name;

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "../index.html";
    });
  }

  // Optional role-based element hiding (e.g., hide Add Listing for Buyers)
  if (user.role === "Buyer") {
    const addBtn = document.getElementById("add-listing-btn");
    if (addBtn) addBtn.style.display = "none";
  }
});


// Add event listener for "View Listings"
const viewBtn = document.getElementById("view-listings-btn");
if (viewBtn) {
  viewBtn.addEventListener("click", () => {
    window.location.href = "../listings.html";
  });
}

// Add event listener for "Add Listing"
const addBtn = document.getElementById("add-listing-btn");
if (addBtn) {
  addBtn.addEventListener("click", () => {
    window.location.href = "../add-property.html";
  });
}


