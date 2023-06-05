import React, { Component } from 'react';
import PostService from '../services/PostService';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ResetPasswordComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        	showPasswordDialog:true,
            message:'',
            error:'',
            newPassword:'',
            oldPassword:''

                 
        }

       
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onHide(){
  this.setState({showPasswordDialog:false});
}
login=(e)=>{
    e.preventDefault();
    this.props.history.push('/');
}


renderFooter() {
        return (
            <div>
                <Button label="Cancel"  onClick={() => this.onHide()} className="p-button-text" />
                
            </div>
        );
    }
    render() {
        return (
            <div>
              <Dialog header="Reset Password" footer={this.renderFooter()} visible={this.state.showPasswordDialog} style={{ width: '30vw' }}>
                        <br/><input  placeholder="Enter OldPassword" name="oldPassword" className="form-control"  
                                                value={this.state.oldPassword} onChange={this.handleChange}/>
                        <br/><input  placeholder="Enter NewPassword" name="newPassword" className="form-control"  
                                                value={this.state.newPassword} onChange={this.handleChange}/>
                    <br/><span className="error"> {this.state.error}</span>
                    <span className="message"> {this.state.message}</span>
                        </Dialog>  
            </div>
        )
    }
}

export default ResetPasswordComponent
