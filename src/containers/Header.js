import React, {Component} from 'react';
import {Layout, Button, Modal} from 'antd';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar'
import SignUp from '../components/SignUp'

const {Header: LayoutHeader} = Layout

class Header extends Component {
    state = {
        current: 'mail',
        searchLoading: false,
        modalVisible: false
    };
    
    handleClick = e => {
        this.setState({
          current: e.key,
        });
    };

    enterSearchLoading = () => {
        this.setState({searchLoading: true });
    };
      
    showModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    handleClose = () => {
        this.setState({
            modalVisible: false
        })
    }

    modalContent = () => {

    }

     render() {
        return (
            <LayoutHeader style={{ position: 'fixed', zIndex: 1, width: '100%' }} alignItems="right">
                <NavBar float="right" handleClick={this.handleClick} current={this.state.current} searchLoading={this.state.searchLoading} enterSearchLoading={this.enterSearchLoading}/>
                <div style={{position: 'relative', left: '90%', bottom: '100%'}}>
                    <Button type="primary" style={{margin: '3px'}} onClick={()=>this.showModal()}>Sign Up</Button>
                    {this.props.loggedIn ? <Button>Login</Button> : <Button>Log Out</Button>}
                </div>
                <Modal title="Title" visible={this.state.modalVisible} onOk={this.handleClose} onCancel={this.handleClose}>
                    {this.modalContent}
                </Modal>
            </LayoutHeader>

        );
     }
 }

export default Header
