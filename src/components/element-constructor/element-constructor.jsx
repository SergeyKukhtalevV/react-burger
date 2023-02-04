import React, {useRef} from 'react';
import {useDrag, useDrop} from "react-dnd";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  REMOVE_BUN_FROM_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SORT_IN_CONSTRUCTOR, SORT_IN_CONSTRUCTOR_2
} from "../../services/actions/ingredients";
import {useDispatch, useSelector} from "react-redux";

const ElementConstructor = ({info, index}) => {
  const ref = useRef(null);

  const {ingredientsConstructor} = useSelector(store => store.ingredients);

  const id = info._id;
  const {ingredientsData } =
    useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  const [{ isDrag }, dragInConstructor] = useDrag({
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
    hover(item, monitor){
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
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
      // Time to actually perform the action
      //moveElement(dragIndex, hoverIndex);
      console.log(dragIndex, hoverIndex);
      console.log('dragIndex', dragIndex, ingredientsConstructor[dragIndex]);
      console.log('hoverIndex', hoverIndex, ingredientsConstructor[hoverIndex]);
      //console.log(ingredientsConstructor);
      dispatch({
        type: SORT_IN_CONSTRUCTOR,
        dragIndex,
        hoverIndex
      });
      dispatch({
        type: SORT_IN_CONSTRUCTOR_2,
        dragIndex,
        hoverIndex
      });
      console.log(ingredientsConstructor);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  dragInConstructor(dropInConstructor(ref));
  const opacity = isDrag ? 0 : 1

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
    <li style={{ opacity }} ref={ref} className={`mr-2 ${burgerConstructorStyles.cell}`} data-handler-id={handlerId} >
      <DragIcon type="primary"/>
      <ConstructorElement {...info} text={info.name} thumbnail={info.image}
                          handleClose={() => {
                            handleRemoveIngredient(info._id, index)
                          }}/>
    </li>
  );
};

export default ElementConstructor;
