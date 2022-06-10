import React from 'react'
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Join from "./components/Join/Join.js";
import Chat from "./components/Chat/Chat.js";
 

const App = () => (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Join/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
        </BrowserRouter>
    );


export default App
