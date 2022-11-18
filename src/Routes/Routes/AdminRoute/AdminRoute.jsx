import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../../Components/Loading/Loading';
import { UserContext } from '../../../contexts/UserContext';
import useCheckAdmin from '../../../customHooks/useCheckAdmin';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const [ isAdmin, isAdminLoading ] = useCheckAdmin(user?.email)

  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading />;
  }

  if ( user && isAdmin ) {
    return children;
  }

  return <Navigate to='/login' state={{from: location}} replace />
};

export default AdminRoute;