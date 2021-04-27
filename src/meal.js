class Meal {
  constructor(meal, mealAttributes) {
    this.id = meal.id;
    this.name = mealAttributes.name;
    this.ingredients = mealAttributes.ingredients;
    this.calories = mealAttributes.calories;
    this.image_url = mealAttributes.image_url;
    this.category = mealAttributes.category;
    Meal.all.push(this);
  }

  renderMealCard() {
    return `
      <div id=meal-${this.id}>
        <img src=${this.image_url} height="200" width="250">
        <h3>${this.name}</h3>
        <p>${this.category.name}</p></div>
        <div id="delete-${this.id}">
        <button data-id=${this.id}>delete</button><div>
      </div>
      <br><br>`;
  }
  // renderUpdateForm() {
  //   return `
  //   <form id=${this.id} >
  //     <h3>Edit a Meal!</h3>

  //     <label>Name</label>
  //     <input id='input-name' type="text" name="name" value="${this.name}" class="input-text">
  //     <br><br>

  //     <label>Ingredients</label>
  //     <textarea id='input-ingredients' name="ingredients" rows="2" cols="50" value="">${this.ingredients}</textarea>
  //     <br><br>

  //     <label>Name</label>
  //     <input id='input-calories' type="text" name="calories" value="${this.calories}" class="input-text">
  //     <br><br>

  //     <label>Image URL</label>
  //     <input id='input-url' type="text"
  //     name="image"
  //     rows="1"
  //     cols="50" value="${this.image_url}" class="input-text">
  //     <br><br>

  //     <label>Category</label>
  //     <select id="categories" name="categories" value="${this.category.name}">
  //     <option value="1">Breakfast</option>
  //           <option value="2">Brunch</option>
  //           <option value="3">Lunch</option>
  //           <option value="4">Dinner</option>
  //           <option value="5">Snack</option>
  //     </select>
  //     <br><br>

  //     <input id='edit-button' type="submit" name="submit" value="Edit Meal" class="submit">
  //   </form>
  // `;
  // }
}

Meal.all = [];
