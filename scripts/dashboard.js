document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // 🔐 Redirect to login if user is not authenticated
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  // 👤 Populate user info if the elements exist
  const roleElement = document.getElementById("user-role");
  const nameElement = document.getElementById("user-name");
  if (roleElement) roleElement.textContent = user.role;
  if (nameElement) nameElement.textContent = user.name;

  // 🚪 Logout functionality: clear localStorage and redirect to homepage
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "../index.html";
    });
  }

  // 🧭 Role-based display logic: Hide Add button for Buyer
  if (user.role === "Buyer") {
    const addBtn = document.getElementById("add-listing-btn");
    if (addBtn) addBtn.style.display = "none";
  }

  // 📄 View Listings button event
  const viewBtn = document.getElementById("view-listings-btn");
  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      window.location.href = "../listings/listings.html";
    });
  }

  // 🏠 Add Property button event
  const addBtn = document.getElementById("add-listing-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      window.location.href = "../listings/add-property.html";
    });
  }
});
