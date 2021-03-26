import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
// import Cart from './components/Cart/Cart';

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth/login" component={Auth} />
        <Route path="/home/products/:p_id" component={Product} />
        {/* <Route path="/cart/new" component={Cart} /> */}
    </Switch>
);