function showMallas(){
    const mallaData = JSON.parse(localStorage.getItem('mallaData'));
    const seccion = document.getElementById('content-section');

    if(mallaData && mallaData.length > 0){
        let rows = '';
        mallaData.forEach(malla => {
            rows += `
                <tr>
                    <td class="border border-gray-300 p-3">${malla.id}</td>
                    <td class="border border-gray-300 p-3">${malla.cedula_profesor}</td>
                    <td class="border border-gray-300 p-3">${malla.codigo_carrera}</td>
                    <td class="border border-gray-300 p-3">${malla.tipo_salon}</td>
                </tr>
            `;
        });

        const content = `
        <h1 class="text-3xl font-bold mb-6">Visualizar datos de las mallas</h1>
        <table class="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th class="border border-gray-300 p-3">Id de la malla</th>
                    <th class="border border-gray-300 p-3">Cedula del profesor</th>
                    <th class="border border-gray-300 p-3">Código de la materia</th>
                    <th class="border border-gray-300 p-3">Tipo de salón requerido</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
        seccion.innerHTML = content;
    } else {
        seccion.innerHTML = `
        <h1 class="text-3xl font-bold mb-6">Visualizar datos de las mallas</h1>
        <p>No se encontraron datos de mallas.</p>`;
    }

}

document.addEventListener("DOMContentLoaded", function(){
    const mallasLink = document.getElementById("malla-link");
    mallasLink.addEventListener('click', function(event) {
        event.preventDefault();
        showMallas();
    });
})