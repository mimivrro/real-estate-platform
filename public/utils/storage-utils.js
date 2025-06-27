export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

export function saveListings(listings) {
  localStorage.setItem("propertyListings", JSON.stringify(listings));
}

export function getListings() {
  return JSON.parse(localStorage.getItem("propertyListings")) || [];
}
