import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Guitar from '../components/Guitar'
import { db } from '../data/db';

const LandingPage = () => {
      const [data, setData] = useState(db);
      const [cart, setCart] = useState([]);


      const addToCart = (item) => {
            const itemExists = cart.findIndex(guitar => guitar.id === item.id);

            if (itemExists >= 0) {
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

      return (
            <div>
                  <Header
                        cart={cart}
                        handleRemoveFrontCart={handleRemoveFrontCart}
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