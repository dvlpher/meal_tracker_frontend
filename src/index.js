const endPoint = "http://localhost:3000/api/v1/meals";

document.addEventListener("DOMContentLoaded", () => {
  getMeals();
  const createMealForm = document.querySelector("#create-meal-form");
  createMealForm.addEventListener("submit", (e) => createFormHandler(e));
  //edit form
  const mealContainer = document.querySelector("#meal-container");
  mealContainer.addEventListener("click", (e) => {
    const mealId = parseInt(e.target.dataset.id);
    console.log(mealId);
    deleteMeal(mealId);
    // console.log(Meal.all);
    // const meal = Meal.all[mealId - 1];
    // document.querySelector("#update-meal").innerHTML = meal.renderUpdateForm();
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
  const meal = Meal.all[id - 1];
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
  fetch(`http://localhost:3000/api/v1/meals/${meal.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bodyJSON),
  })
    .then((res) => res.json())
    // our backend responds with the updated meal instance represented as JSON
    .then((updatedMeal) => console.log(updatedMeal));
}
function deleteMeal(id) {
  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  fetch(`http://localhost:3000/api/v1/meals/${id}`, configObj)
    .then((res) => res.json())
    .then((resp) => {
      alert(resp.message);
    });

  Meal.all = Meal.all.filter((meal) => meal.id != id);

  let meal = document.getElementById(`meal-${id}`);

  meal.remove();
}
