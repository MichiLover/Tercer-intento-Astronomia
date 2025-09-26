/*este Js sirve para que las flip card puedan girar en dispositivos tactiles*/
/*se usa para la pagina Eclipse.html*/

// Seleccionamos todas las cards

document.querySelectorAll('.card').forEach(card => {
  // envolvemos front y back en un contenedor .card-inner
  const inner = document.createElement('div');
  inner.classList.add('card-inner');
  while (card.firstChild) {
    inner.appendChild(card.firstChild);
  }
  card.appendChild(inner);

  // al tocar la card se alterna el giro
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});


let startX = 0;
let scrollLeft = 0;

const slider = document.querySelector('.container-global');

slider.addEventListener('touchstart', e => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', e => {
  const x = e.touches[0].pageX;
  const walk = startX - x;
  slider.scrollLeft = scrollLeft + walk;

  // limitar scroll
  if (slider.scrollLeft < 0) slider.scrollLeft = 0;
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  if (slider.scrollLeft > maxScroll) slider.scrollLeft = maxScroll;

  e.preventDefault(); // bloquea scroll fuera del slider
});

