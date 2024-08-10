import { useState } from "react";
import "./App.css";
import Menu from './menu'; // Adjust the path if necessary

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img src='https://th.bing.com/th/id/OIP.jts_eWK_m0N25cf5oATDFAHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7' />
      </div>
      <h1>המחשב של תום</h1>
      <Menu />
    </>
  );
}

export default App;
