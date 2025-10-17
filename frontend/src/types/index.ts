export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingListItem {
  ingredientName: string;
  amount: number;
  unit: string;
  checked: boolean;
}

export interface ShoppingList {
  id: string;
  recipeIds: string[];
  items: ShoppingListItem[];
  createdAt: Date;
  updatedAt: Date;
}