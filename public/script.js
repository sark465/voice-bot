const startBtn = document.getElementById('startBtn');
const chatDiv = document.getElementById('chat');

let recognition = null; // Global reference for stopping

// Pre-programmed answers (small talk + example questions)
const predefinedAnswers = {
    "what should we know about your life story": "I’m Sarnali Sarkar, a data science enthusiast with hands-on experience in AI, ML, and video summarization.",
    "what should you know about your life story": "I’m Sarnali Sarkar, a data science enthusiast with hands-on experience in AI, ML, and video summarization.",
    "what are the top 3 areas you’d like to grow in": "I want to grow in cloud AI integration, advanced NLP techniques, and scalable model deployment.",
    "top 3 areas you want to grow": "I want to grow in cloud AI integration, advanced NLP techniques, and scalable model deployment.",
    "what misconception do your coworkers have about you": "Sometimes coworkers think I only focus on coding, but I also excel at strategy and planning.",
    "how do you push your boundaries and limits": "I push my limits by exploring new AI techniques and taking on challenging projects beyond my comfort zone.",

    "hi": "Hello!",
    "hello": "Hi there!",
    "hey": "Hey! How are you?",
    "how are you": "I’m good, how is your day going?",
    "how is your day going": "I’m doing well, thanks for asking!",
    "what's up": "All good! How about you?"
};

// Normalize text: lowercase and remove punctuation
const normalize = (text) => text.toLowerCase().replace(/[^\w\s]/gi, '');

// Start voice recognition
startBtn.addEventListener('click', () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition.');
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        const userText = event.results[0][0].transcript;
        addMessage(userText, 'user');

        let botReply = "I don't know the answer to that yet.";
        const lower = normalize(userText);

        // Sort keys by length descending so longer keys (specific questions) match first
        const keysSorted = Object.keys(predefinedAnswers).sort((a, b) => b.length - a.length);

        for (let key of keysSorted) {
            const keyWords = normalize(key).split(" ");
            const matchCount = keyWords.filter(word => lower.includes(word)).length;
            if (matchCount / keyWords.length >= 0.6) { // 60% words match
                botReply = predefinedAnswers[key];
                break;
            }
        }

        addMessage(botReply, 'bot');
    };

    recognition.onend = () => {
        recognition = null; // Reset after finishing
    };
});

// Add message to chat
function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = text;
    chatDiv.appendChild(div);
    chatDiv.scrollTop = chatDiv.scrollHeight;
}
