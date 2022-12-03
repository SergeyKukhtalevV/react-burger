import React from 'react';
import burgerIngredients from './burgerIngredients.module.css'
import BurgerTab from "../burgerTab/BurgerTab";
import BurgerElement from "../burgerElement/BurgerElement";
import data from '../../utils/data';

const BurgerIngredients = () => {
  const [ingredients, setIngredients] = React.useState([
    {id: 1, name: 'Булки', type: 'bun'},
    {id: 2, name: 'Соусы', type: 'sauce'},
    {id: 3, name: 'Начинка', type: 'main'}
  ]);

  return (
    <div>
      <h1 className={`mt-10 text text_type_main-large ${burgerIngredients.title}`}>Соберите бургер</h1>
      <BurgerTab/>
      <ul className={`mt-10 ${burgerIngredients.ingredients}`}>
        {
          ingredients.map(ingredient => {
            return (
              <li className={`${burgerIngredients.elements}`} key={ingredient.id}>
                <p className={`text text_type_main-medium ${burgerIngredients.subtitle}`}>
                  {ingredient.name}
                </p>
                <ul className={`mt-6 mb-10 ${burgerIngredients.cards}`}>
                  {
                    data.map(info => {
                      if (ingredient.type === info.type) {
                        return (
                          <BurgerElement {...info} key={info._id}/>
                        )
                      }
                    })
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default BurgerIngredients;
