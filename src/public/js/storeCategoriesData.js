/**
 * Store Categories Data Module
 * Provides data and functions for categorizing grocery items by store department
 */

const StoreCategoriesData = (() => {
  /**
   * Grocery category mapping
   * Maps common grocery items to their typical store sections
   */
  const categoryMapping = {
    // Produce section
    "produce": [
      "apple", "banana", "orange", "lettuce", "tomato", "cucumber", "carrot",
      "onion", "potato", "garlic", "lemon", "lime", "avocado", "strawberry", 
      "blueberry", "grape", "watermelon", "spinach", "kale", "pepper", "zucchini",
      "broccoli", "celery", "cauliflower", "mushroom", "squash", "melon", "pear",
      "peach", "plum", "cherry", "mango", "pineapple", "berry", "cabbage", "arugula",
      "fruit", "vegetable", "veggie", "salad"
    ],
    
    // Dairy section
    "dairy": [
      "milk", "cheese", "yogurt", "butter", "cream", "sour cream", "cottage cheese",
      "cream cheese", "egg", "margarine", "almond milk", "soy milk", "oat milk",
      "buttermilk", "kefir", "whipping cream", "half and half", "dairy", "cheddar", 
      "mozzarella", "parmesan", "feta", "ricotta", "brie", "gouda"
    ],
    
    // Meat & Seafood
    "meat": [
      "chicken", "beef", "pork", "turkey", "lamb", "steak", "ground beef", 
      "chicken breast", "sausage", "bacon", "ham", "fish", "salmon", "tuna",
      "shrimp", "crab", "lobster", "scallop", "fillet", "roast", "chop", "rib",
      "burger", "meatball", "meat", "seafood", "tilapia", "cod", "halibut",
      "oyster", "clam", "mussel", "trout", "anchovy", "salami", "pepperoni",
      "prosciutto", "deli meat", "hot dog", "patty"
    ],
    
    // Bakery
    "bakery": [
      "bread", "bagel", "roll", "muffin", "croissant", "cake", "pie", "cookie",
      "donut", "pastry", "tortilla", "pita", "baguette", "loaf", "sourdough",
      "white bread", "whole wheat", "rye", "brioche", "bun", "bakery", "baked",
      "dough", "pancake", "waffle", "sweet roll", "cinnamon roll", "pretzel",
      "biscuit", "cracker", "naan", "focaccia", "ciabatta"
    ],
    
    // Frozen Foods
    "frozen": [
      "ice cream", "frozen pizza", "frozen vegetable", "frozen dinner", 
      "frozen fruit", "frozen breakfast", "frozen dessert", "freezer", "frozen",
      "popsicle", "gelato", "sorbet", "frozen yogurt", "frozen meal", "tv dinner",
      "frozen waffle", "frozen fish", "frozen fry", "frozen pie", "frozen burger"
    ],
    
    // Pantry/Dry Goods
    "pantry": [
      "pasta", "rice", "cereal", "flour", "sugar", "oil", "vinegar", 
      "canned soup", "canned vegetable", "canned fruit", "beans", "lentil",
      "spice", "herb", "sauce", "condiment", "snack", "chip", "nut",
      "peanut butter", "jam", "honey", "syrup", "granola", "oatmeal", "quinoa",
      "couscous", "noodle", "macaroni", "spaghetti", "ramen", "canned tuna",
      "canned salmon", "canned beans", "soup", "broth", "stock", "bouillon",
      "tomato sauce", "pizza sauce", "marinara", "salsa", "mustard", "ketchup",
      "mayo", "mayonnaise", "dressing", "olive oil", "vegetable oil", "canola oil",
      "cooking spray", "baking powder", "baking soda", "yeast", "vanilla extract",
      "chocolate chip", "brownie mix", "cake mix", "pancake mix"
    ],
    
    // Beverages
    "beverages": [
      "water", "soda", "juice", "tea", "coffee", "beer", "wine", "liquor",
      "energy drink", "sports drink", "sparkling water", "mineral water", "lemonade",
      "cola", "pop", "drink", "beverage", "coke", "pepsi", "sprite", "ginger ale",
      "root beer", "iced tea", "coffee bean", "ground coffee", "coffee pod", "k-cup",
      "tea bag", "green tea", "black tea", "herbal tea", "chai", "hot chocolate",
      "cocoa", "milk chocolate", "smoothie", "shake", "protein drink"
    ]
  };

  /**
   * Store section order for optimal shopping path
   */
  const defaultSectionOrder = [
    "produce",    // Start with produce (typically at entrance)
    "bakery",     // Usually near produce
    "dairy",      // Often along the perimeter
    "meat",       // Also along the perimeter
    "frozen",     // Inner aisles
    "pantry",     // Inner aisles
    "beverages",  // Inner aisles
    "other"       // Catch-all for uncategorized items
  ];

  /**
   * Mapping of category to human-readable display names
   */
  const categoryDisplayNames = {
    "produce": "Fruits & Vegetables",
    "dairy": "Dairy & Eggs",
    "meat": "Meat & Seafood",
    "bakery": "Bakery",
    "frozen": "Frozen Foods",
    "pantry": "Pantry & Dry Goods",
    "beverages": "Beverages",
    "other": "Other Items"
  };

  /**
   * Helper function to determine category for a given ingredient
   * @param {string} itemName - Name of the grocery item
   * @return {string} - Category name
   */
  const determineCategory = (itemName) => {
    // Handle empty or invalid input
    if (!itemName || typeof itemName !== 'string') {
      return 'other';
    }
    
    // Convert to lowercase for matching
    const lowerItem = itemName.toLowerCase();
    
    // Check each category for a match
    for (const [category, items] of Object.entries(categoryMapping)) {
      for (const keyword of items) {
        if (lowerItem.includes(keyword)) {
          return category;
        }
      }
    }
    
    // Default category if no match found
    return "other";
  };

  // Public API
  return {
    determineCategory,
    defaultSectionOrder,
    categoryDisplayNames,
    categoryMapping
  };
})(); 