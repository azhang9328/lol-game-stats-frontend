import React, {Component} from 'react'
import {Modal, Button} from 'antd'

class SignUp extends Component {

    render(){
        const {signUpVisible, handleClose} = this.props
        return (
            <div>
            <Modal
              title="Title"
              visible={signUpVisible}
              onOk={handleClose}
              onClose={handleClose}
            >
              <p>Test</p>
            </Modal>
          </div>
        )
    }
}

export default SignUp