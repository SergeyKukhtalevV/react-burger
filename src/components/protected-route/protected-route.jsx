import {Navigate, useLocation} from 'react-router-dom';
import {getCookie} from "../../utils/utils";

export const ProtectedRouteElement = ({element}) => {
  const location = useLocation();
  const token = getCookie('token');
  if (!token) {
    return <Navigate to="/login" state={{from: location}}/>;
  }
  return element;
}


