const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');
const newChatBtn = document.getElementById('new-chat');
const chatHistoryList = document.getElementById('chat-history');

let chats = JSON.parse(localStorage.getItem('chats')) || [];
let currentChat = [];

// Render chat history in sidebar
function renderChatHistory() {
  chatHistoryList.innerHTML = '';
  chats.forEach((chat, index) => {
    const li = document.createElement('li');
    li.textContent = chat[0]?.content || `Chat ${index + 1}`;
    li.addEventListener('click', () => {
      currentChat = [...chat];
      renderChatWindow();
    });
    chatHistoryList.appendChild(li);
  });
}

// Render chat messages
function renderChatWindow() {
  chatWindow.innerHTML = '';
  currentChat.forEach(msg => {
    addMessage(msg.content, msg.role, false);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Add message to chat window
function addMessage(text, sender, save = true) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  if (save) {
    currentChat.push({ role: sender === 'user' ? 'user' : 'assistant', content: text });
    localStorage.setItem('chats', JSON.stringify([...chats.filter(c => c !== currentChat), currentChat]));
  }

  return msgDiv;
}

// Handle new chat
newChatBtn.addEventListener('click', () => {
  if (currentChat.length) {
    chats.push(currentChat);
    localStorage.setItem('chats', JSON.stringify(chats));
  }
  currentChat = [];
  renderChatWindow();
});

// Handle sending message
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  const botMsgDiv = addMessage('Typing...', 'bot', false);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    botMsgDiv.textContent = data.reply;
    currentChat.push({ role: 'assistant', content: data.reply });
    localStorage.setItem('chats', JSON.stringify([...chats.filter(c => c !== currentChat), currentChat]));
  } catch (error) {
    botMsgDiv.textContent = 'Error connecting to AI';
    console.error(error);
  }
});

// Initial render
renderChatHistory();
renderChatWindow();
