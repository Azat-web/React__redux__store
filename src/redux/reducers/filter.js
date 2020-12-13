const initialState = {
    count: 0,
    popup: 'популярности',
    click: 0,
    items: [],
}

const filtersReducer = (state= initialState, action)=>{
    if (action.type==="SET_CATEGORY"){
           return {
               ...state,
               count: action.payload
           }}
    if (action.type==="SET_CLICK"){
            return {
                ...state,
                click: action.payload
            }}
    if (action.type==="SET_SMARTS"){
                return {
                    ...state,
                    items: action.payload
                }}
    if (action.type==="SET_POPUP"){
                    return {
                        ...state,
                        popup: action.payload
                    }}
    return state 
    }
    

export default filtersReducer