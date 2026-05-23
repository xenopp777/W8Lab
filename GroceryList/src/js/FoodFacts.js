// Edited by Zoie D with help from copilot

const FOOD_FACTS_API = 'https://world.openfoodfacts.net/api/v2/search';

export async function searchFoodFacts(searchQuery) {
  try {
    if (!searchQuery || searchQuery.trim() === '') {
      return null;
    }

    const params = new URLSearchParams({
      q: searchQuery.trim(),
      page_size: 1,
      fields: 'product_name,nutri_score_grade,nutri_score_label,image_url,energy_kcal_100g,proteins_100g,carbohydrates_100g,fat_100g'
    });

    const url = `${FOOD_FACTS_API}?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error('API Error:', response.status);
      return null;
    }

    const data = await response.json();

    // Checks for results
    if (!data.products || data.products.length === 0) {
      console.warn(`No products found for: ${searchQuery}`);
      return null;
    }

    const product = data.products[0];

    // nutrition data
    return {
      productName: product.product_name || searchQuery,
      nutriScore: product.nutri_score_grade || 'N/A',
      nutriLabel: product.nutri_score_label || 'No data',
      imageUrl: product.image_url || null,
      nutrition: {
        energy: product.energy_kcal_100g || 'N/A',
        protein: product.proteins_100g || 'N/A',
        carbs: product.carbohydrates_100g || 'N/A',
        fat: product.fat_100g || 'N/A'
      }
    };
  } catch (error) {
    console.error('Error fetching from OpenFoodFacts API:', error);
    return null;
  }
}