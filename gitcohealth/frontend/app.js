// Language selector and translation logic
const languageSelect = document.getElementById('language');

// Navigation
const navTitle = document.getElementById('nav-title');
const navHome = document.getElementById('nav-home');
const navServices = document.getElementById('nav-services');
const navAbout = document.getElementById('nav-about');
const navContact = document.getElementById('nav-contact');

// Hero
const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-desc');

// Services
const servicesTitle = document.getElementById('services-title');
const service1Title = document.getElementById('service1-title');
const service1Desc = document.getElementById('service1-desc');
const service2Title = document.getElementById('service2-title');
const service2Desc = document.getElementById('service2-desc');
const service3Title = document.getElementById('service3-title');
const service3Desc = document.getElementById('service3-desc');

// About
const aboutTitle = document.getElementById('about-title');
const aboutDesc = document.getElementById('about-desc');

// Contact
const contactTitle = document.getElementById('contact-title');
const contactForm = document.getElementById('contact-form');
const contactSubmit = document.getElementById('contact-submit');
const contactSuccess = document.getElementById('contact-success');

// Footer
const footerText = document.getElementById('footer-text');

function loadTranslation(lang) {
  fetch(`/api/translate?lang=${lang}`)
    .then(res => res.json())
    .then(data => {
      // Navigation
      if (navTitle) navTitle.textContent = data.title || "";
      if (navHome) navHome.textContent = data.navHome || "";
      if (navServices) navServices.textContent = data.navServices || "";
      if (navAbout) navAbout.textContent = data.navAbout || "";
      if (navContact) navContact.textContent = data.navContact || "";

      // Hero
      if (heroTitle) heroTitle.textContent = data.heroTitle || "";
      if (heroDesc) heroDesc.textContent = data.heroDesc || "";

      // Services
      if (servicesTitle) servicesTitle.textContent = data.servicesTitle || "";
      if (service1Title) service1Title.textContent = data.service1Title || "";
      if (service1Desc) service1Desc.textContent = data.service1Desc || "";
      if (service2Title) service2Title.textContent = data.service2Title || "";
      if (service2Desc) service2Desc.textContent = data.service2Desc || "";
      if (service3Title) service3Title.textContent = data.service3Title || "";
      if (service3Desc) service3Desc.textContent = data.service3Desc || "";

      // About
      if (aboutTitle) aboutTitle.textContent = data.aboutTitle || "";
      if (aboutDesc) aboutDesc.textContent = data.aboutDesc || "";

      // Contact
      if (contactTitle) contactTitle.textContent = data.contactTitle || "";
      if (contactSubmit) contactSubmit.textContent = data.contactSubmit || "";
      if (contactSuccess) contactSuccess.textContent = data.contactSuccess || "";
      const contactName = document.getElementById('contact-name');
      const contactEmail = document.getElementById('contact-email');
      const contactMessage = document.getElementById('contact-message');
      if (contactName) contactName.placeholder = data.contactName || "";
      if (contactEmail) contactEmail.placeholder = data.contactEmail || "";
      if (contactMessage) contactMessage.placeholder = data.contactMessage || "";

      // Footer
      if (footerText) footerText.textContent = data.footerText || "";
    });
}

if (languageSelect) {
  languageSelect.addEventListener('change', (e) => {
    loadTranslation(e.target.value);
  });
}

// Contact form (frontend only, just show success message)
if (contactForm && contactSuccess) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactSuccess.style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
      contactSuccess.style.display = 'none';
    }, 3000);
  });
}

// Load default language
if (languageSelect) {
  loadTranslation(languageSelect.value);
}

// There is NO analyzeSymptoms() function in this file.
// The analyzeSymptoms() function is defined inline in a <script> tag in your index.html file, not in app.js.

// The analyzeSymptoms() function works properly if:
// - You click "Analyze Symptoms" on the symptoms form in index.html
// - The function reads the textarea value and sends it to /predict via fetch
// - The backend receives the POST and responds
// - The frontend displays the result in the #result-content div

// If you see the OpenAI response or an error message in the UI after clicking "Analyze Symptoms", it is working as intended.

// Checklist for analyzeSymptoms() working:
// 1. The "Analyze Symptoms" button in index.html calls analyzeSymptoms() via the form's onsubmit handler.
// 2. The analyzeSymptoms() function is defined in a <script> tag at the bottom of index.html (not in this file).

// Troubleshooting OpenAI API not working:
//
// 1. Make sure you are opening the site via http://localhost:5000/ (served by Flask, not by double-clicking index.html).
// 2. Make sure your Flask backend is running and you see "Running on http://127.0.0.1:5000" in your terminal.
// 3. Make sure your .env file in the backend folder contains a valid OPENAI_API_KEY.
// 4. In your Flask terminal, check for errors when you click "Analyze Symptoms".
// 5. In your browser, open DevTools (F12), go to the Network tab, and check if the /predict request is sent and what response you get.
// 6. If you see CORS errors, make sure flask_cors.CORS(app) is enabled in app.py.
// 7. If you see "Error: 429" or "quota exceeded" in the backend, your OpenAI key may be invalid or out of quota.
// 8. If you see "Sorry, there was an error analyzing your symptoms." in the UI, check the backend logs for the real error.
//
// The frontend code is correct. If you still get no response, the problem is in backend setup, API key, or network/proxy/firewall.