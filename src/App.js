import React, { Component } from 'react';

import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  
  state = {
    contacts: []
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      this.setState(state =>  ({ contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => {
          return <ListContacts
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts}/>
        }} />

        <Route path='/create' render={({ history }) => {
          return <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact);
              history.push('/');
            }} />
        }} />
      </div>
    )
  }
}

export default App;
