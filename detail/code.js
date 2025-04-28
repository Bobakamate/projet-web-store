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

    
var  listeProduit = [
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
function initialiserProduits() {
    console.log("Initialisation des produits...");
    
    // Récupération des produits du localStorage s'ils existent
    const produitsStockes = localStorage.getItem('produits');
    
    if (produitsStockes) {
        try {
            // Si des produits existent dans le localStorage, les utiliser
            const produitsParsed = JSON.parse(produitsStockes);
            listeProduit = produitsParsed.map(p => new Produit(
                p.id, p.nom, p.prix, p.categorie, p.description, p.image
            ));
            console.log("Produits chargés depuis localStorage:", listeProduit.length);
        } catch (e) {
            console.log("Erreur de chargement",e)
          
        }
    } 

}
initialiserProduits()   
function getProduitById(id) {
    for(var i = 0 ; i < listeProduit.length ; i++){
        if(listeProduit[i].id == id){
            return listeProduit[i]
        }
    }
    return null;
    
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("ID reçu :", id);
if(id){
    var produit = getProduitById(id)
    const titre = document.getElementById("produit-titre");
    const prix = document.getElementById("produit-prix");
    const categorie = document.getElementById("produit-categorie");
    const image = document.getElementById("produit-image");
    const description = document.getElementById("produit-description");
    titre.textContent  = produit.nom
    prix.textContent = "Prix : " + produit.prix
    categorie.textContent = "Catégorie : " + produit.categorie
    description.textContent = produit.description
    image.src = "../images/" + produit.image


    





}

let panier = JSON.parse(localStorage.getItem('panier')) || [];
    updateCartCount();
    renderCartDropdown();

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            let totalItems = 0;
            panier.forEach(item => {
                totalItems += parseInt(item.quantite);
            });
            cartCount.textContent = totalItems;
        }
    }

    function addToCart(produit, quantite) {
        const existingProductIndex = panier.findIndex(item => item.id === produit.id);

        if (existingProductIndex !== -1) {
            panier[existingProductIndex].quantite += parseInt(quantite);
        } else {
            panier.push({...produit, quantite: parseInt(quantite)});
        }

        localStorage.setItem('panier', JSON.stringify(panier));
        updateCartCount();
        renderCartDropdown();
        alert(`${produit.nom} a été ajouté au panier!`);
    }

    function toggleCartDropdown() {
        const dropdown = document.getElementById('cart-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        renderCartDropdown();
    }

    function renderCartDropdown() {
        const dropdown = document.getElementById('cart-dropdown');
        dropdown.innerHTML = '';
        
        if (panier.length === 0) {
            dropdown.innerHTML = '<p style="padding:10px;">Panier vide</p>';
            return;
        }

        panier.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.nom}">
                <div class="cart-item-info">
                    <strong>${item.nom}</strong><br>
                    ${item.quantite} x ${item.prix}
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">X</button>
            `;
            dropdown.appendChild(div);
        });
    }

    function removeFromCart(id) {
        panier = panier.filter(item => item.id !== id);
        localStorage.setItem('panier', JSON.stringify(panier));
        updateCartCount();
        renderCartDropdown();
    }

const panierAdd = document.getElementById("achat")
panierAdd.addEventListener("click",function (){
    var produit = getProduitById(id)
    const quantite = document.getElementById("quantite")
    produit.image = "../images/" + produit.image
    addToCart(produit,quantite.value)

})