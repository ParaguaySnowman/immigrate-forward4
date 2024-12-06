//public/scripts/contactForm.js

const contactForm = document.getElementById('contactUsForm');

const recaptchaKey = window.recaptchaKey;

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementsByName('email')[0].value;
    const message = document.getElementsByName('message')[0].value;

    if (!email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Get the reCAPTCHA response token
    const recaptchaToken = grecaptcha.getResponse(); 

    // Add the token to the form data
    const formData = new FormData(contactForm);
    formData.append('recaptchaToken', recaptchaToken);

    // Send the form data to the server
    fetch('/send-message', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            // Request was successful
            alert('Message sent successfully!');
            contactForm.reset(); // Clear the form
        } else {
            // Request failed (e.g., 400, 500 error)
            response.text().then(errorMessage => {
                alert('Error sending message: ' + errorMessage);
            });
        }
    })
    .catch(error => {
        // Network error or other fetch error
        console.error('Error:', error);
        alert('Error sending message. Please try again later.');
    });
}, { passive: true }); // Passive option added here