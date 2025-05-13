from collections import defaultdict
from datetime import datetime, timedelta

# Días y horas estándar
DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
HORAS = [f"{h}:00" for h in range(7, 19)]  # 7 AM a 6 PM

def hay_restriccion(cedula_docente, dia, hora, mapa_restricciones):
    for r in mapa_restricciones[cedula_docente]:
        if r.tipo == dia and r.hora_inicio <= hora <= r.hora_fin:
            return True
    return False

def generar_horarios(docentes, materias, restricciones, mallas, salones):
    eventos = []

    # Mapa de restricciones por cédula docente
    mapa_restricciones = defaultdict(list)
    for r in restricciones:
        mapa_restricciones[r.cedula_profesor].append(r)

    # Mapa de mallas por código de materia
    mapa_mallas = defaultdict(list)
    for m in mallas:
        mapa_mallas[m.codigo_materia].append(m)

    # Mapa de salones por tipo
    mapa_salones = {s.tipo: s for s in salones}

    # Fecha base (lunes)
    base_fecha = datetime(2025, 5, 5)

    # Iteración por materias
    for materia in materias:
        horas_asignadas = 0
        for i, dia in enumerate(DIAS):
            for hora in HORAS:
                # Si ya se asignaron todas las horas semanales, salir del bucle
                if horas_asignadas >= materia.horas_semanales:
                    break

                # Filtrar docentes que no tienen restricciones para este día y hora
                posibles_docentes = [
                    m for m in mapa_mallas[materia.codigo]
                    if not hay_restriccion(m.cedula_profesor, dia, hora, mapa_restricciones)
                ]

                if not posibles_docentes:
                    continue

                # Seleccionar el primer docente disponible
                docente_asignado = posibles_docentes[0]
                tipo_salon = docente_asignado.tipo_salon
                salon_asignado = mapa_salones.get(tipo_salon)

                if not salon_asignado:
                    continue

                # Calcular las fechas y horas de inicio y fin
                hora_inicio = datetime.strptime(hora, "%H:%M")
                fecha = base_fecha + timedelta(days=i)
                start = datetime.combine(fecha.date(), hora_inicio.time())
                end = start + timedelta(hours=1)

                # Crear el evento
                evento = {
                    "title": materia.nombre,
                    "start": start.isoformat(),
                    "end": end.isoformat(),
                    "description": f"Docente: {docente_asignado.nombre} ({docente_asignado.cedula})",
                    "location": f"Salón {salon_asignado.id}",
                    "color": "#378006"  # Color verde
                }

                eventos.append(evento)
                horas_asignadas += 1

                # Si ya se asignaron todas las horas de la materia, salir del bucle
                if horas_asignadas >= materia.horas_semanales:
                    break

    return eventos
