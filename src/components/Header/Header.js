import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {IconContext} from 'react-icons';
import {AiFillShop, AiOutlineShoppingCart} from 'react-icons/ai';
import {getUser, logoutUser} from '../../redux/userReducer';
import scallops from './SCALLOPS.png';
import './Header.css';

console.log(scallops)
class Header extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: true
        };
    }

    componentDidMount(){
        this.props.getUser();
    }

    logout = () => {
        axios.post('/auth/logout')
        .then(() => {
            this.props.logoutUser()
            this.props.history.push('/')
        });
    }

    render(){
    return <IconContext.Provider value={{size: "2em", color: "rgb(4, 219, 219)"}} className="icons">
    <div>
        <img src={scallops} alt="scallop" className="scallop"></img>
        {this.props.isLoggedIn ?
        <nav className="header">
            <div className="headLeft">
                <Link to="/">
                    <AiFillShop/>
                </Link>
            </div>
            <div className="headCenter">Sweeet</div>
            <div className="headRight">
                <Link to="/cart/get">
                    <div><AiOutlineShoppingCart/></div>
                </Link>
                <button onClick={this.logout}>Logout</button>
            </div>
        </nav>
        :
        <nav className="header">
            <div className="headLeft">
                <Link to="/">
                    <AiFillShop/>
                </Link>
            </div>
            <div className="headCenter">Sweeet</div>
            <div className="headRight">
                <div><AiOutlineShoppingCart/></div>
                <Link to="/auth/login">
                    <div>Login</div>
                </Link>
            </div>
        </nav>
    }
    </div>
    </IconContext.Provider>
    }   
}

const mapStateToProps = state => state.user;

export default withRouter(connect(mapStateToProps, {getUser, logoutUser})(Header));
