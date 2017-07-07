const HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);

document.addEventListener("DOMContentLoaded", function(event) { 
  // WS Router
  ws.onmessage = function (event) {
    const message = JSON.parse(event.data);
    
    console.log(message);
    
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
    
    // Another user connected
    //if (message.event)
  };
  
  shared.addEventListener('input', function(event) {
    ws.send(this.value);
  });
  
});
