import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Fragment } from "react";
import { privateRoutes } from "./routes";
import DefaultLayout from "./components/layout/DefaultLayout/DefaultLayout";
import config from "./config/config";
import Login from "./pages/Login/Login";
import { AuthContext } from "./components/context/AuthContext";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import styles from "./components/style/dark.module.scss";
import classNames from "classnames/bind";
import { DarkModeContext } from "./components/context/DarkModeContext";

const cx = classNames.bind(styles);

function App() {
    const { darkMode } = useContext(DarkModeContext);

    const ProtectRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        if (user?.length > 4) {
            const decodedAccessToken = jwt_decode(user);
            if (decodedAccessToken?.isAdmin) return children;
            window.localStorage.removeItem("user");
            return <Navigate to="/login" />;
        } else {
            window.localStorage.removeItem("user");
            return <Navigate to="/login" />;
        }
    };

    return (
        <Router>
            <div className={darkMode ? `${cx("app", "dark")}` : cx("app")}>
                <Routes>
                    <Route path={config.routes.login} element={<Login />} />
                    {privateRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectRoute>
                                        <Layout>
                                            <Page
                                                columns={
                                                    route.columns
                                                        ? route.columns
                                                        : null
                                                }
                                                title={
                                                    route.title
                                                        ? route.title
                                                        : null
                                                }
                                            />
                                        </Layout>
                                    </ProtectRoute>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
