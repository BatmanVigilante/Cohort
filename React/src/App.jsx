import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button count={count} setCount={setCount} />
    </div>
  );
}

function Button(props) {
  function handleClick() {
    props.setCount(props.count * 2);
  }
  return <button onClick={handleClick}>Counter {props.count}</button>;
}
