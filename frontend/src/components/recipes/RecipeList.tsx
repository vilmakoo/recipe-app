import { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onView: (recipe: Recipe) => void;
}

export default function RecipeList({
  recipes,
  onEdit,
  onDelete,
  onView,
}: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-600">
          No recipes yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}