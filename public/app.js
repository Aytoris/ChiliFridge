function fetchFridge() {
    console.log('Fetching fridge data from server...');
    fetch('/fridge')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Received fridge data:', data);
      
      // Initialize an empty fridge object
      fridge = {};
      
      // Check if the data is in our special format
      if (data && data.type === "fridge-data" && data.items) {
        // If it's in our format, use the items directly
        fridge = data.items;
      } else {
        // Otherwise, try to consolidate the data as before
        const foodItems = {};
        
        // First, group items by name (case insensitive)
        Object.entries(data || {}).forEach(([id, item]) => {
          if (!item || !item.name) return; // Skip invalid items
          
          const lowerCaseName = item.name.toLowerCase();
          
          if (!foodItems[lowerCaseName]) {
            foodItems[lowerCaseName] = { 
              name: item.name,
              quantity: item.quantity || 0,
              unit: item.unit || '',
              category: item.category || 'refrigerator'
            };
          } else {
            // Add quantities for duplicate items
            foodItems[lowerCaseName].quantity += (item.quantity || 0);
          }
        });
        
        // Use the consolidated data
        fridge = foodItems;
      }
      
      console.debug('PROCESSED FRIDGE:', fridge);
      displayFridge();
      fridgeLoaded = true;
      
      // Save the consolidated fridge back to the server to fix the format
      saveFridgeToJSON();
      
      // If recipes are loaded, initialize the UI
      if (Object.keys(allRecipes).length > 0) {
          displayRecipeIngredients();
          findMissingIngredients();
          displayCalendar();
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      fridge = {}; // Set to empty object on error
      displayFridge();
      fridgeLoaded = true; // Still mark as loaded to prevent hanging
    });
}

function saveFridgeToJSON() {
    console.log('Saving fridge to JSON:', fridge);
    try {
        // Create a single object where each food item is stored with its name as the key
        const fridgeData = { 
            type: "fridge-data",
            timestamp: new Date().getTime(),
            items: {}
        };
        
        // Add each food item to the items field
        Object.entries(fridge).forEach(([key, item]) => {
            fridgeData.items[key] = item;
        });
        
        const fridgeToSave = JSON.stringify(fridgeData);
        console.log('Sending to server:', fridgeToSave);
        
        fetch('/write-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: fridgeToSave
        })
        .then(response => {
            if (response.ok) {
                console.debug('SAVED JSON!', fridgeData);
                displayFridge();
            } else {
                console.error('Failed to update JSON file.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error saving fridge to JSON:', error);
    }
}

function addFood() {
    const ingredientInput = document.getElementById('ingredientInput');
    const quantityInput = document.getElementById('quantityInput');

    const food = ingredientInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim()) || 1; // Default to 1 if not a valid number
    const unit = isUnitG ? 'g' : '';

    console.log('Adding food:', food, 'with quantity:', quantity, 'and unit:', unit);

    if (food !== '') {
        // Create a grocery item object with the food details
        const food = {
          name: food,
          quantity: quantity,
          unit: unit
        };
        const groceryItem = JSON.parse(JSON.stringify(food));
        // Use FridgeModule.addGroceryItems to add the food
        FridgeModule.addGroceryItems(groceryItem);

        // Clear inputs
        ingredientInput.value = '';
        quantityInput.value = '';

        const unitDisplay = document.getElementById('unitDisplay');
        unitDisplay.textContent = isUnitG ? 'g' : ''; // Set the display according to the toggle state
    } else {
        console.log('Invalid input. Food:', food, 'Quantity:', quantity);
        alert('Please enter a food name');
    }

    // Set focus back to the ingredient input
    ingredientInput.focus();
}

function findInFridge(name) {
    if (!name) return undefined;
    const lowerCaseName = name.toLowerCase();
    return fridge[lowerCaseName];
}

function displayFridge() {
    const fridgeList = document.getElementById('fridgeList');
    fridgeList.innerHTML = '';

    Object.entries(fridge).forEach(([key, item]) => {
        const li = document.createElement('li');
        const itemName = document.createElement('span');
        itemName.textContent = `${item.quantity}${item.unit} ${item.name} `;
        li.appendChild(itemName);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.style.fontSize = '3em'; // Increase font size
        plusButton.onclick = () => increaseQuantity(key);
        li.appendChild(plusButton);

        const minusButton = document.createElement('button');
        minusButton.textContent = '---';
        minusButton.style.fontSize = '3em'; // Increase font size
        minusButton.onclick = () => decreaseQuantity(key);
        li.appendChild(minusButton);

        const nullifyButton = document.createElement('button');
        nullifyButton.textContent = 'X';
        nullifyButton.style.fontSize = '3em'; // Increase font size
        nullifyButton.onclick = () => DeleteQuantity(key);
        li.appendChild(nullifyButton);

        fridgeList.appendChild(li);
    });
}

function increaseQuantity(key) {
    if (fridge[key]) {
        fridge[key].quantity++;
        updateFridge();
    }
}

function decreaseQuantity(key) {
    if (fridge[key] && fridge[key].quantity > 0) {
        fridge[key].quantity--;
        if (fridge[key].quantity === 0) {
            DeleteQuantity(key);
        } else {
            updateFridge();
        }
    }
}

function DeleteQuantity(key) {
    if (fridge[key]) {
        delete fridge[key];
        updateFridge();
    }
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
            const lowerCaseName = name.toLowerCase();

            if (fridge[lowerCaseName]) {
                fridge[lowerCaseName].quantity += quantity; // Update quantity in the fridge
            } else {
                // Create new ingredient and add it to fridge
                fridge[lowerCaseName] = { 
                    name: name, 
                    quantity: quantity, 
                    unit: unit,
                    category: "refrigerator"
                };
            }
        }
    });

    clearGroceryList();
    updateFridge();
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
                    const lowerCaseName = name.toLowerCase();

                    if (fridge[lowerCaseName]) {
                        fridge[lowerCaseName].quantity += quantity; // Update quantity in the fridge
                    } else {
                        // Create new ingredient and add it to fridge
                        fridge[lowerCaseName] = { 
                            name: name, 
                            quantity: quantity, 
                            unit: unit,
                            category: "refrigerator"
                        };
                    }
                }
            }
            // Save changes after all items are processed
            updateFridge();
        };
        reader.readAsText(file);
    } else {
        console.log('No file selected');
    }
}

