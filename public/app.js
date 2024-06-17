// Retrieve the fridge contents from local storage or set it to an empty array if it doesn't exist
let fridge = [];
fetchFridge();
let isUnitG = false;

let allRecipes = {};

fetch('/recipes')
    .then(response => response.json())
    .then(data => {
        const mealSelect = document.getElementById('mealSelect');
        allRecipes = data; // Storing the meal options in allRecipes

        const mealOptions = Object.keys(allRecipes).sort(); // Sort the meal options alphabetically

        mealOptions.forEach(meal => {
            const option = document.createElement('option');
            option.value = meal;
            option.textContent = meal;
            mealSelect.appendChild(option);
        });


        let ingredients = getAllIngredients(allRecipes);

        // Convert the Set to an array and sort it
        let sortedIngredients = Array.from(ingredients).sort();

        let datalist = document.getElementById('ingredientList');

        sortedIngredients.forEach(ingredient => {
            let option = document.createElement('option');
            option.value = ingredient;
            datalist.appendChild(option);
        });

        // Trigger initial actions once the options are loaded
        displayRecipeIngredients();
        findMissingIngredients();
        displayCalendar();
    })
    .catch(error => {
        console.error('Error fetching meal options: ', error);
    });

function getAllIngredients(allRecipes) {
    // Create a Set to store unique ingredients
    let ingredients = new Set();
    // Iterate over each recipe and add its ingredients to the Set.
    Object.values(allRecipes).forEach(recipe => {
        recipe.forEach(ingredient => {
            ingredients.add(ingredient.name);
        });
    });
    return ingredients;
}

function toggleUnit() {
    isUnitG = !isUnitG;
    const unitDisplay = document.getElementById('unitDisplay');
    unitDisplay.textContent = isUnitG ? 'g' : '';
}

function displayFridge() {
    const fridgeList = document.getElementById('fridgeList');
    fridgeList.innerHTML = '';

    Object.entries(fridge).forEach((item) => {
        pieceOfFood = item[1]
        const li = document.createElement('li');
        const itemName = document.createElement('span');
        itemName.textContent = `${pieceOfFood.quantity}${pieceOfFood.unit} ${pieceOfFood.name} `;
        li.appendChild(itemName);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.style.fontSize = '3em'; // Increase font size
        plusButton.onclick = () => increaseQuantity(item[0]);
        li.appendChild(plusButton);

        const minusButton = document.createElement('button');
        minusButton.textContent = '---';
        minusButton.style.fontSize = '3em'; // Increase font size
        minusButton.onclick = () => decreaseQuantity(item[0]);
        li.appendChild(minusButton);

        const nullifyButton = document.createElement('button');
        nullifyButton.textContent = 'X';
        nullifyButton.style.fontSize = '3em'; // Increase font size
        nullifyButton.onclick = () => DeleteQuantity(item[0]);
        li.appendChild(nullifyButton);

        fridgeList.appendChild(li);
    });
}

function increaseQuantity(propertyName) {
    fridge[propertyName].quantity++;
    updateFridge();
}

function decreaseQuantity(propertyName) {
    if (fridge[propertyName] && fridge[propertyName].quantity > 0) {
        fridge[propertyName].quantity--;
    }
    updateFridge();
}

function DeleteQuantity(propertyName) {
    delete fridge[propertyName];
    updateFridge();
}


function updateFridge() {
    findMissingIngredients();
    saveFridgeToJSON();
}

function addFood() {
    const ingredientInput = document.getElementById('ingredientInput');
    const quantityInput = document.getElementById('quantityInput');

    const food = ingredientInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim());
    const unit = isUnitG ? 'g' : '';


    if (food !== '' && !isNaN(quantity)) {
        const existingItem = Object.values(fridge).find(item => item.name === food);
        console.log('existingItem:', existingItem);
        if (existingItem) {
            // If the food item already exists, update its quantity
            existingItem.quantity += quantity;
        } else {
            // Add the new food item to the fridge
            let newIngredient = { name: food, quantity: quantity, unit: unit };
            fridge[new Date().getTime()] = newIngredient;
        }

        // Display the updated list of fridge contents
        updateFridge();
        ingredientInput.value = '';
        quantityInput.value = '';

        const unitDisplay = document.getElementById('unitDisplay');
        unitDisplay.textContent = isUnitG ? 'g' : ''; // Set the display according to the toggle state
    }

    // Set focus back to the ingredient input
    ingredientInput.focus();
}

