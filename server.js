const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// Predefined responses for the chatbot
const responses = {
  "hello": "Hello! How can I help you today?",
  "hi": "Hi there! What would you like to know?",
  "how are you": "I'm doing great! Thanks for asking. How can I assist you?",
  "what is your name": "I'm Voice Bot, your friendly AI assistant!",
  "what can you do": "I can answer questions using voice recognition or text. Try asking me about the weather, time, or general topics!",
  "weather": "I don't have access to live weather data, but you can check your local weather service!",
  "time": `The current time is ${new Date().toLocaleTimeString()}`,
  "date": `Today's date is ${new Date().toLocaleDateString()}`,
  "help": "You can ask me questions by typing or using the microphone button. I can help with basic questions and have a friendly chat!",
  "bye": "Goodbye! Have a wonderful day!",
  "goodbye": "See you later! Take care!",
  "thank you": "You're welcome! Is there anything else I can help you with?",
  "thanks": "Happy to help! Feel free to ask me anything else.",
  "who created you": "I was created as a voice-enabled chatbot to help answer your questions!",
  "what is ai": "AI stands for Artificial Intelligence - it's technology that enables machines to simulate human intelligence and decision-making.",
  "tell me a joke": "Why don't scientists trust atoms? Because they make up everything! 😄"
};

// Function to find the best response
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  
  // Check for exact matches first
  if (responses[message]) {
    return responses[message];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(responses)) {
    if (message.includes(key)) {
      return value;
    }
  }
  
  // Default response for unrecognized messages
  const defaultResponses = [
    "That's interesting! Can you tell me more?",
    "I'm not sure about that, but I'd love to learn more!",
    "Could you rephrase that? I want to make sure I understand.",
    "I'm still learning! Can you ask me something else?",
    "That's a great question! I don't have a specific answer for that yet."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// API endpoint for chat messages
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  const response = getBotResponse(message);
  
  res.json({ 
    response,
    timestamp: new Date().toISOString()
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Voice Bot server is running on port ${PORT}`);
});