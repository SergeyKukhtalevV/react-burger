import React from 'react';
import {useDrag} from "react-dnd";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {REMOVE_BUN_FROM_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR} from "../../services/actions/ingredients";
import {useDispatch, useSelector} from "react-redux";

const ElementConstructor = ({info, index}) => {
  const id = info._id;
  const {ingredientsData } =
    useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  const [{ isDrag }, dragInConstructor] = useDrag({
    type: "elementInConstructor",
    item: {id},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const handleRemoveIngredient = (id, index) => {
    const elem = ingredientsData.filter(ingr => ingr._id === id)[0];
    console.log(elem);
    elem.type !== 'bun'
      ? dispatch({
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        id,
        index
      })
      : dispatch({
        type: REMOVE_BUN_FROM_CONSTRUCTOR,
        ingr: 'bun'
      })

  }

  return (
    <li ref={dragInConstructor} className={`mr-2 ${burgerConstructorStyles.cell}`} >
      <DragIcon type="primary"/>
      <ConstructorElement {...info} text={info.name} thumbnail={info.image}
                          handleClose={() => {
                            handleRemoveIngredient(info._id, index)
                          }}/>
    </li>
  );
};

export default ElementConstructor;
