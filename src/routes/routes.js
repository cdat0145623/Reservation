import config from "~/config/config";

import Login from "~/pages/Login/Login";
import Home from "~/pages/Home/Home";
import List from "~/pages/List/List";
import Single from "~/pages/Single/Single";
import NewUser from "~/pages/newUser/NewUser";
import NewHotel from "~/pages/newHotel/NewHotel";
import NewRoom from "~/pages/newRoom/NewRoom";

import { hotelColumns, roomColumns, userColumns } from "~/datatablesource";

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null },
];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    {
        path: config.routes.users,
        component: List,
        columns: userColumns,
        title: "Add New User",
    },
    { path: config.routes.user, component: Single },
    { path: config.routes.newUser, component: NewUser },
    {
        path: config.routes.hotels,
        component: List,
        columns: hotelColumns,
        title: "Add New Hotel",
    },
    { path: config.routes.newHotel, component: NewHotel },
    {
        path: config.routes.rooms,
        component: List,
        columns: roomColumns,
        title: "Add New Room",
    },
    { path: config.routes.newRooms, component: NewRoom },
];

export { publicRoutes, privateRoutes };
