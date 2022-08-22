import Form from "./components/Form";
import TaskList from "./components/TaskList";
import TaskContext from "./context/TaskContext";

function App() {
  return (
    <TaskContext>
      <div className="h-screen">
        <div className="container mx-auto grid xl:grid-cols-2 grid-cols-1 justify-between">
          <div className="flex justify-center">
            <Form />
          </div>
          <div className="w-full">
            <TaskList />
          </div>
        </div>
      </div>
    </TaskContext>
  );
}

export default App;
