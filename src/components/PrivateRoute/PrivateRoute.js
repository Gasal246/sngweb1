import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const _AUTH = localStorage.getItem("accessToken")
  
    if (_AUTH === null) {
        // not logged in so redirect to login  page with the return url
        return <Navigate to="/login/super-admin" />
    }

    // authorized so return child components
    return children;
}
export default PrivateRoute;