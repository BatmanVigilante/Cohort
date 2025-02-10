import { useState } from 'react'
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
  
  
   setInterval(() => {
      props.setCount(props.count + 1)
    }
  ,1000)
    return <button>Counter {props.count}</button>
}

export default App
