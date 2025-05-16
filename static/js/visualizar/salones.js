function showSalones() {
    const salonesData = JSON.parse(localStorage.getItem('salonesData'));
    const seccion = document.getElementById('content-section');

    if (salonesData && salonesData.length > 0) {
        let rows = '';

        salonesData.forEach(salon => {
            // Determinar color según el tipo de salón
            let tipoColor = 'bg-blue-100 text-blue-800';
            if (salon.tipo === 'Laboratorio') tipoColor = 'bg-purple-100 text-purple-800';
            if (salon.tipo === 'Auditorio') tipoColor = 'bg-green-100 text-green-800';
            if (salon.tipo === 'Taller') tipoColor = 'bg-yellow-100 text-yellow-800';

            // Indicador de capacidad
            let capacidadColor = 'text-green-600';
            if (salon.capacidad < 20) capacidadColor = 'text-yellow-600';
            if (salon.capacidad < 10) capacidadColor = 'text-red-600';

            rows += `
                <tr class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${salon.id_salon}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${salon.ubicacion}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tipoColor}">
                            ${salon.tipo}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${capacidadColor}">
                        ${salon.capacidad} <span class="text-gray-500 text-xs">personas</span>
                    </td>
                </tr>
            `;
        });

        const content = `
            <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-semibold text-gray-800">Gestión de Salones</h1>
                        <p class="mt-1 text-sm text-gray-600">Listado completo de todos los espacios académicos disponibles</p>
                    </div>
                    <button onclick="exportarSalones()" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Exportar
                    </button>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Salón</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidad</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${rows}
                        </tbody>
                    </table>
                </div>
                
                <div class="px-6 py-4 border-t border-gray-200">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Mostrando <span class="font-medium">${salonesData.length}</span> salones</span>
                        <div class="flex space-x-2">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Teórico</span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Laboratorio</span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Auditorio</span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Taller</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        seccion.innerHTML = content;
    } else {
        seccion.innerHTML = `
            <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="px-6 py-12 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <h3 class="mt-2 text-lg font-medium text-gray-900">No hay salones registrados</h3>
                    <p class="mt-1 text-sm text-gray-500">No se encontraron datos de salones en el sistema.</p>
                    <div class="mt-6">
                        <button onclick="location.href='#agregar-salones'" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Agregar Salón
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

function exportarSalones() {
    const salonesData = JSON.parse(localStorage.getItem('salonesData'));
    if (!salonesData || salonesData.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    // Crear contenido CSV
    let csvContent = "ID Salón,Ubicación,Tipo,Capacidad\n";
    
    salonesData.forEach(salon => {
        csvContent += `"${salon.id_salon}","${salon.ubicacion}","${salon.tipo}","${salon.capacidad}"\n`;
    });

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `salones_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function() {
    const salonesLink = document.getElementById("salones-link");
    if (salonesLink) {
        salonesLink.addEventListener('click', function(event) {
            event.preventDefault();
            showSalones();
        });
    }
});