// Add an event listener to the quantity input to handle non-numeric input
document.getElementById('quantityInput').addEventListener('keypress', function (e) {
    // if it is not a digit, don't add the character
    if (isNaN(parseInt(e.key)) && e.key !== 'Enter') {
        e.preventDefault();
    }
    if (e.key === 'g') {
        // Toggle the unit display if the user presses 'g'
        toggleUnit();
    }

});
document.getElementById('quantityInput').addEventListener('keypress', function (e) {
    if (!isNaN(parseInt(this.value)) && e.key === 'Enter') {
        addFood();findMissingIngredients();
    }
});
document.getElementById('ingredientInput').addEventListener('keypress', function (e) {
    if (!isNaN(parseInt(this.value)) && e.key === 'Enter') {
        addFood();findMissingIngredients();
    }
});

// Add an event listener to the ingredient input to handle auto-completion
const ingredientInput = document.getElementById('ingredientInput');
ingredientInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase(); // Convert input value to lowercase

    let ingredients = getAllIngredients(allRecipes);

    let allIngredients = Array.from(ingredients).sort();
    console.log(allIngredients);
    if (inputValue.length > 0) {
        const matchingIngredients = allIngredients.filter(ingredient => ingredient.toLowerCase().startsWith(inputValue)); // Convert ingredient to lowercase for comparison
        if (matchingIngredients.length === 1) {
            this.value = matchingIngredients[0];
            // focus the quantity input
            document.getElementById('quantityInput').focus();

            // Auto-select the unit based on the ingredient
            const selectedIngredient = matchingIngredients[0];
            const selectedUnit = getUnitForIngredient(selectedIngredient);
            let currentUnit = isUnitG ? 'g' : '';

            if (selectedUnit !== currentUnit) {
                toggleUnit();
            }
        }
    }
});

function getUnitForIngredient(ingredient) {
    const recipes = Object.values(allRecipes);
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].length; j++) {
            if (recipes[i][j].name === ingredient) {
                return recipes[i][j].unit;
            }
        }
    }
    return '';
}

// Cook a meal and remove ingredients from the fridge
function cookMeal() {
    const mealSelect = document.getElementById('mealSelect');
    const selectedMeal = mealSelect.value;
    const peopleCount = document.getElementById('peopleCountMeal').value;

    const ingredientsForRecipe = allRecipes[selectedMeal];
    if (ingredientsForRecipe) {
        let enoughIngredients = true; // Flag to track if there are enough ingredientsForRecipe

        ingredientsForRecipe.forEach(ingredient => {
            const totalQuantity = ingredient.quantity * peopleCount;
            // look if fridge has the ingredient
            let found = findInFridge(ingredient.name);
            if (found && found.quantity >= totalQuantity) {
                // update value in the fridge
                found.quantity -= totalQuantity;
            } else {
                enoughIngredients = false; // Set the flag to false if there are not enough ingredientsForRecipe
            }
        });

        if (enoughIngredients) {
            updateFridge();
        } else {
            // Display an error notification if there are not enough ingredientsForRecipe
            alert('Not enough ingredientsForRecipe in the fridge!');
        }
    }
}
function findInFridge(name) {
    return Object.values(fridge).find(item => item.name === name);
}

