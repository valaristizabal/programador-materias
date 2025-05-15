function showDocentes() {
    const docentesData = JSON.parse(localStorage.getItem('docentesData'));
    const seccion = document.getElementById('content-section');

    // Si hay datos en localStorage
    if (docentesData && docentesData.length > 0) {
        let rows = '';

        // Crear las filas de la tabla con los datos de docentes y sus materias
        docentesData.forEach(docente => {
            rows += `
                <tr>
                    <td class="border border-gray-300 p-3">${docente.nombre}</td>
                    <td class="border border-gray-300 p-3">
                        <ul>
            `;

            // Listar las materias del docente
            docente.materias.forEach(materia => {
                rows += `
                    <li><strong>${materia.codigo}:</strong> ${materia.nombre} - Franja: ${materia.franja} - Grupo: ${materia.grupo}</li>
                `;
            });

            rows += `
                        </ul>
                    </td>
                </tr>
            `;
        });

        // Formato de la tabla e insertar las columnas
        const content = `
            <h1 class="text-3xl font-bold mb-6">Visualización de Docentes y Materias Asignadas</h1>
            <table class="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th class="border border-gray-300 p-3">Nombre del Docente</th>
                        <th class="border border-gray-300 p-3">Materias Asignadas</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;

        seccion.innerHTML = content;
    } else {
        seccion.innerHTML = '<p>No se encontraron datos de docentes.</p>';
    }
}

// Ahora atamos el evento al hacer clic
document.addEventListener('DOMContentLoaded', function() {
    const docentesLink = document.getElementById('docentes-link');
    docentesLink.addEventListener('click', function(event) {
        event.preventDefault();
        showDocentes();
    });
});
