import { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onView: (recipe: Recipe) => void;
}

export default function RecipeCard({
  recipe,
  onEdit,
  onDelete,
  onView,
}: RecipeCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

      <div className="flex gap-4 text-sm text-gray-500 mb-4">
        <span>🍽️ {recipe.servings} servings</span>
        <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
        <span>📝 {recipe.ingredients.length} ingredients</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onView(recipe)}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          View
        </button>
        <button
          onClick={() => onEdit(recipe)}
          className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}