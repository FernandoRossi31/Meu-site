/* ==========================================
   UM ANO DE NÓS ❤️
   Fernando & Ana Lívia
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const SENHA = "0908";

  const intro = document.getElementById("intro");
  const login = document.getElementById("login");
  const site = document.getElementById("site");
  const btnComecar = document.getElementById("btnComecar");
  
  const musica = document.getElementById("musica");
  const musicaSurpresa = document.getElementById("musicaSurpresa");
  
  const typing = document.getElementById("typing");
  const numero = document.querySelector(".numero");
  const mensagemErro = document.getElementById("mensagem-erro");
  const form = document.getElementById("form-login");
  const hearts = document.getElementById("hearts");
  const cards = document.querySelectorAll(".card");
  const carta = document.getElementById("carta");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnProximo = document.getElementById("btnProximo");
  const contadorCards = document.getElementById("contadorCards");
  const timelineContainer = document.querySelector(".timeline-container");
  
  const btnVoltarGaleria = document.getElementById("btnVoltarGaleria");
  const btnSurpresa = document.getElementById("btnSurpresa");
  const surpresa = document.getElementById("surpresa");
  const btnVoltarCarta = document.getElementById("btnVoltarCarta");
  
  const btnProximoTexto = document.getElementById("btnProximoTexto");
  const paginaTexto = document.getElementById("paginaTexto");
  const btnVoltarSurpresa = document.getElementById("btnVoltarSurpresa");
  const btnVoltarInicioGaleria = document.getElementById("btnVoltarInicioGaleria");

  let cardAtual = 0;

  const texto = "Existe uma história que eu jamais quero esquecer...";
  let pos = 0;

  function escrever() {
    if (pos < texto.length) {
      typing.innerHTML += texto.charAt(pos);
      pos++;
      setTimeout(escrever, 55);
    } else {
      iniciarContagem();
    }
  }
  setTimeout(escrever, 1000);

  function iniciarContagem() {
    let tempo = 3;
    numero.style.opacity = 1;
    numero.innerHTML = tempo;

    const timer = setInterval(() => {
      tempo--;
      if (tempo > 0) {
        numero.innerHTML = tempo;
      } else {
        clearInterval(timer);
        numero.style.display = "none";
        iniciarFogos();
      }
    }, 1000);
  }

  function iniciarFogos() {
    const container = document.getElementById("fireworks");
    if (typeof Fireworks !== "undefined" && container) {
      const fogos = new Fireworks.default(container, {
        autoresize: true,
        opacity: 0.8,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.4,
        particles: 120,
        explosion: 6,
        traceLength: 4,
        rocketsPoint: { min: 10, max: 90 }
      });
      fogos.start();

      setTimeout(() => {
        fogos.stop();
        mostrarBotao();
      }, 6000);
    }
  }

  function mostrarBotao() {
    btnComecar.style.display = "inline-block";
    btnComecar.animate([
      { opacity: 0, transform: "translateY(40px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], { duration: 900, fill: "forwards" });
  }

  btnComecar.addEventListener("click", () => {
    intro.classList.add("hidden");
    login.classList.remove("hidden");
    
    musica.play().catch(e => console.log("Erro ao iniciar áudio:", e));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const senhaDigitada = document.getElementById("senha").value;

    if (senhaDigitada === SENHA) {
      login.classList.add("hidden");
      site.classList.remove("hidden");
      atualizarNavegacao();
    } else {
      mensagemErro.style.display = "block";
      mensagemErro.animate([
        { transform: "translateX(-10px)" },
        { transform: "translateX(10px)" },
        { transform: "translateX(-10px)" },
        { transform: "translateX(0)" }
      ], { duration: 400 });
    }
  });

  function atualizarNavegacao() {
    cards.forEach((card) => {
      card.classList.remove("active");
      const video = card.querySelector("video");
      if (video) video.pause();
    });

    cards[cardAtual].classList.add("active");
    contadorCards.innerText = `${cardAtual + 1} de ${cards.length}`;

    btnAnterior.disabled = cardAtual === 0;

    if (cardAtual >= cards.length - 1) {
      btnProximo.innerText = "Ver Carta ❤️";
    } else {
      btnProximo.innerText = "Próximo ❯";
    }
  }

  btnProximo.addEventListener("click", () => {
    if (cardAtual < cards.length - 1) {
      cardAtual++;
      atualizarNavegacao();
    } else {
      timelineContainer.classList.add("hidden");
      carta.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
    }
  });

  btnAnterior.addEventListener("click", () => {
    if (cardAtual > 0) {
      cardAtual--;
      atualizarNavegacao();
    }
  });

  if (btnVoltarGaleria) {
    btnVoltarGaleria.addEventListener("click", () => {
      carta.classList.add("hidden");
      timelineContainer.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
    });
  }

  if (btnSurpresa) {
    btnSurpresa.addEventListener("click", () => {
      carta.classList.add("hidden");
      surpresa.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
      
      musica.pause();
      if(musicaSurpresa) {
        musicaSurpresa.currentTime = 0;
        musicaSurpresa.play().catch(e => console.log("Erro ao tocar a música surpresa", e));
      }
    });
  }

  if (btnVoltarCarta) {
    btnVoltarCarta.addEventListener("click", () => {
      surpresa.classList.add("hidden");
      carta.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
      
      if(musicaSurpresa) {
        musicaSurpresa.pause();
      }
      musica.play().catch(e => console.log("Erro ao tocar música original", e));
    });
  }

  if (btnProximoTexto) {
    btnProximoTexto.addEventListener("click", () => {
      surpresa.classList.add("hidden");
      paginaTexto.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
    });
  }

  if (btnVoltarSurpresa) {
    btnVoltarSurpresa.addEventListener("click", () => {
      paginaTexto.classList.add("hidden");
      surpresa.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
    });
  }

  if (btnVoltarInicioGaleria) {
    btnVoltarInicioGaleria.addEventListener("click", () => {
      paginaTexto.classList.add("hidden");
      timelineContainer.classList.remove("hidden");
      cardAtual = 0;
      atualizarNavegacao();
      
      if(musicaSurpresa) {
        musicaSurpresa.pause();
      }
      musica.play().catch(e => console.log("Erro ao tocar música original", e));
      
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
    });
  }

  function criarCoracao() {
    if (!hearts) return;
    const heart = document.createElement("div");
    heart.className = "heartFloat";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 30) + "px";
    heart.style.animationDuration = (5 + Math.random() * 8) + "s";
    
    hearts.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 13000);
  }
  setInterval(criarCoracao, 350);
});
