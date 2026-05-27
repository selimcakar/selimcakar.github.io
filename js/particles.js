const CONFIG = {
  count: 80,
  maxDist: 130,
  speed: 0.15,
  radius: 1.5,
  lineAlpha: 0.08,
  mouseRadius: 180,
  maxSpeed: 0.25,
  colors: ['rgba(20,184,166,', 'rgba(59,130,246,', 'rgba(45,212,191,'],
  lineColor: 'rgba(20, 184, 166,',
};

class Particle {
  constructor(w, h) {
    this.colorBase = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    this.reset(w, h);
  }

  reset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * CONFIG.speed;
    this.vy = (Math.random() - 0.5) * CONFIG.speed;
    this.r = Math.random() * CONFIG.radius + 0.5;
  }

  update(w, h, mouse) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < CONFIG.mouseRadius) {
      const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius * 0.003;
      this.vx -= dx * force;
      this.vy -= dy * force;
    }

    this.vx = Math.max(-CONFIG.maxSpeed, Math.min(CONFIG.maxSpeed, this.vx));
    this.vy = Math.max(-CONFIG.maxSpeed, Math.min(CONFIG.maxSpeed, this.vy));
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.colorBase + '0.6)';
    ctx.fill();
  }
}

function drawLines(ctx, particles) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.maxDist) {
        const alpha = (1 - dist / CONFIG.maxDist) * CONFIG.lineAlpha;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = CONFIG.lineColor + alpha + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

export function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles, animId;
  const mouse = { x: -1000, y: -1000 };

  function createParticles() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = w < 768 ? Math.floor(CONFIG.count * 0.5) : CONFIG.count;
    particles = Array.from({ length: count }, () => new Particle(w, h));
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(w, h, mouse); p.draw(ctx); });
    drawLines(ctx, particles);
    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    createParticles();
    animate();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  createParticles();
  animate();
}
