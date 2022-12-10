import React, {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import order from "../../utils/order";
import Modal from "../modal/modal";
import OrderDoneSvg from '../../images/graphics.svg';
import data from "../../utils/data";

const urlApi = 'https://norma.nomoreparties.space/api/ingredients ';
const info = {
  "_id": "60666c42cc7b410027a1a9b6",
  "name": "Биокотлета из марсианской Магнолии",
  "type": "main",
  "proteins": 420,
  "fat": 142,
  "carbohydrates": 242,
  "calories": 4242,
  "price": 424,
  "image": "https://code.s3.yandex.net/react/code/meat-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
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
            <BurgerConstructor data={order} isActive={modalOrderActive} orderNumber={orderNumber} setModalActive={setModalOrderActive}/>
          </main>
      }

      <Modal active={modalIngredientActive} setActive={setModalIngredientActive}>
        <div className={`${appStyles.modal_ingredient}`}>
          <p className="mt-10 ml-10 pt-3 text text_type_main-large">Детали ингредиента</p>
          <div className={`${appStyles.modal_ingredientDesc}`}>
            <img className={`mt-3`} src={info.image_large} alt={"изображение ингредиента"}/>
            <p className="mt-4 text text_type_main-medium">{info.name}</p>
            <ul className={`mt-8 mb-15 ${appStyles.modal_ingredientProp}`}>
              <li className={`${appStyles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Калории,ккал</p>
                <p className=" text text_type_digits-default  text_color_inactive">{info.calories}</p>
              </li>
              <li className={`${appStyles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Белки, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{info.proteins}</p>
              </li>
              <li className={`${appStyles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Жиры, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{info.fat}</p>
              </li>
              <li className={`${appStyles.modal_ingredientInfo}`}>
                <p className="text text_type_main-default  text_color_inactive">Углеводы, г</p>
                <p className=" text text_type_digits-default  text_color_inactive">{info.carbohydrates}</p>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
