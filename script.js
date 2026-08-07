/* ==========================================
   UM ANO DE NÓS ❤️
   Fernando & Ana Lívia
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const SENHA = "0908";

  /* ===============================
     ELEMENTOS DO DOM
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
  const carta = document.getElementById("carta");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnProximo = document.getElementById("btnProximo");
  const contadorCards = document.getElementById("contadorCards");
  const timelineContainer = document.querySelector(".timeline-container");
  
  // Elementos novos: Botões e Tela de Surpresa
  const btnVoltarGaleria = document.getElementById("btnVoltarGaleria");
  const btnSurpresa = document.getElementById("btnSurpresa");
  const surpresa = document.getElementById("surpresa");
  const btnVoltarCarta = document.getElementById("btnVoltarCarta");

  let cardAtual = 0;

  /* ===============================
     1. MÁQUINA DE ESCREVER
  =============================== */
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

  /* ===============================
     2. CONTAGEM REGRESSIVA
  =============================== */
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

  /* ===============================
     3. FOGOS DE ARTIFÍCIO E MÚSICA
  =============================== */
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

    musica.play().catch(() => console.log("Clique necessário para tocar o áudio."));
  }

  document.body.addEventListener("click", () => {
    if (musica.paused) musica.play();
  }, { once: true });

  /* ===============================
     4. BOTÃO COMEÇAR E LOGIN
  =============================== */
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

  /* ===============================
     5. TROCA DE SLIDES (1 EM 1)
  =============================== */
  function atualizarNavegacao() {
    // Oculta todos os cards e pausa vídeos
    cards.forEach((card) => {
      card.classList.remove("active");
      const video = card.querySelector("video");
      if (video) video.pause();
    });

    // Exibe apenas o card atual
    cards[cardAtual].classList.add("active");
    contadorCards.innerText = `${cardAtual + 1} de ${cards.length}`;

    // Desativa botão "Anterior" no primeiro slide
    btnAnterior.disabled = cardAtual === 0;

    // Altera o texto do botão no último slide
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
      // Vai para a Carta Final
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

  /* ===============================
     6. BOTÕES FINAIS E SURPRESA
  =============================== */
  // Botão: Carta -> Voltar para a Galeria
  if (btnVoltarGaleria) {
    btnVoltarGaleria.addEventListener("click", () => {
      carta.classList.add("hidden");
      timelineContainer.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
    });
  }

  // Botão: Carta -> Abrir Surpresa
  if (btnSurpresa) {
    btnSurpresa.addEventListener("click", () => {
      carta.classList.add("hidden");
      surpresa.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
    });
  }

  // Botão: Surpresa -> Voltar para Carta
  if (btnVoltarCarta) {
    btnVoltarCarta.addEventListener("click", () => {
      surpresa.classList.add("hidden");
      carta.classList.remove("hidden");
      window.scrollTo({ top: site.offsetTop, behavior: "smooth" });
    });
  }

  /* ===============================
     7. CHUVA DE CORAÇÕES
  =============================== */
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
