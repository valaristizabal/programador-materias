from collections import defaultdict
from datetime import datetime, timedelta

DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
HORAS = [f"{h}:00" for h in range(7, 19)]  # 7 AM a 6 PM

def hay_restriccion(cedula_docente, dia, hora, mapa_restricciones):
    for r in mapa_restricciones[cedula_docente]:
        if r.tipo == dia and r.hora_inicio <= hora <= r.hora_fin:
            return True
    return False

def generar_horarios(docentes, materias, restricciones, mallas, salones):
    eventos = []

    mapa_restricciones = defaultdict(list)
    for r in restricciones:
        mapa_restricciones[r.cedula_profesor].append(r)

    mapa_mallas = defaultdict(list)
    for m in mallas:
        mapa_mallas[m.codigo_materia].append(m)

    mapa_salones = {s.tipo: s for s in salones}
    base_fecha = datetime(2025, 5, 5)

    for materia in materias:
        horas_asignadas = 0
        print(f"Procesando materia: {materia.nombre}, horas requeridas: {materia.horas_semanales}")
        
        for i, dia in enumerate(DIAS):
            for hora in HORAS:
                if horas_asignadas >= materia.horas_semanales:
                    break

                docentes_materia = mapa_mallas.get(materia.codigo, [])
                posibles_docentes = [
                    m for m in docentes_materia
                    if not hay_restriccion(m.cedula_profesor, dia, hora, mapa_restricciones)
                ]

                if not posibles_docentes:
                    print(f"No hay docentes disponibles para {materia.nombre} el {dia} a las {hora}")
                    continue

                docente_asignado = posibles_docentes[0]
                tipo_salon = docente_asignado.tipo_salon
                salon_asignado = mapa_salones.get(tipo_salon)

                if not salon_asignado:
                    print(f"No hay salón del tipo '{tipo_salon}' disponible para {materia.nombre}")
                    continue

                hora_inicio = datetime.strptime(hora, "%H:%M")
                fecha = base_fecha + timedelta(days=i)
                start = datetime.combine(fecha.date(), hora_inicio.time())
                end = start + timedelta(hours=1)

                evento = {
                    "title": materia.nombre,
                    "start": start.isoformat(),
                    "end": end.isoformat(),
                    "description": f"Docente: {docente_asignado.nombre} ({docente_asignado.cedula})",
                    "location": f"Salón {salon_asignado.id}",
                    "color": "#378006"
                }

                eventos.append(evento)
                horas_asignadas += 1

                if horas_asignadas >= materia.horas_semanales:
                    break

    print(f">>> Total eventos generados: {len(eventos)}")
    return eventos
