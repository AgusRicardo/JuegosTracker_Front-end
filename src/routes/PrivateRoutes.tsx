import { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children, user}: {children: JSX.Element, user: User | null}) => {  
  return user ? children : <Navigate to="/homepage" />;
};

export default PrivateRoute;
