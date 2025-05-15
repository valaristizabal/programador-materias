document.addEventListener('DOMContentLoaded', function () {
    const visualizarBtn = document.getElementById('visualizarCsvBtn');
    const generarHorarioBtn = document.getElementById('generarHorarioBtn');

    visualizarBtn.addEventListener('click', function () {
        const formData = new FormData();
        const xlsxAsignacionDocentes = document.getElementById('xlsxAsignacionDocentes').files[0];
        const xlsxRestricciones = document.getElementById('xlsxRestricciones').files[0];
        const xlsxSalones = document.getElementById('xlsxSalones').files[0];

        // Verificar que todos los archivos han sido seleccionados
        if (!xlsxAsignacionDocentes || !xlsxRestricciones || !xlsxSalones) {
            Swal.fire({
                icon: 'warning',
                title: 'Archivos faltantes',
                text: 'Debe cargar los tres archivos XLSX para continuar',
            });
            return;
        }

        formData.append('xlsxAsignacionDocentes', xlsxAsignacionDocentes);
        formData.append('xlsxRestricciones', xlsxRestricciones);
        formData.append('xlsxSalones', xlsxSalones);

        fetch('/cargar-xlsx', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Guardar los datos en localStorage
            localStorage.setItem('docentesData', JSON.stringify(data.docentes));
            localStorage.setItem('materiasData', JSON.stringify(data.materias));
            localStorage.setItem('restriccionesData', JSON.stringify(data.restricciones));
            localStorage.setItem('salonesData', JSON.stringify(data.salones));

            // Verificar que los datos se guardaron correctamente
            console.log('Datos guardados en localStorage:', {
                docentes: localStorage.getItem('docentesData'),
                materias: localStorage.getItem('materiasData'),
                restricciones: localStorage.getItem('restriccionesData'),
                salones: localStorage.getItem('salonesData')
            });

            // Redirigir a la página de visualizar
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

    // Evento para generar el horario
    generarHorarioBtn.addEventListener('click', function () {
        // Recuperar los datos de localStorage
        const docentesData = JSON.parse(localStorage.getItem('docentesData'));
        const materiasData = JSON.parse(localStorage.getItem('materiasData'));
        const restriccionesData = JSON.parse(localStorage.getItem('restriccionesData'));
        const mallaData = JSON.parse(localStorage.getItem('mallaData'));
        const salonesData = JSON.parse(localStorage.getItem('salonesData'));

        // Verificar si los datos están completos
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

        // Enviar la solicitud para generar el horario
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
                // Guardar el horario generado en localStorage
                localStorage.setItem('horarioData', JSON.stringify(horario));
                // Redirigir al calendario
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

