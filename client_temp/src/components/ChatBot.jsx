import "./ChatBot.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendChatMessage } from "../redux/actions/index";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedState = localStorage.getItem("chatbotState");
    setIsMinimized(savedState === "minimized");
  }, []);

  useEffect(() => {
    if (messages.length === 0 && !isMinimized) {
      setMessages([
        {
          text: "¡Hola! 👋 Soy el asistente virtual de APIDC. ¿En qué puedo ayudarte?",
          isBot: true,
        },
      ]);
    }
  }, [isMinimized, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem("chatbotState", newState ? "minimized" : "open");
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    const prompt = `
    Sos un asistente virtual de APIDC, una ONG argentina dedicada a la difusión, cultivo y uso terapéutico del cannabis medicinal. Tu única función es ayudar al usuario con consultas relacionadas a APIDC: información institucional, cómo asociarse, actividades, contacto, ubicación, cursos, y trámites como el REPROCANN.
    
    También informá que terciarizamos el servicio de cultivo, es decir, que podemos cultivar marihuana para los usuarios que lo necesiten.
    
    No respondas consultas que no estén directamente relacionadas con APIDC. Si el usuario pregunta sobre temas que no tienen que ver con la organización o su ámbito (como temas médicos generales, legales que excedan a APIDC, entretenimiento, etc.), indicale amablemente que solo podés ayudar con información sobre APIDC y redirigilo a fuentes externas si es necesario.
    
    Siempre hablá en español, de forma respetuosa, empática y cercana.
    No hace falta que saludes.
    
    Mensaje del usuario: ${inputMessage}
    `;

    try {
      const botResponse = await dispatch(sendChatMessage({ message: prompt }));
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      console.error("Error con el chatbot:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Lo siento, hubo un error. Por favor intenta nuevamente.",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <motion.button
        className="floating-button"
        onClick={toggleChat}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
        </svg>
      </motion.button>
    );
  }

  return (
    <motion.div
      className="chatbot-container"
      initial={{ opacity: 0, y: 20, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="chatbot-header">
        <div className="header-content">
          <h3>APIDC Chat</h3>
          <div className="status-container">
            <span className="status-indicator"></span>
            <small>En línea</small>
          </div>
        </div>
        <button
          className="close-btn"
          onClick={toggleChat}
          aria-label="Minimizar chat"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      <div className="chatbot-messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`message ${message.isBot ? "bot" : "user"}`}
              initial={{ opacity: 0, x: message.isBot ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="message-content">
                {message.text.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            className="message bot loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribí tu pregunta acá..."
        />
        <button onClick={handleSend} className="send-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBot;
