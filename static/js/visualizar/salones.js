function showSalones(){
    const salonesData = JSON.parse(localStorage.getItem('salonesData'));
    const seccion = document.getElementById('content-section');

    if(salonesData && salonesData.length > 0){
        let rows = '';
        salonesData.forEach(salon => {
            rows += `
                <tr>
                    <td class="border border-gray-300 p-3">${salon.id}</td>
                    <td class="border border-gray-300 p-3">${salon.ubicacion}</td>
                    <td class="border border-gray-300 p-3">${salon.tipo}</td>
                    <td class="border border-gray-300 p-3">${salon.capacidad}</td>
                </tr>
            `;
        });

        const content = `
        <h1 class="text-3xl font-bold mb-6">Visualizar datos de los salones</h1>
        <table class="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th class="border border-gray-300 p-3">Id del salón</th>
                    <th class="border border-gray-300 p-3">Ubicación</th>
                    <th class="border border-gray-300 p-3">Tipo de salón</th>
                    <th class="border border-gray-300 p-3">TCapacidad de personas</th>
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
        <h1 class="text-3xl font-bold mb-6">Visualizar datos de los salones</h1>
        <p>No se encontraron datos de salones.</p>`;
    }

}

document.addEventListener("DOMContentLoaded", function(){
    const salonesLink = document.getElementById("salones-link");
    salonesLink.addEventListener('click', function(event) {
        event.preventDefault();
        showSalones();
    });
})