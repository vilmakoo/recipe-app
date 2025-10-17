export default function Home() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Recipe App</h1>
      <p className="text-xl text-gray-600 mb-8">
        Organize your recipes and generate shopping lists.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Manage Recipes</h2>
          <p className="text-gray-700 mb-6">
            Create, edit, and organize your favorite recipes in one place.
          </p>
          <a
            href="/recipes"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go to Recipes
          </a>
        </div>

        <div className="bg-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Shopping Lists</h2>
          <p className="text-gray-700 mb-6">
            Select recipes and automatically generate shopping lists.
          </p>
          <a
            href="/shopping-lists"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Go to Shopping Lists
          </a>
        </div>
      </div>
    </div>
  );
}