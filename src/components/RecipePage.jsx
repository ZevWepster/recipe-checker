import {
  Box,
  Text,
  Heading,
  Button,
  Image,
  ListItem,
  UnorderedList,
  Grid,
  VStack,
  Badge,
} from "@chakra-ui/react";

export const RecipePage = ({ recipe, goBack }) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
    <Button
      onClick={goBack}
      colorScheme="teal"
      variant="solid"
      mb={5}
      position="sticky"
      top="0"
      zIndex="10"
    >
      Back to List
    </Button>
    <Image
      src={recipe.image}
      width="100%"
      maxW="400px"
      height="auto"
      borderRadius="md"
      alt={recipe.label}
      mx="auto"
      mb={5}
    />

    <Grid
      templateColumns={["1fr", "1fr 1fr"]}
      gap={6}
      alignItems="flex-start"
      mt={5}
    >
      <Box>
        <Text fontWeight="bold" fontSize="lg">
          Meal Type:{" "}
          <Text as="span" fontWeight="normal">
            {recipe.mealType.join(", ")}
          </Text>
        </Text>
        <Heading size="lg" my={3}>
          {recipe.label}
        </Heading>
        <Text fontWeight="bold" fontSize="lg">
          Total Time:{" "}
          <Text as="span" fontWeight="normal">
            {recipe.totalTime} mins
          </Text>
        </Text>
        <Text fontWeight="bold" fontSize="lg">
          Servings:{" "}
          <Text as="span" fontWeight="normal">
            {recipe.yield} servings
          </Text>
        </Text>

        <Box mt={4}>
          <Heading size="sm" mb={2}>
            Ingredients:
          </Heading>
          <UnorderedList>
            {recipe.ingredientLines.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>

      <Box>
        <VStack align="flex-start" spacing={3} mb={4}>
          <Box>
            <Heading size="sm" mb={1}>
              Health Labels:
            </Heading>
            {recipe.healthLabels.map((label) => (
              <Badge
                key={label}
                colorScheme="purple"
                mr={2}
                mb={1}
                px={2}
                py={1}
              >
                {label}
              </Badge>
            ))}
          </Box>
          <Box>
            <Heading size="sm" mb={1}>
              Diet Labels:
            </Heading>
            {recipe.dietLabels.map((label) => (
              <Badge
                key={label}
                colorScheme="green"
                mr={2}
                mb={1}
                px={2}
                py={1}
              >
                {label}
              </Badge>
            ))}
          </Box>

          {recipe.cautions.length > 0 && (
            <Box>
              <Heading size="sm" mb={1}>
                Cautions:
              </Heading>
              {recipe.cautions.map((caution) => (
                <Badge
                  key={caution}
                  colorScheme="red"
                  mr={2}
                  mb={1}
                  px={2}
                  py={1}
                >
                  {caution}
                </Badge>
              ))}
            </Box>
          )}
        </VStack>
        <Box>
          <Heading size="sm" mb={2}>
            Nutrients:
          </Heading>
          <Text>
            <strong>Energy:</strong>{" "}
            {Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} kcal
          </Text>
          <Text>
            <strong>Protein:</strong>{" "}
            {Math.round(recipe.totalNutrients.PROCNT.quantity)} g
          </Text>
          <Text>
            <strong>Fat:</strong>{" "}
            {Math.round(recipe.totalNutrients.FAT.quantity)} g
          </Text>
          <Text>
            <strong>Carbs:</strong>{" "}
            {Math.round(recipe.totalNutrients.CHOCDF.quantity)} g
          </Text>
          <Text>
            <strong>Cholesterol:</strong>{" "}
            {Math.round(recipe.totalNutrients.CHOLE.quantity)} mg
          </Text>
          <Text>
            <strong>Sodium:</strong>{" "}
            {Math.round(recipe.totalNutrients.NA.quantity)} mg
          </Text>
        </Box>
      </Box>
    </Grid>
  </Box>
);

export default RecipePage;
