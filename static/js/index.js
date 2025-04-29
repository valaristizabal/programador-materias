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
