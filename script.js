document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Intersection Observer for scroll animations (fade-in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Terminal Simulation — shows the `heisensim demo` experience
    const terminalLines = [
        { text: "🔧 Creating k3d cluster (heisensim-demo)...", color: "muted", delay: 800 },
        { text: "📦 Deploying demo app (redis + 2× nginx)...", color: "muted", delay: 600 },
        { text: "⏳ Waiting for pods...", color: "muted", delay: 700 },
        { text: "✅ All pods ready.", color: "green", delay: 400 },
        { text: "", color: "muted", delay: 300 },
        { text: "🔬 Exploring 5 seeds to find interesting failures...", color: "header", delay: 800 },
        { text: "", color: "muted", delay: 200 },
        { text: "  ✅ seed 0x0001  │  props: 5/5", color: "green", delay: 400 },
        { text: "  ✅ seed 0x0002  │  props: 5/5", color: "green", delay: 400 },
        { text: "  ❌ seed 0x0003  │  props: 4/5  ← high-availability", color: "red", delay: 400 },
        { text: "  ✅ seed 0x0004  │  props: 5/5", color: "green", delay: 400 },
        { text: "  ✅ seed 0x0005  │  props: 5/5", color: "green", delay: 400 },
        { text: "", color: "muted", delay: 500 },
        { text: "🎯 Found a bug! Replaying seed 0x0003 deterministically...", color: "header", delay: 900 },
        { text: "", color: "muted", delay: 300 },
        { text: "💥 Injecting pod crash → api-server-7d4f", color: "red", delay: 600 },
        { text: "🌐 Injecting latency → redis-0 (+340ms)", color: "muted", delay: 500 },
        { text: "🔌 Injecting partition → worker-2 ↔ api-server", color: "muted", delay: 500 },
        { text: "", color: "muted", delay: 400 },
        { text: "╔═══════════════════════════════════════════════════════════╗", color: "border", delay: 80 },
        { text: "║  PROPERTY RESULTS                          4/5 PASS      ║", color: "header", delay: 80 },
        { text: "╠═══════════════════════════════════════════════════════════╣", color: "border", delay: 80 },
        { text: "║  ✅ PASS  fast-recovery     recovery < 30s (8.2s)       ║", color: "green", delay: 150 },
        { text: "║  ❌ FAIL  high-availability  avail ≥ 99% (94.2%)        ║", color: "red", delay: 150 },
        { text: "║  ✅ PASS  bounded-errors    max 5 consecutive (2)       ║", color: "green", delay: 150 },
        { text: "║  ✅ PASS  no-cascade        no cascading failures       ║", color: "green", delay: 150 },
        { text: "║  ✅ PASS  low-latency       p99 < 500ms (230ms)        ║", color: "green", delay: 150 },
        { text: "╚═══════════════════════════════════════════════════════════╝", color: "border", delay: 80 },
        { text: "", color: "muted", delay: 500 },
        { text: "♻  Same seed → same faults → same failure. Every time.", color: "green", delay: 0 },
    ];

    const colorMap = {
        muted: 'var(--text-muted)',
        red: 'var(--accent-red, #ef4444)',
        green: 'var(--accent-green, #22c55e)',
        border: 'var(--accent-purple, #8b5cf6)',
        header: 'var(--accent-blue, #3b82f6)',
        prompt: 'var(--text-primary, #e2e8f0)',
    };

    const typewriterElement = document.getElementById('typewriter');
    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < terminalLines.length) {
            const { text, color, delay } = terminalLines[lineIndex];
            const line = document.createElement('div');
            line.style.opacity = '0';
            line.style.fontFamily = "'Fira Code', monospace";
            line.style.fontSize = '0.8rem';
            line.style.lineHeight = '1.5';
            line.style.whiteSpace = 'pre';
            line.textContent = text;
            line.style.color = colorMap[color] || colorMap.muted;

            typewriterElement.appendChild(line);

            // Scroll the page to keep the latest output line visible
            line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(() => {
                line.style.transition = 'opacity 0.2s';
                line.style.opacity = '1';
            }, 30);

            lineIndex++;
            setTimeout(typeLine, delay + Math.random() * 200);
        }
    }

    setTimeout(typeLine, 1200);

    // Copy to clipboard functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const code = e.target.previousElementSibling.textContent;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = '✅';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // Quantum Canvas Animation
    const canvas = document.getElementById('quantum-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.querySelector('.hero').offsetHeight + 200;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
                this.baseAlpha = Math.random() * 0.5 + 0.1;
                this.phase = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.phase += 0.02;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                const alpha = this.baseAlpha + Math.sin(this.phase) * 0.2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${Math.max(0.05, alpha)})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        function drawWave() {
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            
            const time = Date.now() / 2000;
            
            for (let x = 0; x < width; x += 20) {
                const y = Math.sin(x * 0.01 + time) * 30 + Math.sin(x * 0.005 - time * 1.5) * 20;
                ctx.lineTo(x, height / 2 + y);
            }
            
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            drawWave();

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.03)';
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = dx * dx + dy * dy;
                    if (dist < 10000) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Easter Egg
    const logo = document.getElementById('main-logo');
    let logoClicks = 0;
    
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        logoClicks++;
        
        if (logoClicks === 5) {
            showToast('🔬 You found the hidden eigenstate!');
            logoClicks = 0;
        }
    });

    function showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }
});
