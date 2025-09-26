// const sheetURLSlider = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Eventos";
// const slideContainer = document.querySelector('.slide'); // tu contenedor original
// const nextBtn = document.querySelector('.next');
// const prevBtn = document.querySelector('.prev');

// let slides = [];

// // Cargar slides desde Google Sheets
// fetch(sheetURLSlider)
//   .then(res => res.json())
//   .then(data => {
//     slides = data;
//     renderSlides();
//   })
//   .catch(err => console.error("Error cargando datos de Google Sheets:", err));

// // Renderizar slides dinámicamente
// function renderSlides() {
//   slideContainer.innerHTML = ""; // limpiar contenedor

//   slides.forEach(slide => {
//     const item = document.createElement('div');
//     item.className = 'item';
//     item.style.backgroundImage = `url(${slide.Imagen})`;
//     item.style.backgroundSize = "cover";
//     item.style.backgroundPosition = "center";

//     // Columna de texto a la izquierda
//     const content = document.createElement('div');
//     content.className = 'content';
//     content.innerHTML = `
//       <div class="name">${slide.Titulo.replace(/\n/g, '<br>')}</div>
//       <div class="fecha">${slide.Fecha}</div>
//       <div class="descripcion">${slide.Descripcion.replace(/\n/g, '<br>')}</div>
//       <button class="ver-mas"> Ver más </button>
//     `;

//     item.appendChild(content);

//     slideContainer.appendChild(item);
//   });
// }

// // Botones para mover slides
// nextBtn.addEventListener('click', function() {
//   const items = document.querySelectorAll('.item');
//   slideContainer.appendChild(items[0]);
// });

// prevBtn.addEventListener('click', function() {
//   const items = document.querySelectorAll('.item');
//   slideContainer.prepend(items[items.length - 1]);
// });



// app-secure-vermas.js
// Slider seguro + botón "Ver más" funcional
// (() => {
//   const sheetURLSlider = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Eventos";
//   const slideContainer = document.querySelector('.slide');
//   const nextBtn = document.querySelector('.next');
//   const prevBtn = document.querySelector('.prev');

//   let slides = [];

//   // Validar URL de imagen
//   function isValidImageURL(url) {
//     return url && /^https?:\/\//i.test(url.trim());
//   }

//   // Reemplazar saltos de línea por <br> seguro
//   function escapeLineBreaks(str) {
//     return String(str || '').replace(/\r?\n/g, '<br>');
//   }

//   const hasDOMPurify = typeof window.DOMPurify !== 'undefined';

//   // Cargar datos desde Google Sheets
//   fetch(sheetURLSlider)
//     .then(res => res.json())
//     .then(data => {
//       slides = Array.isArray(data) ? data : [];
//       renderSlides();
//     })
//     .catch(err => console.error("Error cargando datos de Google Sheets:", err));

//   function renderSlides() {
//     slideContainer.innerHTML = "";

//     slides.forEach((slide, index) => {
//       if (!slide || typeof slide !== 'object') return;

//       const item = document.createElement('div');
//       item.className = 'item';

//       // Imagen de fondo
//       if (isValidImageURL(slide.Imagen)) {
//         try {
//           item.style.backgroundImage = `url(${JSON.stringify(String(slide.Imagen).trim())})`;
//         } catch {
//           console.warn("URL de imagen inválida:", slide.Imagen);
//         }
//       }
//       item.style.backgroundSize = "cover";
//       item.style.backgroundPosition = "center";

//       // Contenedor de texto
//       const content = document.createElement('div');
//       content.className = 'content';

//       if (hasDOMPurify) {
//         // Sanitizar HTML manteniendo estructura y tags básicos
//         const html = `
//           <div class="name">${escapeLineBreaks(slide.Titulo)}</div>
//           <div class="fecha">${escapeLineBreaks(slide.Fecha)}</div>
//           <div class="descripcion">${escapeLineBreaks(slide.Descripcion)}</div>
//           <button class="ver-mas">Ver más</button>
//         `;
//         content.innerHTML = DOMPurify.sanitize(html, {
//           ALLOWED_TAGS: ['b','i','em','strong','br','a','u','p','span','div','button'],
//           ALLOWED_ATTR: ['href','target','rel','class']
//         });
//       } else {
//         // Fallback seguro sin innerHTML
//         const nameDiv = document.createElement('div');
//         nameDiv.className = 'name';
//         nameDiv.textContent = slide.Titulo || '';
//         const fechaDiv = document.createElement('div');
//         fechaDiv.className = 'fecha';
//         fechaDiv.textContent = slide.Fecha || '';
//         const descDiv = document.createElement('div');
//         descDiv.className = 'descripcion';
//         descDiv.textContent = slide.Descripcion || '';
//         const btn = document.createElement('button');
//         btn.className = 'ver-mas';
//         btn.textContent = 'Ver más';
//         content.append(nameDiv, fechaDiv, descDiv, btn);
//       }

