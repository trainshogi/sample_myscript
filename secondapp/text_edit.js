var editorElement = document.getElementById('editor');
var resultElement = document.getElementById('result');
var undoElement = document.getElementById('undo');
var redoElement = document.getElementById('redo');
var clearElement = document.getElementById('clear');
var convertElement = document.getElementById('convert');
editorElement.addEventListener('changed', function(evt) {
    clearElement.disabled = !evt.detail.canClear;
    undoElement.disabled = !evt.detail.canUndo;
    redoElement.disabled = !evt.detail.canRedo;
    convertElement.disabled = !evt.detail.canConvert;
});
editorElement.addEventListener('exported', function(evt) {
    var exports = evt.detail.exports;
    if (exports && exports['application/x-latex']) {
        resultElement.innerHTML = '<span>' + exports['application/x-latex'] + '</span>';
    } else if (exports && exports['application/mathml+xml']) {
        resultElement.innerText = exports['application/mathml+xml'];
    } else if (exports && exports['application/mathofficeXML']) {
        resultElement.innerText = exports['application/mathofficeXML'];
    } else {
        resultElement.innerHTML = '';
    }
});
undoElement.addEventListener('click', function() {
    editorElement.editor.undo();
});
redoElement.addEventListener('click', function() {
    editorElement.editor.redo();
});
clearElement.addEventListener('click', function() {
    editorElement.editor.clear();
});
convertElement.addEventListener('click', function() {
    editorElement.editor.convert();
});
/**
 * Attach an editor to the document
 * @param {Element} The DOM element to attach the ink paper
 * @param {Object} The recognition parameters
 */
MyScript.register(editorElement, {
    recognitionParams: {
        type: 'MATH',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
            scheme: 'https',
            host: 'webdemoapi.myscript.com',
            applicationKey: '1a245f5e-9e94-4412-80a4-1c3b6000b0ad',
            hmacKey: '12c9e6cd-b836-4a2d-8e03-aaffba9de6d5'
        },
        v4: {
            math: {
                mimeTypes: ['application/x-latex']
            },
        }
    }
});
window.addEventListener('resize', function() {
    editorElement.editor.resize();
});