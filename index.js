document.addEventListener("dblclick", (e) => {
    e.preventDefault();
}, {passive: false})

const problemlayer = document.getElementById("problem");
const gamelayer = document.getElementById("GameLayer");

const problem = "私は駅に向かって走っている男性を見た。";
problemlayer.textContent = problem;

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

PIECES.forEach((p) => {
    const piece = document.createElement("div");
    piece.className = "pieces";
    piece.textContent = p.text;
    piece.BGcolor = POS[p.pos].col
    piece.style.background = piece.BGcolor;

    gamelayer.appendChild(piece);

    const rect = gamelayer.getBoundingClientRect();
    piece.X = Math.random() * (rect.width - 100);
    piece.Y = Math.random() * (rect.height - 100);
    piece.style.left = `${piece.X}px`;
    piece.style.top = `${piece.Y}px`;

    piece.isPointer = false;

    piece.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        piece.isPointer = true;
        piece.style.background = "#cfcfcf";
        piece.pointerX = e.clientX - piece.X;
        piece.pointerY = e.clientY - piece.Y;
        
        piece.setPointerCapture(e.pointerId);
    })

    piece.addEventListener("pointerup", (e) => {
        e.preventDefault();
        piece.style.background = piece.BGcolor;
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
