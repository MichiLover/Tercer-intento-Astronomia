// ===============================
// LEER EVENTOS DE LA TABLA
// ===============================

//ESTE JS SE LLAMA CALENDARIO POR QUE MUESTRA LA TABLA DE EVENTOS EN EL INDEX Y ESTÁ UNIDA AL CALENDARIO DE FORMA DINAMICA
//FECHA QUE SE AGREGA EN LA TABLA DINAMIA, AUTOMATICAMENTE SE MUESTRA EN EL CALENDARIO
// function leerEventosDeTabla() {
//   const filas = document.querySelectorAll("#tabla-eventos tr");
//   let eventos = [];

//   filas.forEach(fila => {
//     const fechaTexto = fila.cells[0]?.innerText.trim();
//     const titulo = fila.cells[1]?.innerText.trim();
//     const descripcion = fila.cells[2]?.innerText.trim();
//     if (!fechaTexto) return;

//     let fechaDate = null;

//     if (fechaTexto.includes("/")) {
//       const [d, m, y] = fechaTexto.split("/");
//       fechaDate = new Date(parseInt(y,10), parseInt(m,10)-1, parseInt(d,10));
//     } else {
//       const partes = fechaTexto.toLowerCase().split(" ");
//       if (partes.length === 3) {
//         const dia = parseInt(partes[0],10);
//         const mes = meses[partes[1]]; // tu array de meses 0-11
//         const anio = parseInt(partes[2],10);
//         if (!isNaN(dia) && mes !== undefined && !isNaN(anio)) {
//           fechaDate = new Date(anio, mes, dia);
//         }
//       }
//     }

//     if (fechaDate) {
//       eventos.push({
//         title: titulo,
//         start: fechaDate,
//         allDay: true,
//         description: descripcion,
//         display: 'background',       // marca la fecha pero no muestra bloque duplicado
//         backgroundColor: '#ffc10733', // semitransparente
//         borderColor: '#ffc107',
//         textColor: '#000000'
//       });
//     }
//   });

//   return eventos;
// }

// // ===============================
// // INICIALIZAR FULLCALENDAR CON POPOVER GLOBAL
// // ===============================
// document.addEventListener('DOMContentLoaded', function() {
//   const calendarEl = document.getElementById('calendar');
//   let popoverGlobal = null; // popover único global

// window.calendar = new FullCalendar.Calendar(calendarEl, {
//   initialView: 'dayGridMonth',
//   locale: 'es',
//   aspectRatio: 1,
//   contentHeight: 230,
//   dayMaxEventRows: true,
//   buttonText: { today: 'Hoy', month: 'Mes', week: 'Semana', day: 'Día' },
//   events: leerEventosDeTabla(),

//   // 👇 mostramos una estrellita en cada fecha con evento
//     eventContent: function() {
//       return {
//         html: '<span class="estrella-evento">★</span>'
//       };
//     },

//       eventClick: function(info) {
//         info.jsEvent.preventDefault();
//         if (popoverGlobal) {
//           popoverGlobal.dispose();
//           popoverGlobal = null;
//         }
//         popoverGlobal = new bootstrap.Popover(info.el, {
//           html: true,
//           trigger: 'manual',
//           title: info.event.title,
//           content: info.event.extendedProps.description,
//           placement: 'auto'
//         });
//         popoverGlobal.show();
//         document.addEventListener('click', function cerrarPopover(e) {
//           if (!info.el.contains(e.target) && popoverGlobal) {
//             popoverGlobal.dispose();
//             popoverGlobal = null;
//             document.removeEventListener('click', cerrarPopover);
//           }
//         });
//       }
//     });


//       window.calendar.render();
//     });

// // ===============================
// // ACTUALIZAR CALENDARIO
// // ===============================
// function actualizarCalendario() {
//   if (window.calendar) {
//     window.calendar.removeAllEvents();
//     window.calendar.addEventSource(leerEventosDeTabla());
//   }
// }

// // ===============================
// // FETCH GOOGLE SHEETS
// // ===============================

// const url = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Calendario";

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     const tbody = document.getElementById("tabla-eventos");
//     tbody.innerHTML = "";

//     data.forEach(ev => {
//       let fecha = ev.Fecha || "";
//       if (fecha.includes("-")) {
//         const [y, m, d] = fecha.split("-");
//         fecha = `${d}/${m}/${y}`;
//       }

//       const fila = `
//         <tr>
//           <td>${fecha}</td>
//           <td>${ev.Evento || ""}</td>
//           <td>${ev.Descripcion || ""}</td>
//         </tr>
//       `;
//       tbody.innerHTML += fila;
//     });

