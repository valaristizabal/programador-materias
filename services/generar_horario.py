from collections import defaultdict

class GeneradorHorarios:
    def __init__(self):
        self.dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
        self.bloques_dia = ['07:00-09:00', '09:00-11:00', '11:00-13:00', '14:00-16:00', '16:00-18:00']
        self.bloques_noche = ['18:00-20:00', '20:00-22:00']
        self.salones_ocupados = defaultdict(list)  # Mover aquí para que esté disponible siempre

    def cargar_datos(self, docentes, materias, restricciones, salones):
        self.docentes = docentes
        self.materias = materias
        self.restricciones = restricciones
        self.salones = salones
        self.preparar_datos()

    def preparar_datos(self):
        self.disponibilidad_docentes = defaultdict(list)
        # Procesar restricciones
        for restriccion in self.restricciones:
            docente_id = restriccion['cedula_profesor']
            if restriccion['tipo_restriccion'] == 'Horario':
                self.disponibilidad_docentes[docente_id].append({
                    'tipo': 'horario',
                    'inicio': restriccion['hora_inicio'],
                    'fin': restriccion['hora_fin']
                })
            elif restriccion['tipo_restriccion'] == 'Día':
                self.disponibilidad_docentes[docente_id].append({
                    'tipo': 'dia',
                    'valor': restriccion['valor_restriccion']
                })

    def _hora_a_minutos(self, hora_str):
        h, m = map(int, hora_str.split(':'))
        return h * 60 + m

    def docente_disponible(self, docente_id, dia, horario):
        for restriccion in self.disponibilidad_docentes.get(docente_id, []):
            if restriccion['tipo'] == 'dia' and restriccion['valor'] == dia:
                return False
            if restriccion['tipo'] == 'horario':
                # Convertir a minutos para comparar intervalos
                inicio_bloque = self._hora_a_minutos(horario.split('-')[0])
                fin_bloque = self._hora_a_minutos(horario.split('-')[1])
                inicio_res = self._hora_a_minutos(restriccion['inicio'])
                fin_res = self._hora_a_minutos(restriccion['fin'])
                
                # Comprobar si hay intersección entre bloque y restricción
                if not (fin_bloque <= inicio_res or inicio_bloque >= fin_res):
                    return False
        return True

    def salon_disponible(self, salon_id, dia, horario):
        for ocupacion in self.salones_ocupados[salon_id]:
            if ocupacion['dia'] == dia and ocupacion['horario'] == horario:
                return False
        return True

    def asignar_salon(self, materia, dia, horario):
        tipo_necesario = 'Laboratorio' if 'Laboratorio' in materia['nombre'] else 'Teórico'
        for salon in self.salones:
            if salon['tipo'] == tipo_necesario and self.salon_disponible(salon['id_salon'], dia, horario):
                self.salones_ocupados[salon['id_salon']].append({
                    'dia': dia,
                    'horario': horario,
                    'salon': salon['id_salon']
                })
                return salon['id_salon']  # Retorna el id del salón asignado
        return None

    def asignar_horarios(self):
        horario_final = []
        materias_ordenadas = sorted(self.materias, key=lambda x: -len(x.get('grupo', [])))
        
        for materia in materias_ordenadas:
            docente_id = materia['docente']['numero']
            franja = materia['franja']
            bloques = self.bloques_dia if franja == 'D' else self.bloques_noche
            horas_asignadas = 0
            
            for dia in self.dias:
                if horas_asignadas >= 2:
                    break
                for bloque in bloques:
                    if horas_asignadas >= 2:
                        break
                    if (self.docente_disponible(docente_id, dia, bloque)):
                        id_salon = self.asignar_salon(materia, dia, bloque)
                        if id_salon:
                            horario_final.append({
                                'materia': materia['codigo'],
                                'nombre': materia['nombre'],
                                'docente': materia['docente']['nombre'],
                                'dia': dia,
                                'horario': bloque,
                                'salon': id_salon,
                                'grupo': materia.get('grupo', 'N/A')
                            })
                            horas_asignadas += 1
                if horas_asignadas >= 2:
                    break
        
        return horario_final
