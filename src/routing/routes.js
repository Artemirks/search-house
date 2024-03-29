import LandlordDashboard from "../pages/app-landlord/app-landlord"
import CreateMain from "../pages/create-main/create-main"
import HomePage from "../pages/HomePage"
import SearchApp from "../pages/app-searchapp/SearchApp"
import AppUser from "../pages/app-user/AppUser"
import { CREATE_OBJECT_PAGE, HOME_ROUTE, LANDLORD_DASHBOARD_ROUTE, SEARCH_APP_PAGE, USER_PAGE_ROUTE } from "../utils/conts"

export const authRoutes = [
    {
        path: LANDLORD_DASHBOARD_ROUTE,
        Component: LandlordDashboard
    },
    {
        path: USER_PAGE_ROUTE,
        Component: AppUser
    },
    {
        path: CREATE_OBJECT_PAGE,
        Component: CreateMain
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: SEARCH_APP_PAGE,
        Component: SearchApp
    },
]