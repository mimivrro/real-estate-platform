const properties = JSON.parse(localStorage.getItem("properties")) || [];

const listContainer = document.getElementById("property-list");

if (properties.length === 0) {
  listContainer.innerHTML = "<p>No listings available.</p>";
} else {
  properties.forEach((prop) => {
    const div = document.createElement("div");
    div.className = "property";
    div.innerHTML = `
      <h3>${prop.title}</h3>
      <p>Location: ${prop.location}</p>
      <p>Price: $${prop.price}</p>
      <p>Bedrooms: ${prop.bedrooms}</p>
      <img src="${prop.image}" alt="${prop.title}" width="200"/>
    `;
    listContainer.appendChild(div);
  });
}
