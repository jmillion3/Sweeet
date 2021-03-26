import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
// import './Product.css'

const Product = (props) => {
    const {p_id} = props.match.params
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4001/home/products/${p_id}`).then((res) => {
            setProduct(res.data)
        })
    }, [p_id])
    
    return(
        // {const [p_id, p_name, p_image, p_details, p_cost] = product}
        <div>
            <h1>{`${product.p_name}`}</h1>
            <img alt={`${product.p_image}`} src={`${product.p_image}`}></img>
            <img alt="Nutrition Facts" src={`${product.p_details}`}></img>
            <h3>{`$${product.p_cost}.00`}</h3>
        </div>
    )
    
}

export default Product;