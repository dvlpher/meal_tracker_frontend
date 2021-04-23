const endPoint = "http://localhost:3000/api/v1/meals";

document.addEventListener("DOMContentLoaded", () => {
  getMeals();
  const createMealForm = document.querySelector("#create-meal-form");
  createMealForm.addEventListener("submit", (e) => createFormHandler(e));
});

function getMeals() {
  fetch(endPoint)
    .then((response) => response.json())
    .then((meals) => {
      meals.data.forEach((meal) => {
        render(meal);
      });
      // .catch((err) => console.log(err));
    });
}

function createFormHandler(e) {
  e.preventDefault();
  console.log(e);
  const nameInput = document.querySelector("#input-name").value;
  const ingredientsInput = document.querySelector("#input-ingredients").value;
  const caloriesInput = document.querySelector("#input-calories").value;
  const imageInput = document.querySelector("#input-url").value;
  const categoryId = parseInt(document.querySelector("#categories").value);
  postFetch(nameInput, ingredientsInput, caloriesInput, imageInput, categoryId);
}

function postFetch(name, ingredients, calories, image_url, category_id) {
  console.log(name, ingredients, calories, image_url, category_id);

  let bodyData = { name, ingredients, calories, image_url, category_id };

  fetch(endPoint, {
    // POST request
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((meal) => {
      console.log(meal);
      const mealData = meal.data;

      render(mealData);
    });
}

function render(meal) {
  const mealMarkup = ` <div data-id=${meal.id}>
        <img src=${meal.attributes.image_url} height="200" width ="250">
        <h3>Name: ${meal.attributes.name}</h3>
        <p>Calories: ${meal.attributes.calories}</p>
        <p>Category: ${meal.attributes.category.name}</p>
        <button data-id=${meal.id}>edit</button>
        <button data-id=${meal.id}>delete</button>
        </div>
        <br><br>`;
  document.querySelector("#meal-container").innerHTML += mealMarkup;
}
