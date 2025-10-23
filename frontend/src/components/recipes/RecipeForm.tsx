"use client";

import { useState } from "react";
import { Recipe, Ingredient } from "@/types";

interface RecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
  initialData?: Recipe;
}

export default function RecipeForm({
  onSubmit,
  onCancel,
  initialData,
}: RecipeFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [instructions, setInstructions] = useState(
    initialData?.instructions || ""
  );
  const [servings, setServings] = useState(initialData?.servings || 1);
  const [prepTime, setPrepTime] = useState(initialData?.prepTime || 0);
  const [cookTime, setCookTime] = useState(initialData?.cookTime || 0);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients || []
  );

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("cup");

  const addIngredient = () => {
    if (!ingredientName || !ingredientAmount) return;

    const newIngredient: Ingredient = {
      id: `ing-${Date.now()}`,
      name: ingredientName,
      amount: parseFloat(ingredientAmount),
      unit: ingredientUnit,
    };

    setIngredients([...ingredients, newIngredient]);
    setIngredientName("");
    setIngredientAmount("");
    setIngredientUnit("dl");
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      instructions,
      servings,
      prepTime,
      cookTime,
      ingredients,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Recipe Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Servings</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded px-4 py-2"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Prep Time (min)
          </label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded px-4 py-2"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Cook Time (min)
          </label>
          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded px-4 py-2"
            min="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Ingredients</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={ingredientAmount}
            onChange={(e) => setIngredientAmount(e.target.value)}
            className="w-32 border border-gray-300 rounded px-4 py-2"
            step="0.1"
          />
          <select
            value={ingredientUnit}
            onChange={(e) => setIngredientUnit(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="dl">dl</option>
            <option value="tbsp">tbsp</option>
            <option value="tsp">tsp</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="piece">piece</option>
          </select>
          <button
            type="button"
            onClick={addIngredient}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {ingredients.map((ing) => (
            <div
              key={ing.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <span>
                {ing.amount} {ing.unit} {ing.name}
              </span>
              <button
                type="button"
                onClick={() => removeIngredient(ing.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Instructions *
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          rows={6}
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {initialData ? "Update Recipe" : "Create Recipe"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}