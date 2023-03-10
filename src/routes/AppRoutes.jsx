import { Route, Routes } from "react-router"

import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import FestsPage from "../pages/FestsPage/FestsPage"
import FestDetailsPage from "../pages/FestDetailsPage/FestDetailsPage"
import NewFestPage from "../pages/NewFestPage/NewFestPage"
import EditFestPage from "../pages/EditFestPage/EditFestPage"
import UsersPage from "../pages/UsersPage/UsersPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import PrivateRoute from "./PrivateRoute"
import EditUserPage from "../pages/EditUserPage/EditUserPage"
// import CalendarPage from "../pages/CalendarPage/CalendarPage"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fests" element={<FestsPage />} />
            <Route path="/details/:fest_id" element={<FestDetailsPage />} />
            <Route path="/calendar" element={<p>Calendar</p>} />
            <Route path="/map" element={<p>Map</p>} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/edit-fest/:fest_id" element={<EditFestPage />} />
                <Route path="/edit-user/:user_id" element={<EditUserPage />} />
                <Route path="/create" element={<NewFestPage />} />
                <Route path="/profile/:user_id" element={<ProfilePage />} />
                <Route path="/allUsers" element={<UsersPage />} />
            </Route>

            <Route path="*" element={<p>Error 404</p>} />

        </Routes >
    )
}

export default AppRoutes
