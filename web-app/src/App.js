import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Packs from "./pages/Packs";
import Play from "./pages/Play";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/packs" element={<Packs />} />
                <Route path="/play/:packId" element={<Play />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;