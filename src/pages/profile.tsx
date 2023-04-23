import React, {useCallback, useEffect, useState, FC} from 'react'
import styles from './profile.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from '../services/hooks';
import {setUserInfo} from "../services/actions";
import {getCookie} from "../utils/utils";

type TProfile = {
  name: string;
  email: string;
  password: string;
  accessToken: string;
}
const ProfilePage: FC = () => {
  const {userInfo, accessToken, userInfoAnswer} = useSelector(store => store.user);
  const [isInfoChanged, setIsInfoChanged] = useState<boolean>(false);
  const dispatch = useDispatch();


  const [form, setValue] = useState<TProfile>({
    name: userInfo.name,
    email: userInfo.email,
    password: '',
    accessToken
  });

  const token = getCookie('token');

  const handleEditUserInfo = useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(setUserInfo(form));
      form.accessToken = accessToken;
      setIsInfoChanged(false);
    }, // eslint-disable-next-line
    [form]
  );

  const handleResetUserInfo = useCallback(() => {
    setValue({...form, name: userInfo.name, email: userInfo.email});
    setIsInfoChanged(false);
  }, // eslint-disable-next-line
    [form]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({...form, [e.target.name]: e.target.value});
    setIsInfoChanged(true);
  }

  useEffect(() => {
    setValue({...form, name: userInfo.name, email: userInfo.email, password: '', accessToken: accessToken})
  }, // eslint-disable-next-line
    [userInfo]);

  return (
    <>
      {userInfoAnswer
        ? <form className={`${styles.form}`} onSubmit={handleEditUserInfo} onReset={handleResetUserInfo}>
          <Input type={"text"} extraClass={``} placeholder={'Имя'} value={form.name} name={"name"}
                 onChange={onChange} icon={"EditIcon"}/>
          <EmailInput extraClass={`mt-6`} placeholder={'Логин'} value={form.email} name={"email"}
                      onChange={onChange}
                      isIcon={true}/>
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
    </>
  );
};

export default ProfilePage;
