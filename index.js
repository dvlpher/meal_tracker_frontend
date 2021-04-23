const endPoint = "http://localhost:3000/api/v1/meals";

document.addEventListener("DOMContentLoaded", () => {
  getMeals();
});

function getMeals() {
  fetch(endPoint)
    .then((response) => response.json())
    .then((meals) => {
      meals.data.forEach((meal) => {
        const mealMarkup = ` <div data-id=${meal.id}>
        <img src=${meal.attributes.image_url} height="200" width ="250">
        <h3>${meal.attributes.name}</h3>
        <p>${meal.attributes.category.name}</p>
        <button data-id=${meal.id}>edit</button>
        </div>
        <br><br>`;
        document.querySelector("#meal-container").innerHTML += mealMarkup;
      });
    });
}
