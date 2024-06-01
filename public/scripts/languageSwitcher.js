function loadContent(lang) {
    var content = {
        'en': {
            'about': 'About Us',
            'asylumLink': 'Asylum',
            'aboutText': 'Information',
            'citizenshipLink': 'Citizenship',
            'contentLink': 'Immigration Help',
            'green_cardLink': 'Green Card',
            'homeLink': 'Home',
            'languageLink':'Language',
            'petitionsLink': 'Family Petitions',
            'titleLink': 'Immigrate Forward',
            'searchLink':'Search',
            'signInLink': 'Sign In with Google',
            'signUpLink': 'Register',
            'signOutLink': 'Sign Out',
            'sponsorhipLink': 'Sponsorship',
            'userLink': 'My Account',
            'workPermitLink': 'Work Permit'
            // ... other keys
        },
        'es': {
            'about': 'Sobre Nosotros',
            'asylumLink': 'Asilo',
            'aboutText': 'Información',
            'citizenshipLink': 'Ciudadanía',
            'contentLink': 'Apoyo para la inmigración',
            'green_cardLink': 'Tarjeta Verde',
            'homeLink': 'Pagina de Inicio',
            'languageLink':'Idioma',
            'petitionsLink': 'Petición Familiar',
            'titleLink': 'Inmigrantes Adelante',
            'searchLink':'Buscar',
            'signInLink': 'Iniciar Sesión con Google', 
            'signUpLink': 'Registrarse',
            'signOutLink': 'Cerrar Sesión',
            'sponsorshipLink': 'Patrocinio',
            'userLink': 'Mi Cuenta',
            'workPermitLink': 'Permiso de Trabajo'
            // ... other keys
        }
    };

    var elements = document.querySelectorAll('[data-lang-placeholder]');

    elements.forEach(function(el) {
        var key = el.getAttribute('data-lang-placeholder');
        el.textContent = content[lang][key] || content['en'][key];
    });
}

var userLang = navigator.language || navigator.userLanguage; 
loadContent(userLang.startsWith('es') ? 'es' : 'en');