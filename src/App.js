import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Single from "./pages/Single/Single";
import Login from "./pages/Login/Login";
import NewUser from "./pages/newUser/NewUser";
import styles from "./components/style/dark.module.scss";
import classNames from "classnames/bind";
import "./components/Navbar/Navbar.module.scss";
import { useContext } from "react";
import { DarkModeContext } from "./components/context/DarkModeContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewRoom from "./pages/newRoom/NewRoom";
import NewHotel from "./pages/newHotel/NewHotel";
import { AuthContext } from "./components/context/AuthContext";
import jwt_decode from "jwt-decode";

const cx = classNames.bind(styles);

function App() {
    const { darkMode } = useContext(DarkModeContext);

    const ProtectRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        if (user?.length > 4) {
            const decodedAccessToken = jwt_decode(user);
            if (decodedAccessToken?.isAdmin) return children;
            return <Navigate to="/login" />;
        } else {
            return <Navigate to="/login" />;
        }
    };

    return (
        <div className={darkMode ? `${cx("app", "dark")}` : cx("app")}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectRoute>
                                <Home />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <ProtectRoute>
                                <List
                                    columns={userColumns}
                                    title="Add New User"
                                />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path="/users/:userId"
                        element={
                            <ProtectRoute>
                                <Single />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path="/users/new"
                        element={
                            <ProtectRoute>
                                <NewUser />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path="/hotels"
                        element={
                            <ProtectRoute>
                                <List
                                    columns={hotelColumns}
                                    title="Add New Hotel"
                                />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path="/hotels/new"
                        element={
                            <ProtectRoute>
                                <NewHotel />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path="/rooms"
                        element={
                            <ProtectRoute>
                                <List
                                    columns={roomColumns}
                                    title="Add New Room"
                                />
                            </ProtectRoute>
                        }
                    />
                    <Route
                        path="/rooms/new"
                        element={
                            <ProtectRoute>
                                <NewRoom />
                            </ProtectRoute>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
