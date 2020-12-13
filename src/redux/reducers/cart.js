const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
}

const getTotalPrice = (arr) => arr.reduce((accum, elem) => elem.price + accum, 0);

const get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val, key) => {
        return val[key];
    }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = get(obj, path);
        return sum + value;
    }, 0);
}

const cartReducer = (state = initialState, action) => {
    if (action.type === "SET_TOTAL_PRICE") {
        return {
            ...state,
            totalPrice: action.payload
        }
    }
    if (action.type === "SET_TOTAL_COUNT") {
        return {
            ...state,
            totalCount: action.payload
        }
    }
    if (action.type === "ADD_SMART_CART") {
        const currentSmartItems = !state.items[action.payload.id]
            ? [action.payload]
            : [...state.items[action.payload.id].items,                      //возьми все старые значения 
            action.payload];                                      // добавь в новый объект

        const newItems = {
            ...state.items,
            [action.payload.id]: {
                items: currentSmartItems,
                totalPrice: getTotalPrice(currentSmartItems),
            }
        };

        const items = Object.values(newItems).map(obj => obj.items);
        const allSmart = [].concat.apply([], items);
        const totalPrice = getTotalPrice(allSmart);


        return {
            ...state,
            items: newItems,
            totalCount: allSmart.length,    //считаем количество смртфонов, которые мы добавили в корзину 
            totalPrice: totalPrice // считаем общую сумму
        }
    }
    if (action.type === "SET_POPUP") {
        return {
            ...state,
            popup: action.payload
        }
    }
    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            items: {},
            totalPrice: 0,
            totalCount: 0,
        }
    }
    if (action.type === "REMOVE_SMART") {
        const removeItems = { ...state.items } // берем старое значение 
        const currentTotalPrice = removeItems[action.payload].totalPrice; // перед тем как удалить свойство, вытащим totalPrice
        const currentTotalCount = removeItems[action.payload].items.length    // вытащим кол-во смартфонов
        delete removeItems[action.payload];  //копируем его, но удаляя определенный объект
        return {
            ...state,
            items: removeItems,                 //возвращаем новый объект
            totalPrice: state.totalPrice - currentTotalPrice,
            totalCount: state.totalCount - currentTotalCount,
        }
    }
    if (action.type === 'PLUS_CART_ITEM') {
        const newObjItems = [
            ...state.items[action.payload].items,
            state.items[action.payload].items[0],
        ];
        const newItems = {
            ...state.items,
            [action.payload]: {
                items: newObjItems,
                totalPrice: getTotalPrice(newObjItems),
            },
        };

        const totalCount = getTotalSum(newItems, 'items.length');
        const totalPrice = getTotalSum(newItems, 'totalPrice');
        return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice,
        };
    }

    if (action.type === 'MINUS_CART_ITEM') {
        const oldItems = state.items[action.payload].items;
        const newObjItems =
            oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
        const newItems = {
            ...state.items,
            [action.payload]: {
                items: newObjItems,
                totalPrice: getTotalPrice(newObjItems),
            },
        };

        const totalCount = getTotalSum(newItems, 'items.length');
        const totalPrice = getTotalSum(newItems, 'totalPrice');

        return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice,
        };
    }

    return state
}


export default cartReducer