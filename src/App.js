import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './components/layout';
import { Fragment } from 'react';
import { publicRoutes } from './routes';
// import Home from './pages/Home/Home';
// import List from './pages/List/List';
// import Hotel from './pages/Single/Hotel';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// import Settings from './pages/Settings/Settings';
// import Personal from './pages/Settings/Personal/Personal';

function App() {
    return (
        // <>
        //     <Router>
        //         <Routes>

        //             <Route path="/mysettings/personal/:id" element={<Personal />} />
        //         </Routes>
        //     </Router>
        // </>
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
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
                                    <Layout>
                                        <Page />
                                    </Layout>
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
