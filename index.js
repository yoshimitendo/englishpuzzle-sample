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

    const rect = gamelayer.getBoundingClientRect();
    piece.style.left = `${Math.random() * (rect.width - 100)}px`;
    piece.style.top = `${Math.random() * (rect.height - 100)}px`;

    gamelayer.appendChild(piece);

    piece.isPointer = false;

    piece.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        piece.isPointer = true;
        const rect = piece.getBoundingClientRect();
        piece.pointerX = e.clientX - rect.left;
        piece.pointerY = e.clientY - rect.top;
        
        piece.setPointerCapture(e.pointerId);
    })

    piece.addEventListener("pointerup", (e) => {
        e.preventDefault();
        piece.isPointer = false;

        piece.releasePointerCapture(e.pointerId);
    })

    piece.addEventListener("pointermove", (e) => {
        e.preventDefault();
        if (!piece.isPointer) return;
        const rect = gamelayer.getBoundingClientRect();
        piece.style.left = `${e.clientX - piece.pointerX - rect.left}px`;
        piece.style.top = `${e.clientY - piece.pointerY - rect.top}px`;
    })
})
