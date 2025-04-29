document.addEventListener('DOMContentLoaded', function () {
    const visualizarBtn = document.getElementById('visualizarCsvBtn');

    visualizarBtn.addEventListener('click', function () {
        const formData = new FormData();
        const csvDocentes = document.getElementById('csvDocentes').files[0];
        const csvMaterias = document.getElementById('csvMaterias').files[0];
        const csvRestricciones = document.getElementById('csvRestricciones').files[0];
        const csvMalla = document.getElementById('csvMalla').files[0];
        const csvSalones = document.getElementById('csvSalones').files[0];

        if (!csvDocentes || !csvMaterias || !csvRestricciones || !csvMalla || !csvSalones) {
            Swal.fire({
                icon: 'warning',
                title: 'Archivos faltantes',
                text: 'Debe cargar todos los CSV para continuar',
            });
            return;
        }

        formData.append('csvDocentes', csvDocentes);
        formData.append('csvMaterias', csvMaterias); 
        formData.append('csvRestricciones', csvRestricciones);
        formData.append('csvMalla', csvMalla);
        formData.append('csvSalones', csvSalones);

        fetch('/cargar-csv', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos cargados:', data);
            localStorage.setItem('docentesData', JSON.stringify(data.docentes));
            localStorage.setItem('materiasData', JSON.stringify(data.materias));
            localStorage.setItem('restriccionesData', JSON.stringify(data.restricciones));
            localStorage.setItem('mallaData', JSON.stringify(data.mallas));
            localStorage.setItem('salonesData', JSON.stringify(data.salones));
            window.location.href = '/visualizar';
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar',
                text: error.message || 'Ocurrió un error desconocido.',
            });
            console.error('Error al cargar los archivos:', error);
        });
    });
});



// Función para manejar la carga de archivos CSV
function handleCSVFileUpload(inputId, storageKey) {
    const input = document.getElementById(inputId);
    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                // Almacenar el contenido del CSV en el localStorage
                localStorage.setItem(storageKey, content);
                alert('Archivo cargado exitosamente');
            };
            reader.readAsText(file);
        }
    });
}

// Cargar los CSV al inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    handleCSVFileUpload('csvDocentes', 'csvDocentesData');
    handleCSVFileUpload('csvRestricciones', 'csvRestriccionesData');
    handleCSVFileUpload('csvMaterias', 'csvMateriasData');
    handleCSVFileUpload('csvMalla', 'csvMallaData');
    handleCSVFileUpload('csvSalones', 'csvSalonesData');
});

// Función para visualizar los CSV cargados
function visualizarDatosCSV() {
    const csvDocentesData = localStorage.getItem('csvDocentesData');
    const csvRestriccionesData = localStorage.getItem('csvRestriccionesData');
    const csvMateriasData = localStorage.getItem('csvMateriasData');
    const csvMallaData = localStorage.getItem('csvMallaData');
    const csvSalonesData = localStorage.getItem('csvSalonesData');
    
    if (csvDocentesData) {
        console.log("Datos de Docentes cargados:", csvDocentesData);
    }
    if (csvRestriccionesData) {
        console.log("Datos de Restricciones cargados:", csvRestriccionesData);
    }
    if (csvMateriasData) {
        console.log("Datos de Materias cargados:", csvMateriasData);
    }
    if (csvMallaData) {
        console.log("Datos de Malla cargados:", csvMallaData);
    }
    if (csvSalonesData) {
        console.log("Datos de Salones cargados:", csvSalonesData);
    }
}

// Llamar a la función cuando el usuario presione el botón "Visualizar datos cargados"
document.getElementById('visualizarCsvBtn').addEventListener('click', visualizarDatosCSV);
