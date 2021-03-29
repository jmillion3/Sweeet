import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// import {Link} from 'react-router-dom';
// import './Product.css'

const Cart = (props) => {
    const {p_id} = props.match.params
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(`/cart/get`).then((res) => {
            setCart(res.data)
        })
    }, [p_id])
    
    return(
        <div className="cart">
        {cart.map((cartP) => {
            console.log(cartP)
            return(
                <li key={cartP.cart_id}>
                    <div>
                        {/* {console.log(cart.cart_id)} */}
                        <h1>{`${cartP.p_name}`}</h1>
                        <img alt={`${cartP.p_image}`} src={`${cartP.p_image}`}></img>
                        <img alt="Nutrition Facts" src={`${cartP.p_details}`}></img>
                        <h3>{`$${cartP.p_cost}.00`}</h3>
                    </div>
                </li>
            )
        })}
        </div>
        
    )
    
}

const mapStateToProps = state => state.cart;

export default connect(mapStateToProps)(Cart);