// Utilisateurs de démonstration
const users = [
    { email: "user", password: "user", role: "user" },
    { email: "admin", password: "admin", role: "admin" }
];

// Récupération des éléments du DOM
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const connexionBtn = document.getElementById("connexion");
const errorMessage = document.getElementById("errorMessage");
const forgotPasswordLink = document.getElementById("forgotPassword");
const createAccountLink = document.getElementById("createAccount");

// Fonction pour vérifier les identifiants
function verifierIdentifiants(email, password, role) {
    return users.find(user => 
        user.email === email && 
        user.password === password && 
        user.role === role
    );
}

// Fonction pour rediriger selon le rôle
function redirectionSelonRole(role) {
    if (role === "admin") {
        window.location.href = "../admin/index.html";
    } else {
        window.location.href = "../index.html";
    }
}

// Gestion de la connexion
connexionBtn.addEventListener("click", function() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const selectedRole = document.querySelector('input[name="role"]:checked').value;
    
    // Validation des champs
    if (!email || !password) {
        errorMessage.textContent = "Veuillez remplir tous les champs";
        return;
    }
    
    // Vérification des identifiants
    const user = verifierIdentifiants(email, password, selectedRole);
    
    if (user) {
        // Stockage des informations de l'utilisateur
        sessionStorage.setItem("utilisateurConnecte", JSON.stringify({
            email: user.email,
            role: user.role
        }));
        
        // Redirection
        redirectionSelonRole(user.role);
    } else {
        errorMessage.textContent = "Email, mot de passe ou rôle incorrect";
    }
});

// Gestion du mot de passe oublié
forgotPasswordLink.addEventListener("click", function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    
    if (!email) {
        errorMessage.textContent = "Veuillez entrer votre email pour réinitialiser votre mot de passe";
    } else {
        errorMessage.textContent = "Un email de réinitialisation a été envoyé (simulation)";
        errorMessage.style.color = "green";
    }
});

// Gestion de la création de compte
createAccountLink.addEventListener("click", function(e) {
    e.preventDefault();
    alert("Redirection vers la page de création de compte (à implémenter)");
});

// Effacer le message d'erreur quand l'utilisateur commence à taper
emailInput.addEventListener("input", function() {
    errorMessage.textContent = "";
});

passwordInput.addEventListener("input", function() {
    errorMessage.textContent = "";
});

// Permettre la connexion avec la touche Entrée
passwordInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        connexionBtn.click();
    }
});