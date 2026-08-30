document.addEventListener("dblclick", (e) => {
    e.preventDefault();
}, {passive: false})

const problemLayer = document.getElementById("problem");
const selectLayer = document.getElementById("select");

const problem = "私は駅に向かって走っている男性を見た。";
problemLayer.textContent = problem;

const PIECES = [
    {text: "I", pos: "pronoun"},
    {text: "saw", pos: "verb"},
    {text: "a", pos: "article"},
    {text: "man", pos: "noun"},
    {text: "running", pos: "adjective"},
    {text: "toward", pos: "preposition"},
    {text: "the", pos: "article"},
    {text: "station", pos: "noun"}
];

const POS = {
    "noun": {tag: "名詞", col: "#9d333e"},
    "pronoun": {tag: "代名詞", col: "#9d333e"},
    "verb": {tag: "動詞", col: "#4987ae"},
    "auxiliaryVerb": {tag: "助動詞", col: "#4987ae"},
    "adjective": {tag: "形容詞", col: "#2c8a5d"},
    "adverb": {tag: "副詞", col: "#aeac49"},
    "article": {tag: "冠詞", col: "#9f6035"},
    "preposition": {tag: "前置詞", col: "#9f6035"},
    "conjunction": {tag: "接続詞", col: "#6d5aae"},
    "interjection": {tag: "間投詞", col: "#6d5aae"}
};

const Selection = [];

PIECES.forEach((p) => {
    const piece = document.createElement("div");
    piece.className = "pieces";
    piece.textContent = p.text;
    piece.style.background = POS[p.pos].col;
    piece.isPointer = false;
    selectLayer.appendChild(piece);

    const pieceRect = piece.getBoundingClientRect();
    piece.gameWidth = pieceRect.width;

    const index = Math.round(Math.random() * Selection.length)
    Selection.splice(index, 0, piece)

    linePiece();
    
    piece.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        piece.isPointer = true;
        piece.style.filter = "brightness(1.5)";
        piece.style.zIndex = "1";
        piece.pointerX = e.clientX - piece.X;
        piece.pointerY = e.clientY - piece.Y;
        
        piece.setPointerCapture(e.pointerId);
    })

    piece.addEventListener("pointerup", (e) => {
        e.preventDefault();
        piece.style.filter = "brightness(1.0)";
        piece.style.zIndex = "0";
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

function linePiece() {
    let lineWidth = 5;
    let lineHeight = 5;

    const selectRect = selectLayer.getBoundingClientRect();
    Selection.forEach((e) => {
        if (lineWidth + e.gameWidth > selectRect.width) {
            lineHeight += 50;
            lineWidth = 5;
        }
        e.X = lineWidth;
        e.Y = lineHeight;
        e.style.left = `${e.X}px`;
        e.style.top = `${e.Y}px`
        lineWidth += e.gameWidth + 5;
    });
}
