from flask import Blueprint, request, render_template, jsonify
from services import procesar_csv
index_bp = Blueprint('index', __name__)

@index_bp.route('/', methods=["GET"])
def index():
    return render_template("index.html")

@index_bp.route('/visualizar', methods=["GET"])
def visualizar():
    return render_template("visualizar.html")


@index_bp.route('/cargar-csv', methods=["POST"])
def cargar_archivos():
    csv_docentes = request.files['csvDocentes']
    csv_materias = request.files['csvMaterias']
    csv_restricciones = request.files['csvRestricciones']
    csv_mallas = request.files['csvMalla']
    csv_salones = request.files['csvSalones']


    # luego de leer los csv como listas de diccionarios...
    docentes_raw = procesar_csv.leer_csv(csv_docentes)
    materias_raw = procesar_csv.leer_csv(csv_materias)
    restricciones_raw = procesar_csv.leer_csv(csv_restricciones)
    mallas_raw = procesar_csv.leer_csv(csv_mallas)
    salones_raw = procesar_csv.leer_csv(csv_salones)

    # mapeo a objetos
    docentes = procesar_csv.mapear_docentes(docentes_raw)
    materias = procesar_csv.mapear_materias(materias_raw)
    restricciones = procesar_csv.mapear_restricciones(restricciones_raw)
    mallas = procesar_csv.mapear_mallas(mallas_raw)
    salones = procesar_csv.mapear_salones(salones_raw)

    return jsonify({
        "docentes": docentes,
        "materias": materias,
        "restricciones": restricciones,
        "mallas": mallas,
        "salones": salones
    })