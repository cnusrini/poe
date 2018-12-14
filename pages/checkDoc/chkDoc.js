import React, { Component } from 'react';
import { Button, Divider, Form, Header, Icon, Input, Message, Segment } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import contractInstance from '../../proofOFExistenceSC/contract';
import web3 from '../../proofOFExistenceSC/web3' ;
import { Link, Router } from '../../routes' ;

class checkDOC extends Component{
  state = {
    inputHandler: '',
    errMessage: '',
    loading: false
  };
  handleChange = async (event) => {
    event.preventDefault();

    this.setState({inputHandler: event.target.value});
    console.log('in onChange' + event.target.value);
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('in onsubmit');

    try{
        let isFormValid = await this.formValidation();
        if(isFormValid){
          console.log('in if');
          const accounts = await web3.eth.getAccounts();
          await contractInstance.methods.notarize(this.state.inputHandler).send({
          from : accounts[2]
          });
          Router.pushRoute('/checkDoc/Transaction');
        }
        else{
          console.log('in else');
        }
      } catch(err){
      console.log(err.message);
      this.setState({errMessage: error.message});
    }

    //this.setState({loading:true, errMessage:''});
    this.setState({loading:false});
  };
  formValidation = async (event) => {
    let localInputHandler = this.state.inputHandler;
    let isFormValid = true;

      if(localInputHandler.trim() == '') {
        isFormValid = false;
      }

      return isFormValid;
      console.log('in iflocalInpurHandler at return' + isFormValid)
  };
  render(){
    return (
        <Layout>
          <Header as='h2' textAlign='center'> Verify handler for Proof Of Existence </Header>
          <Segment padded>
            <Form  onSubmit={this.handleSubmit} >
              <Form.Field>
                <Input icon='truck' iconPosition='left' placeholder='enter text to verify'
                type='text'
                value={this.state.inputHandler}
                onChange={this.handleChange}
                />
              </Form.Field>
              <Message negative>
                  Please provide case sensitive value to perform ProofOFExistence
                     ex: value != Value
              </Message>
              <Divider/>
              <Button compact fluid type='submit' color='teal' >
              Verify
              </Button>
            </Form>
          </Segment>
        </Layout>
    );
  }

}

export default checkDOC;
