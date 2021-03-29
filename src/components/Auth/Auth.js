import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/userReducer';
import axios from 'axios';
import './Auth.css';

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            newUser: false
        }
    }

    login = async (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        try {
            const user = await axios.post('/auth/login', {username, password})
            this.props.loginUser(user.data)
            this.props.history.push('/')
        } 
        catch {
            alert('failed login attempt')
        }
    }

    register = async (e) => {
        e.preventDefault();
        const {email, username, password, firstName, lastName} = this.state;
        try {
            const user = await axios.post('/auth/register', {email, username, password, firstName, lastName})
            this.props.loginUser(user.data);
            this.props.history.push('/')
        }
        catch {
            alert('failed register attempt')
        }
    }

    toggleNewUser = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return <div className="auth">
            {!this.state.newUser ?
            <form onSubmit={this.login}>
                <h1>Sweeet</h1>
                <input 
                type='text'
                placeholder='username'
                name='username'
                value={this.state.username}
                onChange={this.changeHandler}/>
                <input 
                type='password'
                placeholder='password'
                name='password'
                value={this.state.password}
                onChange={this.changeHandler}/>
                <input
                className="button"
                type="submit"
                value="Login"/>
                <button
                className="button" 
                onClick={this.toggleNewUser}>Register</button>
            </form>
            :
            <form onSubmit={this.register}>
                <h2>REGISTER</h2>
                <input 
                type='email'
                placeholder='email*'
                name='email'
                value={this.state.email}
                onChange={this.changeHandler}/>
                <input 
                type='text'
                placeholder='username*'
                name='username'
                value={this.state.username}
                onChange={this.changeHandler}/>
                <input 
                type='password'
                placeholder='password*'
                name='password'
                value={this.state.password}
                onChange={this.changeHandler}/>
                <input 
                type='text'
                placeholder='First Name*'
                name='firstName'
                value={this.state.firstName}
                onChange={this.changeHandler}/>
                <input 
                type='text'
                placeholder='Last Name*'
                name='lastName'
                value={this.state.lastName}
                onChange={this.changeHandler}/>
                <input
                type="submit"
                value="Register"/>
                <button onClick={this.toggleNewUser}>Return to Login</button>
            </form>
    }
        </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser})(Auth);