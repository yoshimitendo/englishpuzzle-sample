document.addEventListener("dblclick", (e) => {
    e.preventDefault();
}, {passive: false})

document.addEventListener("pointermove", (e) => {
    e.preventDefault();
}, {passive: false})

const problem = document.getElementById("problemFront");
const gamelayer = document.getElementById("GameLayer");

problem.textContent = "サッカー場に向かって走っている男の子を私は見た。";

const PIECES = ["I", "saw", "a", "man", "running", "toward", "the", "station"];

PIECES.forEach((p) => {
    const piece = document.createElement("div");
    piece.className = "pieces"
    piece.textContent = p;

    const rect = gamelayer.getBoundingClientRect();
    piece.X = Math.random() * (rect.width - 100);
    piece.Y = Math.random() * (rect.height - 100);
    piece.style.left = `${piece.X}px`;
    piece.style.top = `${piece.Y}px`;

    gamelayer.appendChild(piece);

    piece.isPointer = false;

    piece.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        piece.isPointer = true;
        piece.style.background = "#f09d9d";
        piece.pointerX = e.clientX - piece.X;
        piece.pointerY = e.clientY - piece.Y;
        
        piece.setPointerCapture(e.pointerId);
    })

    piece.addEventListener("pointerup", (e) => {
        e.preventDefault();
        piece.style.background = "#e9eef3";
        piece.isPointer = false;

        piece.releasePointerCapture(e.pointerId);
    })

    piece.addEventListener("pointermove", (e) => {
        e.preventDefault();
        if (!piece.isPointer) return;
        piece.X = e.clientX - piece.pointerX;
        piece.Y = e.clientY - piece.pointerY;
        piece.style.left = `${piece.X}px`;
        piece.style.top = `${piece.Y}px`;
    })
})
