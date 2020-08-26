const socket = io();

const editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");

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

socket.on('code-update', code => {
    editor.setValue(code);
});

socket.on('language-change', language => {
    languageSelect.value = language;
    editor.session.setMode('ace/mode/' + language.toLowerCase());
});