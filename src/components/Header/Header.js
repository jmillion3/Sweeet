import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, logoutUser} from '../../redux/userReducer';
import './Header.css';

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
    return <div>
        {this.props.isLoggedIn ?
        <nav className="header">
            <div className="headLeft">
                <Link to="/">
                    Home Icon
                </Link>
            </div>
            <div className="headCenter">Center/Logo</div>
            <div className="headRight">
                <button onClick={this.logout}>Logout</button>
                <div>Cart Icon</div>
            </div>
        </nav>
        :
        <nav className="header">
            <div className="headLeft">
                <Link to="/">
                    Home Icon
                </Link>
            </div>
            <div className="headCenter">Center/Logo</div>
            <div className="headRight">
                <Link to="/auth/login">
                    <div>Auth</div>
                </Link>
                    <div>Cart Icon</div>
            </div>
        </nav>
    }
    </div>
    }   
}

const mapStateToProps = state => state.user;

export default withRouter(connect(mapStateToProps, {getUser, logoutUser})(Header));
