import {Navigate, useLocation} from 'react-router-dom';
import {getCookie} from "../../utils/utils";
import {FC} from 'react';
import {TElement} from "../../services/types/data";


export const ProtectedRouteElement: FC<TElement> = ({element}) => {
  const location = useLocation();
  const token = getCookie('token');
  if (!token) {
    return <Navigate to="/login" state={{from: location}}/>;
  }
  return element;
}


