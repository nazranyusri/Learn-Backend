import {
  getUser,
  updateUser,
  getUserSettings,
  updateUserSettings,
} from '#app/services/index.js';
import { sendJson } from '#app/utils/index.js';

/**
    User Controller
*/
export async function getUserController(request, response) {
  const user = await getUser(request.user.id);

  sendJson(response, 200, {
    user,
  });
}

export async function updateUserController(request, response) {
  const user = await updateUser(request.user.id, {
    displayName: request.body.displayName,
  });

  sendJson(response, 200, {
    user,
  });
}


/**
    User Settings Controller
*/
export async function getUserSettingsController(request, response) {
  const settings = await getUserSettings(request.user.id);

  sendJson(response, 200, {
    settings,
  });
}

export async function updateUserSettingsController(request, response) {
  const settings = await updateUserSettings(request.user.id, {
    timezone: request.body.timezone,
    weekStartsOn: request.body.weekStartsOn,
  });

  sendJson(response, 200, {
    settings,
  });
}