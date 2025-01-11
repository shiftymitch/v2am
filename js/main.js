// Interactive Canvas Effect
const canvas = document.getElementById('interactiveCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Simple particle animation
let particles = [];
class Particle {
    constructor(x, y, count) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 4;
        this.speedX = Math.random() * 1 - 0.01;
        this.speedY = Math.random() * 1 - 0.01;
        this.rotation = 0; // Initial rotation angle
        this.rotationSpeed = Math.random() * 0.02 - 0.01; // Slow rotation speed
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed; // Update rotation
        if (this.size > 0.1) this.size -= 0.05;
    }
    draw() {
        ctx.fillStyle = '#ec2028';
        ctx.save(); // Save the current canvas state
        ctx.translate(this.x, this.y); // Move to the particle's position
        ctx.rotate(this.rotation); // Rotate the canvas
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.size); // Top vertex
        ctx.lineTo(-this.size, this.size); // Bottom left
        ctx.lineTo(this.size, this.size); // Bottom right
        ctx.closePath();
        ctx.fill();
        ctx.restore(); // Restore the canvas state
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) particles.splice(i, 1);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('mousemove', (event) => {
    particles.push(new Particle(event.x, event.y));
});

// Button Interaction
document.getElementById('enterSite').addEventListener('click', () => {
    window.location.href = 'artists.html';
});

console.log('Script loaded');
