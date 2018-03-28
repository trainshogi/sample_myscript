var editorElement = document.getElementById('editor');
var resultElement = document.getElementById('result');
var languageElement = document.getElementById('language');
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
    if (exports && exports['text/plain']) {
        resultElement.innerHTML = '<span>' + exports['text/plain'] + '</span>';
    } else {
        resultElement.innerHTML = '';
    }
});
editorElement.addEventListener('loaded', function(evt) {
    /**
     * Retrieve the list of available recognition languages
     * @param {Object} The editor recognition parameters
     */
    var currentLanguage = evt.target.editor.configuration.recognitionParams.v4.lang;
    var res = MyScript.getAvailableLanguageList();

    if (languageElement.options.length === 0) {
      Object.keys(res.result).forEach(function (key) {
        var selected = currentLanguage === key;
        languageElement.options[languageElement.options.length] = new Option(res.result[key], key, selected, selected);
      });
      languageElement.disabled = false;
    }
});
languageElement.addEventListener('change', function (e) {
    var configuration = editorElement.editor.configuration;
    //The path to the language depend of the version of API you are using.
    configuration.recognitionParams.v4.lang = e.target.value;
    editorElement.editor.configuration = configuration;
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
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
            scheme: 'https',
            host: 'webdemoapi.myscript.com',
            applicationKey: '66d73462-7b20-49f9-bd55-b8c5085a9a90',
            hmacKey: '58b9351e-61b1-49e5-bfb7-54dd96b33bf7'
        },
        v4: {
            text: {
                mimeTypes: ['text/plain'],
                smartGuideFadeOut: {
                    enable: true,
                    duration: 10000
                }
            },
        }
    }
});
window.addEventListener('resize', function() {
    editorElement.editor.resize();
});