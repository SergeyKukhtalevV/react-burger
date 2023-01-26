import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerElementStyles from './burger-element.module.css'
import PropTypes from "prop-types";
import {burgerPropTypes} from "../../utils/proptypes-validate";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";

const BurgerElement = ({props, setCurrIngr}) => {
  const id = props._id;
  const {
    ingredientsData
  } = useSelector(store => store.ingredients);
  const [{ isDrag }, drag] = useDrag({
    type: "ingredient",
    item: {id},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  return (
    <li ref={drag} className={`ml-4 mr-2 ${burgerElementStyles.card}`} onClick={() =>{setCurrIngr(props._id)}}>
      <Counter count={ingredientsData.filter(i => i._id === props._id)[0].__v} size="default" extraClass="m-1"/>
      <img src={props.image} alt={props.name}/>
      <div className={`mt-1 ${burgerElementStyles.price}`}>
        <p className={`text text_type_digits-default`}>{props.price} </p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`mt-2 mb-6 text text text_type_main-default`}>{props.name}</p>
    </li>
  )
};

export default BurgerElement;

BurgerElement.propTypes = {
  props: burgerPropTypes.isRequired,
  setCurrIngr: PropTypes.func.isRequired
  //setInfo: PropTypes.func.isRequired
}
