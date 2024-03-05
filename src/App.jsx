import { useEffect, useState } from "react";
import Caro from "./caro";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);

  return (
    <>
      <Caro />
    </>
  );
}

export default App;
