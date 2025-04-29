function showMaterias(){
    const materiasData = JSON.parse(localStorage.getItem('materiasData'));
    const seccion = document.getElementById('content-section');

    if(materiasData && materiasData.length > 0){
        let rows = '';
        materiasData.forEach(materia => {
            rows += `
                <tr>
                    <td class="border border-gray-300 p-3">${materia.codigo}</td>
                    <td class="border border-gray-300 p-3">${materia.nombre}</td>
                    <td class="border border-gray-300 p-3">${materia.carrera}</td>
                    <td class="border border-gray-300 p-3">${materia.horas_semanales}</td>
                </tr>
            `;
        });

        const content = `
        <h1 class="text-3xl font-bold mb-6">Visualizar datos de las materias</h1>
        <table class="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th class="border border-gray-300 p-3">Código</th>
                    <th class="border border-gray-300 p-3">Nombre</th>
                    <th class="border border-gray-300 p-3">Carrera</th>
                    <th class="border border-gray-300 p-3">Horas semanales requeridas</th>
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
        <h1 class="text-3xl font-bold mb-6">Visualizar datos de las materias</h1>
        <p>No se encontraron datos de materias.</p>`;
    }

}

document.addEventListener("DOMContentLoaded", function(){
    const materiasLink = document.getElementById("materias-link");
    materiasLink.addEventListener('click', function(event) {
        event.preventDefault();
        showMaterias();
    });
})