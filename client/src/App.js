import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { io } from "socket.io-client";

import Main from "./components/main";

const socket = io('http://localhost:4000')
function App() {
  return <Main socket={socket}/>;
}

export default App;
