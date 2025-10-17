export default function ShoppingListsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Lists</h1>

      <button className="bg-green-600 text-white px-6 py-2 rounded mb-6 hover:bg-green-700">
        + Create New List
      </button>

      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-600">No shopping lists yet.</p>
      </div>

      {/* Shopping list items will go here */}
    </div>
  );
}