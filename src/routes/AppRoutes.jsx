import { Route, Routes } from "react-router"

// import LoginForm from "../components/LoginForm/LoginForm"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import FestsPage from "../pages/FestsPage/FestsPage"
import FestDetailsPage from "../pages/FestDetailsPage/FestDetailsPage"
import NewFestPage from "../pages/NewFestPage/NewFestPage"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fests" element={<FestsPage />} />
            <Route path="/details/:id" element={<FestDetailsPage />} />
            <Route path="/calendar" element={<p>Calendar</p>} />
            <Route path="/map" element={<p>Map</p>} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/create" element={<NewFestPage />} />
            <Route path="/edit-fest/:id" element={<p>Edit</p>} />
            <Route path="/profile" element={<p>Profile</p>} />
            <Route path="*" element={<p>Error 404</p>} />

        </Routes>
    )
}

export default AppRoutes
