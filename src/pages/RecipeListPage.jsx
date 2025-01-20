import { useState } from "react";
import {
  Box,
  Input,
  Checkbox,
  CheckboxGroup,
  HStack,
  Text,
  Image,
  Heading,
  Center,
  Stack,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";
import { data } from "../utils/data";

const healthLabels = [
  "Low Potassium",
  "Kidney-Friendly",
  "Vegetarian",
  "Gluten-Free",
  "Wheat-Free",
  "Peanut-Free",
  "Soy-Free",
  "Fish-Free",
  "Shellfish-Free",
  "Pork-Free",
  "Red-Meat-Free",
  "Crustacean-Free",
  "Celery-Free",
  "Mustard-Free",
  "Sesame-Free",
  "Lupine-Free",
  "Mollusk-Free",
  "Alcohol-Free",
  "Kosher",
  "Sugar-Conscious",
  "Keto-Friendly",
  "Dairy-Free",
  "Egg-Free",
  "Tree-Nut-Free",
  "No oil added",
  "Sulfite-Free",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "Mediterranean",
  "Alcohol-Cocktail",
  "FODMAP-Free",
];
// Commented out allergens are common ones but not included in data set
const commonAllergens = [
  "Gluten",
  // "Nuts/Seeds",
  // "Dairy",
  // "Soy",
  // "Sesame",
  "Shellfish",
  "Tree-Nuts",
  // "Eggs",
  "Sulfites",
  "FODMAP",
  "Wheat",
];

export const RecipeListPage = ({ onSelectRecipe }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);
  const [selectedCautions, setSelectedCautions] = useState([]);

  const handleHealthLabelChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedHealthLabels(selectedValues);
  };

  const filteredRecipes = data.hits.filter((hit) => {
    const matchesSearchTerm = hit.recipe.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesHealthLabels =
      selectedHealthLabels.length === 0 ||
      selectedHealthLabels.every((label) =>
        hit.recipe.healthLabels.includes(label)
      );

    const excludesCautions =
      selectedCautions.length === 0 ||
      !selectedCautions.some((allergen) =>
        hit.recipe.cautions.includes(allergen)
      );

    return matchesSearchTerm && matchesHealthLabels && excludesCautions;
  });

  const healthLabelOptions = healthLabels.map((label) => ({
    value: label,
    label,
  }));
  return (
    <Center flexDir="column" p={[3, 5]} bg="gray.50" minH="100vh">
      <Heading mb={[4, 5]}>Recipe Checker</Heading>

      <Input
        placeholder="Search recipes by name.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        width={["90%", "70%", "50%"]}
        bg="white"
        mb={[4, 5]}
        boxShadow="sm"
      />

      <Box mb={[3, 4]} width={["90%", "70%", "50%"]}>
        <Select
          isMulti
          options={healthLabelOptions}
          placeholder="Select health labels..."
          onChange={handleHealthLabelChange}
        />
      </Box>

      <CheckboxGroup
        colorScheme="red"
        onChange={(values) => setSelectedCautions(values)}
      >
        <HStack spacing={4} wrap="wrap" justify="center" mb={[4, 6]}>
          {commonAllergens.map((allergen) => (
            <Checkbox key={allergen} value={allergen}>
              {allergen}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>

      <Box
        display="grid"
        gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={[4, 6]}
        width="100%"
        px={[3, 6]}
      >
        {filteredRecipes.length === 0 ? (
          <Box textAlign="center">
            <Text fontSize="lg" color="gray.500">
              No recipes found matching your criteria. Try adjusting the filters
              or search term.
            </Text>
          </Box>
        ) : (
          filteredRecipes.map((hit) => (
            <Box
              key={hit.recipe.label}
              p={4}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              _hover={{ bg: "gray.200", cursor: "pointer" }}
              onClick={() => onSelectRecipe(hit.recipe)}
              minH="100vh"
              bg="white"
              textAlign="center"
            >
              <Image
                src={hit.recipe.image}
                alt={hit.recipe.label}
                borderRadius="md"
                width={["100%"]}
                height={[200, 250]}
                objectFit="cover"
              />
              <Heading size="md" mt={3} mb={2}>
                {hit.recipe.label}
              </Heading>
              {hit.recipe.dietLabels.length > 0 && (
                <Text>Diet: {hit.recipe.dietLabels.join(", ")}</Text>
              )}

              <Text>
                Dish Type:{" "}
                <Text as="span" fontWeight="bold">
                  {" "}
                  {hit.recipe.dishType.join(", ")}
                </Text>
              </Text>
              {hit.recipe.cautions.length > 0 && (
                <Box mt={2}>
                  {hit.recipe.cautions.map((caution) => (
                    <Text
                      key={caution}
                      display="inline-block"
                      bg="red.100"
                      color="red.600"
                      px={2}
                      py={1}
                      borderRadius="md"
                      mr={1}
                      fontSize="sm"
                    >
                      {caution}
                    </Text>
                  ))}
                </Box>
              )}
              <Stack mt={3} direction="row" justify="center" spacing={4}>
                {hit.recipe.healthLabels.includes("Vegetarian") && (
                  <Box
                    bg="green.100"
                    color="green.600"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                  >
                    Vegetarian
                  </Box>
                )}
                {hit.recipe.healthLabels.includes("Vegan") && (
                  <Box
                    bg="green.100"
                    color="green.600"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                  >
                    Vegan
                  </Box>
                )}
              </Stack>
              <Button
                mt={4}
                colorScheme="teal"
                onClick={() => onSelectRecipe(hit.recipe)}
              >
                View Details
              </Button>
            </Box>
          ))
        )}
      </Box>
    </Center>
  );
};
