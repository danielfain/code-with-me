const socket = io();

const editor = ace.edit("editor");
editor.setTheme("ace/theme/solarized_dark");
editor.session.setMode("ace/mode/python");

const editorDiv = document.getElementById('editor');

editorDiv.addEventListener('keyup', event => {
    const text = editor.getValue();
    socket.send(text);
});

socket.on('message', data => {
    editor.setValue(data);
});