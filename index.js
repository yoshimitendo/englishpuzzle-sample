document.addEventListener("dblclick", (e) => {
    e.preventDefault();
}, {passive: false})

const problem = document.getElementById("problemFront");
const gamelayer = document.getElementById("GameLayer");

problem.textContent = "サッカー場に向かって走っている男の子を私は見た。";

const PIECES = ["I", "saw", "a", "man", "running", "toward", "the", "statiton"];

PIECES.forEach((p) => {
    const piece = document.createElement("div");
    piece.className = "pieces"
    piece.textContent = p;

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${Math.random() * 100}%`;

    gamelayer.appendChild(piece);
})
