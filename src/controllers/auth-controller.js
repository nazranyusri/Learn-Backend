import { login, register } from '#app/services/index.js';
import { sendJson } from '#app/utils/index.js';

export async function registerController(request, response) {
  const result = await register(request.body ?? {});
  sendJson(response, 201, result);
}

export async function loginController(request, response) {
  const result = await login(request.body ?? {});
  sendJson(response, 200, result);
}
