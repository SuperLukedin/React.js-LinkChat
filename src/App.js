import React, { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core'
import Message from './Message/Message'
import './App.css';
import db from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import { usePageVisibility } from './visibility/visHook'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const isVisible = usePageVisibility()
  // const [counter, setCounter] = useState(0)

  // if (isVisible) {
  //   document.title = 'Link Chat';
  // } else {
  //   document.title = 'Unread';
  // }

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
      localTime: new Date().toLocaleString().split(',')[1],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })    
    setInput('')
  }

  return (
    <div className="App">
      <img className="wechat" src="https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/2f/e6/93/2fe693f7-eb2c-d356-61e7-0778b487289e/AppIcon-85-220-0-4-2x.png/246x0w.png" alt=""/>
      <h1>Link Chat</h1>
      <div className="welcome">
        <p>★</p>
        <h2>Welcome {username}</h2>
        <p>★</p>
      </div>
      <div className="form__container">
        <form className="app__form">
          <FormControl className="app__formControl">          
            <Input className="app__input" placeholder="Enter a message" value={ input } onChange={e => setInput(e.target.value)} />
            <IconButton className="app__iconButton" disabled={!input} onClick={ sendMessage }  color="primary" type="submit" variant="contained">
              <SendIcon />
            </IconButton>             
          </FormControl>                
        </form>
      </div>
      
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={ username } message={ message } />      
          ))
        }
      </FlipMove>  
    </div>
  );
}

export default App;
