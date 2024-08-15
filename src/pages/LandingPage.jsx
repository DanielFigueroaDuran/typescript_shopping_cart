import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Guitar from '../components/Guitar'
import { db } from '../data/db';

const LandingPage = () => {
      const initialCart = () => {
            const localStorageCart = localStorage.getItem('cartGuitar');
            return localStorageCart ? JSON.parse(localStorageCart) : [];
      }

      const [data, setData] = useState(db);
      const [cart, setCart] = useState(initialCart);

      const MAX_ITEMS = 10;
      const MIN_ITEMS = 1;

      useEffect(() => {
            localStorage.setItem('cartGuitar', JSON.stringify(cart));
      }, [cart]);

      const addToCart = (item) => {
            const itemExists = cart.findIndex(guitar => guitar.id === item.id);

            if (itemExists >= 0) {

                  if (cart[itemExists].quantity >= MAX_ITEMS) return;

                  const updatedCart = [...cart];
                  updatedCart[itemExists].quantity++;
                  setCart(updatedCart);
            } else {
                  item.quantity = 1;
                  setCart([...cart, item]);
            }

      }

      const handleRemoveFrontCart = (id) => {

            setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
      }

      const handleIncreaseQuantity = (id) => {
            const updateCartIncrease = cart.map(item => {
                  if (item.id === id && item.quantity < MAX_ITEMS) {
                        return {
                              ...item,
                              quantity: item.quantity + 1
                        }
                  }
                  return item
            });

            setCart(updateCartIncrease);
      }

      const handleDescrementoQuantity = (id) => {
            const updateDecrease = cart.map(item => {
                  if (item.id === id && item.quantity > MIN_ITEMS) {
                        return {
                              ...item,
                              quantity: item.quantity - 1
                        }
                  }
                  return item
            });

            setCart(updateDecrease);
      }

      const handleClearCart = () => {
            setCart([]);
      }


      return (
            <div>
                  <Header
                        cart={cart}
                        handleRemoveFrontCart={handleRemoveFrontCart}
                        handleIncreaseQuantity={handleIncreaseQuantity}
                        handleDescrementoQuantity={handleDescrementoQuantity}
                        handleClearCart={handleClearCart}
                  />

                  <main className="container-xl mt-5">
                        <h2 className="text-center">Nuestra Colección</h2>

                        <div className="row mt-5">
                              {data.map((guitar) => (
                                    <Guitar
                                          key={guitar.id}
                                          guitar={guitar}
                                          addToCart={addToCart}
                                    />
                              ))}

                        </div>
                  </main>

                  <Footer />
            </div>
      )
}

export default LandingPage