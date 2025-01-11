// Triangle Animation
document.querySelectorAll('.artist-card').forEach(card => {
    const canvas = card.querySelector('.triangle-canvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas to match card size
    const resizeCanvas = () => {
        canvas.width = card.offsetWidth;
        canvas.height = card.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let triangles = [];
    let animationFrameId;

    class Triangle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 20 + 10;
            this.color = Math.random() < 0.25 ? 'red' : 'white'; // 25% red
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = 1; // Start fully visible
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.02; // Fade out
        }
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.size / 2); // Top point
            ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2); // Bottom left
            ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2); // Bottom right
            ctx.closePath();
            ctx.fill();
        }
    }

    const spawnTriangles = () => {
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            triangles.push(new Triangle(x, y));
        }
    };

    const animateTriangles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        triangles = triangles.filter(triangle => triangle.opacity > 0); // Remove faded triangles
        triangles.forEach(triangle => {
            triangle.update();
            triangle.draw();
        });

        if (triangles.length > 0) {
            animationFrameId = requestAnimationFrame(animateTriangles);
        }
    };

    // Trigger animation on hover
    card.addEventListener('mouseenter', () => {
        spawnTriangles();
        if (!animationFrameId) animateTriangles();
    });
});


// Background Animation
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Define triangles with one red
let triangles = [
    { x: canvas.width / 2, y: canvas.height / 2, size: 800, angle: 0, color: 'rgba(255, 0, 0, 0.5)' }, // Red triangle
    { x: canvas.width / 4, y: canvas.height / 4, size: 300, angle: 45, color: 'rgba(255, 255, 255, 0.05)' },
    { x: (canvas.width / 4) * 3, y: (canvas.height / 4) * 3, size: 350, angle: -30, color: 'rgba(255, 255, 255, 0.05)' },
];

function drawTriangles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    triangles.forEach(triangle => {
        ctx.save();
        ctx.translate(triangle.x, triangle.y);
        ctx.rotate((triangle.angle * Math.PI) / 180);

        ctx.beginPath();
        ctx.moveTo(0, -triangle.size / 2); // Top vertex
        ctx.lineTo(-triangle.size / 2, triangle.size / 2); // Bottom left
        ctx.lineTo(triangle.size / 2, triangle.size / 2); // Bottom right
        ctx.closePath();

        // Use the triangle's color property
        ctx.fillStyle = triangle.color;
        ctx.fill();
        ctx.restore();

        // Increment rotation angle
        triangle.angle += 0.1;
    });

    requestAnimationFrame(drawTriangles);
}

drawTriangles();

