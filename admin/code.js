// Vérification de l'authentification
function checkAuth() {
    const utilisateur = JSON.parse(sessionStorage.getItem('utilisateurConnecte')) || {};
    if (!utilisateur.role || utilisateur.role !== 'admin') {
        alert('Accès réservé aux administrateurs. Redirection vers la page de connexion.');
        window.location.href = '../login/index.html';
        return false;
    }
    return true;
}

// Variable globale pour stocker l'ID du produit à supprimer
var suppressionId = -1;

// Classe Produit
class Produit {
    constructor(id, nom, prix, categorie, description, image) {
        this.id = parseInt(id); // Assurer que l'ID est un nombre
        this.nom = nom;
        // Normaliser le format du prix
        this.prix = prix.includes('MAD') ? prix : prix + ' MAD';
        this.categorie = categorie;
        this.description = description;
        this.image = image;
    }
}

// Initialisation et récupération des produits du localStorage
let listeProduit = [];

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
            console.error("Erreur lors du parsing des produits:", e);
            // En cas d'erreur, réinitialiser avec la liste par défaut
            utiliserProduitsParDefaut();
        }
    } else {
        // Sinon, utiliser la liste des produits par défaut
        utiliserProduitsParDefaut();
    }
    
    // Affichage initial des produits
    afficherProduits();
    // Mise à jour des statistiques
    mettreAJourStatistiques();
}

// Fonction qui initialise la liste des produits par défaut
function utiliserProduitsParDefaut() {
    console.log("Utilisation des produits par défaut");
    
    listeProduit = [
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
    
    // Sauvegarde de la liste initiale dans le localStorage
    sauvegarderProduits();
}

// Fonction pour sauvegarder les produits dans le localStorage
function sauvegarderProduits() {
    try {
        localStorage.setItem('produits', JSON.stringify(listeProduit));
        console.log("Produits sauvegardés dans localStorage");
    } catch (e) {
        console.error("Erreur lors de la sauvegarde des produits:", e);
    }
}

// Affichage des produits dans le tableau
function afficherProduits(produitsAffichage = null) {
    const tableBody = document.getElementById('produitTableBody');
    if (!tableBody) {
        console.error("Élément produitTableBody non trouvé!");
        return;
    }
    
    tableBody.innerHTML = '';
    
    // Utilise soit la liste filtrée passée en paramètre, soit la liste complète
    const produits = produitsAffichage || listeProduit;
    
    produits.forEach(produit => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${produit.id}</td>
            <td><img src="../images/${produit.image}" alt="${produit.nom}" class="product-image" ></td>
            <td>${produit.nom}</td>
            <td>${produit.prix}</td>
            <td>${produit.categorie}</td>
            <td class="action-buttons">
                <button class="action-btn edit-btn" data-id="${produit.id}">Modifier</button>
                <button class="action-btn delete-btn" data-id="${produit.id}">Supprimer</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Ajout des écouteurs d'événements pour les boutons
    ajouterEcouteursTableau();
}

// Ajout des écouteurs d'événements aux boutons du tableau
function ajouterEcouteursTableau() {
    // Boutons d'édition
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const produitId = parseInt(this.getAttribute('data-id'));
            ouvrirModalEdition(produitId);
        });
    });
    
    // Boutons de suppression
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const produitId = parseInt(this.getAttribute('data-id'));
            ouvrirModalConfirmation(produitId);
        });
    });
}

// Fonction pour rechercher des produits
function rechercherProduits() {
    const searchTerm = document.getElementById('searchProduit').value.toLowerCase();
    const categorieFilter = document.getElementById('filterCategorie').value;
    
    let resultats = listeProduit.filter(produit => 
        produit.nom.toLowerCase().includes(searchTerm) &&
        (categorieFilter === 'all' || produit.categorie === categorieFilter)
    );
    
    afficherProduits(resultats);
}

