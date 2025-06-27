document.getElementById("register-form").addEventListener("submit", async function (e) {
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

  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: role.toLowerCase(),
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Registration successful! You can now log in.");
      window.location.href = "login.html";
    } else {
      alert(result.error || "Registration failed.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong during registration.");
  }
});
