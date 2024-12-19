//public/scripts/languageSwitcher.js
//(immigrate-forward4)

function loadContent(lang) {
    var content = {
        'en': {
            'about': 'About Us',
            'asylumLink': 'Asylum',
            'aboutText': 'Information',
            'citizenshipLink': 'Citizenship',
            'contentLink': 'Immigration Help',
            'contentPageBanner': 'Select the topic of immigration help you need from the menu',
            'countryOfOrigin': 'Country of Origin',
            'email': 'email address',
            'green_cardLink': 'Green Card',
            'homeLink': 'Home',
            'homepageContent': 'The main homepage content will go here',
            'languageLink':'English/Español',
            'message':'message',
            'message-prompt': 'Please write your message here.',
            'petitionsLink': 'Family Petitions',
            'phoneNumber': 'Phone Number',
            'preferredLanguage': 'Preferred Language',
            'titleLink': 'Immigrate Forward',
            'registrationMessage': 'Please complete the following information to register and unlock access to the immigration tutorials.',
            'searchLink':'Search',
            'send':'send message',
            'signInLink': 'Sign In with Google',
            'signUpLink': 'Register',
            'signOutLink': 'Sign Out',
            'SMSOptIn': 'SMS Opt In',
            'sponsorshipLink': 'Sponsorship',
            'userLink': 'My Account',
            'work_permitLink': 'Work Permit',
            'yearOfBirth': 'Year of Birth'
        },
        'es': {
            'about': 'Sobre Nosotros',
            'asylumLink': 'Asilo',
            'aboutText': 'Información',
            'citizenshipLink': 'Ciudadanía',
            'contentLink': 'Apoyo para la inmigración',
            'contentPageBanner': 'Seleccione el tema de ayuda de inmigración que necesita del menú',
            'countryOfOrigin': 'País de Origen',
            'email': 'dirección de correo electrónico',
            'green_cardLink': 'Tarjeta Verde',
            'homeLink': 'Pagina de Inicio',
            'homepageContent': 'El contenido de la pagina principal estara aqui',
            'languageLink':'English/Español',
            'message':'mensaje',
            'message-prompt': 'Escribe tu mensaje aquí.',
            'petitionsLink': 'Petición Familiar',
            'phoneNumber': 'Número de teléfono',
            'preferredLanguage': 'idioma de preferencia',
            'titleLink': 'Inmigrantes Adelante',
            'registrationMessage': 'Complete la siguiente información para registrarse y desbloquear el acceso a los tutoriales de inmigración.',
            'searchLink':'buscar',
            'send':'enviar mensaje',
            'signInLink': 'iniciar sesión con Google', 
            'signUpLink': 'registrarse',
            'signOutLink': 'cerrar sesión',
            'SMSOptIn': 'Optar por SMS',
            'sponsorshipLink': 'Patrocinio',
            'userLink': 'Mi Cuenta',
            'work_permitLink': 'Permiso de Trabajo',
            'yearOfBirth': 'Año de nacimiento'
        }
    };

    var elements = document.querySelectorAll('[data-lang-placeholder]');

    elements.forEach(function(el) {
        var key = el.getAttribute('data-lang-placeholder');
        el.textContent = content[lang][key] || content['en'][key];
    });
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
