function loadContent(lang) {
    var content = {
        'en': {
            'about': 'About Us',
            'asylumLink': 'Asylum',
            'aboutText': 'Information',
            'citizenshipLink': 'Citizenship',
            'contentLink': 'Immigration Help',
            'contentPageBanner': 'Select the topic of immigration help you need from the menu',
            'green_cardLink': 'Green Card',
            'homeLink': 'Home',
            'homepageContent': 'The main homepage content will go here',
            'languageLink':'English/Español',
            'petitionsLink': 'Family Petitions',
            'titleLink': 'Immigrate Forward',
            'searchLink':'Search',
            'signInLink': 'Sign In with Google',
            'signUpLink': 'Register',
            'signOutLink': 'Sign Out',
            'sponsorshipLink': 'Sponsorship',
            'userLink': 'My Account',
            'work_permitLink': 'Work Permit'
            // ... other keys
        },
        'es': {
            'about': 'Sobre Nosotros',
            'asylumLink': 'Asilo',
            'aboutText': 'Información',
            'citizenshipLink': 'Ciudadanía',
            'contentLink': 'Apoyo para la inmigración',
            'contentPageBanner': 'Seleccione el tema de ayuda de inmigración que necesita del menú',
            'green_cardLink': 'Tarjeta Verde',
            'homeLink': 'Pagina de Inicio',
            'homepageContent': 'El contenido de la pagina principal estara aqui',
            'languageLink':'English/Español',
            'petitionsLink': 'Petición Familiar',
            'titleLink': 'Inmigrantes Adelante',
            'searchLink':'Buscar',
            'signInLink': 'Iniciar Sesión con Google', 
            'signUpLink': 'Registrarse',
            'signOutLink': 'Cerrar Sesión',
            'sponsorshipLink': 'Patrocinio',
            'userLink': 'Mi Cuenta',
            'work_permitLink': 'Permiso de Trabajo'
            // ... other keys
        }
    };

    var elements = document.querySelectorAll('[data-lang-placeholder]');

    elements.forEach(function(el) {
        var key = el.getAttribute('data-lang-placeholder');
        el.textContent = content[lang][key] || content['en'][key];
    });

    // Update the language link text
    var languageLink = document.getElementById('languageLink');
    languageLink.textContent = lang === 'es' ? 'English' : 'Español';
}

function toggleLanguage() {
    var currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('es') ? 'es' : 'en');
    var newLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', newLang);
    loadContent(newLang);
}

// Check for stored language preference
var storedLang = localStorage.getItem('lang');
var userLang = storedLang || (navigator.language.startsWith('es') ? 'es' : 'en');
loadContent(userLang);

document.getElementById('languageLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleLanguage();
});
