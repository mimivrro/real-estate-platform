document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const authButtons = document.getElementById("auth-buttons");
  const logoutSection = document.getElementById("logout-section");

  if (loggedInUser) {
    if (authButtons) authButtons.style.display = "none";
    if (logoutSection) logoutSection.style.display = "block";

    // ✅ Hide "Add Listing" and "Add Property" for Buyers
    if (loggedInUser.role.toLowerCase() === "buyer") {
      document.querySelectorAll("a").forEach(link => {
        if (
          link.classList.contains("add-listing-btn") ||
          link.textContent.trim().toLowerCase() === "add property"
        ) {
          link.style.display = "none";
        }
      });
    }

    // Logout logic
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      });
    }

  } else {
    if (authButtons) authButtons.style.display = "block";
    if (logoutSection) logoutSection.style.display = "none";
  }
});
