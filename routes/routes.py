from flask import Blueprint, request, render_template, jsonify
from services import procesar_csv
from services.generar_horario import generar_horarios

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

@index_bp.route('/cargar-csv', methods=["POST"])
def cargar_archivos():
    csv_docentes = request.files['csvDocentes']
    csv_materias = request.files['csvMaterias']
    csv_restricciones = request.files['csvRestricciones']
    csv_mallas = request.files['csvMalla']
    csv_salones = request.files['csvSalones']

    # leer y mapear los csv
    docentes_raw = procesar_csv.leer_csv(csv_docentes)
    materias_raw = procesar_csv.leer_csv(csv_materias)
    restricciones_raw = procesar_csv.leer_csv(csv_restricciones)
    mallas_raw = procesar_csv.leer_csv(csv_mallas)
    salones_raw = procesar_csv.leer_csv(csv_salones)

    # mapeo a clases
    docentes = procesar_csv.mapear_docentes(docentes_raw)
    materias = procesar_csv.mapear_materias(materias_raw)
    restricciones = procesar_csv.mapear_restricciones(restricciones_raw)
    mallas = procesar_csv.mapear_mallas(mallas_raw)
    salones = procesar_csv.mapear_salones(salones_raw)

    # Opcional: si necesitas mostrar datos en pantalla, convierte los objetos a diccionarios (dict) aquí

    return jsonify({
        "docentes": docentes_raw,
        "materias": materias_raw,
        "restricciones": restricciones_raw,
        "mallas": mallas_raw,
        "salones": salones_raw
    })

@index_bp.route('/generar-horarios', methods=["POST"])
def generar():
    docentes = procesar_csv.mapear_docentes(request.json.get('docentes'))
    materias = procesar_csv.mapear_materias(request.json.get('materias'))
    restricciones = procesar_csv.mapear_restricciones(request.json.get('restricciones'))
    mallas = procesar_csv.mapear_mallas(request.json.get('mallas'))
    salones = procesar_csv.mapear_salones(request.json.get('salones'))

    horario = generar_horarios(docentes, materias, restricciones, mallas, salones)
    return jsonify(horario)
