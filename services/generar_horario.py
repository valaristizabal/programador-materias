from collections import defaultdict
from datetime import time

# Días y horas estándar (puedes modificar)
DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
HORAS = [f"{h}:00" for h in range(7, 19)]  # 7 AM a 6 PM

def generar_horario(docentes, materias, restricciones, mallas, salones):
    horario = defaultdict(list)  # clave: día, valor: lista de clases

    # Convertir restricciones en un mapa para acceso rápido
    mapa_restricciones = defaultdict(list)
    for r in restricciones:
        mapa_restricciones[r.cedula_profesor].append(r)

    # Indexar mallas y salones para rápida búsqueda
    mapa_mallas = defaultdict(list)
    for m in mallas:
        mapa_mallas[m.codigo_carrera].append(m)

    mapa_salones = {s.tipo: s for s in salones}

    for materia in materias:
        horas_asignadas = 0
        for dia in DIAS:
            for hora in HORAS:
                if horas_asignadas >= int(materia.horas_semanales):
                    break

                # Buscar docente elegible por malla y disponible en esta hora
                posibles_docentes = [
                    m for m in mapa_mallas[materia.carrera]
                    if not hay_restriccion(m.cedula_profesor, dia, hora, mapa_restricciones)
                ]

                if not posibles_docentes:
                    continue

                docente_asignado = posibles_docentes[0]  # Puedes usar lógica más avanzada aquí
                tipo_salon = docente_asignado.tipo_salon
                salon_asignado = mapa_salones.get(tipo_salon)

                if not salon_asignado:
                    continue

                clase = {
                    "materia": materia.nombre,
                    "docente": docente_asignado.cedula_profesor,
                    "salon": salon_asignado.id,
                    "hora": hora,
                    "dia": dia
                }

                horario[dia].append(clase)
                horas_asignadas += 1

                if horas_asignadas >= int(materia.horas_semanales):
                    break

    return dict(horario)

def hay_restriccion(cedula_docente, dia, hora, mapa_restricciones):
    for r in mapa_restricciones[cedula_docente]:
        if r.tipo_restriccion == dia and r.hora_inicio <= hora <= r.hora_fin:
            return True
    return False
