import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/utils";
import {getFreshToken, getUserInfo} from "../../services/actions/user";

export const ProtectedRouteElement = ({element}) => {
  const location = useLocation();
  const token = getCookie('token');
  console.log(location);
  if (!token) {
    return <Navigate to="/login" state={{from: location}}/>;
  }
  return element;
}


