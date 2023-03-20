import { Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ element, ...rest }) => {
    const navigate = useNavigate();
    const authenticated = useAuth();
    
    if (!authenticated) {
        navigate('/login');
    }
    
    return <Route {...rest} element={element} />;
    }

export default PrivateRoute;

