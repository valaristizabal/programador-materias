function showDocentes() {
    const docentesData = JSON.parse(localStorage.getItem('docentesData'));
    const seccion = document.getElementById('content-section');
    
    // Si hay datos en localStorage
    if (docentesData && docentesData.length > 0) {
        let rows = '';
        
        // Crear las filas de la tabla con los datos de docentes
        docentesData.forEach(docente => {
            rows += `
                <tr>
                    <td class="border border-gray-300 p-3">${docente.cedula}</td>
                    <td class="border border-gray-300 p-3">${docente.nombre}</td>
                    <td class="border border-gray-300 p-3">${docente.correo}</td>
                    <td class="border border-gray-300 p-3">${docente.telefono}</td>
                    <td class="border border-gray-300 p-3">${docente.especialidad}</td>
                </tr>
            `;
        });
        
        //formato de la tabla e incertar las columnas
        const content = `
            <h1 class="text-3xl font-bold mb-6">Visualizar datos de los docentes</h1>
            <table class="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th class="border border-gray-300 p-3">Cédula</th>
                        <th class="border border-gray-300 p-3">Nombre</th>
                        <th class="border border-gray-300 p-3">Correo</th>
                        <th class="border border-gray-300 p-3">Teléfono</th>
                        <th class="border border-gray-300 p-3">Especialidad</th>
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
