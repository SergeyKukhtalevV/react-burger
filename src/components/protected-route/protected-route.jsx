import {Navigate, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

export const ProtectedRouteElement = ({element}) => {
  const {accessToken} = useSelector(store => store.user);
    if (accessToken) {
      return element;
    } else {
      return <Navigate to="/login" replace/>;
    }
}
