/* ==========================================
   UM ANO DE NÓS ❤️
   Fernando & Ana Lívia
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // A senha para acessar o site
  const SENHA = "1234";

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
  const header = document.querySelector("header");

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
  // Inicia o efeito de digitação após 1 segundo
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

      // Para os fogos após 6 segundos e mostra o botão
      setTimeout(() => {
        fogos.stop();
        mostrarBotao();
      }, 6000);
    }

    // Tenta tocar a música (pode ser bloqueado pelo navegador sem interação)
    musica.play().catch(() => console.log("Clique necessário para tocar o áudio."));
  }

  // Garante que a música toque ao primeiro clique na tela (política dos navegadores)
  document.body.addEventListener("click", () => {
    if (musica.paused) musica.play();
  }, { once: true });

  /* ===============================
     4. BOTÃO COMEÇAR
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

  /* ===============================
     5. TELA DE LOGIN
  =============================== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const senhaDigitada = document.getElementById("senha").value;

    if (senhaDigitada === SENHA) {
      login.classList.add("hidden");
      site.classList.remove("hidden");
      revelarCards();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      mensagemErro.style.display = "block";
      // Animação de tremor (shake) na mensagem de erro
      mensagemErro.animate([
        { transform: "translateX(-10px)" },
        { transform: "translateX(10px)" },
        { transform: "translateX(-10px)" },
        { transform: "translateX(0)" }
      ], { duration: 400 });
    }
  });

  /* ===============================
     6. CHUVA DE CORAÇÕES
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
    
    // Remove o coração do DOM após a animação para não pesar a página
    setTimeout(() => {
      heart.remove();
    }, 13000);
  }
  setInterval(criarCoracao, 350);

  /* ===============================
     7. ANIMAÇÕES DE SCROLL (CARDS E CARTA)
  =============================== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  function revelarCards() {
    cards.forEach(card => observer.observe(card));
    if (carta) observer.observe(carta);
  }

  /* ===============================
     8. EFEITOS VISUAIS EXTRAS
  =============================== */
  // Efeito Parallax no Header ao rolar a página
  window.addEventListener("scroll", () => {
    if (!header) return;
    const y = window.scrollY;
    header.style.transform = `translateY(${y * 0.15}px)`;
  });

  // Efeito Parallax no Background com o movimento do mouse
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    document.body.style.backgroundPosition = `${50 + x * 2}% ${50 + y * 2}%`;
  });

  // Título da aba piscando
  setInterval(() => {
    document.title = document.title === "Um Ano de Nós ❤️" 
      ? "❤️ Fernando & Ana Lívia ❤️" 
      : "Um Ano de Nós ❤️";
  }, 2000);

  console.log("Projeto iniciado ❤️");
});
