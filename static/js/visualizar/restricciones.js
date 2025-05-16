function showRestricciones() {
    const restriccionesData = JSON.parse(localStorage.getItem('restriccionesData'));
    const seccion = document.getElementById('content-section');

    if (restriccionesData && restriccionesData.length > 0) {
        let rows = '';

        restriccionesData.forEach(restriccion => {
            // Determinar color según el tipo de restricción
            let tipoColor = 'bg-blue-100 text-blue-800';
            if (restriccion.tipo_restriccion === 'Horario') tipoColor = 'bg-purple-100 text-purple-800';
            if (restriccion.tipo_restriccion === 'Día') tipoColor = 'bg-green-100 text-green-800';

            rows += `
                <tr class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${restriccion.id_res}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${restriccion.cedula_profesor}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tipoColor}">
                            ${restriccion.tipo_restriccion}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${restriccion.valor_restriccion}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">${restriccion.hora_inicio}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">${restriccion.hora_fin}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">${restriccion.descripcion || 'Sin descripción'}</td>
                </tr>
            `;
        });

        const content = `
            <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h1 class="text-2xl font-semibold text-gray-800">Restricciones de Docentes</h1>
                    <p class="mt-1 text-sm text-gray-600">Listado completo de todas las restricciones registradas</p>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inicio</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fin</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${rows}
                        </tbody>
                    </table>
                </div>
                
                <div class="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                    <span class="text-sm text-gray-600">Mostrando <span class="font-medium">${restriccionesData.length}</span> restricciones</span>
                    <button onclick="exportarRestricciones()" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                        Exportar a CSV
                    </button>
                </div>
            </div>
        `;

        seccion.innerHTML = content;
    } else {
        seccion.innerHTML = `
            <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="px-6 py-12 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 class="mt-2 text-lg font-medium text-gray-900">No hay restricciones</h3>
                    <p class="mt-1 text-sm text-gray-500">No se encontraron datos de restricciones en el sistema.</p>
                </div>
            </div>
        `;
    }
}

function exportarRestricciones() {
    const restriccionesData = JSON.parse(localStorage.getItem('restriccionesData'));
    if (!restriccionesData || restriccionesData.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    // Crear contenido CSV
    let csvContent = "ID,Cédula,Tipo,Valor,Hora Inicio,Hora Fin,Descripción\n";
    
    restriccionesData.forEach(restriccion => {
        csvContent += `"${restriccion.id_res}","${restriccion.cedula_profesor}","${restriccion.tipo_restriccion}","${restriccion.valor_restriccion}","${restriccion.hora_inicio}","${restriccion.hora_fin}","${restriccion.descripcion || ''}"\n`;
    });

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `restricciones_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function() {
    const restriccionesLink = document.getElementById("restricciones-link");
    if (restriccionesLink) {
        restriccionesLink.addEventListener('click', function(event) {
            event.preventDefault();
            showRestricciones();
        });
    }
});