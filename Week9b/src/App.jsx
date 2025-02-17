import { useEffect,useState } from "react";
import "./App.css";

export default function App() {
  let [notisCount, setNotisCount] = useState(0);
  return <>
    <Notification notisCount={notisCount} setNotisCount={setNotisCount} />
  </>
};

function Notification(props){
  function increment(){
   props.setNotisCount(props.notisCount + 1);
  }
  return <button onClick={increment}>Notification {props.notisCount}</button>
}