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
 * - protein: Optional protein type (tofu, lentils, chickpeas, beans, eggs, fish, chicken, dairy, mixed, none)
 * - cookingTime: Cooking duration in minutes
 */
const RECIPES_DATA = {
  "Avocado Toasts": {
    ingredients: [
      { "name": "Avokado", "quantity": 1, "unit": "" },
      { "name": "Ägg", "quantity": 2, "unit": "" }
    ],
    instructions: [
      "Toast your bread slices until golden brown",
      "Mash the avocado with a fork and season with salt and pepper",
      "Cook eggs as desired (fried, scrambled, or poached)",
      "Spread mashed avocado on toasted bread",
      "Top with cooked eggs and serve immediately"
    ],
    servings: 2,
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
      "Preheat oven to 200°C (400°F)",
      "Cut butternut squash in half lengthwise and scoop out seeds",
      "Brush with olive oil and roast cut-side down for 30-35 minutes until tender",
      "Meanwhile, cook quinoa according to package instructions",
      "Dice and sauté shallot and leek until soft",
      "Mix cooked quinoa with sautéed vegetables and half the parmesan",
      "Flip squash halves and fill with quinoa mixture",
      "Top with remaining parmesan and bake for 10 more minutes"
    ],
    servings: 2,
    protein: "none",
    cookingTime: 60
  },
  "Chickpeas Tacos": {
    ingredients: [
      { "name": "Kikärtor", "quantity": 0.5, "unit": "" },
      { "name": "Cashewnötter", "quantity": 35, "unit": "g" },
      { "name": "Lime", "quantity": 0.5, "unit": "" },
      { "name": "Avokado", "quantity": 1, "unit": "" },
      { "name": "Koriander (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Mjöl", "quantity": 110, "unit": "g" }
    ],
    instructions: [
      "Drain and rinse chickpeas, then pat dry",
      "Toss chickpeas with coriander powder and roast at 200°C for 20 minutes until crispy",
      "Make tortillas: mix flour with water and a pinch of salt to form a dough",
      "Roll out dough into thin circles and cook in a dry pan for 1-2 minutes per side",
      "Blend cashews with lime juice and water to make a creamy sauce",
      "Mash avocado and season with salt",
      "Assemble tacos: fill tortillas with roasted chickpeas, avocado, and cashew cream",
      "Garnish with fresh coriander if available"
    ],
    servings: 2,
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
      { "name": "Mjöl", "quantity": 110, "unit": "g" }
    ],
    instructions: [
      "Make tortillas: mix flour with water and salt to form a dough, roll thin and cook in a dry pan",
      "Slice bell peppers and shallot into thin strips",
      "Slice mushrooms and dice tomato",
      "Heat oil in a large pan over high heat",
      "Sauté peppers and shallots for 3-4 minutes until slightly charred",
      "Add mushrooms and cook for another 2 minutes",
      "Add drained red beans and diced tomato, season with cumin and paprika",
      "Cook until heated through",
      "Serve hot filling in warm tortillas with your favorite toppings"
    ],
    servings: 2,
    protein: "beans",
    cookingTime: 40
  },
  "French Fries": {
    ingredients: [
      { "name": "Potatis (medelstor)", "quantity": 4, "unit": "" }
    ],
    instructions: [
      "Wash and peel potatoes (optional to keep skin on)",
      "Cut potatoes into even-sized strips about 1cm thick",
      "Soak cut fries in cold water for 30 minutes to remove excess starch",
      "Pat dry thoroughly with a kitchen towel",
      "Preheat oven to 220°C (425°F) or heat oil for deep frying to 180°C",
      "For oven: toss fries with a little oil and spread on a baking sheet. Bake for 30-35 minutes, flipping halfway",
      "For frying: fry in batches for 4-5 minutes until golden and crispy",
      "Season with salt immediately after cooking and serve hot"
    ],
    servings: 2,
    protein: "none",
    cookingTime: 45
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
      "Roast squash and potato at 200°C until very soft (40-45 minutes)",
      "Scoop out flesh and mash until smooth, let cool slightly",
      "Mix in egg and gradually add flour until a soft dough forms",
      "Roll dough into long ropes and cut into 2cm pieces",
      "Press each piece with a fork to create ridges",
      "Bring a large pot of salted water to a boil",
      "Cook gnocchi in batches - they're ready when they float (2-3 minutes)",
      "Meanwhile, sauté sliced mushrooms in a pan until golden",
      "Toss cooked gnocchi with mushrooms and fresh arugula",
      "Drizzle with olive oil and season with salt and pepper"
    ],
    servings: 2,
    protein: "eggs",
    cookingTime: 60,
    timers: [
      { "label": "Roast vegetables", "duration": 45, "step": 1 },
      { "label": "Cook gnocchi batch", "duration": 3, "step": 7 }
    ]
  },
  "Hummus": {
    ingredients: [
      { "name": "Sesamfrön", "quantity": 25, "unit": "g" },
      { "name": "Citron", "quantity": 0.5, "unit": "" },
      { "name": "Spiskummin (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Kikärtor", "quantity": 0.5, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 0.5, "unit": "" }
    ],
    instructions: [
      "Toast sesame seeds in a dry pan until fragrant to make tahini",
      "Grind toasted sesame seeds in a food processor with a little oil until smooth",
      "Drain and rinse chickpeas, reserving some liquid",
      "Add chickpeas, tahini, minced garlic, lemon juice, and cumin to food processor",
      "Blend until smooth, adding reserved chickpea liquid or water to reach desired consistency",
      "Season with salt to taste",
      "Serve drizzled with olive oil and garnish with paprika or parsley"
    ],
    servings: 2,
    protein: "chickpeas",
    cookingTime: 15
  },
  "Pizza": {
    ingredients: [
      { "name": "Jäst (blå kub)", "quantity": 10, "unit": "g" },
      { "name": "Mjöl", "quantity": 125, "unit": "g" },
      { "name": "Tomatsås (krossade)", "quantity": 0.25, "unit": "" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" },
      { "name": "Schalottenlök", "quantity": 0.5, "unit": "" },
      { "name": "Kronärtskocka", "quantity": 0.5, "unit": "" },
      { "name": "Ägg", "quantity": 1, "unit": "" },
      { "name": "Tofu", "quantity": 25, "unit": "g" }
    ],
    instructions: [
      "Dissolve yeast in 75ml warm water with a pinch of sugar",
      "Mix flour with salt, add yeast mixture and knead for 8-10 minutes until smooth",
      "Let dough rise covered in a warm place for 1 hour until doubled",
      "Preheat oven to 250°C (480°F) with a pizza stone or baking sheet inside",
      "Roll out dough into a circle on parchment paper",
      "Spread tomato sauce, leaving a border for the crust",
      "Add toppings: sliced shallot, artichoke hearts, olives, and crumbled tofu",
      "Create a well in the center and crack an egg into it",
      "Carefully transfer to hot oven and bake for 10-12 minutes until crust is golden"
    ],
    servings: 2,
    protein: ["tofu", "eggs"],
    cookingTime: 90,
    timers: [
      { "label": "Dough rising", "duration": 60, "step": 3 },
      { "label": "Pizza baking", "duration": 12, "step": 9 }
    ]
  },
  "Tomato Quiche": {
    ingredients: [
      { "name": "Mjöl", "quantity": 145, "unit": "g" },
      { "name": "Senap", "quantity": 0.1, "unit": "" },
      { "name": "Tomat", "quantity": 1.5, "unit": "" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      "Make pastry: combine flour with 70g cold butter and a pinch of salt until crumbly",
      "Add 2-3 tbsp cold water and form into a dough, refrigerate for 30 minutes",
      "Preheat oven to 180°C (350°F)",
      "Roll out dough and line a tart pan, prick base with a fork",
      "Spread a thin layer of mustard on the base",
      "Slice tomatoes and arrange on the pastry",
      "Scatter olives over tomatoes",
      "Bake for 30-35 minutes until pastry is golden",
      "Let cool slightly before serving"
    ],
    servings: 2,
    protein: "none",
    cookingTime: 50
  },
  "Sweet potato (oven)": {
    ingredients: [
      { "name": "Sötpotatis", "quantity": 100, "unit": "g" }
    ],
    instructions: [
      "Preheat oven to 200°C (400°F)",
      "Wash and scrub sweet potato thoroughly",
      "Prick several times with a fork to allow steam to escape",
      "Place directly on oven rack or on a baking sheet",
      "Bake for 45-60 minutes until very soft when squeezed",
      "Let cool for a few minutes before serving",
      "Cut open and serve with butter, salt, and your favorite toppings"
    ],
    servings: 2,
    protein: "none",
    cookingTime: 60
  },
  "Zucchini Quiche": {
    ingredients: [
      { "name": "Mjöl", "quantity": 145, "unit": "g" },
      { "name": "Zucchini", "quantity": 0.5, "unit": "" },
      { "name": "Ägg", "quantity": 1, "unit": "" },
      { "name": "Tofu", "quantity": 25, "unit": "g" }
    ],
    instructions: [
      "Make pastry: combine flour with 70g cold butter and salt until crumbly, add water to form dough",
      "Refrigerate dough for 30 minutes",
      "Preheat oven to 180°C (350°F)",
      "Roll out dough and line a tart pan",
      "Slice zucchini thinly and sauté until slightly golden",
      "Blend egg with crumbled tofu, salt, and pepper",
      "Arrange zucchini on the pastry base",
      "Pour egg-tofu mixture over zucchini",
      "Bake for 30-35 minutes until set and golden",
      "Let cool before slicing"
    ],
    servings: 2,
    protein: ["eggs", "tofu", "pasta"],
    cookingTime: 70
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
      "Finely chop shallot and sauté in butter until translucent",
      "Add arborio rice (about 150g) and stir for 2 minutes until slightly toasted",
      "Heat broth and keep it warm on a separate burner",
      "Add warm broth one ladle at a time, stirring constantly",
      "Wait until liquid is absorbed before adding more broth",
      "Meanwhile, sauté sliced mushrooms separately until golden",
      "Dice tomato and add to rice after 10 minutes of cooking",
      "Continue adding broth and stirring for 18-20 minutes total",
      "When rice is creamy and al dente, stir in mushrooms and parmesan",
      "Season with salt and pepper, serve immediately"
    ],
    servings: 2,
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
      { "name": "Sallad", "quantity": 0.1, "unit": "" },
      { "name": "Paprika", "quantity": 0.25, "unit": "" },
      { "name": "Matvete", "quantity": 50, "unit": "g" },
      { "name": "Päron", "quantity": 0.5, "unit": "" },
      { "name": "Gurka", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      "Cook matvete (wheat berries) according to package instructions, drain and let cool",
      "Wash and tear salad greens into bite-sized pieces",
      "Dice tomato, bell pepper, cucumber, avocado, and pear",
      "Crumble feta cheese",
      "In a large bowl, combine all vegetables and cooked matvete",
      "Add olives and crumbled feta",
      "Dress with olive oil, lemon juice, salt, and pepper",
      "Toss gently and serve immediately"
    ],
    servings: 2,
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
      "Peel and cube potatoes, boil in salted water until tender (15-20 minutes)",
      "Drain and mash potatoes with butter and milk until smooth, season to taste",
      "Preheat oven to 200°C (400°F)",
      "Season salmon with salt, pepper, and a drizzle of olive oil",
      "Place salmon on a baking sheet with cherry tomatoes and trimmed asparagus",
      "Roast for 12-15 minutes until salmon is cooked through",
      "Meanwhile, sauté sliced mushrooms in butter until golden",
      "Serve salmon with mashed potatoes, roasted vegetables, and mushrooms"
    ],
    servings: 2,
    protein: "fish",
    cookingTime: 35
  },
  "Misir Wat (Ethopian lentils)": {
    // test
    ingredients: [
      { "name": "Smör", "quantity": 2, "unit": "tbsp" },
      { "name": "Lök", "quantity": 0.5, "unit": "" },
      { "name": "Tomat", "quantity": 0.5, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 1, "unit": "" },
      { "name": "Tomatpuré", "quantity": 1.5, "unit": "tbsp" },
      { "name": "Berbere (pulver)", "quantity": 1, "unit": "tbsp" },
      { "name": "Linser", "quantity": 100, "unit": "g" },
      { "name": "Buljong", "quantity": 0.5, "unit": "" },
      // Pita bread
      { "name": "Mjöl", "quantity": 300, "unit": "g" },
      { "name": "Vatten", "quantity": 200, "unit": "g" },
      { "name": "Bakpulver", "quantity": 2, "unit": "tsp" },
    ],
    instructions: [
      "Pot: butter, tomato paste, tomato, onion",
    ],
    servings: 2,
    protein: "lentils",
    cookingTime: 40
  },
  "Cesar salad": {
    ingredients: [
      { "name": "Kyckling", "quantity": 62.5, "unit": "g" },
      { "name": "Bacon", "quantity": 37.5, "unit": "g" },
      { "name": "Romansallad", "quantity": 0.1, "unit": "" },
      { "name": "Grönkål", "quantity": 0.1, "unit": "" },
      { "name": "Rödlök", "quantity": 0.1, "unit": "" },
      { "name": "Körsbärstomat", "quantity": 2, "unit": "" },
      { "name": "Persillade (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Krutonger", "quantity": 50, "unit": "g" },
      { "name": "Parmesan", "quantity": 12.5, "unit": "g" },
      { "name": "Majonnäs", "quantity": 12.5, "unit": "g" },
      { "name": "Senap", "quantity": 0.1, "unit": "" },
      { "name": "Citron", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      "Season chicken with salt, pepper, and persillade, then grill or pan-fry until cooked through",
      "Cook bacon in a pan until crispy, then chop into pieces",
      "Make Caesar dressing: whisk together mayonnaise, mustard, lemon juice, and grated parmesan",
      "Wash and tear romaine lettuce and kale into bite-sized pieces",
      "Slice red onion thinly and halve cherry tomatoes",
      "In a large bowl, toss greens with dressing",
      "Slice cooked chicken",
      "Top salad with chicken, bacon, croutons, and extra parmesan",
      "Serve immediately"
    ],
    servings: 2,
    protein: "chicken",
    cookingTime: 25
  },
  "Red Curry Lentil": {
    ingredients: [
      { "name": "Kokosolja", "quantity": 0.25, "unit": "tbsp" },
      { "name": "Vitlöksklyfta", "quantity": 1, "unit": "" },
      { "name": "Ingefära", "quantity": 3.75, "unit": "g" },
      { "name": "Gurkmeja (pulver)", "quantity": 0.025, "unit": "" },
      { "name": "Spiskummin (pulver)", "quantity": 0.25, "unit": "tsp" },
      { "name": "Koriander (pulver)", "quantity": 0.125, "unit": "tsp" },
      { "name": "Curry (pulver)", "quantity": 0.5, "unit": "tsp" },
      { "name": "Garam masala (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Röda linser", "quantity": 50, "unit": "g" },
      { "name": "Buljong", "quantity": 0.25, "unit": "" },
      { "name": "Tomatsås (krossade)", "quantity": 100, "unit": "g" },
      { "name": "Kokosmjölk", "quantity": 100, "unit": "mL" },
      { "name": "Jordnötssmör", "quantity": 0.1, "unit": "" },
      { "name": "Citron", "quantity": 0.125, "unit": "" },
      { "name": "Koriander (pulver)", "quantity": 0.1, "unit": "" }
    ],
    instructions: [
      "Heat coconut oil in a large pot over medium heat",
      "Add minced garlic and grated ginger, sauté for 1 minute until fragrant",
      "Add all spices (turmeric, cumin, coriander, curry, garam masala) and stir for 30 seconds",
      "Add red lentils, broth, tomato sauce, and coconut milk",
      "Bring to a boil, then reduce heat and simmer for 20-25 minutes until lentils are tender",
      "Stir in peanut butter until well combined",
      "Add lemon juice and adjust seasoning with salt",
      "Serve hot over rice, garnished with fresh coriander"
    ],
    servings: 2,
    protein: "lentils",
    cookingTime: 35,
    timers: [
      { "label": "Sauté aromatics", "duration": 1, "step": 2 },
      { "label": "Simmer lentils", "duration": 25, "step": 5 }
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
      { "name": "Sallad", "quantity": 0.1, "unit": "" },
      { "name": "Koriander (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Avokado", "quantity": 1, "unit": "" }
    ],
    instructions: [
      "Soak rice noodles in warm water for 15-20 minutes until soft, drain",
      "Press tofu to remove excess water, then cube and pan-fry until golden",
      "Cook edamame in boiling water for 3-4 minutes, drain",
      "Make sauce: mix soy sauce, rice vinegar, lime juice, and a touch of sugar",
      "Heat oil in a wok or large pan over high heat",
      "Push ingredients to the side and scramble the egg",
      "Add noodles, tofu, and edamame to the pan",
      "Pour sauce over and toss everything together",
      "Serve topped with chopped peanuts, fresh coriander, sliced avocado, and salad greens"
    ],
    servings: 2,
    protein: ["tofu", "eggs"],
    cookingTime: 30
  },
  "Pancake": {
    ingredients: [
      { "name": "Mjöl", "quantity": 94, "unit": "g" },
      { "name": "Ägg", "quantity": 1, "unit": "" },
      { "name": "Mjölk", "quantity": 150, "unit": "g" },
      { "name": "Banan", "quantity": 1, "unit": "" },
      { "name": "Lönnsirap", "quantity": 0.1, "unit": "" }
    ],
    instructions: [
      "In a bowl, whisk together flour, egg, and milk until smooth",
      "Let batter rest for 5-10 minutes",
      "Heat a non-stick pan over medium heat and add a small amount of butter",
      "Pour a ladle of batter into the pan and swirl to spread evenly",
      "Cook for 2-3 minutes until bubbles form on surface",
      "Flip and cook for another 1-2 minutes until golden",
      "Repeat with remaining batter",
      "Serve topped with sliced banana and drizzled with maple syrup"
    ],
    servings: 2,
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
      "Cook matvete (or rice) according to package instructions",
      "Slice mushrooms and dice shallot",
      "Sauté shallot in butter until soft",
      "Add mushrooms and cook until golden",
      "Add peas and thawed spinach, cook for 2-3 minutes",
      "Beat eggs with salt and pepper",
      "Pour eggs over vegetables in the pan",
      "Cook on medium-low heat until edges set, gently lifting to let uncooked egg flow underneath",
      "Fold omelette in half and cook for another minute",
      "Serve with cooked matvete or rice on the side"
    ],
    servings: 2,
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
      "Cook matvete (or rice) according to package instructions",
      "Dice zucchini, slice mushrooms, and dice shallot",
      "Sauté shallot in butter until soft",
      "Add zucchini and mushrooms, cook until golden and zucchini is tender",
      "Add peas and thawed spinach, cook for 2-3 minutes",
      "Beat eggs with salt and pepper",
      "Pour eggs over vegetables in the pan",
      "Cook on medium-low heat until edges set, gently lifting to let uncooked egg flow underneath",
      "Fold omelette in half and cook for another minute",
      "Serve with cooked matvete or rice on the side"
    ],
    servings: 2,
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
      "Make dough: mix flour with warm water (about 90ml) and knead until smooth, rest for 30 minutes",
      "Finely chop mushrooms, carrot, leek, shallot, ginger, garlic, and chives",
      "Mix all chopped vegetables in a bowl with soy sauce",
      "Roll dough into a long rope and cut into small equal pieces",
      "Roll each piece into a thin circle (about 8cm diameter)",
      "Place a spoonful of filling in the center of each wrapper",
      "Fold and pleat edges to seal dumplings",
      "Steam dumplings in a steamer basket for 12-15 minutes, or pan-fry until golden on bottom then add water and cover to steam",
      "Serve with dipping sauce made from soy sauce, rice vinegar, and chili oil"
    ],
    servings: 2,
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
      { "name": "Sallad", "quantity": 20, "unit": "g" },
      { "name": "Risvinäger", "quantity": 0.1, "unit": "" }
    ],
    instructions: [
      "Cook rice (about 150g) and let cool slightly",
      "Press tofu to remove excess water, cube and marinate in soy sauce for 15 minutes",
      "Cook edamame in boiling water for 3-4 minutes, drain",
      "Dice mango, avocado, and cucumber",
      "Drain and rinse mixed beans",
      "Pan-fry marinated tofu until golden on all sides",
      "Assemble bowl: place rice at the bottom, arrange all ingredients on top in sections",
      "Drizzle with a mix of soy sauce and rice vinegar",
      "Top with candied ginger and shredded lettuce",
      "Serve immediately"
    ],
    servings: 2,
    protein: "tofu",
    cookingTime: 30
  },
  "Ramen": {
    ingredients: [
      { "name": "Ramennudlar", "quantity": 125, "unit": "g" },
      { "name": "Svamp", "quantity": 40, "unit": "g" },
      { "name": "Morot", "quantity": 0.5, "unit": "" },
      { "name": "Ingefära", "quantity": 15, "unit": "g" },
      { "name": "Koriander (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Sojasås", "quantity": 0.1, "unit": "" },
      { "name": "Risvinäger", "quantity": 0.1, "unit": "" },
      { "name": "Sesamolja", "quantity": 0.1, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 1, "unit": "" },
      { "name": "Sesamfrön", "quantity": 10, "unit": "g" },
      { "name": "Buljong", "quantity": 1, "unit": "" }
    ],
    instructions: [
      "Heat broth in a large pot with minced garlic and grated ginger",
      "Add sliced mushrooms and julienned carrot, simmer for 5 minutes",
      "Season broth with soy sauce, rice vinegar, and sesame oil",
      "Cook ramen noodles according to package instructions, drain",
      "Divide noodles between bowls",
      "Ladle hot broth and vegetables over noodles",
      "Garnish with sesame seeds and fresh coriander",
      "Serve immediately while hot"
    ],
    servings: 2,
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
      "Preheat oven to 180°C (350°F)",
      "Slice aubergine and grill or roast until tender",
      "Thaw and squeeze excess water from spinach",
      "Cook lasagna sheets according to package instructions, or use no-boil sheets",
      "In a baking dish, start with a layer of tomato sauce",
      "Add a layer of lasagna sheets, then aubergine, spinach, and crumbled feta",
      "Repeat layers, ending with sauce and feta on top",
      "Cover with foil and bake for 25 minutes",
      "Remove foil and bake for 10 more minutes until golden",
      "Let rest for 10 minutes before serving"
    ],
    servings: 2,
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
      { "name": "Spiskummin (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Curry (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Koriander (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Kokosmjölk", "quantity": 40, "unit": "g" }
    ],
    instructions: [
      "Finely chop shallot, mince garlic, and grate ginger",
      "Heat oil in a large pan and sauté shallot until soft",
      "Add garlic and ginger, cook for 1 minute until fragrant",
      "Add all spices (cumin, curry, coriander) and stir for 30 seconds",
      "Add drained chickpeas, tomato sauce, and coconut milk",
      "Simmer for 15 minutes, stirring occasionally",
      "Add thawed spinach and cook for 5 more minutes",
      "Season with salt to taste",
      "Serve hot over rice or with naan bread"
    ],
    servings: 2,
    protein: "chickpeas",
    cookingTime: 30
  },
  "Butternut Squash Soup": {
    ingredients: [
      { "name": "Butternutpumpa", "quantity": 0.5, "unit": "" }
    ],
    instructions: [
      "Preheat oven to 200°C (400°F)",
      "Cut butternut squash in half, remove seeds, and brush with olive oil",
      "Roast cut-side down for 40-45 minutes until very soft",
      "Scoop out flesh and place in a blender",
      "Add vegetable broth (about 500ml) gradually while blending until smooth",
      "Pour into a pot and heat through",
      "Season with salt, pepper, and a pinch of nutmeg",
      "Serve hot, optionally garnished with cream and toasted seeds"
    ],
    servings: 2,
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
      "Peel and chop all vegetables into similar-sized pieces",
      "Heat olive oil in a large pot and sauté vegetables for 5 minutes",
      "Add vegetable broth (about 750ml) to cover vegetables",
      "Bring to a boil, then reduce heat and simmer for 20-25 minutes until vegetables are very soft",
      "Blend with an immersion blender until smooth and creamy",
      "Season with salt, pepper, and herbs of your choice",
      "Adjust consistency with more broth if needed",
      "Serve hot with crusty bread"
    ],
    servings: 2,
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
      "Cook edamame in boiling water for 3-4 minutes, drain and cool",
      "Cook shrimp in a pan with a little oil for 2-3 minutes per side until pink",
      "Wash and dry spinach leaves",
      "Dice avocado and grate ginger",
      "Chop chives finely",
      "In a large bowl, combine spinach, edamame, and avocado",
      "Top with cooked shrimp",
      "Make dressing: whisk lemon juice with grated ginger, olive oil, salt, and pepper",
      "Drizzle dressing over salad and garnish with chives",
      "Serve immediately"
    ],
    servings: 2,
    protein: "fish",
    cookingTime: 20
  },
  "Lentil Soup": {
    ingredients: [
      { "name": "Schalottenlök", "quantity": 0.5, "unit": "" },
      { "name": "Morot", "quantity": 1, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 2, "unit": "" },
      { "name": "Spiskummin (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Curry (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Timjan (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Linser", "quantity": 50, "unit": "g" },
      { "name": "Buljong", "quantity": 0.5, "unit": "" },
      { "name": "Citron", "quantity": 0.5, "unit": "" }
    ],
    instructions: [
      "Dice shallot and carrot, mince garlic",
      "Heat olive oil in a large pot and sauté shallot until soft",
      "Add carrot and garlic, cook for 3 minutes",
      "Add spices (cumin, curry, thyme) and stir for 30 seconds",
      "Dice tomato and add to pot with rinsed lentils",
      "Pour in broth and enough water to cover (about 500ml total)",
      "Bring to a boil, then simmer for 25-30 minutes until lentils are tender",
      "Blend partially for a thicker texture, or leave chunky",
      "Stir in lemon juice and season with salt and pepper",
      "Serve hot with crusty bread"
    ],
    servings: 2,
    protein: "lentils",
    cookingTime: 40
  },
  "Lentil Salad": {
    ingredients: [
      { "name": "Grönkål", "quantity": 0.1, "unit": "" },
      { "name": "Mandel", "quantity": 10, "unit": "g" },
      { "name": "Salladslök", "quantity": 3, "unit": "" },
      { "name": "Citron", "quantity": 1, "unit": "" },
      { "name": "Linser", "quantity": 100, "unit": "g" },
      { "name": "Spiskummin (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      "Cook lentils in boiling water for 20-25 minutes until tender, drain and cool",
      "Wash and chop kale into small pieces, massage with a pinch of salt",
      "Slice spring onions thinly",
      "Toast almonds in a dry pan until fragrant, then roughly chop",
      "In a large bowl, combine lentils, kale, spring onions, and olives",
      "Make dressing: whisk lemon juice with olive oil, cumin, salt, and pepper",
      "Pour dressing over salad and toss well",
      "Top with toasted almonds",
      "Serve at room temperature or chilled"
    ],
    servings: 2,
    protein: "lentils",
    cookingTime: 30
  },
  "Lentil Stew": {
    ingredients: [
      { "name": "Schalottenlök", "quantity": 0.5, "unit": "" },
      { "name": "Morot", "quantity": 0.5, "unit": "" },
      { "name": "Selleri", "quantity": 0.5, "unit": "" },
      { "name": "Potatis (medelstor)", "quantity": 1, "unit": "" },
      { "name": "Vitlöksklyfta", "quantity": 2, "unit": "" },
      { "name": "Zucchini", "quantity": 0.25, "unit": "" },
      { "name": "Koriander (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Spiskummin (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Gurkmeja (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Kanel (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Persilja", "quantity": 0.1, "unit": "" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Buljong", "quantity": 0.5, "unit": "" },
      { "name": "Citron", "quantity": 0.5, "unit": "" },
      { "name": "Linser", "quantity": 100, "unit": "g" }
    ],
    instructions: [
      "Dice all vegetables (shallot, carrot, celery, potato, zucchini) and mince garlic",
      "Heat olive oil in a large pot and sauté shallot until soft",
      "Add carrot, celery, and garlic, cook for 5 minutes",
      "Add all spices (coriander, cumin, turmeric, cinnamon) and stir for 1 minute",
      "Add lentils, diced tomato, potato, and zucchini",
      "Pour in broth and enough water to cover (about 750ml total)",
      "Bring to a boil, then reduce heat and simmer for 30-35 minutes until lentils and vegetables are tender",
      "Stir in chopped parsley and lemon juice",
      "Season with salt and pepper to taste",
      "Serve hot with bread or over rice"
    ],
    servings: 2,
    protein: "lentils",
    cookingTime: 45
  },
  "Greek Salad": {
    ingredients: [
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Fetaost", "quantity": 50, "unit": "g" },
      { "name": "Avokado", "quantity": 1, "unit": "" },
      { "name": "Oliver (burk)", "quantity": 0.25, "unit": "" },
      { "name": "Sallad", "quantity": 20, "unit": "g" },
      { "name": "Gurka", "quantity": 0.25, "unit": "" }
    ],
    instructions: [
      "Wash and tear lettuce into bite-sized pieces",
      "Dice tomato, cucumber, and avocado into similar-sized chunks",
      "Crumble feta cheese",
      "In a large bowl, combine lettuce, tomato, cucumber, and avocado",
      "Add olives",
      "Make dressing: whisk olive oil with lemon juice or red wine vinegar, oregano, salt, and pepper",
      "Drizzle dressing over salad and toss gently",
      "Top with crumbled feta",
      "Serve immediately"
    ],
    servings: 2,
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
      { "name": "Spiskummin (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Koriander (pulver)", "quantity": 0.1, "unit": "" },
      { "name": "Paprikapulver", "quantity": 0.1, "unit": "" },
      { "name": "Tomat", "quantity": 1, "unit": "" },
      { "name": "Blandade bönor", "quantity": 0.5, "unit": "" },
      { "name": "Lime", "quantity": 0.5, "unit": "" }
    ],
    instructions: [
      "Dice red onion, bell pepper, carrot, and celery, mince garlic",
      "Heat olive oil in a large pot and sauté onion until soft",
      "Add bell pepper, carrot, celery, and garlic, cook for 5 minutes",
      "Add all spices (cumin, coriander, paprika) and stir for 1 minute",
      "Add diced tomato and drained mixed beans",
      "Add water or broth (about 250ml) and bring to a boil",
      "Reduce heat and simmer for 25-30 minutes until vegetables are tender and chili has thickened",
      "Stir in lime juice and season with salt and pepper",
      "Add chili powder or hot sauce if desired for extra heat",
      "Serve hot with rice, tortilla chips, or topped with avocado and sour cream"
    ],
    servings: 2,
    protein: "beans",
    cookingTime: 40
  }
};
