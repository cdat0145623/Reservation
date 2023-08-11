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
import { AuthContext } from "./components/context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewRoom from "./pages/newRoom/NewRoom";
import NewHotel from "./pages/newHotel/NewHotel";
const cx = classNames.bind(styles);

function App() {
    const { darkMode } = useContext(DarkModeContext);

    const ProtectedRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        if (!user) return <Navigate to="/login" />;

        return children;
    };
    return (
        <div className={darkMode ? `${cx("app", "dark")}` : cx("app")}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute>
                                <List
                                    columns={userColumns}
                                    title="Add New User"
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/users/:userId"
                        element={
                            <ProtectedRoute>
                                <Single />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/users/new"
                        element={
                            <ProtectedRoute>
                                <NewUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hotels"
                        element={
                            <ProtectedRoute>
                                <List
                                    columns={hotelColumns}
                                    title="Add New Hotel"
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hotels/new"
                        element={
                            <ProtectedRoute>
                                <NewHotel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/rooms"
                        element={
                            <ProtectedRoute>
                                <List
                                    columns={roomColumns}
                                    title="Add New Room"
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/rooms/new"
                        element={
                            <ProtectedRoute>
                                <NewRoom />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
