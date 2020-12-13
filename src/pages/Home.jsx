import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Categories, SortPopup, SmartBlock } from "../components/index";
import {addSmartToCart} from "../redux/actions/cart";

const sortItems = [
  { name: 'популярности', type: 'popular', },
  { name: 'цене - Min', type: 'min_price',  },
  { name: 'цене - Max', type: 'max_ptice', },
];

function Home({items}) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleAddSmartToCart = (obj)=> {
    dispatch(addSmartToCart(obj));
  }
  
  return (
        <div className="container">
          <div className="content__top">
            <Categories items = {['Все', 'Xiaomi', 'Realme', 'Nokia', 'Huawei']}/>
           <SortPopup items = {sortItems} />
          </div>
          <h2 className="content__title">Все смартфоны</h2>
          <div className="content__items">
         {items.map((obj, index)=> <SmartBlock 
         addedCount = {cartItems[obj.id] && cartItems[obj.id].items.length}
         onClickAddSmart = {handleAddSmartToCart} 
         key = {obj} 
         {...obj}/>)}  
          </div>
        </div>
    )
}

export default Home
