import axios from 'axios';


export const setCategory = (count) => ({ type: "SET_CATEGORY", payload: count });

export const setClick = (click) => ({ type: "SET_CLICK", payload: click });

export const setSmarts = (items) => ({ type: 'SET_SMARTS', payload: items });

export const setPopup = (popup) => ({ type: 'SET_POPUP', payload: popup });

export const fetchSmarts = (sort_popup, count) => (dispatch) => {
    axios.get(`/smarts?${count !== 0 ? `category=${count}` : ''}&_sort=${sort_popup === 'цене - Min' || sort_popup === 'цене - Max' ? "price" : "rating"}&_order=${sort_popup === 'цене - Max' || sort_popup === 'популярности' ? 'desc' : sort_popup === 'цене - Min' ? 'asc' : ''}`).then(({ data }) => {
        dispatch(setSmarts(data))
    });
};

