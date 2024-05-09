function loadContent(lang) {
    var content = {
        'en': {
            'about': 'About Us',
            'aboutText': 'Information',
            'contentLink': 'Immigration Help',
            'homeLink': 'Home',
            'immigrate-forward': 'Immigrate Forward',
            'languageLink':'Language',
            'searchLink':'Search',
            'signInLink': 'Sign In',
            'signUpLink': 'Register',
            'userLink': 'My Account'
            // ... other keys
        },
        'es': {
            'about': 'Sobre Nosotros',
            'aboutText': 'Información',
            'contentLink': 'Apoyo para la inmigración',
            'homeLink': 'Pagina de Inicio',
            'immigrate-forward': 'Inmigrantes Adelante',
            'languageLink':'Idioma',
            'searchLink':'Buscar',
            'signInLink': 'Iniciar Sesión', 
            'signUpLink': 'Registrarse',
            'userLink': 'Mi Cuenta'
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