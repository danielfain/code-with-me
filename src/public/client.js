const socket = io();

const editorDiv = document.getElementById('editor');

editorDiv.addEventListener('keyup', event => {
    const text = editor.getValue();
    socket.send(text);
});

socket.on('message', data => {
    editor.setValue(data);
});