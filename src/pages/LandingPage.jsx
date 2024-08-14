import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Guitar from '../components/Guitar'
import { db } from '../data/db';

const LandingPage = () => {
      const [data, setData] = useState(db);
      const [cart, setCart] = useState([]);



      console.log(cart);
      const addToCart = (guitar) => {
            setCart(prevCart => [...prevCart, guitar])
      }

      return (
            <div>
                  <Header />

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