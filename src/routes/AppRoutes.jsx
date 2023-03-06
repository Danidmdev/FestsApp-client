import { Route, Routes } from "react-router"
import LoginForm from "../components/LoginForm/LoginForm"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<p>Home</p>} />
            <Route path="/fests" element={<p>Fests</p>} />
            <Route path="/details/:id" element={<p>Details</p>} />
            <Route path="/calendar" element={<p>Calendar</p>} />
            <Route path="/map" element={<p>Map</p>} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/create" element={<p>Create</p>} />
            <Route path="/edit-fest/:id" element={<p>Edit</p>} />
            <Route path="/profile" element={<p>Profile</p>} />
            <Route path="*" element={<p>Error 404</p>} />

        </Routes>
    )
}

export default AppRoutes
