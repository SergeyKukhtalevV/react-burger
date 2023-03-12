import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import styles from './profile.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getLogOutUser, getUserInfo, setUserInfo} from "../services/actions/user";
import {getCookie} from "../utils/utils";

const ProfilePage = () => {
  const {userInfo, accessToken, userInfoFailed, userInfoAnswer} = useSelector(store => store.user);
  const [isInfoChanged, setIsInfoChanged] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({
    name: userInfo.name,
    email: userInfo.email,
    password: '',
    accessToken
  });

  const token = getCookie('token');
  const setActive = ({isActive}) => isActive ? `${styles.link} text text_type_main-medium ${styles.link_active}`
    : `${styles.link} text text_type_main-medium`;

  const editUserInfo = useCallback(e => {
      e.preventDefault();
      dispatch(setUserInfo(form));
      form.accessToken = accessToken;
      setIsInfoChanged(false);
    }, [form]
  );

  const resetUserInfo = useCallback(() => {
    setValue({...form, name: userInfo.name, email: userInfo.email});
    setIsInfoChanged(false);
  }, [form]);

  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
    setIsInfoChanged(true);
  }
  const getOut = () => {
    dispatch(getLogOutUser({token}));
  }
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    dispatch(getUserInfo({accessToken}));
    // if (accessToken) {
    //   setValue({...form, name: userInfo.name, email: userInfo.email, password: '', accessToken: accessToken})
    //   // } else {
    //   //   navigate('/login');
    // }

  }, [accessToken]);

  useEffect(() => {
    setValue({...form, name: userInfo.name, email: userInfo.email, password: '', accessToken: accessToken})
  }, [userInfo]);

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
        {userInfoAnswer
          ? <form className={`${styles.form}`} onSubmit={editUserInfo} onReset={resetUserInfo}>
            <Input type={"text"} extraClass={``} placeholder={'Имя'} value={form.name} name={"name"}
                   onChange={onChange} icon={"EditIcon"}/>
            <EmailInput extraClass={`mt-6`} placeholder={'Логин'} value={form.email} name={"email"}
                        onChange={onChange}
                        icon={"EditIcon"}/>
            <PasswordInput extraClass={`mt-6`} placeholder={'пароль'} value={form.password} name={"password"}
                           onChange={onChange}
                           icon={"EditIcon"}/>
            {isInfoChanged
              ? <div className={styles.buttons}>
                <Button extraClass={`mt-6`} htmlType={"submit"} type={"primary"} size={"medium"}
                >Сохранить</Button>
                <Button extraClass={`mt-6`} htmlType={"reset"} type={"primary"} size={"medium"}
                >Отмена</Button>
              </div>
              : null
            }
          </form>
          : <p className="mt-20 mb-20 text text_type_main-medium">Пожалуйста, подождите. Идет загрузка...</p>
        }

        {!token
          ? <p className={`${styles.menu} mt-20 text text_type_main-default text_color_active`}>Вы успешно вышли из
            профиля.</p>
          : null}
      </div>
    </main>
  );
};

export default ProfilePage;
