// utils/auth-utils.js
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

export function isLoggedIn() {
  return !!localStorage.getItem("loggedInUser");
}

export function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
