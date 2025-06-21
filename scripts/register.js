document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const role = document.getElementById("reg-role").value;

  // Basic validation
  if (!name || !email || !password || !role) {
    alert("Please fill in all fields.");
    return;
  }

  // Check for existing users
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    alert("A user with this email already exists.");
    return;
  }

  const newUser = { name, email, password, role: role.toLowerCase(),  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");
  window.location.href = "login.html"; // Redirect to login
});
