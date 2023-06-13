import React, { Component } from 'react';
import {Contacts} from '../Pages/Contacts/Contacts'

const ContactsContainer = ({user, history, ...rest}) => {
  
  return (
    <div>
      <h2>Contacts Container</h2>
      <Contacts user={user}/>
    </div>
  );
};

export default ContactsContainer;
