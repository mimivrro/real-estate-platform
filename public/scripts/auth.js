// scripts/auth.js

const users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("register-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully!");
  window.location.href = "login.html";
});

document.getElementById("login-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username-login").value;
  const password = document.getElementById("password-login").value;

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert(`Welcome ${user.username}`);
    window.location.href = "dashboard.html"; // or redirect based on role
  } else {
    alert("Invalid credentials!");
  }
});
