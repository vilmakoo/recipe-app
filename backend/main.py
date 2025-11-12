# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI(title="Recipe API", version="1.0.0")

# # Enable CORS for Next.js frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000", "http://localhost:3001"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/api/health")
# async def health_check():
#     """Health check endpoint"""
#     return {"status": "ok", "message": "Backend is running!"}

# @app.get("/")
# async def root():
#     """Root endpoint"""
#     return {"message": "Welcome to Recipe API"}

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import uuid


class IngredientSchema(BaseModel):
    """Schema for a single recipe ingredient."""
    name: str = Field(..., description="Name of the ingredient.")
    quantity: float = Field(..., gt=0, description="Quantity required.")
    unit: str = Field(..., description="Unit of measure.")

class RecipeBase(BaseModel):
    """Base schema for creating or updating a recipe."""
    title: str = Field(..., min_length=1, max_length=100, description="The name of the recipe.")
    description: Optional[str] = Field(None, max_length=500, description="A brief description of the dish.")
    instructions: str = Field(..., description="Cooking instructions.")
    ingredients: List[IngredientSchema] = Field(..., min_items=1, description="List of ingredients.")

class RecipeCreate(RecipeBase):
    """Schema for creating a new recipe (does not include ID)."""
    pass

class Recipe(RecipeBase):
    """Complete Recipe schema including the generated ID."""
    id: str = Field(..., description="Unique identifier for the recipe.")
    
    class Config:
        orm_mode = True 

app = FastAPI(
    title="Recipe Collection API",
    description="FastAPI backend for managing recipes and generating shopping lists.",
    version="1.0.0"
)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, PUT, DELETE)
    allow_headers=["*"], # Allow all headers
)


# In-Memory Database (Placeholder for Azure Cosmos DB)
recipes_db: Dict[str, Recipe] = {
    "a001": Recipe(
        id="a001",
        title="Airfryer-tofu ja kasvikset",
        description="Nopea lounas",
        instructions="Paloittele tofu. Kaada pakastevihannekset ja tofu airfryeriin. Paista 180 asteessa n. 10 minuuttia, kunnes ainekset ovat sopivan paahtuneita.",
        ingredients=[
            IngredientSchema(name="Tofu", quantity=1, unit="pkt"),
            IngredientSchema(name="Pakastevihannekset", quantity=1, unit="pss"),
        ]
    ).dict(),
    "b002": Recipe(
        id="b002",
        title="Pestopasta",
        description="Nopea pasta.",
        instructions="Keitä pasta. Sekoita joukkoon pestoa.",
        ingredients=[
            IngredientSchema(name="Pasta", quantity=1, unit="annos"),
            IngredientSchema(name="Pestoa", quantity=2, unit="rkl"),
        ]
    ).dict()
}

@app.get("/api/recipes", response_model=List[Recipe])
async def read_recipes():
    """
    Retrieves a list of all recipes. (GET /recipes)
    """
    return list(recipes_db.values())

@app.get("/api/recipes/{recipe_id}", response_model=Recipe)
async def read_recipe(recipe_id: str):
    """
    Retrieves a single recipe by its ID. (GET /recipes/{id})
    """
    if recipe_id not in recipes_db:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipes_db[recipe_id]

@app.post("/api/recipes", response_model=Recipe, status_code=201)
async def create_recipe(recipe: RecipeCreate):
    """
    Creates a new recipe. Generates a unique ID for storage. (POST /recipes)
    """
    new_id = str(uuid.uuid4())
    # Convert RecipeCreate to Recipe by adding the ID
    recipe_data = recipe.dict()
    new_recipe = Recipe(id=new_id, **recipe_data)
    
    recipes_db[new_id] = new_recipe.dict()
    return new_recipe

@app.put("/api/recipes/{recipe_id}", response_model=Recipe)
async def update_recipe(recipe_id: str, recipe: RecipeCreate):
    """
    Updates an existing recipe by ID. (PUT /recipes/{id})
    """
    if recipe_id not in recipes_db:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    # Update the data while preserving the original ID
    recipe_data = recipe.dict()
    updated_recipe = Recipe(id=recipe_id, **recipe_data)
    
    recipes_db[recipe_id] = updated_recipe.dict()
    return updated_recipe

@app.delete("/api/recipes/{recipe_id}", status_code=204)
async def delete_recipe(recipe_id: str):
    """
    Deletes a recipe by its ID. (DELETE /recipes/{id})
    """
    if recipe_id not in recipes_db:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    del recipes_db[recipe_id]
    return {"message": "Recipe deleted successfully"}