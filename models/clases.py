class Docente:
    def __init__(self, numero, nombre):
        self.numero = numero
        self.nombre = nombre
    
    def to_dict(self):
        return {
            'numero': self.numero,
            'nombre': self.nombre
        }


class Materia:
    def __init__(self, codigo, nombre, franja, grupo, docente):
        self.codigo = codigo
        self.nombre = nombre
        self.franja = franja
        self.grupo = grupo
        self.docente = docente
    
    def to_dict(self):
        return {
            'codigo': self.codigo,
            'nombre': self.nombre,
            'franja': self.franja,
            'grupo': self.grupo,
            'docente': self.docente.to_dict()
        }


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