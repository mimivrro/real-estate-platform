const form = document.getElementById("property-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProperty = {
    title: document.getElementById("title").value,
    location: document.getElementById("location").value,
    price: document.getElementById("price").value,
    bedrooms: document.getElementById("bedrooms").value,
    image: document.getElementById("image").value,
  };

  const properties = JSON.parse(localStorage.getItem("properties")) || [];
  properties.push(newProperty);
  localStorage.setItem("properties", JSON.stringify(properties));

  alert("Property added!");
  form.reset();
});
