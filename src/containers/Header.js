import React, {Component} from 'react';
import {Layout, Button, Modal} from 'antd';
import NavBar from '../components/NavBar';
import {Form, Input} from 'antd'
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons'

const {Header: LayoutHeader} = Layout

class Header extends Component {
    state = {
        current: 'mail',
        searchLoading: false,
        modalVisible: false,
        modalType: "Sign Up"
    };
    
    handleClick = e => {
        this.setState({
          current: e.key,
        });
    };

    enterSearchLoading = () => {
        this.setState({searchLoading: true });
    };

    handleClose = () => {
        this.setState({
            modalVisible: false
        })
    }

    signUpModal = () => {
        this.setState({
            modalVisible: true,
            modalType: "Sign Up"
        })
    }

    loginModal = () => {
        this.setState({
            modalVisible: true,
            modalType: "Login"
        })
    }

    signUpForm = () => {
            return(
            <Form name="signup-form" onFinish={this.props.userSignUp}>
                <Form.Item name="username" rules={[{required: true, message: 'Please input username.'}]}>
                    <Input prefix={<UserOutlined className="user-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item name="email" rules={[{type: 'email', message: 'Not a valid email!'}, {required: true, message: 'Please input email.'}]}>
                    <Input prefix={<MailOutlined className="mail-icon"/>} placeholder="Email"/>
                </Form.Item>
                <Form.Item name="password" rules={[{required: true, message: 'Please input password.'}, {min: 6, message: 'Password must be longer than 6 characters'}]}>
                    <Input.Password prefix={<LockOutlined className="pass-icon"/>} placeholder="Password"/>
                </Form.Item>
                <Form.Item name="password_confirmation" dependences={['password']} rules={[{required: true, message: 'Please confirm password.'}, ({getFieldValue}) => ({validator(rule, value) {if(!value || getFieldValue('password') === value){return Promise.resolve()} else {return Promise.reject('The two passwords that you entered do not match!')}}})]}>
                    <Input.Password prefix={<LockOutlined className="pass-icon"/>} placeholder="Confirm Password"/>
                </Form.Item>
                <Form.Item >
                    <Button onClick={this.handleClose} style={{position: 'absolute', left: '45%', top: '50%'}} type="primary" htmlType="submit" className="signup-button">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            )
        }

    loginForm = () => {
        return(
            <Form name="login-form" onFinish={this.props.userLogin}>
                <Form.Item name="email" rules={[{type: 'email', message: 'Not a valid email!'}, {required: true, message: 'Please input email.'}]}>
                    <Input prefix={<MailOutlined className="mail-icon"/>} placeholder="Email"/>
                </Form.Item>
                <Form.Item name="password" rules={[{required: true, message: 'Please input password.'}]}>
                    <Input.Password prefix={<LockOutlined className="pass-icon"/>} placeholder="Password"/>
                </Form.Item>
                <Form.Item>
                    <Button onClick={this.handleClose} style={{position: 'absolute', left: '45%', top: '50%'}} type="primary" htmlType="submit" className="login-button">
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        )
    }

     render() {
        return (
            <LayoutHeader style={{ position: 'fixed', zIndex: 1, width: '100%' }} alignItems="right">
                <NavBar float="right" handleClick={this.handleClick} current={this.state.current} searchLoading={this.state.searchLoading} enterSearchLoading={this.enterSearchLoading}/>
                <div style={{position: 'relative', left: '90%', bottom: '100%'}}>
                    {this.props.loggedIn ?  <Button type="primary">Profile</Button> : <Button type="primary" style={{margin: '3px'}} onClick={()=>this.signUpModal()}>Sign Up</Button>}
                    {this.props.loggedIn ? <Button onClick={()=>this.props.userLogOut()}>Log Out</Button> : <Button onClick={()=>this.loginModal()}>Login</Button>}
                </div>
                <Modal title={this.state.modalType} visible={this.state.modalVisible} onOk={this.handleClose} onCancel={this.handleClose}>
                    {this.state.modalType === "Sign Up" ? this.signUpForm() : this.loginForm()}
                </Modal>
            </LayoutHeader>

        );
     }
 }

export default Header
