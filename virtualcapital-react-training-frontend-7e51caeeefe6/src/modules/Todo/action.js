// @flow
import {
    FILTER_TODO_SUCCESS,
    GET_ALL_COMPLETEDCOUNT_SUCCESS
} from "./actionTypes";
import { serviceManager } from "shared/services/manager";
let todoService = serviceManager.get("TodoService");

export function addTodo(Todo, myFunc) {
    return (dispatch) => {
        todoService
            .addToDos(Todo)
            .then(() => {
                todoService
                    .filterTodo("all")
                    .then(({ data }) => {
                        dispatch({ type: FILTER_TODO_SUCCESS, payload: data });
                        myFunc()
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
                todoService
                    .getAllCompleteCount()
                    .then(({ data }) => {
                        dispatch({ type: GET_ALL_COMPLETEDCOUNT_SUCCESS, payload: data });
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
            })
            .catch((e) => {
                console.log(e)
            });

    };
}

export function filterTodos(searchParams, mufunc) {
    return (dispatch) => {
        todoService
            .filterTodo(searchParams)
            .then(({ data }) => {
                dispatch({ type: FILTER_TODO_SUCCESS, payload: data });
                mufunc();
            })
            .catch((err) => {
                console.log("error", err);
            });
        todoService
            .getAllCompleteCount()
            .then(({ data }) => {
                dispatch({ type: GET_ALL_COMPLETEDCOUNT_SUCCESS, payload: data });
            })
            .catch((err) => {

                console.log("error", err);
            });

    };

}
export function editTodoStatus(id, payload, myFunc) {

    return (dispatch) => {
        todoService
            .UpdateTodoStatus(id, payload)
            .then(() => {
                todoService
                    .filterTodo("all")
                    .then(({ data }) => {

                        dispatch({ type: FILTER_TODO_SUCCESS, payload: data });
                        myFunc()
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
                todoService
                    .getAllCompleteCount()
                    .then(({ data }) => {

                        dispatch({ type: GET_ALL_COMPLETEDCOUNT_SUCCESS, payload: data });

                    })
                    .catch((err) => {

                        console.log("error", err);
                    });

            })
            .catch((e) => {
                console.log(e);
            });


    };
}
export function deleteTodo(searchParams, myFunc) {
    return (dispatch) => {
        todoService
            .deleteTodo(searchParams)
            .then(() => {
                todoService
                    .filterTodo("all")
                    .then(({ data }) => {

                        dispatch({ type: FILTER_TODO_SUCCESS, payload: data });
                        myFunc()
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
                todoService
                    .getAllCompleteCount()
                    .then(({ data }) => {

                        dispatch({ type: GET_ALL_COMPLETEDCOUNT_SUCCESS, payload: data });

                    })
                    .catch((err) => {
                        console.log("error", err);
                    });

            })
            .catch((e) => {
                console.log("err", e)
            });


    };
}
export function updateAll(searchParams, myFunc) {
    return (dispatch) => {
        todoService
            .updateAll(searchParams)
            .then(() => {

                todoService
                    .filterTodo("all")
                    .then(({ data }) => {

                        dispatch({ type: FILTER_TODO_SUCCESS, payload: data });
                        myFunc()

                    })
                    .catch((err) => {
                        console.log("error", err);
                    });

                todoService
                    .getAllCompleteCount()
                    .then(({ data }) => {

                        dispatch({ type: GET_ALL_COMPLETEDCOUNT_SUCCESS, payload: data });

                    })
                    .catch((err) => {
                        console.log("error", err);
                    });

            })
            .catch((e) => {
                console.log("err", e)
            });


    };
}
export function clearCompleted(myFunc) {
    return (dispatch) => {
        todoService
            .deleteCompleted()
            .then(() => {

                todoService
                    .filterTodo("all")
                    .then(({ data }) => {

                        dispatch({ type: FILTER_TODO_SUCCESS, payload: data });
                        myFunc()

                    })
                    .catch((err) => {
                        console.log("error", err);
                    });

                todoService
                    .getAllCompleteCount()
                    .then(({ data }) => {

                        dispatch({ type: GET_ALL_COMPLETEDCOUNT_SUCCESS, payload: data });

                    })
                    .catch((err) => {
                        console.log("error", err);
                    });

            })
            .catch((e) => {
                console.log("err", e)
            });

    };
}

