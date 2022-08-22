import { Task, TaskState } from "./TaskContext";

type TaskAction =
  | { type: "add_task"; payload: Task }
  | { type: "delete_task"; payload: string }
  | { type: "update_task"; payload: Task }
  | { type: "toggle_task"; payload: string };

export const taskReducer = (state: TaskState, action: TaskAction) => {
  switch (action.type) {
    case "add_task":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "delete_task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "update_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case "toggle_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, done: !task.done } : task
        ),
      };

    default:
      return state;
  }
};
