// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

class AppService {
  api: ApiServiceInterface;

  endpoint: string = "/todo";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  addToDos(param: Object) {
    return this.api.post(this.endpoint, param);
  }

  UpdateTodoStatus(id: string, param: Object) {
    return this.api.put(`${this.endpoint}/${id}`, param);
  }

  deleteTodo(id: string) {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

  filterTodo(param: string) {
    return this.api.get(`${this.endpoint}/filter/${param}`);
  }

  deleteCompleted() {
    return this.api.delete(this.endpoint);
  }

  getAllCompleteCount() {
    return this.api.get(`${this.endpoint}/count/count`);
  }

  updateAll(param: string) {
    return this.api.put(`${this.endpoint}/update/up/${param}`);
  }

}

export default AppService;
