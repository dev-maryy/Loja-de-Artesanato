const products = [
  {
    id: 1,
    name: 'Vela Aromática de Lavanda',
    category: 'Velas',
    price: 29.90,
    description: 'Feita à mão com essência de lavanda, esta vela traz a calma de um campo florido para sua casa.',
    image: 'https://images.unsplash.com/photo-1745125996226-879b0cb74e8f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Colar de Prata com Âmbar',
    category: 'Joias',
    price: 89.90,
    description: 'Um colar delicado com pingente de âmbar, inspirado nas cores quentes do outono.',
    image: 'https://images.unsplash.com/photo-1621264682184-bb49fb5f82a1?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Vela de Caramelo',
    category: 'Velas',
    price: 34.90,
    description: 'Aqueça seus momentos com o doce abraço desta vela artesanal de baunilha.',
    image: 'https://images.unsplash.com/photo-1508093989287-061d64de7324?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Brinco de Pérola Natural',
    category: 'Joias',
    price: 59.90,
    description: 'Elegância em cada detalhe, feito com pérolas colhidas com cuidado.',
    image: 'https://images.unsplash.com/photo-1699894717164-e2a77d30a6fd?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Vaso de Cerâmica Rústico',
    category: 'Decoração',
    price: 49.90,
    description: 'Pintado à mão, este vaso traz a beleza da simplicidade para seu lar.',
    image: 'https://images.unsplash.com/photo-1660721671073-e139688fa3cf?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Cachepô de Macramê',
    category: 'Decoração',
    price: 39.90,
    description: 'Feito com cordas trançadas à mão, perfeito para suas plantas favoritas.',
    image: 'https://acdn-us.mitiendanube.com/stores/001/776/907/products/foto-04-01-2024-10-22-31-71065972e37766d65217051854744431-1024-1024.jpg',
  },
];

const productGrid = document.getElementById('product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('product-modal');
const closeModal = document.getElementById('close-modal');
const contactForm = document.getElementById('contact-form');

function renderProducts(filteredProducts) {
  productGrid.innerHTML = '';
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg overflow-hidden product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
      <div class="p-6">
        <h3 class="text-xl font-lora text-rich-brown">${product.name}</h3>
        <p class="text-sm font-roboto text-rich-brown mb-2">${product.description}</p>
        <p class="text-lg font-bold text-warm-orange mb-4">R$ ${product.price.toFixed(2)}</p>
        <button
          class="px-6 py-3 bg-warm-orange text-white rounded-full hover:bg-golden-tan transition-colors animate-pulse-hover view-details font-roboto"
          data-id="${product.id}"
        >
          Ver Detalhes
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  gsap.from('.product-card', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
  });

  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = products.find(p => p.id == btn.dataset.id);
      document.getElementById('modal-image').src = product.image;
      document.getElementById('modal-image').alt = product.name;
      document.getElementById('modal-name').textContent = product.name;
      document.getElementById('modal-description').textContent = product.description;
      document.getElementById('modal-price').textContent = `R$ ${product.price.toFixed(2)}`;
      const quantity = document.getElementById('modal-quantity').value;
      document.getElementById('modal-buy').href = `https://wa.me/1234567890?text=Quero%20comprar%20${encodeURIComponent(product.name)}%20(Quantidade:%20${quantity})`;
      modal.classList.remove('hidden');
      gsap.from(modal.querySelector('div'), {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    });
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('bg-warm-orange', 'text-white');
      b.classList.add('bg-soft-beige', 'text-rich-brown');
    });
    btn.classList.remove('bg-soft-beige', 'text-rich-brown');
    btn.classList.add('bg-warm-orange', 'text-white');
    const category = btn.dataset.category;
    const filtered = category === 'Todos' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  if (!data.email.includes('@')) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }
  if (data.message.trim().length < 10) {
    alert('A mensagem deve ter pelo menos 10 caracteres.');
    return;
  }
  console.log('Enviando:', data);
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  contactForm.reset();
});

renderProducts(products);

new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

gsap.from('header', { y: -100, duration: 1, ease: 'power3.out' });
gsap.from('.hero-section h2', { opacity: 0, y: 50, duration: 1, delay: 0.5, ease: 'power3.out' });
gsap.from('.hero-section p', { opacity: 0, y: 50, duration: 1, delay: 0.7, ease: 'power3.out' });
gsap.from('.hero-section a', { opacity: 0, y: 50, duration: 1, delay: 0.9, ease: 'power3.out' });
gsap.from('#destaques .swiper-slide', {
  opacity: 0,
  x: 100,
  stagger: 0.3,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: { trigger: '#destaques', start: 'top 80%' },
});
gsap.from('#historia p', {
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: { trigger: '#historia', start: 'top 80%' },
});