import { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, user }: { children: JSX.Element; user: User | null }) => {
  return user ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
