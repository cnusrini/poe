import React, { Component } from 'react';
import { Button, Divider, Form, Header, Icon, Input, Message, Segment } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import contractInstance from '../../proofOFExistenceSC/contract';
import web3 from '../../proofOFExistenceSC/web3'

class checkDOC extends Component{
  state = {
    inputHandler: '',
    errMessage: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();
    try{
      const accounts = await web3.eth.getAccounts();
      await contractInstance.methods.notarize(this.state.inputHandler).send({
      from : accounts[2]
    });
  } catch(error){
    this.setState({errMessage: error.message});

  }

  };
  render(){
    return (
        <Layout>
          <Header as='h2' textAlign='center'> Verify handler for Proof Of Existence </Header>
          <Segment padded>
            <Form  onSubmit={this.onSubmit} error={!!this.state.errMessage}>
              <Form.Field>
                <Input icon='truck' iconPosition='left' placeholder='enter text to verify'
                value = {this.state.inputHandler}
                onChange= {event => this.setState({inputHandler: event.target.value})}
                />
              </Form.Field>
              <Message error header='verify your text' content={this.state.errMessage}/>
              <Divider/>
              <Button fluid type='submit' color= 'teal' >Verify</Button>
            </Form>
          </Segment>
        </Layout>
    )
  }

}

export default checkDOC;
