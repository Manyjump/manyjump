const HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);

// Invoke this function whenever the character jumps
// It sends a message to the server that the character has jumped
const sendJumpMessage = () => {
  ws.send(JSON.stringify({
    event: 'jump'
  }));
}

// Invoke this function whenever the character dies
// It sends a message to the server that the character has jumped
const sendDeathMessage = () => {
  ws.send(JSON.stringify({
    event: 'death'
  }));
}

document.addEventListener("DOMContentLoaded", function(event) {
  
  // WS Router
  ws.onmessage = function (event) {
    const message = JSON.parse(event.data);
    
    // Successful connection to server
    if (message.event === 'successfullyConnected') {
      // Display my name and id
      whoami.innerHTML = `I am ${message.user.name} (id: ${message.user.id})`;
    }
    
    if (message.event === 'newUserConnected' ||
        message.event === 'userDisconnected') {
      // THIS WILL BE REPLACED BY REACT (so much better)
      // Remove existing rows
      while (users.firstChild) {
        users.removeChild(users.firstChild);
      }
      
      // Display all other connected users
      for (let user in message.users) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${message.users[user].name} (id: ${message.users[user].id})`));
        users.appendChild(li);
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
  
});
