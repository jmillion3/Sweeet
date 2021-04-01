import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    const {cart_id} = props.match.params;
    const [cart, setCart] = useState([]);
    // const [total, setTotal] = useState([]);

    useEffect(() => {
        axios.get(`/cart/get`).then((res) => {
            setCart(res.data)
        })
    }, [cart_id])

    // useEffect(() => {
    //     let cartTotal = [];
    //     cart.reduce(acc, curr) => acc + curr.p_cost, acc
    //     setTotal(cartTotal)
    // })

    const cartDelete = (cart_id) => {
        axios.delete(`/cart/delete/${cart_id}`)
        // console.log(cart_id)
    }
    
    return(
        <div className="cart">
            <div className="cartProducts">
            {cart.map((cartP) => {
            // console.log(cartP)
            return(
                <li key={cartP.cart_id}>
                    <div className="flexCart">
                        {/* {console.log(cartP.cart_id)} */}
                        <img alt={`${cartP.p_image}`} src={`${cartP.p_image}`}></img>
                        <h3>{`${cartP.p_name}`}</h3>
                        {/* <img alt="Nutrition Facts" src={`${cartP.p_details}`}></img> */}
                        <h3>{`$${cartP.p_cost}.00`}</h3>
                        <button onClick={() => cartDelete(cartP.cart_id)}>Delete</button>
                    </div>
                </li>
            )
            })}
            </div>
        
            <div className="total">
                {/* {total} */}
            </div>
        </div>
        
    )
    
}

const mapStateToProps = state => state.cart;

export default connect(mapStateToProps)(Cart);