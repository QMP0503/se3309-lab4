import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import "./Cart.css"
const host = `http://${window.location.hostname}:5000`;


function Cart() {
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For redirecting

    //safe initialization of cartItems
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = sessionStorage.getItem("cartList");
        return storedCart ? JSON.parse(storedCart) : {
            customerId: null,
            startDate: '',
            totalPrice: 0,
            totalMass: 0,
            status: '',
            products: []
        };
    });


    function updateCart(id, quan) {
        let stored = JSON.parse(sessionStorage.getItem("cartList"));
        const itemIndex = stored.products.findIndex(product => product.productId === id);
        if (itemIndex !== -1) {
            stored.products[itemIndex].quantity = quan;
        }
        sessionStorage.setItem("cartList", JSON.stringify(stored));
    }


    function removeItem(id) {
        let stored = JSON.parse(sessionStorage.getItem("cartList"));
        stored.products = stored.products.filter(product => product.productId !== id);
        sessionStorage.setItem("cartList", JSON.stringify(stored));

        setCartItems(stored);
    }


    const placeOrder = async () =>{
        //api call to place order
        try {
            const response = await fetch(`${host}/api/placeOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({cartItems})
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Order failed');
            }
            console.log(result.message);
            //redirect to home page
            navigate('/');

        } catch (err) {
            setError(err.message);
        }
    }


    return (
        <div className='page-wrap'>
            <div className='cart-page-wrapper'>
                <div className='container-wrapper'>
                    <div className='cart-container'>
                        {cartItems.map(item => {
                            return (
                                <div className='cart-item'>
                                    <h2>{item.id}</h2>
                                    <input
                                        onKeyDown={event => event.preventDefault()} type='number' min={0}
                                        defaultValue={item.quantity}
                                        onChange={e => updateCart(item.id, e.target.value)}>
                                    </input>
                                    <button
                                        value={item.id}
                                        onClick={e => removeItem(e.target.value)}
                                    >
                                        Remove Item
                                    </button>
                                </div>)
                        })}
                    </div>
                    <div className='order-details-container'>
                        <h3>Total Mass: </h3>
                        <h3>Total Price: </h3>
                    </div>
                </div>
                <div className='container-wrapper'>
                    {error && <p className='error-message'>{error}</p>}
                    <button onClick={placeOrder}>Place Order</button>
                    <button>Cancel Order</button>
                </div>
            </div>
        </div>
    )


}

export default Cart