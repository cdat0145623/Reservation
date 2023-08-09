import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Single from "./pages/Single/Single";
import Login from "./pages/Login/Login";
import New from "./pages/New/New";
import { productInputs, userInputs } from "./formsource";
import styles from "./components/style/dark.module.scss";
import classNames from "classnames/bind";
import "./components/Navbar/Navbar.module.scss";
import { useContext } from "react";
import { DarkModeContext } from "./components/context/DarkModeContext";
const cx = classNames.bind(styles);

function App() {
    const { darkMode } = useContext(DarkModeContext);
    console.log(darkMode);
    return (
        <div className={darkMode ? `${cx("app", "dark")}` : cx("app")}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/users" element={<List />} />
                    <Route path="/users/:userId" element={<Single />} />
                    <Route
                        path="/users/new"
                        element={
                            <New title="Add new User" inputs={userInputs} />
                        }
                    />
                    <Route
                        path="/products/new"
                        element={
                            <New
                                title="Add new product"
                                inputs={productInputs}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
