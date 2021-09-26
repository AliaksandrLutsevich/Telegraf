import { MAIN_ROUTE, LOGIN_ROUTE } from "./utils";
import Login from "./Login";
import Main from "./Main";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
];
