import React, {Component} from 'react';
import {Menu, Button} from 'antd';
import SearchBar from './SearchBar'

const NavBar = props => {
        return (
            <Menu theme="dark" onClick={props.handleClick} selectedKeys={[props.current]} mode="horizontal">
                <Menu.Item key="mail">
                    Navigation One
                </Menu.Item>
                <Menu.Item key="app">
                    Navigation Two
                </Menu.Item>
                <SearchBar searchLoading={props.searchLoading} enterSearchLoading={props.enterSearchLoading}/>
            </Menu>
        );
 }

export default NavBar
