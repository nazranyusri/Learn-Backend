import { getHealth } from "#app/services/index.js";
import { sendJson } from "#app/utils/index.js";

export async function healthController(_request, response) {
  const health = await getHealth();
  sendJson(response, health.statusCode, health.body);
}
