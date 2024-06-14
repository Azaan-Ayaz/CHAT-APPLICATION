import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { Container, TextField, Typography, Button } from "@mui/material";

const App = () => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:8080");

    socket.current.on("connect", () => {
      console.log("connected", socket.current.id);
    });

    socket.current.on("welcome", (s) => {
      console.log(s);
    });

    socket.current.on("receive-message", (data) => {
      console.log(data);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.current.emit("message", message);
    setMessage('');
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h1">
          Welcome to Socketit
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            value={message}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            style={{ marginTop: '10px' }}
          >
            Send
          </Button>
        </form>
      </Container>
    </>
  );
}

export default App;
