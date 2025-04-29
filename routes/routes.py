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

    docentes = procesar_csv.leer_csv(csv_docentes)
    materias = procesar_csv.leer_csv(csv_materias)
    restricciones = procesar_csv.leer_csv(csv_restricciones)
    mallas = procesar_csv.leer_csv(csv_mallas)
    salones = procesar_csv.leer_csv(csv_salones)

    return jsonify({
        "docentes": docentes,
        "materias": materias,
        "restricciones": restricciones,
        "mallas": mallas,
        "salones": salones
    })