document.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('audio');
    const input = document.querySelector('#loader');
    const player = document.querySelector('#audioplayer');
    const ul = document.querySelector('ul');
    const proxima = document.querySelector('#proxima');
    const voltar = document.querySelector('#voltar');
    let indiceMusica = 0;
    const nomesMusicas = [];
    const playlist = [];

    input.addEventListener('change', function() {
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            const musica = reader.result;
            if (playlist.indexOf(musica) === -1) {
                playlist.push(musica);
                addlist();
            }
        });
        reader.readAsDataURL(input.files[0]);
    });

    ul.addEventListener('click', function(e) {
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
    };

    const anteriorMusica = function() {
        indiceMusica--;
        if (indiceMusica < 0) {
            indiceMusica = playlist.length-1;
        }
        tocarMusica(indiceMusica);
    };

    audio.addEventListener('ended', proximaMusica);
    proxima.addEventListener('click', proximaMusica);
    voltar.addEventListener('click', anteriorMusica);

    const tocarMusica = function(indice) {
        player.src = playlist[indice];
        player.play();
        const labelMusica = document.querySelector('#nomemusica');
        labelMusica.textContent = ul.children[indice].textContent;
    };

    const addlist = function() {
        const nomeMusica = input.files[0].name;
        const nomeArrumado = arrumarNomeMusica(nomeMusica);
        nomesMusicas.push(nomeArrumado);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.textContent = nomeArrumado;
        li.appendChild(a);
        ul.appendChild(li);
    };

    const arrumarNomeMusica = function(nome) {
        const nomeVetor = nome.split('.');
        return nomeVetor[0];
    };
});
