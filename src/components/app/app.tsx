import React, {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import order from "../../utils/order";
import Modal from "../modal/modal";

const urlApi = 'https://norma.nomoreparties.space/api/ingredients ';

function App() {

  const [modalActive, setModalActive] = useState(false);

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
            <BurgerConstructor data={order} setModalActive={setModalActive}/>
          </main>
      }
      <Modal active={modalActive} setActive={setModalActive}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis, consequuntur, deleniti et labore
          natus neque possimus praesentium provident quae, quo ratione rerum sit. Consectetur consequatur eum omnis quam
          tenetur?</p>
      </Modal>
    </div>
  );
}

export default App;
