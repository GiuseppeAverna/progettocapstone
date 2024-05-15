import { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ChatSupport = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const supportResponses = [
    "Ciao, come possiamo aiutarti? Fai una domanda! 😊",
    "Abbiamo preso in considerazione la tua richiesta, ti risponderemo nel più breve tempo possibile!😁",
    "Ti ringraziamo in anticipo per la tua pazienza, nell'attesa puoi usufruire del notro servizio clienti al numero 📞+3914429763",
  ];
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    if (messages.length === 0) {
      setMessages([{ text: supportResponses[0], user: "support" }]);
    }
    setTimeout(() => textAreaRef.current.focus(), 0);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    setMessages([...messages, { text: message, user: "you" }]);
    setMessage("");
    setTimeout(() => {
      const nextResponseIndex =
        messages.filter((msg) => msg.user === "support").length %
        supportResponses.length;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: supportResponses[nextResponseIndex],
          user: "support",
        },
      ]);
      if (nextResponseIndex === 1) {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: supportResponses[2],
              user: "support",
            },
          ]);
        }, 2000);
      }
    }, 4000);
  };

  return (
    <>
      {!show && (
        <Button variant="primary" onClick={handleShow} className="chat-button">
          Assistenza Online
        </Button>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        className={`chat-modal ${show ? "open" : "close"}`}
        backdrop={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="chat-title">Assistenza Online</Modal.Title>
        </Modal.Header>
        <Modal.Body className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.user}`}>
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="chatMessage">
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={handleChange}
                required
                ref={textAreaRef}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-button">
              Invia
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChatSupport;
