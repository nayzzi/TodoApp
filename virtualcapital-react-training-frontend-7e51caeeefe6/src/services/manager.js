import {
  registerGlobalServices,
  serviceManager
} from "shared/services/manager";

import AppService from "./AppService";
import TodoService from "./TodoService"

export const registerServices = options => {
  registerGlobalServices(options);

  serviceManager.register("AppService", serviceManager => {
    let api = serviceManager.get("ApiService");

    return new AppService(api);
  });
  serviceManager.register("TodoService", serviceManager => {
    let api = serviceManager.get("ApiService");

    return new TodoService(api);
  });

};

export { serviceManager };
