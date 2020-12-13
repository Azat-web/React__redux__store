import React from 'react';
import {Header, Home, Cart } from './components';
import { Route } from 'react-router-dom';
import {fetchSmarts} from './redux/actions/filter';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';

function App() {
  const dispatch = useDispatch()
  const {count} = useSelector(({ filters }) => filters);

  const smarts = useSelector(state => state.filters.items);
  
  const sort_popup = useSelector(state => state.filters.popup);

  React.useEffect(()=>{
  dispatch(fetchSmarts(sort_popup, count))
  },[sort_popup, count])    // добавили зависимость. При изменение sort_popup отправляется новый фетч запрос с новым значением sort_popup

  // если мы хотим прокинуть что через пропсы компоненту то пишем так render = {()=> <Home items= {smarts}/>} !!!только в роутере!!! 
  return (
    <div className="wrapper">
     <Header/>
      <div className="content">
        <Route exact path="/" render = {()=> <Home items= {smarts}/>} />  
        <Route exact path="/cart" component = {Cart} />
      </div>
    </div>
  );
}



export default App;
