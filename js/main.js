/* GOOGLE ANALYTICS - wird erst nach Consent geladen */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

function loadGoogleAnalytics(){
  if(window.__gaLoaded) return;
  window.__gaLoaded = true;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-1FJKNXVGHH';
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', 'G-1FJKNXVGHH');
}

/* COOKIE CONSENT LOGIK */
const COOKIE_CONSENT_KEY = 'haushoch_cookie_consent';

function handleCookieConsent(granted){
  localStorage.setItem(COOKIE_CONSENT_KEY, granted ? 'granted' : 'denied');
  document.getElementById('cookieBanner').classList.remove('active');
  if(granted){
    loadGoogleAnalytics();
  }
}

function resetCookieConsent(){
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.__gaLoaded = false;
  document.getElementById('datenschutzModal').classList.remove('active');
  document.getElementById('cookieBanner').classList.add('active');
}

function toggleDatenschutzModal(e){
  const modal = document.getElementById("datenschutzModal");
  if (e && e.target !== modal && e.target.tagName !== 'DIV' && !e.target.onclick) return;
  modal.classList.toggle("active");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("datenschutzModal")?.classList.remove("active");
  }
});

(function initCookieConsent(){
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if(consent === 'granted'){
    loadGoogleAnalytics();
  } else if(consent !== 'denied'){
    document.getElementById('cookieBanner').classList.add('active');
  }
})();

/* REVEAL ON SCROLL */

const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

/* MODAL CONTROL */
function toggleModal(e){
  const modal = document.getElementById("modal");
  if (e && e.target !== modal && e.target.tagName !== 'DIV' && !e.target.onclick) return;
  modal.classList.toggle("active");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("modal").classList.remove("active");
  }
});

/* MOBILE PROJECT POPUP */

const projects = document.querySelectorAll('.project');

projects.forEach(project => {

  project.addEventListener('click', () => {

    if(window.innerWidth > 800) return;

    const text = project.querySelector('small')?.innerHTML;

    if(!text) return;

    document.getElementById('projectModalText').innerHTML = text;

    document.getElementById('projectModal')
      .classList.add('active');

  });

});

function closeProjectModal(){

  document.getElementById('projectModal')
    .classList.remove('active');

}
