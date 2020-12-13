import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../redux/actions/filter';


function Categories({items}) {

  const dispatch = useDispatch()
  const count = useSelector(state => state.filters.count)

  function onCountClick(index) {
    dispatch(setCategory(index))
  }

  return (
    <div>
      <div className="categories">
        <ul>
          {items.map((elem, index) => {
            return <li
              onClick={() => onCountClick(index)}
              className={count === index ? 'active' : ''}
            >{elem}</li>
          })}
        </ul>
      </div>
    </div>

  )
}

export default Categories