const HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);

document.addEventListener("DOMContentLoaded", function(event) { 
  // WS Receiving test
  ws.onmessage = function (event) {
    if(message.innerHTML != event.data) message.innerHTML = event.data;
  };
  
  shared.addEventListener('input', function(event) {
    ws.send(this.value);
  });
  
});
