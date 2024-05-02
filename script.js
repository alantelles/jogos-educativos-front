const BASE_URL = 'http://api.edu.local'

var index = -1;
var wordList = [];

function zerarJogo() {
    index = -1;
    wordList = [];
    var elem;
    elem = document.getElementById('erros');
    elem.textContent = 0;
    elem = document.getElementById('dicas');
    elem.textContent = 0;
    elem = document.getElementById('acertos');
    elem.textContent = 0;
}

function mostrarPalavra() {
    if (index > 30) {
        zerarJogo();
        alert('O jogo acabou!');
        return;
    }
    const wordBox = document.getElementById('palavra-exibida');
    index++;
    const word = wordList[index];
    wordBox.textContent = word;
}

function marcarPlacar(tipo) {
    const elem = document.getElementById(tipo);
    let placar = parseInt(elem.textContent);
    placar++;
    elem.textContent = placar;
    mostrarPalavra();
}

function onLoad() {
    document.getElementById('carregar-palavras').addEventListener('click', carregarPalavras);
    document.getElementById('confirmar-acerto').addEventListener('click', () => marcarPlacar('acertos'));
    document.getElementById('confirmar-erro').addEventListener('click', () => marcarPlacar('erros'));
    document.getElementById('confirmar-dica').addEventListener('click', () => marcarPlacar('dicas'));
}

function getUrlCarregarPalavras(size) {
    return `${BASE_URL}/list_words_by_size/${size}`;
}

async function carregarPalavras() {
    zerarJogo();
    let wordBox = document.getElementById('palavra-exibida');
    wordBox.textContent = '';
    const wordSize = document.getElementById('word-size').value;
    try {
        const loadingImg = document.getElementById('loading-gif');
        loadingImg.classList.remove('hide');
        const response = await fetch(getUrlCarregarPalavras(wordSize))
        const wordsObj = await response.json();
        wordList = wordsObj.words;
        wordList.pop();
        wordList.sort(() => Math.random() - 0.5);
        loadingImg.classList.add('hide');
        mostrarPalavra();
    } catch(e) {
        wordBox.textContent = 'ERRO!';
        loadingImg.classList.add('hide');
        console.log(e);
    }
}



document.addEventListener('DOMContentLoaded', onLoad);