function displayRecipeIngredients() {
    const mealSelect = document.getElementById('mealSelect');
    const selectedMeal = mealSelect.value;
    const peopleCount = document.getElementById('peopleCountMeal').value; // Get the number of people

    const ingredients = allRecipes[selectedMeal];
    const recipeIngredients = document.getElementById('recipeIngredients');

    recipeIngredients.innerHTML = '';

    if (ingredients) {
        ingredients.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.quantity * peopleCount}${item.unit} ${item.name}`; // Multiply the quantity by the number of people
            recipeIngredients.appendChild(li);
        });
    }
}
document.getElementById('peopleCountMeal').addEventListener('change', displayRecipeIngredients);

function findMissingIngredients() {
    const mealSelect = document.getElementById('mealSelect');
    const selectedMeal = mealSelect.value;
    const peopleCount = document.getElementById('peopleCountMeal').value; // Get the number of people

    const ingredients = allRecipes[selectedMeal];
    const missingIngredients = document.getElementById('missingIngredients');
    missingIngredients.innerHTML = '';

    if (ingredients) {
        const missing = ingredients.reduce((result, item) => {
            const foundInFridge = Object.values(fridge).find(fridgeItem => fridgeItem.name === item.name);
            if (foundInFridge) {
                const requiredQuantity = item.quantity * peopleCount; // Multiply the quantity by the number of people
                const existingQuantity = foundInFridge.quantity;

                if (requiredQuantity > existingQuantity) {
                    let missingQuantity = parseInt(requiredQuantity) - parseInt(existingQuantity);

                    result[item.name] = {
                        missingQuantity: missingQuantity,
                        missingUnit: item.unit
                    };
                }
            } else {
                result[item.name] = {
                    missingQuantity: item.quantity * peopleCount, // Multiply the quantity by the number of people
                    missingUnit: item.unit
                };
            }
            return result;
        }, {});

        if (Object.keys(missing).length === 0) {
            const li = document.createElement('li');
            li.textContent = "You have all the ingredients for this recipe!";
            missingIngredients.appendChild(li);
        } else {
            Object.keys(missing).forEach(name => {
                const item = missing[name];
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = `Add ${item.missingQuantity}${item.missingUnit} ${name}`;
                button.addEventListener('click', () => {
                    addToGroceryList(name, item.missingQuantity, item.missingUnit);
                });
                li.appendChild(button);
                missingIngredients.appendChild(li);
            });
        }
    }
}

function addToGroceryList(name, quantity, unit) {
    const groceryList = document.getElementById('groceryList');

    let existingItem = Array.from(groceryList.children).find(item => item.textContent.trim() === `${quantity}${unit} ${name}`);
    if (existingItem) {
        let existingQuantity = existingItem.textContent.match(/\d+/);
        if (existingQuantity) {
            let totalQuantity = parseInt(existingQuantity) + quantity;
            existingItem.textContent = `${totalQuantity}${unit} ${name}`;
        }
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = `${quantity}${unit} ${name}`;
        groceryList.appendChild(listItem);
    }
}

function addAllToGroceryList() {
    const missingIngredients = document.getElementById('missingIngredients');
    const missingItems = missingIngredients.querySelectorAll('li');

    missingItems.forEach(item => {
        const button = item.querySelector('button');
        if (button) {
            button.click(); // Click each 'Add to grocery list' button to add all missing ingredients
        }
    });
}

function clearFridge() {
    fridge = {}; // Empty the fridge array
    saveFridgeToJSON(); // Update the displayed list of fridge contents
    findMissingIngredients(); // Update the list of missing ingredients
}

function clearGroceryList() {
    const groceryList = document.getElementById('groceryList');
    groceryList.innerHTML = ''; // Clear the entire grocery list
}

function sendGroceryListToFridge() {
    const groceryList = document.getElementById('groceryList');
    const groceryItems = Array.from(groceryList.children);

    groceryItems.forEach(groceryItem => {
        const regexResult = groceryItem.textContent.match(/(\d+)(\D)(.+)/); // Capture quantity, unit, and name

        if (regexResult) {
            const quantity = parseInt(regexResult[1]);
            const unit = regexResult[2].trim();
            const name = regexResult[3].trim();

            let found = findInFridge(name);
            if (found) {
                found.quantity += quantity; // Update quantity in the fridge
            } else {
                found = { name: name, quantity: quantity, unit: unit };
            }
        }
    });

    clearGroceryList();
    updateFridge();
    saveFridgeToJSON(); // Update the displayed list of fridge contents
}

function saveFridgeToJSON() {
    fetch('/write-json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fridge) // Include data here
    })
    .then(response => {
        if (response.ok) {
            console.debug('SAVED JSON!', fridge);
            displayFridge();
    } else {
            console.error('Failed to update JSON file.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchFridge() {
    fetch('/fridge')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      fridge = data;
      console.debug('LOADED JSON!', data);
      displayFridge();
      // Use data as needed
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}


function saveGroceryListToFile() {
  var groceryList = document.getElementById("groceryList");
  var items = groceryList.getElementsByTagName("li");
  var groceryContent = [];
  for (var i = 0; i < items.length; i++) {
      groceryContent.push(items[i].textContent);
  }
  var textContent = groceryContent.join("\n");

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));
  element.setAttribute('download', 'grocery_list.txt');
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Call displayRecipeIngredients initially to show ingredients for the default selected recipe
displayRecipeIngredients();
findMissingIngredients();
saveFridgeToJSON;

function displayCalendar() {
    // Clear the existing calendar
    let calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    // Generate the new calendar
    let date = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < 7; i++) {
        let dayDiv = document.createElement('div');
        let dayDate = new Date();
        dayDate.setDate(date.getDate() + i);
        dayDiv.textContent = days[dayDate.getDay()] + ' ' + dayDate.getDate();
        dayDiv.style.padding = '10px';
        dayDiv.style.border = '1px solid black';
        if (i === 0) {
            dayDiv.style.color = 'red';
            dayDiv.style.fontWeight = 'bold';
        }
        calendarDiv.appendChild(dayDiv);

        // Add two select elements for meal selection
        for (let j = 0; j < 3; j++) {
            let mealSelect = document.createElement('select');

            mealSelect.id = 'meal' + i + j;

            const mealOptions = Object.keys(allRecipes).map(meal => {
                return { value: meal, text: meal };
            });

            mealOptions.sort((a, b) => a.text.localeCompare(b.text));

            mealOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                mealSelect.appendChild(optionElement);
            });

            // Add "Select a meal" as the first option
            let selectOption = document.createElement('option');
            selectOption.value = '';
            selectOption.text = '';
            selectOption.disabled = true;
            selectOption.selected = true;
            mealSelect.insertBefore(selectOption, mealSelect.firstChild);

            dayDiv.appendChild(mealSelect);
        }
    }
}

// Add this function to your JavaScript code
let missingIngredients = {};

function gatherTotalIngredients(totalIngredients) {
    // Gather all the selected meals from the calendar
    let selectedMeals = Array.from(document.querySelectorAll('#calendar select')).map(select => select.value);
    const peopleCount = document.getElementById('peopleCountCalendar').value;
    console.log("selectedMeals:", selectedMeals);
    selectedMeals.forEach(meal => {
        if (meal) {
            let totalIngredientsCopy = {...allRecipes[meal]};
            console.log("totalIngredientsCopy:", totalIngredientsCopy);

            Object.values(totalIngredientsCopy).forEach(ingredient => {
                const totalQuantity = ingredient.quantity * peopleCount;
                if (!totalIngredients[ingredient.name]) {
                    totalIngredients[ingredient.name] = {...ingredient, quantity: totalQuantity};
                } else {
                    totalIngredients[ingredient.name].quantity += totalQuantity;
                }
            });
        }
    });
}

function compareWithFridge(totalIngredients) {
    // Compare the total ingredients with the ingredients in the fridge
    if (totalIngredients) {
        const totalIngredientsArray = Object.values(totalIngredients);

        const missing = totalIngredientsArray.reduce((result, item) => {

            const foundInFridge = Object.values(fridge).find(fridgeItem => fridgeItem.name.toLowerCase() === item.name.toLowerCase());
            const foundInGroceryList = Object.values(groceryList).find(groceryItem => groceryItem.name.toLowerCase() === item.name.toLowerCase());
            if (foundInFridge || foundInGroceryList) {
                const requiredQuantity = item.quantity;
                const existingFridgeQuantity = foundInFridge ? foundInFridge.quantity : 0;
                const existingGroceryListQuantity = foundInGroceryList ? foundInGroceryList.quantity : 0;

                const totalExistingQuantity = existingFridgeQuantity + existingGroceryListQuantity;

                if (requiredQuantity > totalExistingQuantity) {
                    let missingQuantity = parseInt(requiredQuantity) - parseInt(totalExistingQuantity);

                    result[item.name] = {
                        name: item.name,
                        quantity: missingQuantity,
                        unit: item.unit
                    };
                }
            } else {
                result[item.name] = {
                    name: item.name,
                    quantity: item.quantity,
                    unit: item.unit
                };
            }
            return result;
        }, {});

        Object.values(missing).forEach(ingredient => {
            // Add each ingredient to the grocery list
            addToGroceryList(ingredient.name, ingredient.quantity, ingredient.unit);
        });
    }
}

function addWeeklyGroceryList() {
    let totalIngredients = {};
    missingIngredients = {};


    // fetchFridge();
    gatherTotalIngredients(totalIngredients);
    compareWithFridge(totalIngredients);

}

function importGroceryList() {
    const fileInput = document.getElementById('groceryFile');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            const lines = contents.split('\n');
            for (const line of lines) {
                // example line: "12g Levure (cube bleu)"
                // get quantity, unit and name
                const regexResult = line.match(/(\d+)(\D)(.+)/); // Capture quantity, unit, and name
                if (regexResult) {
                    const quantity = parseInt(regexResult[1]);
                    const unit = regexResult[2].trim();
                    const name = regexResult[3].trim();

                    let found = findInFridge(name);
                    if (found) {
                        found.quantity += quantity; // Update quantity in the fridge
                    } else {
                        found = { name: name, quantity: quantity, unit: unit };
                    }
                    console.log('found:', found);
                }
            }
        };
        reader.readAsText(file);
    } else {
        console.log('No file selected');
    }
}
// setInterval(displayCalendar, 500);