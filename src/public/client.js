const socket = io();

const editor = document.getElementById('editor');

editor.addEventListener('keyup', event => {
    const text = editor.value;
    socket.send(text);
});

socket.on('message', data => {
    editor.value = data;
});