//       item.appendChild(content);
//       slideContainer.appendChild(item);
//     });

//     // Agregar listener a los botones "Ver más" después de renderizar
//     slideContainer.querySelectorAll('.ver-mas').forEach((button, index) => {
//       button.addEventListener('click', () => {
//         const slide = slides[index];
//         // Redirigir a otra página (por ejemplo "otra.html")
//         window.location.href = 'fases-lunares.html';
//       });
//     });

//   }

//   // Botones next/prev
//   if (nextBtn) {
//     nextBtn.addEventListener('click', () => {
//       const items = document.querySelectorAll('.item');
//       if (items.length > 0) slideContainer.appendChild(items[0]);
//     });
//   }
//   if (prevBtn) {
//     prevBtn.addEventListener('click', () => {
//       const items = document.querySelectorAll('.item');
//       if (items.length > 0) slideContainer.prepend(items[items.length - 1]);
//     });
//   }
// })();




/*este codigo de abajo es para q esté mejor optimizado, por ahora se mantendra comentado*/
(() => {
  const sheetURLSlider = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Eventos";
  const slideContainer = document.querySelector('.slide');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const CACHE_KEY = "eventosCache";

  let slides = [];
  let items = []; // guardamos referencias de los slides

  // ---------------------- Funciones auxiliares ----------------------
  const isValidImageURL = url => url && /^https?:\/\//i.test(url.trim());
  const escapeLineBreaks = str => String(str || '').replace(/\r?\n/g, '<br>');


  // ---------------------- Lazy load con IntersectionObserver ----------------------
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const bg = el.dataset.bg;
        if (bg) {
          el.style.backgroundImage = `url(${bg})`;
          observer.unobserve(el);
        }
      }
    });
  }, { rootMargin: "200px" });

  // ---------------------- Renderizar slides ----------------------
  function renderSlides() {
    slideContainer.innerHTML = "";
    items = [];

    slides.forEach((slide, index) => {
      if (!slide || typeof slide !== 'object') return;

      const item = document.createElement('div');
      item.className = 'item';

      // Primera imagen precargada, resto lazy
      if (isValidImageURL(slide.Imagen)) {
        if (index === 0) {
          item.style.backgroundImage = `url(${slide.Imagen.trim()})`;
        } else {
          item.dataset.bg = slide.Imagen.trim();
          observer.observe(item);
        }
        item.style.backgroundSize = "cover";
        item.style.backgroundPosition = "center";
      }

      // Contenedor de texto
      const content = document.createElement('div');
      content.className = 'content';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.textContent = slide.Titulo || '';

      const fechaDiv = document.createElement('div');
      fechaDiv.className = 'fecha';
      fechaDiv.textContent = slide.Fecha || '';

      const descDiv = document.createElement('div');
      descDiv.className = 'descripcion';
      descDiv.textContent = slide.Descripcion || '';

      const btn = document.createElement('button');
      btn.className = 'ver-mas';
      btn.textContent = 'Ver más';

      content.append(nameDiv, fechaDiv, descDiv, btn);
      item.appendChild(content);

      slideContainer.appendChild(item);
      items.push(item);
    });
  }

  // ---------------------- Cargar datos ----------------------
  function loadCachedData() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        slides = JSON.parse(cached);
        renderSlides();
      } catch {
        console.warn("Cache inválido, se ignora.");
      }
    }
  }

  function loadFreshData() {
    fetch(sheetURLSlider)
      .then(res => res.json())
      .then(data => {
        slides = Array.isArray(data) ? data : [];
        localStorage.setItem(CACHE_KEY, JSON.stringify(slides));
        renderSlides();
      })
      .catch(err => console.error("Error cargando datos de Google Sheets:", err));
  }

  // ---------------------- Botones next/prev ----------------------
  nextBtn?.addEventListener('click', () => {
    if (items.length) {
      const first = items.shift();
      slideContainer.appendChild(first);
      items.push(first);
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (items.length) {
      const last = items.pop();
      slideContainer.prepend(last);
      items.unshift(last);
    }
  });

  // ---------------------- Delegación de eventos "Ver más" ----------------------
  slideContainer.addEventListener('click', e => {
    if (e.target.classList.contains('ver-mas')) {
      window.location.href = 'fases-lunares.html';
    }
  });

  // ---------------------- Inicialización ----------------------
  loadCachedData();

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadFreshData);
  } else {
    setTimeout(loadFreshData, 100);
  }
})();