// Fonctions pour la gestion du modal d'ajout/édition
function ouvrirModalAjout() {
    console.log("Ouverture du modal d'ajout");
    
    const modal = document.getElementById('produitModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('produitForm');
    
    if (!modal || !modalTitle || !form) {
        console.error("Éléments du modal non trouvés!");
        return;
    }
    
    modalTitle.textContent = 'Ajouter un produit';
    form.reset();
    
    // Vider le champ ID pour indiquer qu'il s'agit d'un nouvel élément
    const idInput = document.getElementById('produitId');
    if (idInput) {
        idInput.value = '';
    }
    
    modal.style.display = 'block';
}

function ouvrirModalEdition(produitId) {
    console.log("Ouverture du modal d'édition pour le produit:", produitId);
    
    const produit = listeProduit.find(p => p.id === produitId);
    if (!produit) {
        console.error(`Produit avec ID ${produitId} non trouvé`);
        return;
    }
    
    const modal = document.getElementById('produitModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('produitForm');
    
    if (!modal || !modalTitle || !form) {
        console.error("Éléments du modal non trouvés!");
        return;
    }
    
    modalTitle.textContent = 'Modifier un produit';
    
    // Extraire le prix sans "MAD"
    const prixValue = produit.prix.replace(/\s*MAD\s*/g, '').trim();
    
    document.getElementById('produitId').value = produit.id;
    document.getElementById('nom').value = produit.nom;
    document.getElementById('prix').value = prixValue;
    document.getElementById('categorie').value = produit.categorie;
    document.getElementById('image').value = produit.image;
    document.getElementById('description').value = produit.description;
    
    modal.style.display = 'block';
}

function fermerModal() {
    const modal = document.getElementById('produitModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fonction pour obtenir le prochain ID disponible
function getNouvelId() {
    if (listeProduit.length === 0) return 0;
    return Math.max(...listeProduit.map(p => p.id)) + 1;
}

// Fonction pour la suppression de produits - Version simplifiée et robuste
function ouvrirModalConfirmation(produitId) {
    console.log("Demande de confirmation pour supprimer le produit:", produitId);
    // S'assurer que produitId est un nombre
    produitId = parseInt(produitId);
    if (isNaN(produitId)) {
        console.error("ID invalide reçu pour la suppression:", produitId);
        return;
    }
    const confirmBtn = document.getElementById('confirmDelete');
    if (confirmBtn) {
        confirmBtn.setAttribute('data-delete-id', produitId); // Stocker l'ID comme nombre
    } else {
        console.error("Bouton confirmDelete non trouvé!");
    }
    const modal = document.getElementById('confirmModal');
    if (!modal) {
        console.error("Modal de confirmation non trouvé!");
        return;
    }
    modal.style.display = 'block';
}

function fermerModalConfirmation() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function supprimerProduit(produitId) {
    console.log("Tentative de suppression du produit avec ID:", produitId);
    
    // Debug - afficher la liste avant suppression
     
    produitId = parseInt(produitId); // S'assurer que l'ID est un nombre
    const longueurAvant = listeProduit.length;
    
    // Filtrer pour enlever le produit avec l'ID spécifié
    listeProduit = listeProduit.filter(p => p.id !== produitId);
    
    // Debug - afficher la liste après suppression
     
    if (longueurAvant === listeProduit.length) {
        console.warn("Aucun produit n'a été supprimé. ID introuvable:", produitId);
        alert("Erreur: Produit non trouvé avec ID " + produitId);
    } else {
        console.log("Produit supprimé avec succès");
        // Sauvegarder, mettre à jour l'affichage et fermer le modal
        sauvegarderProduits();
        afficherProduits();
        mettreAJourStatistiques();
    }
    
    fermerModalConfirmation();
}

// Dans la fonction initialiserEcouteurs(), remplacer le gestionnaire d'événements pour confirmDelete:
// Confirmation de suppression - Version entièrement réécrire

// Gestion des statistiques
function mettreAJourStatistiques() {
    console.log("Mise à jour des statistiques");
    
    // Nombre total de produits
    const totalProduitsElement = document.getElementById('totalProduits');
    if (totalProduitsElement) {
        totalProduitsElement.textContent = listeProduit.length;
    }
    
    // Nombre de catégories uniques
    const categories = new Set(listeProduit.map(p => p.categorie));
    const totalCategoriesElement = document.getElementById('totalCategories');
    if (totalCategoriesElement) {
        totalCategoriesElement.textContent = categories.size;
    }
    
    // Prix moyen - correction du calcul
    const prixMoyenElement = document.getElementById('prixMoyen');
    if (!prixMoyenElement) return;
    
    let prixTotal = 0;
    let nombreProduits = 0;
    
    listeProduit.forEach(produit => {
        try {
            // Extraire uniquement les chiffres du prix
            const prixNettoye = parseFloat(produit.prix.replace(/[^\d.]/g, ''));
            if (!isNaN(prixNettoye)) {
                prixTotal += prixNettoye;
                nombreProduits++;
            }
        } catch (e) {
            console.error("Erreur lors du calcul du prix moyen:", e);
        }
    });
    
    const prixMoyen = nombreProduits > 0 ? prixTotal / nombreProduits : 0;
    prixMoyenElement.textContent = prixMoyen.toFixed(2) + ' MAD';
    
    // Graphique par catégorie
    const chartContainer = document.getElementById('categoryChart');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = '';
    
    // Comptage des produits par catégorie
    const categorieStats = {};
    listeProduit.forEach(produit => {
        if (!categorieStats[produit.categorie]) {
            categorieStats[produit.categorie] = 0;
        }
        categorieStats[produit.categorie]++;
    });
    
    // Vérification s'il y a des catégories à afficher
    if (Object.keys(categorieStats).length === 0) {
        chartContainer.innerHTML = '<p>Aucune donnée à afficher</p>';
        return;
    }
    
    // Trouver la valeur max pour ajuster la hauteur
    const maxValue = Math.max(...Object.values(categorieStats));
    
    Object.entries(categorieStats).forEach(([categorie, count]) => {
        const barHeight = (count / maxValue) * 250; // 250px est la hauteur maximale
        
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${barHeight}px`;
        
        const value = document.createElement('div');
        value.className = 'chart-bar-value';
        value.textContent = count;
        bar.appendChild(value);
        
        const label = document.createElement('div');
        label.className = 'chart-bar-label';
        label.textContent = categorie;
        
        const barContainer = document.createElement('div');
        barContainer.className = 'chart-bar-container';
        barContainer.appendChild(bar);
        barContainer.appendChild(label);
        
        chartContainer.appendChild(barContainer);
    });
}

// Initialisation des écouteurs d'événements
function initialiserEcouteurs() {
    console.log("Initialisation des écouteurs d'événements");
    
    // Soumission du formulaire
    const produitForm = document.getElementById('produitForm');
    if (produitForm) {
        produitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Soumission du formulaire");
            
            const idInput = document.getElementById('produitId').value;
            const nom = document.getElementById('nom').value;
            let prix = document.getElementById('prix').value.trim();
            
            // S'assurer que le prix a le format correct
            if (!prix.includes('MAD')) {
                prix = prix + ' MAD';
            }
            
            const categorie = document.getElementById('categorie').value;
            const description = document.getElementById('description').value;
            const image = document.getElementById('image').value;
            
            if (idInput === '') {
                // Ajout d'un nouveau produit
                const nouvelId = getNouvelId();
                console.log("Ajout d'un nouveau produit avec ID:", nouvelId);
                
                const nouveauProduit = new Produit(
                    nouvelId,
                    nom,
                    prix,
                    categorie,
                    description,
                    image
                );
                
                listeProduit.push(nouveauProduit);
            } else {
                // Modification d'un produit existant
                const id = parseInt(idInput);
                console.log("Modification du produit avec ID:", id);
                
                const index = listeProduit.findIndex(p => p.id === id);
                
                if (index !== -1) {
                    listeProduit[index] = new Produit(
                        id,
                        nom,
                        prix,
                        categorie,
                        description,
                        image
                    );
                } else {
                    console.error(`Produit avec ID ${id} non trouvé pour modification`);
                }
            }
            
            sauvegarderProduits();
            afficherProduits();
            mettreAJourStatistiques();
            fermerModal();
        });
    } else {
        console.error("Formulaire produitForm non trouvé!");
    }

    // MODIFICATION 2: Correction de la confirmation de suppression
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    console.log("confirmDeleteBtn",confirmDeleteBtn)
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const idASupprimer = confirmDeleteBtn.getAttribute('data-delete-id');
            if (idASupprimer) {
                console.log("Confirmation de suppression pour ID:", idASupprimer);
                supprimerProduit(idASupprimer);
            } else {
                console.error("ID de suppression non défini sur le bouton");
                alert("Erreur: ID de suppression non défini");
            }
        });
    } else {
        console.error("Bouton confirmDelete non trouvé!");
    }

    // Gérer les clics sur les onglets de la sidebar
    document.querySelectorAll('.sidebar li').forEach(tab => {
        tab.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Désactiver tous les onglets et sections
            document.querySelectorAll('.sidebar li').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            
            // Activer l'onglet et la section cliqués
            this.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Gérer le bouton de déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('utilisateurConnecte');
            window.location.href = '../login/index.html';
        });
    } else {
        console.error("Bouton logoutBtn non trouvé!");
    }

    // Gestion des modaux
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', fermerModal);
    } else {
        console.error("Bouton de fermeture modal non trouvé!");
    }
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', fermerModal);
    } else {
        console.error("Bouton cancelBtn non trouvé!");
    }
    
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', fermerModalConfirmation);
    } else {
        console.error("Bouton cancelDelete non trouvé!");
    }

    // Gestion des événements de recherche et filtre
    const searchInput = document.getElementById('searchProduit');
    if (searchInput) {
        searchInput.addEventListener('input', rechercherProduits);
    } else {
        console.error("Champ de recherche searchProduit non trouvé!");
    }
    
    const filterCategorie = document.getElementById('filterCategorie');
    if (filterCategorie) {
        filterCategorie.addEventListener('change', rechercherProduits);
    } else {
        console.error("Sélecteur filterCategorie non trouvé!");
    }

    // Bouton d'ajout
    const ajouterProduitBtn = document.getElementById('ajouterProduit');
    if (ajouterProduitBtn) {
        ajouterProduitBtn.addEventListener('click', ouvrirModalAjout);
    } else {
        console.error("Bouton ajouterProduit non trouvé!");
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded - Démarrage de l'application");
    
    if (checkAuth()) {
        initialiserProduits();
        initialiserEcouteurs();
        remplirCategories();
    }
});


function remplirCategories() {
    const select = document.getElementById("filterCategorie");
    
    // Vider les anciennes options (facultatif si besoin)
    select.innerHTML = '';

    // Ajouter l'option "Toutes les catégories" en premier
    const optionAll = document.createElement("option");
    optionAll.value = "all";
    optionAll.textContent = "Toutes les catégories";
    select.appendChild(optionAll);

    // Extraire toutes les catégories uniques depuis listeProduit
    const categories = [...new Set(listeProduit.map(p => p.categorie))];

    // Ajouter une option pour chaque catégorie
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

}
