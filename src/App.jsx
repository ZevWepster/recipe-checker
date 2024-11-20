import { useState } from "react";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./components/RecipePage";

export const App = () => {
  // State to keep track of the selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Handler to reset the selected recipe (for going back to the list)
  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  return (
    <>
      {/* Conditional rendering for the two pages */}
      {selectedRecipe === null ? (
        <RecipeListPage onSelectRecipe={setSelectedRecipe} />
      ) : (
        <RecipePage recipe={selectedRecipe} goBack={handleBackToList} />
      )}
    </>
  );
};
