import React, {useRef, FC, MutableRefObject} from 'react';
import {useDrag, useDrop} from "react-dnd";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  dragCurrentElementAction,
  removeBunFromConstructorAction,
  removeIngredientFromConstructorAction,
  setDraggingElementAction
} from "../../services/actions/ingredients";
import {useDispatch, useSelector} from '../../services/hooks';
import {TIngredient} from "../../services/types/ingredientTypes";

export type TElementConstructor = {
  info: TIngredient;
  index: number;
}


const ElementConstructor: FC<TElementConstructor> = ({info, index}) => {
  const ref = useRef<HTMLLIElement>(null);

  const id = info._id;
  const {ingredientsConstructor} =
    useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  const [{isDrag}, dragInConstructor] = useDrag({
    type: "elementInConstructor",
    item: {id, index},
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const [{handlerId}, dropInConstructor] = useDrop({
    accept: "elementInConstructor",
    collect: monitor => ({
      handlerId: monitor.getHandlerId()
    }),
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(dragCurrentElementAction(dragIndex, hoverIndex));
      dispatch(setDraggingElementAction(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  dragInConstructor(dropInConstructor(ref));
  const opacity = isDrag ? 0 : 1

  const handleRemoveIngredient = (uuid: string, id: string) => {
    const elem: TIngredient = ingredientsConstructor.filter((ingr: TIngredient) => ingr.uuid === uuid)[0];
    elem.type !== 'bun'
      ? dispatch(removeIngredientFromConstructorAction(uuid,id))
      : dispatch(removeBunFromConstructorAction('bun'));

  }

  return (
    <li style={{opacity}} ref={ref} className={`mr-2 ${burgerConstructorStyles.cell}`} data-handler-id={handlerId}>
      <DragIcon type="primary"/>
      <ConstructorElement {...info} price={info.price} text={info.name} thumbnail={info.image} type={undefined}
                          handleClose={() => {
                            handleRemoveIngredient(info.uuid!, info._id)
                          }}/>
    </li>
  );
};

export default ElementConstructor;
