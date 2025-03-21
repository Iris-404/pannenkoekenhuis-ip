let score = 0;
let juisteBestelling = [];
let gekozenIngredienten = [];
const pannenkoek = document.getElementById("pannenkoek");
const ingredientenContainer = document.getElementById("ingredienten-container");

const ingredienten = [
    { naam: "chocolade", src: "images/chocola.png", topping: "images/saus-chocola.png" },
    { naam: "aardbei", src: "images/aardbei.png", topping: "images/saus-aardbei.png" },
    { naam: "stroop", src: "images/stroop.png", topping: "images/saus-stroop.png" },
    { naam: "banaan", src: "images/banaan-bak.png", topping: "images/banaan.png" },
    { naam: "kaas", src: "images/kaas-bak.png", topping: "images/kaas.png" },
    { naam: "spek", src: "images/spek-bak.png", topping: "images/spek.png" }
];

const toppingPosities = {
    "chocolade": { x: 30, y: 25 },
    "aardbei": { x: 30, y: 25 },
    "stroop": { x: 30, y: 25 },
    "banaan": { x: 50, y: 40 },
    "kaas": { x: 45, y: 40 },
    "spek": { x: 35, y: 40 }
};

function nieuweKlant() {
    let randomKlant = `images/personage_${Math.floor(Math.random() * 3) + 1}.png`;
    document.getElementById("personage").src = randomKlant;
    juisteBestelling = [];
    for (let i = 0; i < 2; i++) {
        let randomIngredient = ingredienten[Math.floor(Math.random() * ingredienten.length)];
        juisteBestelling.push(randomIngredient.naam);
    }
    
    let bestellingTekst = "Ik wil een pannenkoek met " + juisteBestelling.join(" en ");
    document.getElementById("tekstballon-text").innerText = bestellingTekst;
    
    gekozenIngredienten = [];
    document.querySelectorAll(".topping").forEach(el => el.remove()); // Reset toppings
}

function voegIngredientToe(naam, src) {
    if (gekozenIngredienten.length < 2) {
        gekozenIngredienten.push(naam);
        let ingredient = ingredienten.find(ing => ing.naam === naam);
        let img = document.createElement("img");
        img.src = ingredient.topping;
        img.classList.add("topping");
        let pannenkoekPos = pannenkoek.getBoundingClientRect();
        let pos = toppingPosities[naam] || { x: 50, y: 50 }; 
        img.style.position = "absolute";
        img.style.left = `${pannenkoekPos.left + pos.x}px`;
        img.style.top = `${pannenkoekPos.top + pos.y}px`;
        document.getElementById("game-container").appendChild(img);
    }
}

document.getElementById("serveer-knop").addEventListener("click", () => {
    if (gekozenIngredienten.sort().join() === juisteBestelling.sort().join()) {
        score += 50;
        nieuweKlant();
    } else {
        alert("Fout! Game over!");
        score = 0;
    }
    document.getElementById("score").innerText = score;
});

ingredienten.forEach(ingredient => {
    let img = document.createElement("img");
    img.src = ingredient.src;
    img.classList.add("ingredient");
    img.style.cursor = "pointer";
    img.addEventListener("click", () => voegIngredientToe(ingredient.naam, ingredient.src));
    ingredientenContainer.appendChild(img);
});

nieuweKlant();