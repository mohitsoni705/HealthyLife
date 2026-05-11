import { Navigate } from "react-router-dom"

const HomeRedirect = () => {
    const token = localStorage.getItem("token");
    const onboarded = localStorage.getItem("onboarded");

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return <Navigate to={`/dashboard-${payload.role}`} />
        } catch {
            localStorage.removeItem("token");
        }
    }

    if (!onboarded) {
        return <Navigate to="/onboarding" />
    }

    return <Navigate to="/select-role" />
}

export default HomeRedirect
