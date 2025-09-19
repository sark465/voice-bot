# Voice Bot - AI Chat Assistant 🤖

A modern, voice-enabled chatbot built with Node.js, Express, and the Web Speech API. Features an attractive chat interface with styled message bubbles, voice recognition capabilities, and predefined intelligent responses.

![Voice Bot Interface](https://github.com/user-attachments/assets/9c19a387-7a43-4c9a-b8fa-d42a1fe70a78)

## ✨ Features

- **🎙️ Voice Recognition**: Click the microphone button to ask questions using your voice
- **💬 Interactive Chat**: Beautiful chat interface with styled message bubbles
- **🎨 Modern UI**: Attractive gradient design with smooth animations
- **⚡ Quick Actions**: Pre-defined buttons for common questions
- **🧠 Smart Responses**: Intelligent chatbot with predefined answers for various topics
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🌐 Browser-based**: No API keys required - runs entirely in the browser

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- A modern web browser with Web Speech API support (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sark465/voice-bot.git
cd voice-bot
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🎮 How to Use

1. **Text Chat**: Type your message in the input field and press Enter or click the send button
2. **Voice Input**: Click the red microphone button and speak your question
3. **Quick Actions**: Use the predefined buttons for common questions like "Hello", "What can you do", "Tell me a joke", or "Time"

## 🤖 Supported Commands

The voice bot can respond to various questions and commands:

- **Greetings**: "hello", "hi", "how are you"
- **Information**: "what is your name", "what can you do", "who created you"
- **Time & Date**: "what time is it", "what's the date"
- **Fun**: "tell me a joke"
- **Help**: "help"
- **Farewells**: "bye", "goodbye"
- **Gratitude**: "thank you", "thanks"
- **General Topics**: "what is ai", "weather"

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Voice Recognition**: Web Speech API (SpeechRecognition)
- **Styling**: Modern CSS with gradients and animations
- **Icons**: Font Awesome icons

## 📁 Project Structure

```
voice-bot/
├── server.js          # Express server with chat API
├── package.json       # Node.js dependencies and scripts
├── public/            # Static files
│   ├── index.html     # Main HTML file
│   ├── styles.css     # CSS styling
│   └── script.js      # Frontend JavaScript
└── README.md          # This file
```

## 🔧 API Endpoints

### POST /api/chat
Send a message to the chatbot and receive a response.

**Request:**
```json
{
  "message": "Hello"
}
```

**Response:**
```json
{
  "response": "Hello! How can I help you today?",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🌐 Browser Compatibility

The voice recognition feature requires a modern browser with Web Speech API support:

- ✅ Google Chrome (recommended)
- ✅ Microsoft Edge
- ✅ Safari (macOS)
- ✅ Firefox (limited support)

## 🎨 Screenshots

### Initial Interface
![Initial Interface](https://github.com/user-attachments/assets/9c19a387-7a43-4c9a-b8fa-d42a1fe70a78)

### Chat Conversation
![Chat Demo](https://github.com/user-attachments/assets/34d03657-9b71-41b8-bfbe-43368d3dc1e3)

## 🚀 Deployment

This application is designed for easy browser-based deployment:

1. **Local Development**: Use `npm start` for local testing
2. **Production**: Deploy to any Node.js hosting service (Heroku, Vercel, Railway, etc.)
3. **Port Configuration**: The app uses `process.env.PORT` for production deployment

## 🔮 Future Enhancements

- [ ] Add more sophisticated AI responses
- [ ] Implement conversation memory
- [ ] Add voice synthesis for bot responses
- [ ] Support for multiple languages
- [ ] Chat history persistence
- [ ] User authentication
- [ ] Customizable themes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 👨‍💻 Author

Created with ❤️ for an interactive voice-enabled chat experience.

---

*Enjoy chatting with your new AI assistant! 🤖✨*
