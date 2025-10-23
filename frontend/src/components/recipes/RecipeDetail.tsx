import { Recipe } from "@/types";

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold">{recipe.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <p className="text-gray-600 mb-6">{recipe.description}</p>

          <div className="flex gap-6 mb-6 text-sm">
            <div>
              <span className="font-medium">Servings:</span> {recipe.servings}
            </div>
            <div>
              <span className="font-medium">Prep Time:</span> {recipe.prepTime}{" "}
              min
            </div>
            <div>
              <span className="font-medium">Cook Time:</span> {recipe.cookTime}{" "}
              min
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing) => (
                <li key={ing.id} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Instructions</h3>
            <p className="whitespace-pre-wrap text-gray-700">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}