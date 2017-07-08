import React, { Component } from 'react';
import Character from './Character.jsx';

function getInitialState() {
  return {
    jump: false,
    lastJumpTime: 0,
    users: {}
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.setFalse = this.setFalse.bind(this);
    this.state = getInitialState();
  }

  // Jump handling
  handleKey(value, e) {
    let jump = this.state.jump;
    let lastJumpTime = this.state.lastJumpTime
    if(e.keyCode === 32 && !jump && (Date.now() - lastJumpTime) >= 1500) {
      setTimeout(this.setFalse, 1200);
      this.setState({
        jump: true,
        lastJumpTime: Date.now()
      });
      this.sendJumpMessage();
    }

  }

  setFalse() {
    if (this.state.jump) this.setState({jump : false});
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKey.bind(this, true));
    
    // Set up Websocket
    const HOST = location.origin.replace(/^http/, 'ws')
    this.ws = new WebSocket(HOST);
    
    // WS Router
    this.ws.onmessage = function (event) {
      const message = JSON.parse(event.data);

      // Successful connection to server
      if (message.event === 'successfullyConnected') {
        // Display my name and id
        console.log(`I am ${message.user.name} (id: ${message.user.id})`);
      }

      if (message.event === 'newUserConnected' || message.event === 'userDisconnected') {
        for (let user in message.users) {
          console.log(`${message.users[user].name} (id: ${message.users[user].id})`);
        }
      }

      if (message.event === 'characterJumped') {
        // message.id will contain which character jumped
        console.log(`${message.id} jumped!`);
      }

      if (message.event === 'characterDied') {
        // message.id will contain which character died
        console.log(`${message.id} died!`);
      }
    };
  }

  // Invoke this function whenever the character jumps
  // It sends a message to the server that the character has jumped
  sendJumpMessage() {
    this.ws.send(JSON.stringify({
      event: 'jump'
    }));
  }

  // Invoke this function whenever the character dies
  // It sends a message to the server that the character has jumped
  sendDeathMessage() {
    this.ws.send(JSON.stringify({
      event: 'death'
    }));
  }
  
  render() {

    // document.body.onkeyup = this.handleKey;
    const style = this.state.jump ? ' jump' : '' ;

    return (
      <Character jump={style} />
    )
  }
}

export default App
