import { createContext, useEffect, useState } from 'react';

// manera de usar stateProvider en react, se usa createContext de react y se crea un componente que luego lo ponemos en la app general
export const CartContext = createContext({})

export default function CartContextProvider({ children }) {

  // si la ventana es difrente a undefined entonces muestro 
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);

  // cada vez que cambie cartProducts se inicia el useEffect
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts]);

  useEffect(() => {
    // tratamos de capturar los productos del localstorage
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  //   funcion para agregar productos por el id al carrito
  function addProductToCart(productId) {
    setCartProducts(prev => [...prev, productId])
  }

  // funcion para sacar producto del carrito , sacamos del array con indexOf
  function removeProductToCart(productId) {
    // primero guardamos la posicion en una vble con indexOf y luego chequeamos con index, todas props del array- Y retornamos el valor antrior
    setCartProducts(prev => {
      const position = prev.indexOf(productId);
      if (position !== -1) {
        return prev.filter((value, index) => index !== position);
      };

      return prev;
    });
  }
  // vaciamos el carrito,
  function clearCart() {
    localStorage.removeItem('cart');
  }


  return (
    // como no es un unico valor, lo poenmos como objeto entre {} y le voy pasando lo que quiero que sea proveedor para toda la app
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProductToCart, removeProductToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
