# generador/clases.py

class Docente:
    def __init__(self, cedula, nombre, correo, telefono, especialidad):
        self.cedula = cedula
        self.nombre = nombre
        self.correo = correo
        self.telefono = telefono
        self.especialidad = especialidad
        self.restricciones = []

    def __repr__(self):
        return f"Docente({self.nombre})"


class Materia:
    def __init__(self, codigo, nombre, carrera, horas_semanales):
        self.codigo = codigo
        self.nombre = nombre
        self.carrera = carrera
        self.horas_semanales = int(horas_semanales)

    def __repr__(self):
        return f"Materia({self.nombre})"


class Malla:
    def __init__(self, id, cedula_profesor, codigo_materia, tipo_salon):
        self.id = id
        self.cedula_profesor = cedula_profesor
        self.codigo_materia = codigo_materia
        self.tipo_salon = tipo_salon  # "Teórico" o "Práctico"

    def __repr__(self):
        return f"Malla({self.codigo_materia} - {self.tipo_salon})"


class Restriccion:
    def __init__(self, id_res, cedula_profesor, tipo_restriccion, valor_restriccion, hora_inicio, hora_fin, descripcion):
        self.id = id_res
        self.cedula_profesor = cedula_profesor
        self.tipo = tipo_restriccion
        self.valor = valor_restriccion
        self.hora_inicio = hora_inicio
        self.hora_fin = hora_fin
        self.descripcion = descripcion

    def __repr__(self):
        return f"Restriccion({self.tipo} - {self.valor})"


class Salon:
    def __init__(self, id_salon, ubicacion, tipo, capacidad):
        self.id = id_salon
        self.ubicacion = ubicacion
        self.tipo = tipo  # "Teórico" o "Práctico"
        self.capacidad = int(capacidad)

    def __repr__(self):
        return f"Salon({self.ubicacion} - {self.tipo})"
