module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('🟢 New client connected:', socket.id);
  
      // Listen for an alert from the frontend
      socket.on('send_alert', (data) => {
        console.log('🚨 Alert received from client:', data);
  
        // Broadcast to all connected clients except sender
        socket.broadcast.emit('receive_alert', data);
      });
  
      socket.on('disconnect', () => {
        console.log('🔴 Client disconnected:', socket.id);
      });
    });
  };
  