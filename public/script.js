class VoiceBot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.voiceButton = document.getElementById('voiceButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.voiceStatus = document.getElementById('voiceStatus');
        this.loadingOverlay = document.getElementById('loadingOverlay');

        this.recognition = null;
        this.isListening = false;
        this.isProcessing = false;

        this.initializeEventListeners();
        this.initializeVoiceRecognition();
        this.setWelcomeTime();
    }

    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key press
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Voice button click
        this.voiceButton.addEventListener('click', () => this.toggleVoiceRecognition());

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.messageInput.value = message;
                this.sendMessage();
            });
        });

        // Input field changes
        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = !this.messageInput.value.trim();
        });

        // Initialize send button state
        this.sendButton.disabled = true;
    }

    initializeVoiceRecognition() {
        // Check if browser supports speech recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();

            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateVoiceStatus('listening');
                this.voiceButton.classList.add('listening');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.messageInput.value = transcript;
                this.sendMessage();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.handleVoiceError(event.error);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceStatus('idle');
                this.voiceButton.classList.remove('listening');
                this.hideLoading();
            };
        } else {
            // Disable voice button if not supported
            this.voiceButton.disabled = true;
            this.voiceButton.title = 'Voice recognition not supported in this browser';
            this.updateVoiceStatus('unsupported');
        }
    }

    toggleVoiceRecognition() {
        if (!this.recognition) return;

        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.showLoading();
                this.recognition.start();
            } catch (error) {
                console.error('Error starting speech recognition:', error);
                this.handleVoiceError('not-allowed');
            }
        }
    }

    updateVoiceStatus(status) {
        const statusIcon = this.voiceStatus.querySelector('i');
        const statusText = this.voiceStatus.querySelector('span');

        this.voiceStatus.className = 'voice-status';

        switch (status) {
            case 'listening':
                statusIcon.className = 'fas fa-microphone';
                statusText.textContent = 'Listening... Speak now';
                this.voiceStatus.classList.add('listening');
                break;
            case 'processing':
                statusIcon.className = 'fas fa-cog fa-spin';
                statusText.textContent = 'Processing your voice...';
                this.voiceStatus.classList.add('processing');
                break;
            case 'unsupported':
                statusIcon.className = 'fas fa-microphone-slash';
                statusText.textContent = 'Voice recognition not supported';
                break;
            default:
                statusIcon.className = 'fas fa-microphone-slash';
                statusText.textContent = 'Click microphone to start voice input';
        }
    }

    handleVoiceError(error) {
        let errorMessage = 'Voice recognition error occurred.';
        
        switch (error) {
            case 'not-allowed':
                errorMessage = 'Microphone access denied. Please allow microphone access and try again.';
                break;
            case 'no-speech':
                errorMessage = 'No speech detected. Please try again.';
                break;
            case 'network':
                errorMessage = 'Network error. Please check your connection.';
                break;
            case 'audio-capture':
                errorMessage = 'Microphone not found. Please check your microphone.';
                break;
        }

        this.addMessage(errorMessage, 'bot');
        this.hideLoading();
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.sendButton.disabled = true;

        // Show typing indicator
        this.showTyping();

        try {
            // Send message to server
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();

            // Simulate typing delay for better UX
            setTimeout(() => {
                this.hideTyping();
                this.addMessage(data.response, 'bot');
            }, 800 + Math.random() * 1000);

        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTyping();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = text;

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.getCurrentTime();

        content.appendChild(bubble);
        content.appendChild(time);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.typingIndicator.classList.add('show');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.remove('show');
    }

    showLoading() {
        this.loadingOverlay.classList.add('show');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('show');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    setWelcomeTime() {
        const welcomeTime = document.getElementById('welcomeTime');
        if (welcomeTime) {
            welcomeTime.textContent = this.getCurrentTime();
        }
    }
}

// Initialize the voice bot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VoiceBot();
});

// Add some fun interactions
document.addEventListener('keydown', (e) => {
    // Easter egg: Konami code
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiProgress) window.konamiProgress = 0;
    
    if (e.keyCode === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)';
            document.body.style.backgroundSize = '400% 400%';
            document.body.style.animation = 'rainbow 3s ease infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
            
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});