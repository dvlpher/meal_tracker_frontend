const endPoint = "http://localhost:3000/api/v1/meals";

document.addEventListener("DOMContentLoaded", () => {
  getMeals();
  const createMealForm = document.querySelector("#create-meal-form");
  createMealForm.addEventListener("submit", (e) => createFormHandler(e));
  //edit form
  const mealContainer = document.querySelector("#meal-container");
  mealContainer.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    const meal = Meal.findById(id);
    console.log(meal);
    document.querySelector("#update-meal").innerHTML = meal.renderUpdateForm();
  });
  document
    .querySelector("#update-meal")
    .addEventListener("submit", (e) => updateFormHandler(e));
});

function getMeals() {
  fetch(endPoint)
    .then((response) => response.json())
    .then((meals) => {
      meals.data.forEach((meal) => {
        let newMeal = new Meal(meal, meal.attributes);

        document.querySelector(
          "#meal-container"
        ).innerHTML += newMeal.renderMealCard();
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

function updateFormHandler(e) {
  e.preventDefault();
  const id = parseInt(e.target.dataset.id);
  const meal = Meal.findById(id);
  const name = e.target.querySelector("#input-name").value;
  const ingredients = e.target.querySelector("#input-ingredients").value;
  const calories = e.target.querySelector("#input-calories").value;
  const image_url = e.target.querySelector("#input-url").value;
  const category_id = parseInt(e.target.querySelector("#categories").value);
  patchMeal(meal, name, ingredients, calories, image_url, category_id);
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

      let newMeal = new Meal(mealData, mealData.attributes);
      document.querySelector(
        "#meal-container"
      ).innerHTML += newMeal.renderMealCard();
    });
}

function patchMeal(meal, name, ingredients, calories, image_url, category_id) {
  const bodyJSON = {
    meal,
    name,
    ingredients,
    calories,
    image_url,
    category_id,
  };
  fetch(`http://localhost:3000/api/v1/syllabuses/${meal.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bodyJSON),
  })
    .then((res) => res.json())
    // our backend responds with the updated syllabus instance represented as JSON
    .then((updatedMeal) => console.log(updatedMeal));
}
