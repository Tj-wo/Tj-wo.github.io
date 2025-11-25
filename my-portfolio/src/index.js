const navMenu = document.querySelector('.nav-menu');

navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    const sectionId = e.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});

const contactForm = 
document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  document.getElementById('formResponse').innerHTML = `Thank you, ${name}, for your message!`;
});
