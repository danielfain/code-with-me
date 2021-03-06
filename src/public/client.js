const socket = io();

const editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");
editor.setShowPrintMargin(false);

const editorDiv = document.getElementById('editor');

editorDiv.addEventListener('keyup', event => {
    const code = editor.getValue();
    socket.emit('code-update', code);
});

const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', event => {
    const language = languageSelect.value;
    editor.session.setMode('ace/mode/' + language.toLowerCase());
    socket.emit('language-change', language);
});

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const messages = document.getElementById('messages');

chatForm.addEventListener('submit', event => {
    event.preventDefault();
    socket.emit('new-message', chatInput.value);
    appendMessage(chatInput.value);
    chatInput.value = "";
});

socket.on('code-update', code => editor.setValue(code));

socket.on('language-change', language => {
    languageSelect.value = language;
    editor.session.setMode('ace/mode/' + language.toLowerCase());
});

socket.on('new-message', message => appendMessage(message));

socket.on('sync-chat', chat => {
    for (let i = 0; i < chat.length; i++) {
        appendMessage(chat[i]);
    }
});

function appendMessage(message) {
    let liNode = document.createElement("li");
    let textNode = document.createTextNode(message);
    liNode.appendChild(textNode);
    messages.appendChild(liNode);
}