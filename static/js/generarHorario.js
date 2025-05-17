// generadorHorarios.js
class GeneradorHorariosFrontend {
  constructor() {
    this.apiUrl = 'http://127.0.0.1:5000/generar_horario';
  }

  async generarHorario() {
    try {
      // Obtener datos de localStorage
      const docentes = JSON.parse(localStorage.getItem('docentesData')) || [];
      const materias = JSON.parse(localStorage.getItem('materiasData')) || [];
      const restricciones = JSON.parse(localStorage.getItem('restriccionesData')) || [];
      const salones = JSON.parse(localStorage.getItem('salonesData')) || [];
      
      // Enviar datos al backend
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docentes,
          materias,
          restricciones,
          salones
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        this.mostrarHorario(data.horario);
        localStorage.setItem('horarioGenerado', JSON.stringify(data.horario));
        return data.horario;
      } else {
        console.error('Error al generar horario:', data.error);
        Swal.fire('Error', 'No se pudo generar el horario', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error de conexión con el servidor', 'error');
      return null;
    }
  }

  mostrarHorario(horarioData) {
    const seccion = document.getElementById('content-section');
    
    if (!horarioData || horarioData.length === 0) {
      seccion.innerHTML = `
        <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p class="text-yellow-700">No se pudo generar el horario. Verifica los datos.</p>
        </div>
      `;
      return;
    }
    
    // Agrupar por día y hora
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const bloquesHorarios = [
      '07:00-09:00', '09:00-11:00', '11:00-13:00', 
      '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'
    ];
    
    let content = `
      <h1 class="text-3xl font-bold mb-6">Horario Generado</h1>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
              ${dias.map(dia => `
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${dia}</th>
              `).join('')}
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${this.generarFilasHorario(horarioData, dias, bloquesHorarios)}
          </tbody>
        </table>
      </div>
      
      <div class="mt-8">
        <button onclick="exportarHorario()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Exportar Horario
        </button>
      </div>
    `;
    
    seccion.innerHTML = content;
  }

  generarFilasHorario(horarioData, dias, bloquesHorarios) {
    return bloquesHorarios.map(bloque => {
      const celdas = dias.map(dia => {
        const asignaciones = horarioData.filter(a => a.dia === dia && a.horario === bloque);
        
        if (asignaciones.length === 0) {
          return `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-gray-50"></td>`;
        }
        
        return asignaciones.map(asignacion => `
          <td class="px-6 py-4 whitespace-nowrap border border-gray-200">
            <div class="text-sm font-medium text-gray-900">${asignacion.nombre}</div>
            <div class="text-sm text-gray-500">${asignacion.docente}</div>
            <div class="text-sm text-gray-500">Salón: ${asignacion.salon}</div>
            <div class="text-sm text-gray-500">Grupo: ${asignacion.grupo}</div>
          </td>
        `).join('');
      }).join('');
      
      return `
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${bloque}</td>
          ${celdas}
        </tr>
      `;
    }).join('');
  }
}

// Función para llamar desde el frontend
async function generarYMostrarHorario() {
  const generador = new GeneradorHorariosFrontend();
  await generador.generarHorario();
}

function exportarHorario() {
  const horario = JSON.parse(localStorage.getItem('horarioGenerado'));
  if (!horario) return;
  
  // Convertir a CSV
  let csv = 'Materia,Docente,Día,Horario,Salón,Grupo\n';
  horario.forEach(item => {
    csv += `"${item.nombre}","${item.docente}","${item.dia}","${item.horario}","${item.salon}","${item.grupo}"\n`;
  });
  
  // Descargar archivo
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'horario_generado.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}