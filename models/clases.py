class Docente:
    def __init__(self, numero, nombre):
        self.numero = numero
        self.nombre = nombre
        self.materias = []  
    
    def agregar_materia(self, materia):
        self.materias.append(materia)
    
    def to_dict(self):
        return {
            'numero': self.numero,
            'nombre': self.nombre,
            # 🔍 Solo serializamos las materias, sin el docente (para evitar recursión)
            'materias': [materia.to_dict(include_docente=False) for materia in self.materias]
        }

class Materia:
    def __init__(self, codigo, nombre, franja, grupo, docente=None):
        self.codigo = codigo
        self.nombre = nombre
        self.franja = franja
        self.grupo = grupo
        self.docente = docente
    
    def to_dict(self, include_docente=True):
        data = {
            'codigo': self.codigo,
            'nombre': self.nombre,
            'franja': self.franja,
            'grupo': self.grupo,
        }
        
        # 🔍 Solo incluimos el docente si no estamos en un ciclo de recursión
        if include_docente and self.docente:
            data['docente'] = {
                'numero': self.docente.numero,
                'nombre': self.docente.nombre
            }

        return data

class Restriccion:
    def __init__(self, id_res, cedula_profesor, tipo_restriccion, valor_restriccion, hora_inicio, hora_fin, descripcion):
        self.id_res = id_res
        self.cedula_profesor = cedula_profesor
        self.tipo_restriccion = tipo_restriccion
        self.valor_restriccion = valor_restriccion
        self.hora_inicio = hora_inicio
        self.hora_fin = hora_fin
        self.descripcion = descripcion
    
    def to_dict(self):
        return {
            'id_res': self.id_res,
            'cedula_profesor': self.cedula_profesor,
            'tipo_restriccion': self.tipo_restriccion,
            'valor_restriccion': self.valor_restriccion,
            'hora_inicio': self.hora_inicio,
            'hora_fin': self.hora_fin,
            'descripcion': self.descripcion
        }


class Salon:
    def __init__(self, id_salon, ubicacion, tipo, capacidad):
        self.id_salon = id_salon
        self.ubicacion = ubicacion
        self.tipo = tipo
        self.capacidad = capacidad
    
    def to_dict(self):
        return {
            'id_salon': self.id_salon,
            'ubicacion': self.ubicacion,
            'tipo': self.tipo,
            'capacidad': self.capacidad
        }