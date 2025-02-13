import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  let counterVisible = true;
  return (
    <div>
      {counterVisible?<Counter count={count} setCount={setCount} />:null}
    </div>
  );
}

function Counter({ count, setCount }) {
  useEffect(() => {
    console.log("Button rendered");

    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup function to prevent memory leaks
  }, [setCount]); // Dependency array includes `setCount`

  return <div> Counter {count} </div>;
}

export default App;
