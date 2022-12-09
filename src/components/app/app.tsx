import React, {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import order from "../../utils/order";
import Modal from "../modal/modal";
import OrderDoneSvg from '../../images/graphics.svg';

const urlApi = 'https://norma.nomoreparties.space/api/ingredients ';
const info = {
  "_id": "60666c42cc7b410027a1a9b5",
  "name": "Говяжий метеорит (отбивная)",
  "type": "main",
  "proteins": 800,
  "fat": 800,
  "carbohydrates": 300,
  "calories": 2674,
  "price": 3000,
  "image": "https://code.s3.yandex.net/react/code/meat-04.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
  "__v": 0
};

function App() {

  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [modalIngredientActive, setModalIngredientActive] = useState(false);

  const [orderNumber, setOrderNumber] = useState(142536);

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
            <BurgerIngredients data={state.ingredientsData} setModalActive={setModalIngredientActive}/>
            <BurgerConstructor data={order} setModalActive={setModalOrderActive}/>
          </main>
      }
      <Modal active={modalOrderActive} setActive={setModalOrderActive}>
        <div className={`${appStyles.modal_order}`}>
          <p className="mt-30 text text_type_digits-large">{orderNumber}</p>
          <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
          <img className={"mt-15"} src={OrderDoneSvg} alt={"иконка принятия заказа"}/>
          <p className="mt-15 text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="mt-2 mb-30 text text_type_main-default  text_color_inactive">Дождитесь готовности на орбитальной
            станции</p>
        </div>
      </Modal>

      <Modal active={modalIngredientActive} setActive={setModalIngredientActive}>
        <div className={`${appStyles.modal_ingredient}`}>
          <p className="mt-10 text text_type_digits-large">Детали ингредиента</p>
          <img src={info.image_large} alt={"изображение ингредиента"}/>
          <p className="mt-4 text text_type_main-default">{info.name}</p>
          <ul className={`mt-8 mb-15`}>
            <li>
              <p className="text text_type_main-default  text_color_inactive">Калории, ккал</p>
              <p className=" text text_type_main-default  text_color_inactive">{info.calories}</p>
            </li>
            <li>
              <p className="text text_type_main-default  text_color_inactive">Белки, г</p>
              <p className=" text text_type_main-default  text_color_inactive">{info.proteins}</p>
            </li>
            <li>
              <p className="text text_type_main-default  text_color_inactive">Жиры, г</p>
              <p className=" text text_type_main-default  text_color_inactive">{info.fat}</p>
            </li>
            <li>
              <p className="text text_type_main-default  text_color_inactive">Углеводы, г</p>
              <p className=" text text_type_main-default  text_color_inactive">{info.carbohydrates}</p>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default App;
