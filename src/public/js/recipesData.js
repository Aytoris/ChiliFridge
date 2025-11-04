/**
 * Embedded Recipes Data
 * This file contains all default recipes for ChiliFridge
 * No server required - all data is embedded in the app
 *
 * Recipe structure:
 * - Each recipe contains ingredients array and instructions array
 * - ingredients: Array of {name, quantity, unit}
 * - instructions: Array of step-by-step cooking instructions
 * - servings: Default number of servings (used for scaling)
 * - protein: Optional protein type (tofu, lentils, chickpeas, beans, eggs, fish, chicken, none)
 * - cookingTime: Cooking duration in minutes
 */
const RECIPES_DATA = {
  "Avocado Toasts": {
    ingredients: [
      { "name": "Avokado", "quantity": 1, "unit": "" },
      { "name": "Ägg", "quantity": 2, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "eggs",
    cookingTime: 15
  },
  "Stuffed Butternut Squash": {
    ingredients: [
      { "name": "Butternutpumpa", "quantity": 0.5, "unit": "" },
      { "name": "Purjolök", "quantity": 0.5, "unit": "" },
      { "name": "Parmesan", "quantity": 20, "unit": "g" },
      { "name": "Schalottenlök", "quantity": 1, "unit": "" },
      { "name": "Quinoa", "quantity": 12.5, "unit": "g" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 60
  },
  "Chickpeas Tacos": {
    ingredients: [
      { "name": "Kikärtor", "quantity": 0.5, "unit": "" },
      { "name": "Cashewnötter", "quantity": 35, "unit": "g" },
      { "name": "Lime", "quantity": 0.5, "unit": "" },
      { "name": "Avokado", "quantity": 1, "unit": "" },
      { "name": "Mjöl", "quantity": 110, "unit": "g" },
      { "name": "Koriander (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "chickpeas",
    cookingTime: 25
  },
  "Fajitas": {
    ingredients: [
      { "name": "Paprika", "quantity": 0.5, "unit": "" },
      { "name": "Schalottenlök", "quantity": 1, "unit": "" },
      { "name": "Svamp", "quantity": 40, "unit": "g" },
      { "name": "Röda bönor", "quantity": 0.5, "unit": "" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      // Tortillas
      { "name": "Mjöl", "quantity": 117, "unit": "g" },
      { "name": "Olivolja", "quantity": 15, "unit": "g" },
      { "name": "Salt", "quantity": 4, "unit": "g" },
      { "name": "Vatten", "quantity": 67, "unit": "g" },
    ],
    instructions: [
      "Tortillas: flour, olive oil, salt, water",
    ],
    servings: 1,
    protein: "beans",
    cookingTime: 40
  },
  "French Fries": {
    ingredients: [
      { "name": "Potatis (medelstor)", "quantity": 4, "unit": "" }
    ],
    instructions: [
      "Furnace: 210°C",
    ],
    servings: 1,
    protein: "none",
    cookingTime: 40,
    timers: [
      { "label": "Fries", "duration": 30, "step": 0 }
    ]
  },
  "Gnocchi": {
    ingredients: [
      { "name": "Pumpa", "quantity": 0.5, "unit": "" },
      { "name": "Potatis (medelstor)", "quantity": 1, "unit": "" },
      { "name": "Mjöl", "quantity": 100, "unit": "g" },
      { "name": "Ägg", "quantity": 0.5, "unit": "" },
      { "name": "Svamp", "quantity": 40, "unit": "g" },
      { "name": "Rucola", "quantity": 40, "unit": "g" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "eggs",
    cookingTime: 60,
    timers: [
      { "label": "Roast vegetables", "duration": 45, "step": 1 },
      { "label": "Cook gnocchi batch", "duration": 3, "step": 7 }
    ]
  },
  "Smoothie 1": {
    ingredients: [
      { "name": "Banan", "quantity": 1, "unit": "" },
      { "name": "Blåbär", "quantity": 50, "unit": "g" },
      { "name": "Jordgubbar", "quantity": 50, "unit": "g" },
      { "name": "Mjölk", "quantity": 150, "unit": "g" },
    ],
    instructions: [
      "Alternative: Banan/strawberry(raper surface)",
      "Alternative: Banan/mango",
      "Alternative: apple/pear/kiwi",
      "Alternative: Banan/strawberry(raper surface)/kiwi(sans pepin)/pinapple",
      "Alternative: mango/pineapple/pear",
    ],
    servings: 1,
    protein: "none",
    cookingTime: 5,
  },
  "Bean Burger": {
    ingredients: [
      { "name": "Svarta bönor", "quantity": 100, "unit": "g" },
      { "name": "Lök", "quantity": 0.1, "unit": "" },
      { "name": "Tamari", "quantity": 1, "unit": "tsp" },
      { "name": "Panko", "quantity": 50, "unit": "g" },
      { "name": "Ägg", "quantity": 0.3, "unit": "" },
      { "name": "Balsamvinäger", "quantity": 0.1, "unit": "tbsp" },
      { "name": "Sötpotatis", "quantity": 1, "unit": "" },
      { "name": "Potatis (medelstor)", "quantity": 1, "unit": "" },
      { "name": "Rödbeta", "quantity": 1, "unit": "" },
      // Burger buns
      { "name": "Mjöl", "quantity": 100, "unit": "g" },
      { "name": "Torrjäst (röd)", "quantity": 4, "unit": "g" },
      { "name": "Olivolja", "quantity": 18, "unit": "g" },
      { "name": "Vatten", "quantity": 60, "unit": "g" },
      { "name": "Salt", "quantity": 0.25, "unit": "tsp" },
      { "name": "Socker", "quantity": 12.5, "unit": "g" },
      { "name": "Egg", "quantity": 0.25, "unit": "" },

    ],
    instructions: [
      "Patty: Beans, onion, egg, panko, tamari, balsamic vinegar",
      "Pan: 5min each side, medium heat",
      "Dough: yeast, oil, WARM water, salt. REST 5min, then flour & BEATEN egg",
      "Knead for 3-5min",
      "Let rise for 10-20min",
      "Furnace 220°C for 8-12min",
      "https://www.loveandlemons.com/black-bean-burger-recipe/#wprm-recipe-container-49475",
    ],
    servings: 1,
    protein: "beans",
    cookingTime: 25,
    timers: [
      { "label": "Stir fry patties", "duration": 5, "step": 2 },
      { "label": "Rise buns", "duration": 5, "step": 3},
      { "label": "Bake buns", "duration": 10, "step": 4}
    ]
  },
  "Hummus": {
    ingredients: [
      { "name": "Sesamfrön", "quantity": 25, "unit": "g" },
      { "name": "Citron", "quantity": 0.5, "unit": "" },
      { "name": "Kikärtor", "quantity": 0.5, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 0.5, "unit": "" },
      { "name": "Spiskummin (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "chickpeas",
    cookingTime: 15
  },
  "Pizza": {
    ingredients: [
      { "name": "Tomatsås (krossade)", "quantity": 0.25, "unit": "" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" },
      { "name": "Schalottenlök", "quantity": 0.5, "unit": "" },
      { "name": "Kronärtskocka", "quantity": 0.5, "unit": "" },
      { "name": "Ägg", "quantity": 1, "unit": "" },
      { "name": "Tofu", "quantity": 25, "unit": "g" },
      // Dough
      { "name": "Mjöl", "quantity": 125, "unit": "g" },
      { "name": "Jäst (blå kub)", "quantity": 10, "unit": "g" },
      { "name": "Vatten", "quantity": 90, "unit": "g" },
      { "name": "Salt", "quantity": 3, "unit": "g" },
    ],
    instructions: [
      "Dough: flour, yeast, water, salt",
      "Let dough rise 2h+",
      "Furnace 250°C 10-15min",
    ],
    servings: 1,
    protein: ["tofu", "eggs"],
    cookingTime: 90,
    timers: [
      { "label": "Dough rising", "duration": 60, "step": 3 },
      { "label": "Pizza baking", "duration": 12, "step": 9 }
    ]
  },
  "Tomato Quiche": {
    ingredients: [
      { "name": "Senap", "quantity": 0.1, "unit": "" },
      { "name": "Tomat", "quantity": 1.5, "unit": "" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" },
      // Dough
      { "name": "Mjöl", "quantity": 145, "unit": "g" },
      { "name": "Olivolja", "quantity": 10, "unit": "g" },
      { "name": "Salt", "quantity": 1.5, "unit": "g" },
      { "name": "Vatten", "quantity": 79, "unit": "g" },
    ],
    instructions: [
      "Furnace: 180°C",
      "Dough: flour, olive oil, salt, water",
      "Dough 15min",
      "Quiche 30min",
    ],
    servings: 1,
    protein: "none",
    cookingTime: 50,
    timers: [
      { "label": "Dough", "duration": 15, "step": 1 },
      { "label": "Quiche", "duration": 30, "step": 3 }
    ]
  },
  "Sweet potato (oven)": {
    ingredients: [
      { "name": "Sötpotatis", "quantity": 3, "unit": "" }
    ],
    instructions: [
      "Furnace: 220°C",
    ],
    servings: 1,
    protein: "none",
    cookingTime: 50,
    timers: [
      { "label": "Sweet potato", "duration": 40, "step": 0 }
    ]
  },
  "Zucchini Quiche": {
    ingredients: [
      { "name": "Zucchini", "quantity": 0.5, "unit": "" },
      { "name": "Ägg", "quantity": 2, "unit": "" },
      // Dough
      { "name": "Mjöl", "quantity": 145, "unit": "g" },
      { "name": "Olivolja", "quantity": 10, "unit": "g" },
      { "name": "Salt", "quantity": 1.5, "unit": "g" },
      { "name": "Vatten", "quantity": 79, "unit": "g" },
    ],
    instructions: [
      "Furnace: 180°C",
      "Dough: flour, olive oil, salt, water",
      "Dough 15min",
      "Quiche 30min",
    ],
    servings: 1,
    protein: "none",
    cookingTime: 50,
    timers: [
      { "label": "Dough", "duration": 15, "step": 1 },
      { "label": "Quiche", "duration": 30, "step": 3 }
    ]
  },
  "Risotto": {
    ingredients: [
      { "name": "Schalottenlök", "quantity": 1, "unit": "" },
      { "name": "Buljong", "quantity": 0.5, "unit": "" },
      { "name": "Parmesan", "quantity": 30, "unit": "g" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Svamp", "quantity": 40, "unit": "g" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 30,
    timers: [
      { "label": "Toast rice", "duration": 2, "step": 2 },
      { "label": "Simmer after tomato", "duration": 10, "step": 7 },
      { "label": "Total cooking time", "duration": 20, "step": 8 }
    ]
  },
  "Cloclo Salad": {
    ingredients: [
      { "name": "Tomat", "quantity": 0.5, "unit": "" },
      { "name": "Fetaost", "quantity": 50, "unit": "g" },
      { "name": "Avokado", "quantity": 0.5, "unit": "" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" },
      { "name": "Sallad", "quantity": 1, "unit": "leaf" },
      { "name": "Paprika", "quantity": 0.25, "unit": "" },
      { "name": "Matvete", "quantity": 50, "unit": "g" },
      { "name": "Päron", "quantity": 0.5, "unit": "" },
      { "name": "Gurka", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 20
  },
  "Salmon (+ mashed potatoes?)": {
    ingredients: [
      { "name": "Svamp", "quantity": 40, "unit": "g" },
      { "name": "Lax", "quantity": 100, "unit": "g" },
      { "name": "Potatis (medelstor)", "quantity": 4, "unit": "" },
      { "name": "Körsbärstomat", "quantity": 8, "unit": "" },
      { "name": "Sparris", "quantity": 4, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "fish",
    cookingTime: 35
  },
  "Misir Wat (Ethopian lentils)": {
    ingredients: [
      { "name": "Vatten", "quantity": 150, "unit": "g" },
      { "name": "Lök", "quantity": 0.5, "unit": "" },
      { "name": "Tomat", "quantity": 0.5, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 1, "unit": "" },
      { "name": "Tomatpuré", "quantity": 1.5, "unit": "tbsp" },
      { "name": "Röda linser", "quantity": 100, "unit": "g" },
      { "name": "Buljong", "quantity": 0.5, "unit": "" },
      { "name": "Smör", "quantity": 30, "unit": "g" },
      { "name": "Berbere / Sju kryddor (krydda)", "quantity": 1, "unit": "tbsp" },
      // Pita bread
      { "name": "Mjöl", "quantity": 150, "unit": "g" },
      { "name": "Vatten", "quantity": 100, "unit": "g" },
      { "name": "Bakpulver", "quantity": 1, "unit": "tsp" },
    ],
    instructions: [
      "Pot: butter, tomato paste, tomato, onion",
      "Pita bread: flour, water, baking powder, salt",
      "Pan: toast bread in butter"
    ],
    servings: 1,
    protein: "lentils",
    cookingTime: 25,
    timers: [
      { "label": "Lentils", "duration": 20, "step": 5 },
    ]
  },
  "Cesar salad": {
    ingredients: [
      { "name": "Kyckling", "quantity": 100, "unit": "g" },
      { "name": "Bacon", "quantity": 37.5, "unit": "g" },
      { "name": "Romansallad", "quantity": 2, "unit": "leaf" },
      { "name": "Grönkål", "quantity": 2, "unit": "leaf" },
      { "name": "Rödlök", "quantity": 0.25, "unit": "" },
      { "name": "Körsbärstomat", "quantity": 4, "unit": "" },
      { "name": "Krutonger", "quantity": 50, "unit": "g" },
      { "name": "Parmesan", "quantity": 25, "unit": "g" },
      { "name": "Majonnäs", "quantity": 25, "unit": "g" },
      { "name": "Senap", "quantity": 0.1, "unit": "" },
      { "name": "Citron", "quantity": 0.25, "unit": "" },
      { "name": "Persillade (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      "Furnace 200°C",
      "Pan: bacon",
      "Sauce for 2 people: 50g mayo, 0.5 tsp mustard, 1 tbsp lemon juice, persillade",
    ],
    servings: 1,
    protein: "chicken",
    cookingTime: 25
  },
  "Red Curry Lentil": {
    ingredients: [
      { "name": "Kokosolja", "quantity": 0.25, "unit": "tbsp" },
      { "name": "Vitlöksklyfta", "quantity": 1, "unit": "" },
      { "name": "Ingefära", "quantity": 3.75, "unit": "g" },
      { "name": "Röda linser", "quantity": 50, "unit": "g" },
      { "name": "Buljong", "quantity": 0.25, "unit": "" },
      { "name": "Tomatsås (krossade)", "quantity": 100, "unit": "g" },
      { "name": "Kokosmjölk", "quantity": 100, "unit": "mL" },
      { "name": "Jordnötssmör", "quantity": 0.1, "unit": "" },
      { "name": "Citron", "quantity": 0.125, "unit": "" },
      { "name": "Gurkmeja (krydda)", "quantity": 0.025, "unit": "" },
      { "name": "Spiskummin (krydda)", "quantity": 0.25, "unit": "tsp" },
      { "name": "Koriander (krydda)", "quantity": 0.125, "unit": "tsp" },
      { "name": "Curry (krydda)", "quantity": 0.5, "unit": "tsp" },
      { "name": "Garam masala (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Koriander (krydda)", "quantity": 0.1, "unit": "" },
      // Pita bread
      { "name": "Mjöl", "quantity": 150, "unit": "g" },
      { "name": "Vatten", "quantity": 100, "unit": "g" },
      { "name": "Bakpulver", "quantity": 1, "unit": "tsp" },
    ],
    instructions: [
      "Optional: soy sauce",
      "Pita bread: flour, water, baking powder, salt",
    ],
    servings: 1,
    protein: "lentils",
    cookingTime: 25,
    timers: [
      { "label": "Lentils", "duration": 20, "step": 5 },
    ]
  },
  "Thai Pad": {
    ingredients: [
      { "name": "Sojasås", "quantity": 0.1, "unit": "" },
      { "name": "Tofu", "quantity": 50, "unit": "g" },
      { "name": "Edamame", "quantity": 50, "unit": "g" },
      { "name": "Risnudlar", "quantity": 90, "unit": "g" },
      { "name": "Lime", "quantity": 0.5, "unit": "" },
      { "name": "Risvinäger", "quantity": 0.1, "unit": "" },
      { "name": "Ägg", "quantity": 1, "unit": "" },
      { "name": "Jordnötter", "quantity": 20, "unit": "g" },
      { "name": "Sallad", "quantity": 1, "unit": "leaf" },
      { "name": "Avokado", "quantity": 1, "unit": "" },
      { "name": "Koriander (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: ["tofu", "eggs"],
    cookingTime: 30
  },
  "Pancake (2/person)": {
    ingredients: [
      { "name": "Mjöl", "quantity": 125, "unit": "g" },
      { "name": "Ägg", "quantity": 1, "unit": "" },
      { "name": "Mjölk", "quantity": 200, "unit": "g" },
      { "name": "Olivolja", "quantity": 7, "unit": "g" },
      { "name": "Socker", "quantity": 7, "unit": "g" },
      { "name": "Salt", "quantity": 1, "unit": "g" },
      { "name": "Bakpulver", "quantity": 8, "unit": "g" }
    ],
    instructions: [
      "1: Dry ingredients",
      "2: Lait + jaunes d'oeufs",
      "3: Laisser reposer 20 min",
      "4: Ajouter blanc en neige",
      "5: Poêle huilée chaude, 2min 1coté, 1min autre côté, thermo 5 (préchauffage 8)"
    ],
    servings: 1,
    protein: "eggs",
    cookingTime: 25,
    timers: [
      { "label": "Rest batter", "duration": 10, "step": 2 },
      { "label": "Cook first side", "duration": 3, "step": 5 },
      { "label": "Cook second side", "duration": 2, "step": 6 }
    ]
  },
  "Mushroom Omelette": {
    ingredients: [
      { "name": "Ägg", "quantity": 3, "unit": "" },
      { "name": "Svamp", "quantity": 40, "unit": "g" },
      { "name": "Ärtor", "quantity": 30, "unit": "g" },
      { "name": "Matvete", "quantity": 75, "unit": "g" },
      { "name": "Schalottenlök", "quantity": 1, "unit": "" },
      { "name": "Fryst spenat", "quantity": 15, "unit": "g" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "eggs",
    cookingTime: 25
  },
  "Zucchini Omelette (with wheat or rice)": {
    ingredients: [
      { "name": "Ägg", "quantity": 3, "unit": "" },
      { "name": "Svamp", "quantity": 40, "unit": "g" },
      { "name": "Zucchini", "quantity": 0.5, "unit": "" },
      { "name": "Matvete", "quantity": 75, "unit": "g" },
      { "name": "Ärtor", "quantity": 30, "unit": "g" },
      { "name": "Schalottenlök", "quantity": 1, "unit": "" },
      { "name": "Fryst spenat", "quantity": 15, "unit": "g" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "eggs",
    cookingTime: 25
  },
  "Dumplings": {
    ingredients: [
      { "name": "Mjöl", "quantity": 150, "unit": "g" },
      { "name": "Svamp", "quantity": 40, "unit": "g" },
      { "name": "Morot", "quantity": 0.5, "unit": "" },
      { "name": "Purjolök", "quantity": 0.25, "unit": "" },
      { "name": "Ingefära", "quantity": 15, "unit": "g" },
      { "name": "Gräslök", "quantity": 0.25, "unit": "" },
      { "name": "Sojasås", "quantity": 0.1, "unit": "" },
      { "name": "Risvinäger", "quantity": 0.1, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 1, "unit": "" },
      { "name": "Schalottenlök", "quantity": 1, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 60
  },
  "Poke Bowl": {
    ingredients: [
      { "name": "Mango", "quantity": 0.25, "unit": "" },
      { "name": "Edamame", "quantity": 50, "unit": "g" },
      { "name": "Avokado", "quantity": 0.5, "unit": "" },
      { "name": "Gurka", "quantity": 0.25, "unit": "" },
      { "name": "Sojasås", "quantity": 0.1, "unit": "" },
      { "name": "Kanderad ingefära", "quantity": 20, "unit": "g" },
      { "name": "Tofu", "quantity": 100, "unit": "g" },
      { "name": "Blandade bönor", "quantity": 0.25, "unit": "" },
      { "name": "Sallad", "quantity": 1, "unit": "leaf" },
      { "name": "Risvinäger", "quantity": 0.1, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "tofu",
    cookingTime: 30
  },
  "Ramen": {
    ingredients: [
      { "name": "Ramennudlar", "quantity": 125, "unit": "g" },
      { "name": "Svamp", "quantity": 40, "unit": "g" },
      { "name": "Morot", "quantity": 0.5, "unit": "" },
      { "name": "Ingefära", "quantity": 15, "unit": "g" },
      { "name": "Sojasås", "quantity": 0.1, "unit": "" },
      { "name": "Risvinäger", "quantity": 0.1, "unit": "" },
      { "name": "Sesamolja", "quantity": 0.1, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 1, "unit": "" },
      { "name": "Sesamfrön", "quantity": 10, "unit": "g" },
      { "name": "Buljong", "quantity": 1, "unit": "" },
      { "name": "Koriander (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 20,
    timers: [
      { "label": "Simmer vegetables", "duration": 5, "step": 2 },
      { "label": "Cook noodles", "duration": 4, "step": 4 }
    ]
  },
  "Lasagna": {
    ingredients: [
      { "name": "Lasagneplattor", "quantity": 125, "unit": "g" },
      { "name": "Tomatsås (krossade)", "quantity": 0.5, "unit": "" },
      { "name": "Aubergine", "quantity": 0.25, "unit": "" },
      { "name": "Fryst spenat", "quantity": 100, "unit": "g" },
      { "name": "Fetaost", "quantity": 50, "unit": "g" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 55
  },
  "Indian Curry (chickpea)": {
    ingredients: [
      { "name": "Schalottenlök", "quantity": 1, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 1, "unit": "" },
      { "name": "Ingefära", "quantity": 10, "unit": "g" },
      { "name": "Kikärtor", "quantity": 0.5, "unit": "" },
      { "name": "Fryst spenat", "quantity": 50, "unit": "g" },
      { "name": "Tomatsås (krossade)", "quantity": 0.5, "unit": "" },
      { "name": "Kokosmjölk", "quantity": 40, "unit": "g" },
      { "name": "Spiskummin (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Curry (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Koriander (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "chickpeas",
    cookingTime: 30
  },
  "Butternut Squash Soup": {
    ingredients: [
      { "name": "Butternutpumpa", "quantity": 0.5, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 55
  },
  "Carrot Soup etc": {
    ingredients: [
      { "name": "Morot", "quantity": 1, "unit": "" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Potatis (medelstor)", "quantity": 1, "unit": "" },
      { "name": "Zucchini", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 35
  },
  "Shrimp Salad": {
    ingredients: [
      { "name": "Avokado", "quantity": 1, "unit": "" },
      { "name": "Spenat", "quantity": 20, "unit": "g" },
      { "name": "Ingefära", "quantity": 15, "unit": "g" },
      { "name": "Edamame", "quantity": 20, "unit": "g" },
      { "name": "Räkor", "quantity": 50, "unit": "g" },
      { "name": "Citron", "quantity": 0.5, "unit": "" },
      { "name": "Gräslök", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "fish",
    cookingTime: 20
  },
  "Lentil Soup": {
    ingredients: [
      { "name": "Schalottenlök", "quantity": 0.5, "unit": "" },
      { "name": "Morot", "quantity": 1, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 2, "unit": "" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Linser", "quantity": 50, "unit": "g" },
      { "name": "Buljong", "quantity": 0.5, "unit": "" },
      { "name": "Citron", "quantity": 0.5, "unit": "" },
      { "name": "Spiskummin (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Curry (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Timjan (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "lentils",
    cookingTime: 25,
    timers: [
      { "label": "Lentils", "duration": 20, "step": 5 },
    ]
  },
  "Lentil Salad": {
    ingredients: [
      { "name": "Grönkål", "quantity": 1, "unit": "leaf" },
      { "name": "Mandel", "quantity": 20, "unit": "g" },
      { "name": "Salladslök", "quantity": 3, "unit": "" },
      { "name": "Citron", "quantity": 1, "unit": "" },
      { "name": "Linser", "quantity": 200, "unit": "g" },
      { "name": "Ris", "quantity": 50, "unit": "g" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" },
      { "name": "Spiskummin (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Paprika (krydda)", "quantity": 0.1, "unit": "" }
    ],
    instructions: [
      "Bowl: kale, green part of scallions",
      "Pan: almonds, white part of scallions, lemon zest, cumin, paprika"
    ],
    servings: 1,
    protein: "lentils",
    cookingTime: 35,
    timers: [
      { "label": "Lentils", "duration": 30, "step": 5 },
    ]
  },
  "Lentil Stew": {
    ingredients: [
      { "name": "Schalottenlök", "quantity": 0.5, "unit": "" },
      { "name": "Morot", "quantity": 0.5, "unit": "" },
      { "name": "Selleri", "quantity": 0.5, "unit": "" },
      { "name": "Potatis (medelstor)", "quantity": 1, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 2, "unit": "" },
      { "name": "Zucchini", "quantity": 0.25, "unit": "" },
      { "name": "Persilja", "quantity": 0.1, "unit": "" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Buljong", "quantity": 0.5, "unit": "" },
      { "name": "Citron", "quantity": 0.5, "unit": "" },
      { "name": "Linser", "quantity": 100, "unit": "g" },
      { "name": "Koriander (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Spiskummin (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Gurkmeja (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Kanel (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "lentils",
    cookingTime: 45,
    timers: [
      { "label": "Lentils", "duration": 20, "step": 5 },
    ]
  },
  "Greek Salad": {
    ingredients: [
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Fetaost", "quantity": 50, "unit": "g" },
      { "name": "Avokado", "quantity": 1, "unit": "" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" },
      { "name": "Sallad", "quantity": 1, "unit": "leaf" },
      { "name": "Gurka", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "none",
    cookingTime: 15
  },
  "Chili (beans)": {
    ingredients: [
      { "name": "Rödlök", "quantity": 0.25, "unit": "" },
      { "name": "Paprika", "quantity": 0.25, "unit": "" },
      { "name": "Morot", "quantity": 0.5, "unit": "" },
      { "name": "Selleri", "quantity": 0.25, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 2, "unit": "" },
      { "name": "Paprikapulver", "quantity": 0.1, "unit": "" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Blandade bönor", "quantity": 0.5, "unit": "" },
      { "name": "Lime", "quantity": 0.5, "unit": "" },
      { "name": "Spiskummin (krydda)", "quantity": 0.1, "unit": "" },
      { "name": "Koriander (krydda)", "quantity": 0.1, "unit": "" },
    ],
    instructions: [
      ""
    ],
    servings: 1,
    protein: "beans",
    cookingTime: 40
  }
  ,
  "Roasted Broccoli & Brussels Sprouts": {
    ingredients: [
      { "name": "Broccoli", "quantity": 1, "unit": "" },
      { "name": "Brysselkål", "quantity": 15, "unit": "" },
      { "name": "Olivolja", "quantity": 2, "unit": "tbsp" },
      { "name": "Citronjuice", "quantity": 3, "unit": "tbsp" },
      { "name": "Vitlöksklyfta", "quantity": 2, "unit": "" },
      { "name": "Näringsjäst", "quantity": 1.5, "unit": "tbsp" },
      { "name": "Tofu", "quantity": 400, "unit": "g" },
    ],
    instructions: [
      "Preheat oven to 200°C.",
      "Cut broccoli into small florets and halve brussels sprouts, discarding woody ends.",
      "Mince garlic cloves.",
      "Oven: Tofu, broccoli, brussels + oil, lemon juice, garlic, nutritional yeast, salt, pepper.",
      "Mix everything together to coat the vegetables evenly.",
      "Roast for 20-25 minutes, until veggies are tender and crisped at the edges.",
      "Remove from oven and top with extra nutritional yeast and lemon juice to taste."
    ],
    servings: 4,
    protein: "none",
    cookingTime: 30
  },
  "Croque-madame": {
    ingredients: [
      { "name": "Toastbröd", "quantity": 4, "unit": "skiva" },
      { "name": "Emmental", "quantity": 100, "unit": "g" },
      { "name": "Ägg", "quantity": 2, "unit": "" },
      { "name": "Skinka", "quantity": 2, "unit": "skiva" },
      { "name": "Smör", "quantity": 25, "unit": "g" },
      { "name": "Salt", "quantity": 1, "unit": "g" },
      { "name": "Peppar", "quantity": 1, "unit": "g" }
    ],
    instructions: [
      "Preheat oven to 210°C. Butter one side of each bread slice.",
      "Slice cheese thinly.",
      "Assemble sandwich: bread (buttered side in), cheese, ham, cheese, bread (buttered side in).",
      "Place on baking sheet and bake until golden.",
      "Fry eggs in a pan, season with salt and pepper.",
      "Top each sandwich with a fried egg and serve."
    ],
    servings: 2,
    protein: ["eggs", "pork"],
    cookingTime: 20
  },
  "Galette poire chocolat (8p)":  {
    ingredients: [
      { "name": "Smördeg", "quantity": 2, "unit": "" },
      { "name": "Mörk choklad", "quantity": 60, "unit": "g" },
      { "name": "Socker", "quantity": 150, "unit": "g" },
      { "name": "Päron", "quantity": 2, "unit": "" },
      { "name": "Mandelmjöl", "quantity": 150, "unit": "g" },
      { "name": "Ägg", "quantity": 3, "unit": "" },
      // Vegan butter (100g)
      { "name": "Mjölk", "quantity": 40, "unit": "g" },
      { "name": "Neutral kokosolja", "quantity": 55, "unit": "g" },
      { "name": "Mandelmjöl", "quantity": 13, "unit": "g" },
      { "name": "Olivolja", "quantity": 14, "unit": "g" },
      { "name": "Salt", "quantity": 2, "unit": "g" },
    ],
    instructions: [
      "Furnace: 180°C",
      "Pan: 1 tsp butter + pears (cut in quarters) + 1 tbsp sugar",
      "Bowl (mix into a cream): sugar + 2 eggs + almond flour + butter (soft)",
      "Furnace plate: spread 1 dough (except 2cm from borders), add cream + chocolate chips",
      "Furnace plate: Wet edges with water, add 2nd dough on top",
      "Furnace plate: Spread some butter on top to get a golden color",
      "Bake 25-30min",
      "https://www.marmiton.org/recettes/recette_galette-des-rois-poires-amandes-chocolat_44531.aspx",
    ],
    servings: 1,
    protein: "eggs",
    cookingTime: 45,
    timers: [
      { "label": "Bake", "duration": 30, "step": 5 }
    ]
  }
};
