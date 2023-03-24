import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoLists from "./components/TodoLists";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <TodoLists />
    </div>
  );
}

export default App;
