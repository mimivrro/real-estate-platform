document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  let role = document.getElementById("reg-role").value.trim();

  // Basic validation
  if (!name || !email || !password || !role) {
    alert("Please fill in all fields.");
    return;
  }

  // Standardize role capitalization (e.g., buyer → Buyer)
  role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  // Check for existing users
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    alert("A user with this email already exists.");
    return;
  }

  const newUser = { name, email, password, role: role.toLowerCase() };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");
  window.location.href = "login.html"; // Redirect to login
});
