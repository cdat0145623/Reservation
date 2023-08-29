import config from '~/config/config';

import NavbarOnly from '~/components/layout/NavbarOnly/NavbarOnly';
import NavbarAndSidebar from '~/components/layout/NavbarAndSidebar/NavbarAndSidebar';
import NavbarList from '~/components/layout/NavbarList/NavbarList';

import Login from '~/pages/Login/Login';
import Home from '~/pages/Home/Home';
import Register from '~/pages/Register/Register';
import Settings from '~/pages/Settings/Settings';
import Personal from '~/pages/Settings/Personal/Personal';
import List from '~/pages/List/List';
import Hotel from '~/pages/Single/Hotel';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.list, component: List, layout: NavbarList },
    { path: config.routes.login, component: Login, layout: NavbarOnly },
    { path: config.routes.register, component: Register, layout: NavbarOnly },
    { path: config.routes.settings, component: Settings, layout: NavbarOnly },
    { path: config.routes.personal, component: Personal, layout: NavbarAndSidebar },
    { path: config.routes.hotel, component: Hotel, layout: NavbarList },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
