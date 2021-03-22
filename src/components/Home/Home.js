// import React from 'react';

// const Home = () => {
//     return (
//         <div>Home component</div>
//     )
// }

// export default Home;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Home.css'


const Home = () => {
    // const [user, setUser] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4001/home/products').then((res) => {
            // console.log(res.data)
            setProductList(res.data)
        })
    }, [])
    // console.log(productList)
    return (
        <div className="home">
          {productList.map((product) => {
            //   console.log(product)
            return (
                  <li key={product.p_name} className="friends">
                    <div>
                      {/* <p>{`${product.p_name}`}</p> */}
                    <Link to="/product/:id">
                      <img src={product.p_image} alt="productImg"/>
                    </Link>
                      <h3>{`${product.p_name}`}</h3>
                      <h3>{`$${product.p_cost}.00`}</h3>
                    </div>
                  </li>
            )
          })}
          
        </div>
      )
}

export default Home;
