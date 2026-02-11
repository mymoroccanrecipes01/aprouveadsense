// ============ GOOGLE ANALYTICS (GA4) ============
// Remplace "G-XXXXXXXXXX" par ton vrai Measurement ID dans Google Analytics
(function(){
  const GA_ID = "G-XXXXXXXXXX"; // ← CHANGE THIS to your real GA4 ID
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googleapis.com/esw/analytics/js/analytics.js';
  // Using gtag approach:
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_ID);

  // Inject the GA script tag
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gaScript);
})();

// ============ NAV + FOOTER + COOKIE BANNER INJECTION ============
const NAV_HTML = `
<nav>
  <a href="index.html" class="nav-logo"><span class="leaf">🌿</span> Pin Recipes</a>
  <ul class="nav-links" id="navLinks">
    <li><a href="index.html"    id="nav-index">Calculator</a></li>
    <li><a href="recipes.html"  id="nav-recipes">Recipes</a></li>
    <li><a href="guides.html"   id="nav-guides">Guides</a></li>
    <li><a href="tips.html"     id="nav-tips">Tips</a></li>
    <li><a href="about.html"    id="nav-about">About</a></li>
    <li><a href="contact.html"  id="nav-contact">Contact</a></li>
  </ul>
  <div class="hamburger" id="hamburger" onclick="document.getElementById('navLinks').classList.toggle('open')">
    <span></span><span></span><span></span>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div>
      <h4>🌿 Pin Recipes</h4>
      <p>A free, accurate recipe calorie calculator built to help you understand your nutrition — one ingredient at a time.</p>
    </div>
    <div>
      <h4>Explore</h4>
      <ul class="footer-links">
        <li><a href="index.html">Calculator</a></li>
        <li><a href="recipes.html">Recipes</a></li>
        <li><a href="guides.html">Nutrition Guides</a></li>
        <li><a href="tips.html">Tips</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul class="footer-links">
        <li><a href="privacy.html">Privacy Policy</a></li>
        <li><a href="terms.html">Terms of Service</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; <span id="footerYear"></span> Pin Recipes. All rights reserved.</p>
  </div>
</footer>`;

// ============ COOKIE BANNER ============
const COOKIE_HTML = `
<div class="cookie-banner" id="cookieBanner">
  <div class="cookie-inner">
    <div class="cookie-text">
      <span class="cookie-icon">🍪</span>
      <div>
        <strong>We use cookies to enhance your experience.</strong>
        We use cookies and similar technologies to provide personalized content, analyze site traffic,
        and serve advertisements. By clicking "Accept All", you consent to our use of cookies.
        <a href="privacy.html" class="cookie-link">Learn more</a>
      </div>
    </div>
    <div class="cookie-btns">
      <button class="cookie-btn cookie-btn-secondary" id="cookieReject">Reject Non-Essential</button>
      <button class="cookie-btn cookie-btn-primary" id="cookieAccept">Accept All</button>
    </div>
  </div>
</div>`;

// inject
document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
document.body.insertAdjacentHTML('beforeend', COOKIE_HTML);
document.getElementById('footerYear').textContent = new Date().getFullYear();

// active nav link
(function(){
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const id   = 'nav-' + page.replace('.html','').replace('article-','');
  const el   = document.getElementById(id);
  if(el) el.classList.add('active');
  // Articles → highlight "Guides"
  if(page.startsWith('article-')) {
    const g = document.getElementById('nav-guides');
    if(g) g.classList.add('active');
  }
})();

// ============ COOKIE LOGIC ============
(function(){
  const banner  = document.getElementById('cookieBanner');
  const consent = localStorage.getItem('pinrecipes_cookie_consent');

  if(consent) {
    banner.style.display = 'none';
    return;
  }

  setTimeout(() => banner.classList.add('visible'), 800);

  document.getElementById('cookieAccept').addEventListener('click', () => {
    localStorage.setItem('pinrecipes_cookie_consent', 'accepted');
    banner.classList.remove('visible');
    setTimeout(() => banner.style.display = 'none', 400);
  });

  document.getElementById('cookieReject').addEventListener('click', () => {
    localStorage.setItem('pinrecipes_cookie_consent', 'rejected');
    banner.classList.remove('visible');
    setTimeout(() => banner.style.display = 'none', 400);
  });
})();
