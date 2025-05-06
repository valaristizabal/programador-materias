import csv
from io import StringIO
from models.clases import Docente, Materia, Restriccion, Malla, Salon

def leer_csv(file_storage):
    stream = StringIO(file_storage.stream.read().decode("UTF8"), newline=None)
    csv_input = csv.DictReader(stream)
    return [row for row in csv_input]

def mapear_docentes(data):
    return [Docente(d['cedula'], d['nombre'], d['correo'], d['telefono'], d['especialidad']) for d in data]

def mapear_materias(data):
    return [Materia(m['codigo'], m['nombre'], m['carrera'], m['horas_semanales']) for m in data]

def mapear_restricciones(data):
    return [Restriccion(r['id'], r['cedula_profesor'], r['tipo_restriccion'], r['valor_restriccion'], r['hora_inicio'], r['hora_fin'], r['descripcion']) for r in data]

def mapear_mallas(data):
    return [Malla(m['id'], m['cedula_profesor'], m['codigo_carrera'], m['tipo_salon']) for m in data]

def mapear_salones(data):
    return [Salon(s['id'], s['ubicacion'], s['tipo'], s['capacidad']) for s in data]