/* ==========================================
        UM ANO DE NÓS ❤️
        Fernando & Ana Lívia
========================================== */

document.addEventListener("DOMContentLoaded", ()=>{

const SENHA = "1234";

/* ===============================
        ELEMENTOS
=============================== */

const intro = document.getElementById("intro");

const login = document.getElementById("login");

const site = document.getElementById("site");

const btnComecar = document.getElementById("btnComecar");

const musica = document.getElementById("musica");

const typing = document.getElementById("typing");

const numero = document.querySelector(".numero");

const mensagemErro = document.getElementById("mensagem-erro");

const form = document.getElementById("form-login");

const hearts = document.getElementById("hearts");

const cards = document.querySelectorAll(".card");

/* ===============================
        TEXTO
=============================== */

const texto =

"Existe uma história que eu jamais quero esquecer...";

/* ===============================
        MÁQUINA DE ESCREVER
=============================== */

let pos = 0;

function escrever(){

    if(pos < texto.length){

        typing.innerHTML += texto.charAt(pos);

        pos++;

        setTimeout(escrever,55);

    }else{

        iniciarContagem();

    }

}

setTimeout(escrever,1000);

/* ===============================
        CONTAGEM
=============================== */

function iniciarContagem(){

    let tempo = 3;

    numero.style.opacity = 1;

    numero.innerHTML = tempo;

    const timer = setInterval(()=>{

        tempo--;

        if(tempo>0){

            numero.innerHTML = tempo;

        }else{

            clearInterval(timer);

            numero.style.display="none";

            iniciarFogos();

        }

    },1000);

}

/* ===============================
        FOGOS
=============================== */

function iniciarFogos(){

const fogos = new Fireworks.default(

document.getElementById("fireworks"),

{

autoresize:true,

opacity:.8,

acceleration:1.05,

friction:0.95,

gravity:1.4,

particles:120,

explosion:6,

traceLength:4,

rocketsPoint:{

min:10,

max:90

}

}

);
/* =============================== ATIVAR MÚSICA COM CLIQUE =============================== */
document.body.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
    }
});
fogos.start();

/* música */

musica.play().catch(()=>{

console.log("Clique necessário.");

});

/* para depois */

setTimeout(()=>{

fogos.stop();

mostrarBotao();

},6000);

}

/* ===============================
        BOTÃO
=============================== */

function mostrarBotao(){

btnComecar.style.display="inline-block";

btnComecar.animate(

[

{opacity:0,transform:"translateY(40px)"},

{opacity:1,transform:"translateY(0)"}

],

{

duration:900,

fill:"forwards"

}

);

}
  /* ===============================
        BOTÃO COMEÇAR
=============================== */

btnComecar.addEventListener("click", () => {

    intro.classList.add("hidden");

    login.classList.remove("hidden");

});

/* ===============================
        LOGIN
=============================== */

form.addEventListener("submit", (e)=>{

    e.preventDefault();

    const senha = document
        .getElementById("senha")
        .value;

    if(senha===SENHA){

        login.classList.add("hidden");

        site.classList.remove("hidden");

        revelarCards();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }else{

        mensagemErro.style.display="block";

        mensagemErro.animate(

            [

                {transform:"translateX(-10px)"},

                {transform:"translateX(10px)"},

                {transform:"translateX(-10px)"},

                {transform:"translateX(0)"}

            ],

            {

                duration:400

            }

        );

    }

});

/* ===============================
        CORAÇÕES
=============================== */

function criarCoracao(){

    const heart = document.createElement("div");

    heart.className="heartFloat";

    heart.innerHTML="❤️";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=

        (15+Math.random()*30)+"px";

    heart.style.animationDuration=

        (5+Math.random()*8)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },13000);

}

setInterval(criarCoracao,350);

/* ===============================
        ANIMAÇÃO DOS CARDS
=============================== */

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

cards.forEach(card=>{

observer.observe(card);

});

/* ===============================
        CARTA
=============================== */

const carta = document.getElementById("carta");

observer.observe(carta);

/* ===============================
        EFEITO NO HEADER
=============================== */

window.addEventListener("scroll",()=>{

const header = document.querySelector("header");

if(!header) return;

const y = window.scrollY;

header.style.transform =
`translateY(${y*0.15}px)`;

});

/* ===============================
        PARALLAX
=============================== */

window.addEventListener("mousemove",(e)=>{

const x =
(e.clientX/window.innerWidth)-0.5;

const y =
(e.clientY/window.innerHeight)-0.5;

document.body.style.backgroundPosition =
`${50+x*2}% ${50+y*2}%`;

});

/* ===============================
        TÍTULO PISCANDO
=============================== */

setInterval(()=>{

document.title =
document.title==="Um Ano de Nós ❤️"

?

"❤️ Fernando & Ana Lívia ❤️"

:

"Um Ano de Nós ❤️";

},2000);

/* ===============================
        FINAL
=============================== */

console.log("Projeto iniciado ❤️");

});
