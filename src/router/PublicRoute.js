import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children, isLoggedIn }) => {

    return !isLoggedIn
                ? children
                : <Navigate to='/' />
                
}