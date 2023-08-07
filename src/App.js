import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Single from "./pages/Single/Single";
import Login from "./pages/Login/Login";
import New from "./pages/New/New";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/users" element={<List />} />
                    <Route path="/users/:userId" element={<Single />} />
                    <Route path="/users/new" element={<New />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
