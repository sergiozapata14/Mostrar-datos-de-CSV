let personas = [];

// Texto CSV a objetos
function parseCSV(csv)
{
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map(line =>
    {
        const values = line.split(",");
        const obj = {};
        headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim());
        return obj;
    });
}

// Mostrar la lista
function mostrarLista(filtradas = personas)
{
  const contenedor = document.getElementById("lista-nombres");
  contenedor.innerHTML = "";

  const mitad = Math.ceil(filtradas.length / 2);
  const columnas = [filtradas.slice(0, mitad), filtradas.slice(mitad)];

    columnas.forEach(col =>
    {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-6";
        col.forEach(p =>
        {
            const div = document.createElement("div");
            div.className = "mb-2";
            div.innerHTML = `<button class="btn btn-link p-0" onclick='mostrarInfo(${JSON.stringify(p)})'>${p["Nombre completo"]}</button>`;
            colDiv.appendChild(div);
        });
        contenedor.appendChild(colDiv);
    });
}

// Mostrar la información individual
function mostrarInfo(persona)
{
    document.getElementById("info-nombre").textContent = persona["Nombre completo"];
    document.getElementById("info-edad").textContent = persona["Edad"];
    document.getElementById("info-sexo").textContent = persona["Sexo"];
    document.getElementById("info-ocupacion").textContent = persona["Ocupación"];
    document.getElementById("info-nivel").textContent = persona["Nivel de estudios"];
    document.getElementById("info").style.display = "block";
}

// Buscador
document.getElementById("buscador").addEventListener("input", function ()
{
    const texto = this.value.toLowerCase();
    const filtradas = personas.filter(p => p["Nombre completo"].toLowerCase().includes(texto));
    mostrarLista(filtradas);
});

// Cargar CSV
fetch("personas.csv")
    .then(res => res.text())
    .then(data =>
    {
        personas = parseCSV(data);
        mostrarLista();
    })
    .catch(err =>
    {
        console.error("Error al cargar el CSV:", err);
    });