from flask import Blueprint, request, render_template, jsonify
from services import procesar_csv
from services.generar_horario import generar_horarios
import pandas as pd

index_bp = Blueprint('index', __name__)

@index_bp.route('/', methods=["GET"])
def index():
    return render_template("index.html")

@index_bp.route('/visualizar', methods=["GET"])
def visualizar():
    return render_template("visualizar.html")

# Agrega esta ruta para el calendario
@index_bp.route('/calendario', methods=["GET"])
def calendario():
    return render_template("calendario.html")

@index_bp.route('/cargar-xlsx', methods=["POST"])
def cargar_archivos():
    # Recuperar los archivos subidos
    xlsx_asignacion_docentes = request.files['xlsxAsignacionDocentes']
    xlsx_restricciones = request.files['xlsxRestricciones']
    xlsx_salones = request.files['xlsxSalones']

    # Procesar los archivos XLSX
    asignacion_raw = pd.read_excel(xlsx_asignacion_docentes, sheet_name=0)
    restricciones_raw = pd.read_excel(xlsx_restricciones, sheet_name=0)
    salones_raw = pd.read_excel(xlsx_salones, sheet_name=0)

    # Mapeo de datos
    docentes, materias = procesar_csv.mapear_asignacion(asignacion_raw)
    restricciones = procesar_csv.mapear_restricciones(restricciones_raw)
    salones = procesar_csv.mapear_salones(salones_raw)

    # Responder con los datos en formato JSON
    return jsonify({
        "docentes": [docente.to_dict() for docente in docentes],
        "materias": [materia.to_dict() for materia in materias],
        "restricciones": [restriccion.to_dict() for restriccion in restricciones],
        "salones": [salon.to_dict() for salon in salones]
    })


@index_bp.route('/generar-horarios', methods=["POST"])
def generar():
    docentes = procesar_csv.mapear_docentes(request.json.get('docentes'))
    materias = procesar_csv.mapear_materias(request.json.get('materias'))
    restricciones = procesar_csv.mapear_restricciones(request.json.get('restricciones'))
    mallas = procesar_csv.mapear_mallas(request.json.get('mallas'))
    salones = procesar_csv.mapear_salones(request.json.get('salones'))

    horario = generar_horarios(docentes, materias, restricciones, mallas, salones)

    print(">>> Eventos generados:", horario)  # <-- Asegúrate que esto no sea una lista vacía

    return jsonify(horario)
