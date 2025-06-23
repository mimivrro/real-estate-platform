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

  // Save logged-in user
  localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
  alert(`Welcome back, ${foundUser.name}!`);

  switch (foundUser.role) {
    case "buyer":
      window.location.href = "../dashboards/buyer.html";
      break;
    case "seller":
      window.location.href = "../dashboards/seller.html";
      break;
    case "agent":
      window.location.href = "../dashboards/agent.html";
      break;
    case "admin":
      window.location.href = "../dashboards/admin.html";
      break;
    default:
      window.location.href = "../index.html";
  }
});
