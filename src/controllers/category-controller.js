import { sendJson } from "#app/utils/index.js";
import { getCategories } from "#app/services/category-service.js";

export async function getCategoriesController(request, response) {
  const result = await getCategories(request.user.id);
  sendJson(response, 200, result);
}
