import { useState, useEffect,useRef } from "react";
import "./App.css";

function App() {
  //useEffect? --> hook use to do side-effect in react
  /**
   * The frontend is creating a new WebSocket connection on every render because the socket is created directly inside the component body, not inside a useEffect hook. This will cause multiple connections and unexpected behavior.
   */

  let [ws, setWs] = useState(null);
let inputRef = useRef() //store any DOM element reference, and it is different from useState because it doesnt trigger re-rendering of a componenet


  //use useEffect

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8888");
    socket.onmessage = ((e)=>{
      console.log(e.data);
    });
    setWs(socket);
  }, []);
  //runs one time when mount

  function sendMessage() {
    let message = inputRef.current.value
    ws.send(message);
    inputRef.current.value=""
  }

  return (
    <>
      <h1>Ping Pong</h1>
      <input type="text" />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}

export default App;
