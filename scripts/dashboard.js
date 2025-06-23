document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // 🔐 Redirect if not logged in
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  // 👤 Show user info if available
  const roleElement = document.getElementById("user-role");
  const nameElement = document.getElementById("user-name");
  if (roleElement) roleElement.textContent = user.role;
  if (nameElement) nameElement.textContent = user.name;

  // 🚪 Logout button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "../index.html";
    });
  }

  // 🎯 Role-based button visibility
  const addBtn = document.getElementById("add-listing-btn");
  const viewBtn = document.getElementById("view-listings-btn");
  const likedBtn = document.getElementById("liked-properties-btn");
  const clientBtn = document.getElementById("client-listings-btn");

  if (user.role === "Seller") {
    if (addBtn) addBtn.style.display = "inline-block";
    if (viewBtn) viewBtn.style.display = "inline-block";
  } else if (user.role === "Buyer") {
    if (viewBtn) viewBtn.style.display = "inline-block";
    if (likedBtn) likedBtn.style.display = "inline-block";
  } else if (user.role === "Agent") {
    if (clientBtn) clientBtn.style.display = "inline-block";
  }

  // 📄 Button navigation
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      window.location.href = "../listings/add-property.html";
    });
  }

  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      window.location.href = "../listings/listings.html";
    });
  }

  if (likedBtn) {
    likedBtn.addEventListener("click", () => {
      window.location.href = "../listings/liked-properties.html";
    });
  }

  if (clientBtn) {
    clientBtn.addEventListener("click", () => {
      window.location.href = "../dashboards/client-listings.html";
    });
  }
});
