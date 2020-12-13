export const addSmartToCart = (smartObj) => ({ type: "ADD_SMART_CART", payload: smartObj });

export const clearCart = () => ({ type: "CLEAR_CART" });

export const removeCartItem = (id) => ({ type: "REMOVE_SMART", payload: id });

export const plusCartItem = (id) => ({ type: 'PLUS_CART_ITEM', payload: id, });

export const minusCartItem = (id) => ({ type: 'MINUS_CART_ITEM', payload: id, });

