import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Home.css'


const Home = (props) => {
    // const [user, setUser] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get('/home/products').then((res) => {
            // console.log(res.data)
            setProductList(res.data)
        })
    }, [])
    // console.log(productList)
    return (
        <div className="home">
          {productList.map((product) => {
              // console.log(product)
            return (
                  <li key={product.p_name} className="homeLi zoom">
                    <div className="zoom">
                      {/* <p>{`${product.p_name}`}</p> */}
                    <Link key={product.name} to={`/home/products/${product.p_id}`} className="candy">
                      <img src={product.p_image} alt="productImg" className="productImg"/>
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
