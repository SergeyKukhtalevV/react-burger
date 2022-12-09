import React, {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import order from "../../utils/order";
import Modal from "../modal/modal";
import OrderDoneSvg from '../../images/graphics.svg';

const urlApi = 'https://norma.nomoreparties.space/api/ingredients ';

function App() {

  const [modalOrderActive, setModalOrderActive] = useState(false);

  const [orderNumber, setOrderNumber] =  useState(142536);

  const [state, setState] = useState({
    ingredientsData: [],
    loading: true,
    error: ''
  });

  useEffect(() => {
    getIngredientsData();
  }, []);

  const getIngredientsData = async () => {
    setState({...state, loading: true});
    fetch(urlApi)
      .then(res => res.json())
      .then(data => setState({...state, ingredientsData: data.data, loading: false}))
      .catch(e => {
        setState({...state, error: e.message, loading: false});
      });
  };

  return (
    <div className={appStyles.appContent}>
      <AppHeader/>
      {
        state.loading
          ? <p className="text text_type_main-medium">Идет загрузка...</p>
          :
          <main className={appStyles.main}>
            <BurgerIngredients data={state.ingredientsData}/>
            <BurgerConstructor data={order} setModalActive={setModalOrderActive}/>
          </main>
      }
      <Modal active={modalOrderActive} setActive={setModalOrderActive}>
        <div className={`${appStyles.modal_order}`}>
        <p className="mt-30 text text_type_digits-large">{orderNumber}</p>
          <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
          <img className={"mt-15"} src={OrderDoneSvg} alt={"иконка принятия заказа"}/>
          <p className="mt-15 text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="mt-2 mb-30 text text_type_main-default  text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
