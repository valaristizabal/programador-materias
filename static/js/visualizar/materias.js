function showMaterias() {
    // Obtener datos de localStorage
    const materiasData = JSON.parse(localStorage.getItem('materiasData'));
    const seccion = document.getElementById('content-section');

    if (materiasData && materiasData.length > 0) {
        // Eliminar duplicados basados en código (clave única) y convertir códigos a enteros
        const materiasUnicas = [];
        const codigosVistos = new Set();
        
        materiasData.forEach(materia => {
            // Convertir código a entero (eliminar decimales si existen)
            const codigoEntero = parseInt(materia.codigo) || materia.codigo;
            
            if (!codigosVistos.has(codigoEntero)) {
                codigosVistos.add(codigoEntero);
                // Crear copia de la materia con código convertido
                materiasUnicas.push({
                    ...materia,
                    codigo: codigoEntero
                });
            }
        });

        // Ordenar materias por código numérico
        materiasUnicas.sort((a, b) => a.codigo - b.codigo);

        let content = `
            <h1 class="text-3xl font-bold mb-6">Listado de Materias</h1>
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Franja</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Docente</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
        `;

        // Recorremos todas las materias únicas
        materiasUnicas.forEach(materia => {
            content += `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${materia.codigo}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">${materia.nombre || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">${materia.franja || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">${materia.grupo || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">${materia.docente?.nombre || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs" 
                                onclick="verDetalleMateria(${materia.codigo})">
                            Ver detalles
                        </button>
                    </td>
                </tr>
            `;
        });

        content += `
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-4 text-sm text-gray-600">
                Total de materias únicas: ${materiasUnicas.length}
            </div>
        `;

        seccion.innerHTML = content;
    } else {
        seccion.innerHTML = `
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                <p class="text-yellow-700">No se encontraron datos de materias.</p>
            </div>
        `;
    }
}

// Función para ver detalles de una materia específica
function verDetalleMateria(codigoMateria) {
    const materiasData = JSON.parse(localStorage.getItem('materiasData'));
    // Convertir el código buscado a entero para coincidir con los datos procesados
    const codigoBuscado = parseInt(codigoMateria) || codigoMateria;
    const materia = materiasData.find(m => parseInt(m.codigo) === codigoBuscado || m.codigo === codigoBuscado);
    
    if (materia) {
        // Crear un modal más elegante en lugar de un alert
        const modalContent = `
            <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                    <div class="px-6 py-4">
                        <h3 class="text-lg font-medium text-gray-900">Detalles de la Materia</h3>
                        <div class="mt-4 space-y-2">
                            <p><strong>Código:</strong> ${parseInt(materia.codigo) || materia.codigo}</p>
                            <p><strong>Nombre:</strong> ${materia.nombre || 'N/A'}</p>
                            <p><strong>Franja:</strong> ${materia.franja || 'N/A'}</p>
                            <p><strong>Grupo:</strong> ${materia.grupo || 'N/A'}</p>
                            <p><strong>Docente:</strong> ${materia.docente?.nombre || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-6 py-3 flex justify-end">
                        <button onclick="cerrarModal()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.id = 'materiaModal';
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
    }
}

function cerrarModal() {
    const modal = document.getElementById('materiaModal');
    if (modal) {
        modal.remove();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const materiasLink = document.getElementById("materias-link");
    if (materiasLink) {
        materiasLink.addEventListener('click', function(event) {
            event.preventDefault();
            showMaterias();
        });
    }
});