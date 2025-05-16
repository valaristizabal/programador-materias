function showDocentes() {
    const docentesData = JSON.parse(localStorage.getItem('docentesData'));
    const materiasData = JSON.parse(localStorage.getItem('materiasData'));
    const seccion = document.getElementById('content-section');

    if (docentesData && docentesData.length > 0 && materiasData) {
        let rows = '';

        docentesData.forEach(docente => {
            // Filtrar materias del docente y convertir códigos a enteros
            const materiasDelDocente = materiasData
                .filter(materia => materia.docente.numero === docente.numero)
                .map(materia => ({
                    ...materia,
                    codigo: parseInt(materia.codigo) || materia.codigo // Convertir a entero o mantener original si falla
                }));

            rows += `
                <tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">${docente.nombre}</td>
                    <td class="border border-gray-300 p-3">
                        <ul class="space-y-2">
            `;

            if (materiasDelDocente.length > 0) {
                materiasDelDocente.forEach(materia => {
                    rows += `
                        <li class="flex items-start">
                            <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">${materia.codigo}</span>
                            <div>
                                <div class="font-medium">${materia.nombre}</div>
                                <div class="text-sm text-gray-600">Franja: ${materia.franja} | Grupo: ${materia.grupo}</div>
                            </div>
                        </li>
                    `;
                });
            } else {
                rows += '<li class="text-gray-500 italic">No tiene materias asignadas</li>';
            }

            rows += `
                        </ul>
                    </td>
                </tr>
            `;
        });

        const content = `
            <h1 class="text-3xl font-bold mb-6">Asignación de Docentes</h1>
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Docente</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materias Asignadas</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${rows}
                    </tbody>
                </table>
            </div>
            <div class="mt-4 text-sm text-gray-600">
                Total de docentes: ${docentesData.length}
            </div>
        `;

        seccion.innerHTML = content;
    } else {
        seccion.innerHTML = `
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                <p class="text-yellow-700">No se encontraron datos de docentes o materias.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const docentesLink = document.getElementById('docentes-link');
    if (docentesLink) {
        docentesLink.addEventListener('click', function(event) {
            event.preventDefault();
            showDocentes();
        });
    }
});