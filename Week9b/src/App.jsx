import { useEffect,useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button count={count} setCount={setCount}/>
    </div>
  )
}

function Button(props){
  
  useEffect(()=>{
    console.log('Button rendered');
    setInterval(()=>{
      setCount(count=>count+1)
    },1000);
  },[]);
  function onChange(){
    props.setCount(props.count+1);
  }
    return <button onClick={onChange}>Counter {props.count}</button>
}

export default App