//     actualizarCalendario();
//   })
//   .catch(err => {
//     console.error(err);
//     document.getElementById("tabla-eventos").innerHTML =
//       `<tr><td colspan="3" class="text-danger">Error cargando datos.</td></tr>`;
//   });

// // ===============================
// // BOTONES HOY E IR A FECHA
// // ===============================
// document.addEventListener('DOMContentLoaded', () => {
//   const btnHoy = document.getElementById('todayBtn');
//   if (btnHoy) btnHoy.addEventListener('click', () => window.calendar.today());

//   const btnIrFecha = document.getElementById('irFechaBtn');
//   if (btnIrFecha) btnIrFecha.addEventListener('click', () => {
//     const inputFecha = document.getElementById('fechaBuscador').value;
//     if (inputFecha) window.calendar.gotoDate(inputFecha);
//   });

//   const hoy = new Date();
//   const fechaFormateada = hoy.toLocaleDateString("es-AR");
//   const fechaActualEl = document.getElementById("fecha-actual");
//   if (fechaActualEl) fechaActualEl.textContent = fechaFormateada;
// });



(() => {
  // ------------------- URLs y cache -------------------
  const SLIDER_URL = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Eventos";
  const CALENDAR_URL = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Calendario";
  const CACHE_SLIDER = "cacheSlider";
  const CACHE_CALENDAR = "cacheCalendar";

  // ------------------- Slider -------------------
  const slideContainer = document.querySelector('.slide');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const hasDOMPurify = typeof window.DOMPurify !== 'undefined';
  let slides = [];

  const meses = {
    enero:0,febrero:1,marzo:2,abril:3,mayo:4,junio:5,
    julio:6,agosto:7,septiembre:8,octubre:9,noviembre:10,diciembre:11
  };

  const isValidImageURL = url => url && /^https?:\/\//i.test(url.trim());
  const escapeLineBreaks = str => String(str || '').replace(/\r?\n/g, '<br>');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const bg = el.dataset.bg;
        if(bg){
          el.style.backgroundImage = `url(${bg})`;
          observer.unobserve(el);
        }
      }
    });
  }, { rootMargin:"200px" });

  function renderSlides() {
    if(!slideContainer) return;
    slideContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    slides.forEach((slide,index)=>{
      if(!slide || typeof slide!=="object") return;

      const item = document.createElement('div');
      item.className='item';

      if(isValidImageURL(slide.Imagen)){
        item.dataset.bg = slide.Imagen.trim();
        item.style.backgroundSize="cover";
        item.style.backgroundPosition="center";
        observer.observe(item);
      }

      const content = document.createElement('div');
      content.className='content';

      if(hasDOMPurify){
        const html=`
          <div class="name">${escapeLineBreaks(slide.Titulo)}</div>
          <div class="fecha">${escapeLineBreaks(slide.Fecha)}</div>
          <div class="descripcion">${escapeLineBreaks(slide.Descripcion)}</div>
          <button class="ver-mas">Ver más</button>
        `;
        content.innerHTML = DOMPurify.sanitize(html,{
          ALLOWED_TAGS:['b','i','em','strong','br','a','u','p','span','div','button'],
          ALLOWED_ATTR:['href','target','rel','class']
        });
      }else{
        const nameDiv=document.createElement('div');nameDiv.className='name';nameDiv.textContent=slide.Titulo||'';
        const fechaDiv=document.createElement('div');fechaDiv.className='fecha';fechaDiv.textContent=slide.Fecha||'';
        const descDiv=document.createElement('div');descDiv.className='descripcion';descDiv.textContent=slide.Descripcion||'';
        const btn=document.createElement('button');btn.className='ver-mas';btn.textContent='Ver más';
        content.append(nameDiv,fechaDiv,descDiv,btn);
      }

      item.appendChild(content);
      fragment.appendChild(item);
    });

    slideContainer.appendChild(fragment);

    // Listener botones
    slideContainer.querySelectorAll('.ver-mas').forEach((btn,index)=>{
      btn.addEventListener('click',()=> window.location.href='fases-lunares.html');
    });
  }

  function cargarSlider(){
    const cache=localStorage.getItem(CACHE_SLIDER);
    if(cache){try{slides=JSON.parse(cache);renderSlides();}catch{}}

    fetch(SLIDER_URL)
      .then(res=>res.json())
      .then(data=>{slides=Array.isArray(data)?data:[]; localStorage.setItem(CACHE_SLIDER,JSON.stringify(slides)); renderSlides();})
      .catch(err=>console.error("Error cargando slider:",err));
  }

  if(nextBtn) nextBtn.addEventListener('click',()=>{const items=document.querySelectorAll('.item');if(items.length>0) slideContainer.appendChild(items[0]);});
  if(prevBtn) prevBtn.addEventListener('click',()=>{const items=document.querySelectorAll('.item');if(items.length>0) slideContainer.prepend(items[items.length-1]);});

  // ------------------- Calendario -------------------
  const calendarEl=document.getElementById('calendar');
  let calendar=null;
  let popoverGlobal=null;

  function parseFecha(texto){
    if(!texto) return null;
    texto=texto.trim();
    if(texto.includes("/")){
      const [d,m,y]=texto.split("/");
      return new Date(parseInt(y,10),parseInt(m,10)-1,parseInt(d,10));
    }else{
      const partes=texto.toLowerCase().split(" ");
      if(partes.length===3){
        const dia=parseInt(partes[0],10);
        const mes=meses[partes[1]];
        const anio=parseInt(partes[2],10);
        if(!isNaN(dia)&&mes!==undefined&&!isNaN(anio)) return new Date(anio,mes,dia);
      }
    }
    return null;
  }

  function construirEventos(data){
    return data.map(ev=>{
      const fecha=parseFecha(ev.Fecha);
      if(!fecha) return null;
      return {
        title:ev.Evento||"",
        start:fecha,
        allDay:true,
        description:ev.Descripcion||"",
        display:'background',
        backgroundColor:'#ffc10733',
        borderColor:'#ffc107',
        textColor:'#000'
      };
    }).filter(Boolean);
  }

  function renderTabla(data){
    const tbody=document.getElementById("tabla-eventos");
    if(!tbody) return;
    const fragment=document.createDocumentFragment();
    data.forEach(ev=>{
      const tr=document.createElement("tr");
      const fecha=ev.Fecha.includes("-") ? ev.Fecha.split("-").reverse().join("/") : ev.Fecha;
      tr.innerHTML=`<td>${fecha}</td><td>${ev.Evento||""}</td><td>${ev.Descripcion||""}</td>`;
      fragment.appendChild(tr);
    });
    tbody.innerHTML="";
    tbody.appendChild(fragment);
  }

  function inicializarCalendario(eventos){
    if(!calendarEl) return;
    if(calendar){calendar.removeAllEvents();calendar.addEventSource(eventos); return;}

    calendar=new FullCalendar.Calendar(calendarEl,{
      initialView:'dayGridMonth', locale:'es', aspectRatio:1, contentHeight:230,
      dayMaxEventRows:true,
      buttonText:{today:'Hoy', month:'Mes', week:'Semana', day:'Día'},
      events:eventos,
      eventContent:()=>({html:'<span class="estrella-evento">★</span>'}),
      eventClick: info=>{
        info.jsEvent.preventDefault();
        if(popoverGlobal){popoverGlobal.dispose();popoverGlobal=null;}
        popoverGlobal=new bootstrap.Popover(info.el,{html:true,trigger:'manual',title:info.event.title,content:info.event.extendedProps.description,placement:'auto'});
        popoverGlobal.show();
        document.addEventListener('click',function cerrar(e){
          if(!info.el.contains(e.target)&&popoverGlobal){popoverGlobal.dispose();popoverGlobal=null; document.removeEventListener('click',cerrar);}
        });
      }
    });
    calendar.render();
  }

  function cargarCalendario(){
    const cache=localStorage.getItem(CACHE_CALENDAR);
    if(cache){
      try{
        const data=JSON.parse(cache);
        renderTabla(data);
        inicializarCalendario(construirEventos(data));
      }catch{}
    }

    fetch(CALENDAR_URL)
      .then(res=>res.json())
      .then(data=>{
        renderTabla(data);
        inicializarCalendario(construirEventos(data));
        localStorage.setItem(CACHE_CALENDAR,JSON.stringify(data));
      })
      .catch(err=>{
        console.error("Error cargando calendario:",err);
        const tbody=document.getElementById("tabla-eventos");
        if(tbody) tbody.innerHTML='<tr><td colspan="3" class="text-danger">Error cargando datos.</td></tr>';
      });
  }

  // ------------------- Botones y DOM -------------------
  document.addEventListener('DOMContentLoaded',()=>{
    cargarSlider();
    cargarCalendario();

    const btnHoy=document.getElementById('todayBtn');
    if(btnHoy) btnHoy.addEventListener('click',()=>calendar.today());

    const btnIrFecha=document.getElementById('irFechaBtn');
    if(btnIrFecha) btnIrFecha.addEventListener('click',()=>{
      const input=document.getElementById('fechaBuscador').value;
      if(input) calendar.gotoDate(input);
    });

    const fechaActualEl=document.getElementById("fecha-actual");
    if(fechaActualEl) fechaActualEl.textContent=new Date().toLocaleDateString("es-AR");
  });
})();
