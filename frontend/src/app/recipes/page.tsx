"use client";

import { useState } from "react";
import { Recipe } from "@/types";
import RecipeForm from "@/components/recipes/RecipeForm";
import RecipeList from "@/components/recipes/RecipeList";
import RecipeDetail from "@/components/recipes/RecipeDetail";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);

  const handleCreateRecipe = (
    recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt">
  ) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: `recipe-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setRecipes([...recipes, newRecipe]);
    setShowForm(false);
  };

  const handleUpdateRecipe = (
    recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!editingRecipe) return;

    const updatedRecipe: Recipe = {
      ...recipeData,
      id: editingRecipe.id,
      createdAt: editingRecipe.createdAt,
      updatedAt: new Date(),
    };

    setRecipes(
      recipes.map((r) => (r.id === editingRecipe.id ? updatedRecipe : r))
    );
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  };

  const handleEditClick = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        {!showForm && !editingRecipe && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            + Add New Recipe
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Create New Recipe</h2>
          <RecipeForm
            onSubmit={handleCreateRecipe}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingRecipe && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
          <RecipeForm
            onSubmit={handleUpdateRecipe}
            onCancel={() => setEditingRecipe(null)}
            initialData={editingRecipe}
          />
        </div>
      )}

      {!showForm && !editingRecipe && (
        <RecipeList
          recipes={recipes}
          onEdit={handleEditClick}
          onDelete={handleDeleteRecipe}
          onView={setViewingRecipe}
        />
      )}

      {viewingRecipe && (
        <RecipeDetail
          recipe={viewingRecipe}
          onClose={() => setViewingRecipe(null)}
        />
      )}
    </div>
  );
}