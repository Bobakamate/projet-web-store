


    class Produit {
        constructor(id, nom, prix, categorie, description, image) {
            this.id = id;
            this.nom = nom;
            this.prix = prix;
            this.categorie = categorie;
            this.description = description;
            this.image = image;
        }
    }
    
    const listeProduit = [
        new Produit(0, "Dell XPS 13", "12990 MAD", "PC", "Le Dell XPS 13 est un ultrabook premium avec un écran InfinityEdge de 13,4 pouces au ratio 16:10. Il embarque un processeur Intel Core i7, 16Go de RAM et un SSD de 512Go dans un châssis léger et élégant.", "dell.jpg"),
        
        new Produit(1, "iPhone 14 Pro", "9990 MAD", "Smartphone", "L'iPhone 14 Pro est doté de la puce A16 Bionic, d'un écran OLED de 6,1 pouces avec Dynamic Island et d'une caméra principale de 48MP. Sa construction en acier inoxydable et verre Ceramic Shield offre une durabilité premium.", "iPhone-14-Pro.jpg"),
        
        new Produit(2, "iPad Air 5", "5990 MAD", "Tablette", "L'iPad Air 5 intègre la puissante puce M1 d'Apple et un écran Liquid Retina de 10,9 pouces. Compatible avec l'Apple Pencil 2 et le Magic Keyboard, il convient parfaitement aux créatifs et professionnels en déplacement.", "ipad-Air-5.jpg"),
        
        new Produit(3, "PlayStation 5", "4990 MAD", "Console", "La PlayStation 5 offre une expérience gaming nouvelle génération avec son SSD ultra-rapide et sa manette DualSense à retour haptique. Son architecture CPU/GPU AMD permet des jeux en 4K à 60fps avec ray-tracing.", "ps-5.webp"),
        
        new Produit(4, "AirPods Pro 2", "2490 MAD", "Écouteurs", "Les AirPods Pro 2 proposent une réduction de bruit améliorée et un son spatial personnalisé. Dotés de la nouvelle puce H2, ils offrent une meilleure autonomie et un confort optimal avec leurs embouts en silicone de différentes tailles.", "AirPod.webp"),
        
        new Produit(5, "Samsung Galaxy Watch 5", "2990 MAD", "Smartwatch", "La Galaxy Watch 5 combine un écran AMOLED de qualité avec des fonctions avancées de suivi de santé. Elle mesure la composition corporelle, l'ECG et surveille la qualité du sommeil sous Wear OS personnalisé par Samsung.", "samsung-watch.webp"),
        
        new Produit(6, "LG OLED C2 55\"", "12990 MAD", "TV", "Le TV LG OLED C2 55\" offre des noirs parfaits et des couleurs éclatantes grâce à sa technologie OLED evo. Idéal pour le gaming avec ses ports HDMI 2.1 compatibles 4K 120Hz et son processeur α9 Gen5 optimisé par IA.", "lg-oled.avif"),
        
        new Produit(7, "Logitech MX Keys", "1190 MAD", "Accessoire", "Le Logitech MX Keys est un clavier premium avec des touches sphériques parfaitement stables et un rétroéclairage intelligent. Il permet de connecter jusqu'à 3 appareils et offre une autonomie de plusieurs mois.", "keybord.webp"),
        
        new Produit(8, "Canon EOS R50", "6790 MAD", "Caméra", "Le Canon EOS R50 est un appareil photo hybride compact avec un capteur APS-C de 24,2MP. Son écran orientable à 180° et son autofocus Dual Pixel en font un choix idéal pour les vloggers et créateurs de contenu.", "camon.webp"),
        
        new Produit(9, "DJI Mini 3 Pro", "7590 MAD", "Drone", "Le DJI Mini 3 Pro pèse moins de 249g tout en offrant une caméra 4K stabilisée sur 3 axes. Il intègre des capteurs d'obstacles tri-directionnels et une autonomie de 34 minutes pour des prises de vue aériennes de qualité.", "dji-mini.jpg"),
        
        new Produit(10, "Samsung Galaxy S23", "7990 MAD", "Smartphone", "Le Galaxy S23 dispose d'un écran AMOLED 120Hz de 6,1 pouces et du puissant processeur Snapdragon 8 Gen 2. Son système photo polyvalent comprend un capteur principal de 50MP pour des clichés détaillés en toutes conditions.", "s23.webp"),
        
        new Produit(11, "Nintendo Switch OLED", "3490 MAD", "Console", "La Nintendo Switch OLED améliore l'expérience de jeu avec son écran OLED de 7 pouces aux couleurs vibrantes. Elle intègre 64Go de stockage, un port Ethernet au dock et un support arrière ajustable plus robuste.", "switch-oled.jpg"),
        
    ];
    
      


