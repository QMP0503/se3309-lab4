import React, { useEffect, useState } from 'react'
import "./Profile.css"
import OrderPanel from './OrderPanel';

const Profile = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`/api/orders/${JSON.parse(sessionStorage.getItem("user")).user_id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setOrders(data)
        })
        .catch((error) => console.error('Error fetching gems:', error));
    }, []) 

  return (
    <div className='page-wrap'>
        <div className='profile-wrapper'>
            <div className=''>

            </div>
            <div className='order-wrapper'>
                {orders.map(order => {
                    return <OrderPanel order={order}></OrderPanel>
                })}
            </div>
        </div>
    </div>
  )
}

export default Profile