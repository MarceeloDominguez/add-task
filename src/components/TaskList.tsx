import React from "react";
import { useContextTask } from "../context/TaskContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function TaskList() {
  const {
    taskContext: { tasks },
    deleteTask,
    updateTask,
    toggleTask,
    task,
  } = useContextTask();

  return (
    <div className="px-4">
      {tasks.length === 0 && (
        <span className="flex h-screen justify-center items-center font-rubik font-bold text-3xl text-red-700">
          There are no tasks
        </span>
      )}
      {tasks.map((item) => (
        <div
          key={item.id}
          className={`${
            item.done ? "bg-green-300" : "bg-white"
          } my-4 rounded-lg shadow-lg`}
        >
          <h1 className="lg:text-xl md:text-xl font-rubik font-bold p-2 tracking-[1px]">
            {item.name}
          </h1>
          <h2 className="lg:text-lg md:text-lg font-rubik p-2 tracking-[1px]">
            {item.description}
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => updateTask(item.id)}
                className="bg-blue-600 hover:bg-blue-400 text-gray-300 m-2 px-4 py-1 rounded-md shadow-lg lg:text-md md:text-lg text-sm font-rubik font-semibold tracking-[1px]"
              >
                Editar
              </button>
              <button
                onClick={() => deleteTask(item.id)}
                className="bg-red-600 hover:bg-red-400 text-gray-300 m-2 px-2 py-1 rounded-md shadow-lg lg:text-md md:text-lg text-sm font-rubik font-semibold tracking-[1px]"
              >
                Eliminar
              </button>
            </div>
            <div
              onClick={() => toggleTask(item.id)}
              className="mr-2 flex items-center"
            >
              {item.done && (
                <span className="mr-2 font-rubik italic font-semibold">
                  Task completed
                </span>
              )}
              {item.done ? (
                <AiOutlineCheckCircle className="text-xl" />
              ) : (
                <AiOutlineCloseCircle className="text-xl" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
