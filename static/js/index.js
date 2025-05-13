document.addEventListener('DOMContentLoaded', function () {
    const visualizarBtn = document.getElementById('visualizarCsvBtn');
    const generarHorarioBtn = document.getElementById('generarHorarioBtn');

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
        });
    });

    generarHorarioBtn.addEventListener('click', function () {
        const docentesData = JSON.parse(localStorage.getItem('docentesData'));
        const materiasData = JSON.parse(localStorage.getItem('materiasData'));
        const restriccionesData = JSON.parse(localStorage.getItem('restriccionesData'));
        const mallaData = JSON.parse(localStorage.getItem('mallaData'));
        const salonesData = JSON.parse(localStorage.getItem('salonesData'));

        if (!docentesData || !materiasData || !restriccionesData || !mallaData || !salonesData) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incompletos',
                text: 'Debe cargar todos los CSV para generar el horario',
            });
            return;
        }

        const horarioData = {
            docentes: docentesData,
            materias: materiasData,
            restricciones: restriccionesData,
            mallas: mallaData,
            salones: salonesData
        };

        fetch('/generar-horarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(horarioData)
        })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Error del servidor al generar el horario');
            }
            return response.json();
        })
        .then(horario => {
            localStorage.setItem('horarioData', JSON.stringify(horario));
            window.location.href = '/calendario';
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al generar horario',
                text: error.message || 'Ocurrió un error desconocido.',
            });
        });
    });
});
