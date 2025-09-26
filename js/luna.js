//ESTE ARCHIVO SE LLAMA LUNA POR QUE MUESTRA DIA, FECHA,ETC DE LAS 4 FASES LUNARES EN EL INDEX O SEA EL INICIO


const sheetURLLunas = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/FasesLuna";

// Seleccionamos el contenedor donde van las fases
const contenedorFases = document.getElementById('contenedor-fases');

fetch(sheetURLLunas)
  .then(res => res.json())
  .then(rows => {
    if (!rows || rows.length === 0) return;

    rows.forEach(fase => {
      // Creamos la estructura idéntica a tu HTML original
      const card = document.createElement("a");
      card.href = "fases-lunares.html"; // destino al hacer click
      card.className = "noticia-lunar-link";

      card.innerHTML = `
        <div class="row align-items-center mb-4">
          <div class="col-md-4 text-center">
            <img src="${fase.Imagen}" alt="${fase.Fases}" class="img-fluid rounded">
          </div>
          <div class="col-md-8 text-md-start text-center text-white">
            <h4 class="mb-2">${fase.Fases}</h4>
            <p class="mb-1">Fecha: ${fase.Fecha}</p>
            <p class="mb-0">${fase.Descripcion}</p>
          </div>
        </div>
      `;

      contenedorFases.appendChild(card);
    });
  })
  .catch(err => console.error("Error cargando las fases lunares:", err));



