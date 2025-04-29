function showRestricciones(){
    const restriccionesData = JSON.parse(localStorage.getItem('restriccionesData'));
    const seccion = document.getElementById('content-section');

    if(restriccionesData && restriccionesData.length > 0){
        let rows = '';
        restriccionesData.forEach(restricciones => {
            rows += `
                <tr>
                    <td class="border border-gray-300 p-3">${restricciones.id}</td>
                    <td class="border border-gray-300 p-3">${restricciones.cedula_profesor}</td>
                    <td class="border border-gray-300 p-3">${restricciones.tipo_restriccion}</td>
                    <td class="border border-gray-300 p-3">${restricciones.valor_restriccion}</td>
                    <td class="border border-gray-300 p-3">${restricciones.hora_inicio}</td>
                    <td class="border border-gray-300 p-3">${restricciones.hora_fin}</td>
                    <td class="border border-gray-300 p-3">${restricciones.descripcion}</td>
                </tr>
            `;
        });

        const content = `
        <h1 class="text-3xl font-bold mb-6">Visualizar datos de las materias</h1>
        <table class="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th class="border border-gray-300 p-3">Id de la restricción</th>
                    <th class="border border-gray-300 p-3">Cédula del profesor</th>
                    <th class="border border-gray-300 p-3">Tipo de restricción</th>
                    <th class="border border-gray-300 p-3">Valor de restricción</th>
                    <th class="border border-gray-300 p-3">Hora de inicio</th>
                    <th class="border border-gray-300 p-3">Hora de fin</th>
                    <th class="border border-gray-300 p-3">Descripción</th>
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
        <h1 class="text-3xl font-bold mb-6">Visualizar datos de las restricciones</h1>
        <p>No se encontraron datos de restricciones.</p>`;
    }

}

document.addEventListener("DOMContentLoaded", function(){
    const restriccionesLink = document.getElementById("restricciones-link");
    restriccionesLink.addEventListener('click', function(event) {
        event.preventDefault();
        showRestricciones();
    });
})