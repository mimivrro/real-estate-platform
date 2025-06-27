document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Invalid email or password.");
      return;
    }

    const foundUser = result.user;

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
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login.");
  }
});
