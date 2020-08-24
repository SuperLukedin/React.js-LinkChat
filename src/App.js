import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core'
import Message from './Message/Message'
import './App.css';
import db from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])
  useEffect(() => {
    // run when component loads
    setUsername(prompt('Please enter your name'))
  }, []) // condition: if it is blank, this code runs once when the app component loads.

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })    
    setInput('')
  }

  return (
    <div className="App">
      <img className="wechat" src="https://cdn.cjr.org/wp-content/uploads/2017/10/Untitled-1-500x500.jpg" alt=""/>
      <h1>Little Chat</h1>
      <div className="welcome">
        <p>★</p>
        <h2>Welcome {username}</h2>
        <p>★</p>
      </div> 
      <form className="app__form">
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input value={ input } onChange={e => setInput(e.target.value)} />
          <IconButton disabled={!input} onClick={ sendMessage }  color="primary" type="submit" variant="contained">
            <SendIcon />
          </IconButton>             
        </FormControl>                
      </form>
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={ username } message={ message }/>      
          ))
        }
      </FlipMove>  
    </div>
  );
}

export default App;