function create_produit_item(main_box,produit_box,listeProduitItem){
if(listeProduitItem){
    var produit = document.createElement("div")
produit.className = "produit"
var produit_image = document.createElement("img")
produit_image.className = "produit-image"
produit_image.src = "images/" + listeProduitItem.image
var price_box = document.createElement("div")
price_box.className = "price-box"
var title = document.createElement("h3")
var price = document.createElement("h3")
title.textContent=listeProduitItem.nom
price.textContent= listeProduitItem.prix
price_box.appendChild(title)
price_box.appendChild(price)
var categorie = document.createElement("h3")
categorie.textContent =listeProduitItem.categorie
var description = document.createElement("p")
description.textContent = listeProduitItem.description
var boutton = document.createElement("button")
var lien = document.createElement("a")
lien.appendChild(boutton)
lien.href = "/detail/index.html?id=" + listeProduitItem.id

boutton.className = "achat"
boutton.textContent="Acheter"
produit.appendChild(produit_image)
produit.appendChild(price_box)
produit.appendChild(categorie)
produit.appendChild(description)
produit.appendChild(lien)
produit_box.appendChild(produit)
main_box.appendChild(produit_box)



console.log("produit box",produit_box)
}


}



var main_box = document.getElementById("main-box")



for(var i = 0 ; i < listeProduit.length ; i++){
var produit_box = document.createElement("div")
produit_box.className = "produit-box"
listeProduitItem = listeProduit[i]
listeProduitNext = listeProduit[i +1]
create_produit_item(main_box,produit_box,listeProduitItem)
create_produit_item(main_box,produit_box,listeProduitNext)
i++
}
function filtrerProduitsParTitre(texteRecherche) {
    return listeProduit.filter(produit =>
        produit.nom.toLowerCase().includes(texteRecherche.toLowerCase())
    );
}
function filtrerProduitsParCategorie(texteRecherche) {
    return listeProduit.filter(produit =>
        produit.categorie.toLowerCase().includes(texteRecherche.toLowerCase())
    );
}
function filtrerProduitsParPrix(minInput, maxInput) {
    const min = parseFloat(minInput.value) || 0;
    const max = parseFloat(maxInput.value) || Infinity;

    return listeProduit.filter(produit => {
        const prixNettoye = parseFloat(produit.prix.replace("MAD", "").trim());
        return prixNettoye >= min && prixNettoye <= max;
    });
}

function rechercherParPrix() {
    const inputMin = document.getElementById("prixMin");
    const inputMax = document.getElementById("prixMax");

    const resultats = filtrerProduitsParPrix(inputMin, inputMax);
    afficherResultats(resultats);
}

function afficherResultats(listeRecherche){
    for(var i = 0 ; i < listeRecherche.length  ; i++){
        var produit_box = document.createElement("div")
        produit_box.className = "produit-box"
        listeProduitItem = listeRecherche[i]
        listeProduitNext = listeRecherche[i +1]
        create_produit_item(main_box,produit_box,listeProduitItem)
        create_produit_item(main_box,produit_box,listeProduitNext)
        i++
        }
}

const search = document.getElementById("search");
const filtrePrix = document.getElementById("filtrePrix")
filtrePrix.addEventListener("click", function () {
    main_box.innerHTML =""
    rechercherParPrix()


    console.log("Valeur modifiée :", search.value);

});
search.addEventListener("input", function () {
    main_box.innerHTML =""
    const listeRecherche = filtrerProduitsParTitre(search.value)
    afficherResultats(listeRecherche)


    console.log("Valeur modifiée :", search.value);

});

const Categorie = document.getElementById("Categorie")
Categorie.addEventListener("change",function (){
    main_box.innerHTML =""
    var listeRecherche = filtrerProduitsParCategorie(Categorie.value)
    if(Categorie.value == "all"){
        listeRecherche = listeProduit

    }
    afficherResultats(listeRecherche)
})








 
