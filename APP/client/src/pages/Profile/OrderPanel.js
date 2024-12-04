import React from 'react'

const OrderPanel = ({order}) => {
  return (
    <div className='order'>
        <p><b>ID: </b>{order.orderId}</p>
        <p><b>Status: </b>{order.status}</p>
        <p><b>Start Date: </b>{order.startDate}</p>
        <p><b>Total Price: </b>{order.totalPrice}</p>
        <p><b>Total Mass: </b>{order.totalMass}</p>
        <p><b>Address: </b>{order.address}</p>
    </div>
  )
}

export default OrderPanel