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

    piece.style.left = `${Math.random() * 100}px`;
    piece.style.top = `${Math.random() * 100}px`;

    gamelayer.appendChild(piece);

    piece.isPointer = false;

    piece.addEventListener("pointerdown", (e) => {
        piece.isPointer = true;
        const rect = piece.getBoundingClientRect();
        piece.pointerX = e.clientX - rect.left;
        piece.pointerY = e.clientY - rect.top;
    })

    piece.addEventListener("pointerup", (e) => {
        piece.isPointer = false;
    })

    piece.addEventListener("pointermove", (e) => {
        if (!piece.isPointer) {return;}
        piece.style.left = `${e.clientX - piece.pointerX}px`;
        piece.style.top = `${e.clientY - piece.pointerY}px`;
    })
})