function findMissingIngredients() {
    const mealSelect = document.getElementById('mealSelect');
    const selectedMeal = mealSelect.value;
    const peopleCount = document.getElementById('peopleCountMeal').value; // Get the number of people

    const ingredients = allRecipes[selectedMeal];
    const missingIngredients = document.getElementById('missingIngredients');
    missingIngredients.innerHTML = '';

    if (ingredients) {
        const missing = ingredients.reduce((result, item) => {
            const foundInFridge = findInFridge(item.name);
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
                
                // Remove the ingredient if quantity becomes 0
                if (found.quantity <= 0) {
                    const lowerCaseName = ingredient.name.toLowerCase();
                    delete fridge[lowerCaseName];
                }
            } else {
                enoughIngredients = false; // Set the flag to false if there are not enough ingredientsForRecipe
            }
        });

        if (enoughIngredients) {
            updateFridge();
        } else {
            // Display an error notification if there are not enough ingredientsForRecipe
            alert('Not enough ingredients in the fridge!');
        }
    }
}

function compareWithFridge(totalIngredients) {
    // Compare the total ingredients with the ingredients in the fridge
    if (totalIngredients) {
        const totalIngredientsArray = Object.values(totalIngredients);

        const missing = totalIngredientsArray.reduce((result, item) => {
            const foundInFridge = findInFridge(item.name);
            
            if (foundInFridge) {
                const requiredQuantity = item.quantity;
                const existingQuantity = foundInFridge.quantity;

                if (requiredQuantity > existingQuantity) {
                    let missingQuantity = parseInt(requiredQuantity) - parseInt(existingQuantity);

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

function addToGroceryList(name, quantity, unit) {
    const groceryList = document.getElementById('groceryList');

    // Check if the item is already in the grocery list
    let existingItem = Array.from(groceryList.children).find(item => 
        item.textContent.toLowerCase().includes(name.toLowerCase())
    );
    
    if (existingItem) {
        // Parse the current quantity from the existing item
        const match = existingItem.textContent.match(/(\d+)/);
        if (match) {
            const currentQuantity = parseInt(match[1]);
            const newQuantity = currentQuantity + quantity;
            existingItem.textContent = `${newQuantity}${unit} ${name}`;
        }
    } else {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = `${quantity}${unit} ${name}`;
        groceryList.appendChild(listItem);
    }
}

function clearGroceryList() {
    const groceryList = document.getElementById('groceryList');
    groceryList.innerHTML = ''; // Clear the entire grocery list
}

function addWeeklyGroceryList() {
    let totalIngredients = {};
    let missingIngredients = {};

    gatherTotalIngredients(totalIngredients);
    compareWithFridge(totalIngredients);
}

function gatherTotalIngredients(totalIngredients) {
    // Gather all the selected meals from the calendar
    let selectedMeals = Array.from(document.querySelectorAll('#calendar select')).map(select => select.value).filter(value => value);
    const peopleCount = document.getElementById('peopleCountCalendar').value;
    
    console.log("Selected meals:", selectedMeals);
    
    selectedMeals.forEach(meal => {
        if (meal && allRecipes[meal]) {
            allRecipes[meal].forEach(ingredient => {
                const totalQuantity = ingredient.quantity * peopleCount;
                const lowerCaseName = ingredient.name.toLowerCase();
                
                if (!totalIngredients[lowerCaseName]) {
                    totalIngredients[lowerCaseName] = {
                        name: ingredient.name,
                        quantity: totalQuantity,
                        unit: ingredient.unit
                    };
                } else {
                    totalIngredients[lowerCaseName].quantity += totalQuantity;
                }
            });
        }
    });
    
    console.log("Total ingredients needed:", totalIngredients);
} 