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

    // Terminal Typewriter Effect
    const terminalLines = [
        "💥 Injecting pod crash on api-server-7d4f...",
        "🌐 Injecting network latency on redis-0 (+340ms)",
        "🔌 Injecting network partition on worker-2...",
        "✅ Probes recovered in 8.2s"
    ];
    
    const typewriterElement = document.getElementById('typewriter');
    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex < terminalLines.length) {
            const line = document.createElement('div');
            line.style.opacity = '0';
            line.textContent = terminalLines[lineIndex];
            
            // Highlight specific parts based on emoji
            if (terminalLines[lineIndex].includes('✅')) {
                line.style.color = 'var(--accent-green)';
            } else if (terminalLines[lineIndex].includes('💥')) {
                line.style.color = 'var(--accent-red)';
            } else {
                line.style.color = 'var(--text-muted)';
            }

            typewriterElement.appendChild(line);
            
            // Fade in effect for the line
            setTimeout(() => {
                line.style.transition = 'opacity 0.3s';
                line.style.opacity = '1';
            }, 50);

            lineIndex++;
            setTimeout(typeLine, 800 + Math.random() * 500);
        }
    }

    setTimeout(typeLine, 1500);

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
