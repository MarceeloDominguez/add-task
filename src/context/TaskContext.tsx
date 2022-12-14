import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { taskReducer } from "./taskReducer";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface Task {
  name: string;
  description: string;
  id: string;
  done: boolean;
}

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

interface TaskContextProps {
  taskContext: TaskState;
  addNewTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: string) => void;
  toggleTask: (task: string) => void;
  task: any;
  setTask: ({}) => void;
  dispatch: Function;
}

const ContextTask = createContext({} as TaskContextProps);

export default function TaskContext({ children }: Props) {
  const [taskContext, dispatch] = useReducer(taskReducer, initialState);
  const [task, setTask] = useState({});
  const getCurrentTimestamp = () => new Date().getTime().toLocaleString();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("task") as any)) {
      dispatch({
        type: "local_storage",
        payload: JSON.parse(localStorage.getItem("task") as any),
      });
    }
  }, []);

  useEffect(() => {
    if (taskContext !== initialState) {
      localStorage.setItem("task", JSON.stringify(taskContext));
    }
  }, [taskContext]);

  const addNewTask = (task: Task) => {
    dispatch({
      type: "add_task",
      payload: { ...task, id: getCurrentTimestamp(), done: false },
    });
  };

  const deleteTask = (taskId: string) => {
    dispatch({
      type: "delete_task",
      payload: taskId,
    });
  };

  const updateTask = (taskId: string) => {
    const filterTask = taskContext.tasks.filter(
      (task: any) => task.id === taskId
    );
    setTask(filterTask[0]);
  };

  const toggleTask = (taskId: string) => {
    dispatch({
      type: "toggle_task",
      payload: taskId,
    });
  };

  return (
    <ContextTask.Provider
      value={{
        taskContext,
        addNewTask,
        deleteTask,
        updateTask,
        task,
        dispatch,
        setTask,
        toggleTask,
      }}
    >
      {children}
    </ContextTask.Provider>
  );
}

export const useContextTask = () => {
  const { ...props } = useContext(ContextTask);

  return { ...props };
};
