
const PLACE_URL = "https://www.google.com/maps/place/HAPPY+CAKE+(HOME+MADE)/@22.7505928,88.4073063,19z/data=!4m7!3m6!1s0x39f89b3b36e6d40f:0x13e31f05f8d1ddbf!8m2!3d22.7505928!4d88.4084972!15sCg1ob21lIGJha2VyaWVzWg8iDWhvbWUgYmFrZXJpZXOSAQljYWtlX3Nob3DgAQA!16s%2Fg%2F11syc_20t5";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=22.7505928,88.4084972";
const WHATSAPP_NUMBER = ""; // add bakery number here to enable direct WhatsApp
const CALL_NUMBER = ""; // add bakery number here to enable direct calling
const body = document.body;
const loader = document.querySelector('[data-loader]');
const progressBar = document.querySelector('[data-progress]');
const progressLabel = document.querySelector('[data-progress-label]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const revealItems = document.querySelectorAll('.reveal');
const activePage = body.dataset.page || "";
document.querySelectorAll('[data-page-link]').forEach((link) => { if (link.dataset.pageLink === activePage) link.classList.add('active'); });
function getWhatsAppLink() { if (!WHATSAPP_NUMBER) return PLACE_URL; return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,'')}?text=${encodeURIComponent("Hi HAPPY CAKES, I want to order a cake.")}`; }
function getCallLink() { if (!CALL_NUMBER) return PLACE_URL; return `tel:${CALL_NUMBER}`; }
document.querySelectorAll('[data-whatsapp-link]').forEach((link) => { link.setAttribute('href', getWhatsAppLink()); });
document.querySelectorAll('[data-call-link]').forEach((link) => { link.setAttribute('href', getCallLink()); });
document.querySelectorAll('[data-map-link]').forEach((link) => { link.setAttribute('href', MAP_URL); });
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
let progress = 0;
const start = performance.now();
const loaderDuration = 2000;
function animateLoader(now) {
  const elapsed = Math.min(now - start, loaderDuration);
  progress = Math.round((elapsed / loaderDuration) * 100);
  if (progressBar) progressBar.style.width = `${progress}%`;
  if (progressLabel) progressLabel.textContent = `${progress}%`;
  if (elapsed < loaderDuration) { requestAnimationFrame(animateLoader); }
  else { body.classList.add('loaded'); setTimeout(() => loader?.setAttribute('aria-hidden', 'true'), 800); }
}
requestAnimationFrame(animateLoader);
const io = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); } }); }, { threshold: 0.18, rootMargin: '0px 0px -30px 0px' });
revealItems.forEach((item, index) => { if (!item.style.getPropertyValue('--delay')) item.style.setProperty('--delay', String(index % 4)); io.observe(item); });
