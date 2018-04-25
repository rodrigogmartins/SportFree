document.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('audio');
    const input = document.querySelector('#loader');
    const player = document.querySelector('#player');
    const ol = document.querySelector('ol');
    const proxima = document.querySelector('#proxima');
    const voltar = document.querySelector('#voltar');
    let playlist = [];
    let indiceMusica = 0;
    let nomesMusicas = [];

    input.addEventListener('change', function(){
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            playlist.push(reader.result);
            addlist();
            tocarMusica(indiceMusica);
        });
        reader.readAsDataURL(input.files[0]);
    });

    ol.addEventListener('click', function(e){
        console.log(e.target.tagName);
        if (e.target.tagName === 'A') {
            indiceMusica = nomesMusicas.indexOf(e.target.textContent);
            tocarMusica(indiceMusica);
        }
    });

    const proximaMusica = function() {
        indiceMusica++;
        if (indiceMusica >= playlist.length) {
            indiceMusica = 0;
        }
        tocarMusica(indiceMusica);
    }
    const anteriorMusica = function() {
        indiceMusica--;
        if (indiceMusica < 0) {
            indiceMusica = playlist.length-1;
        }
        tocarMusica(indiceMusica);
    }

    audio.addEventListener('ended', proximaMusica);
    proxima.addEventListener('click', proximaMusica);
    voltar.addEventListener('click', anteriorMusica);

    const tocarMusica = function(indice) {
        player.src = playlist[indice];
        player.play();
        const labelMusica = document.querySelector('#nomemusica');
        labelMusica.textContent = ol.children[indice].textContent;
    }

    const addlist = function() {
        let nomeMusica = loader.files[0].name;
        let nomeArrumado = arrumarNomeMusica(nomeMusica);
        nomesMusicas.push(nomeArrumado);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href','#');
        a.textContent = nomeArrumado
        li.appendChild(a);
        ol.appendChild(li);
    }

    const arrumarNomeMusica = function(nome) {
        let nomeVetor = nome.split('.');
        return nomeVetor[0];
    }
});