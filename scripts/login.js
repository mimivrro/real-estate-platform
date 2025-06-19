document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find(user => user.email === email && user.password === password);

  if (!foundUser) {
    alert("Invalid email or password.");
    return;
  }

  // Save logged in user
  localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

  alert(`Welcome back, ${foundUser.name}!`);
  switch (user.role) {
  case "Buyer":
    window.location.href = "../dashboards/buyer.html";
    break;
  case "Seller":
    window.location.href = "../dashboards/seller.html";
    break;
  case "Agent":
    window.location.href = "../dashboards/agent.html";
    break;
  case "Admin":
    window.location.href = "../dashboards/admin.html";
    break;
  default:
    window.location.href = "../index.html";
}

});
