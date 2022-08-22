import { FormEvent, useEffect, useRef } from "react";
import { useContextTask } from "../context/TaskContext";
import { useForm } from "../hooks/useForm";
import fondo from "../img/fondo.png";

const initialState = {
  name: "",
  description: "",
  id: "",
  done: false,
};

export default function Form() {
  const { addNewTask, task, dispatch, setTask } = useContextTask();
  const { onChange, values, reset, setValues } = useForm(initialState);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (Object.keys(task).length > 0) {
      setValues({ ...task });
    }
  }, [task]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.name === "" || values.description === "") {
      return;
    }

    if (values.id) {
      dispatch({ type: "update_task", payload: { ...values } });
      setTask({});
    } else {
      addNewTask(values);
    }
    reset();
    nameInput.current?.focus();
  };

  return (
    <form className="flex flex-col lg:fixed top-15" onSubmit={handleSubmit}>
      <h1 className="container mx-auto flex justify-center items-center font-rubik text-4xl font-bold text-[#6C63FF] tracking-[1px] h-20">
        Crud App Tasks
      </h1>
      <div>
        <div className="flex justify-center">
          <img src={fondo} alt="fondo" className="object-container w-[500px]" />
        </div>
        <div className="px-4">
          <label className="block text-gray-700 text-lg font-bold mb-2 font-rubik">
            Add Task
          </label>
          <input
            className="block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-5 focus:outline-none"
            type="text"
            placeholder="write a task"
            onChange={(e) => onChange(e.target.value, "name")}
            value={values.name}
            autoFocus
            ref={nameInput}
          />
          <label className="block text-gray-700 text-lg font-rubik font-bold mb-2">
            Add Description
          </label>
          <textarea
            rows={6}
            className="block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-5 focus:outline-none"
            placeholder="write a description"
            onChange={(e) => onChange(e.target.value, "description")}
            value={values.description}
          />
          <button
            type="submit"
            className="bg-[#6C63FF] hover:opacity-90 font-medium text-white px-10 shadow-xl py-3 rounded-lg capitalize font-rubik"
          >
            {values.id ? "Edit Task" : "Create Task"}
          </button>
        </div>
      </div>
    </form>
  );
}
