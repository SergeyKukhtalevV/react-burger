import React from 'react';
import styles from "./profile-menu.module.css";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router";
import {getLogOutUser} from "../../services/actions/user";
import {useDispatch} from "react-redux";
import {getCookie} from "../../utils/utils";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const getOut = () => {
    dispatch(getLogOutUser({token}));
  }

  const setActive = ({isActive}) => isActive ? `${styles.link} text text_type_main-medium ${styles.link_active}`
    : `${styles.link} text text_type_main-medium`;

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <NavLink to="/profile" className={setActive}
            >Профиль</NavLink>
          </li>
          <li>
            <NavLink to={"/profile/orders"} className={`${styles.link} text text_type_main-medium`}>История
              заказов</NavLink>
          </li>
          <li>
            <NavLink className={`${styles.link} text text_type_main-medium`} onClick={getOut}>Выход</NavLink>
          </li>
          <li className={"mt-20 "}>
            <p className={"text text_type_main-default text_color_inactive"}>В этом разделе вы можете
              изменить свои персональные данные</p>
          </li>
        </ul>

        <Outlet />

      </div>
    </main>
  );
};

export default ProfileMenu;
