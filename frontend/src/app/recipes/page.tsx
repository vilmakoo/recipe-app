export default function RecipesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>

      <button className="bg-blue-600 text-white px-6 py-2 rounded mb-6 hover:bg-blue-700">
        + Add New Recipe
      </button>

      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-600">No recipes yet.</p>
      </div>

      {/* Recipe list will go here */}
    </div>
  );
}