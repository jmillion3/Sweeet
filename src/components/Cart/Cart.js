import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
// import './Product.css'

const Cart = (props) => {
    const {p_id} = props.match.params
    const [cart, setCart] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4001/cart/start`).then((res) => {
            setCart(res.data)
        })
    }, [p_id])
    
    return(
        // {const [p_id, p_name, p_image, p_details, p_cost] = product}
        <div>
            <h1>{`${cart.p_name}`}</h1>
            <img alt={`${cart.p_image}`} src={`${cart.p_image}`}></img>
            <img alt="Nutrition Facts" src={`${cart.p_details}`}></img>
            <h3>{`$${cart.p_cost}.00`}</h3>
        </div>
    )
    
}

export default Cart;