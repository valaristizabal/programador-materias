from flask import Blueprint, request, render_template, jsonify
from services import procesar_csv
from services.generar_horario import GeneradorHorarios

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
    print("Entré al endpoint cargar-xlsx")
    try:
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
        response_data = {
            "docentes": [docente.to_dict() for docente in docentes],
            "materias": [materia.to_dict() for materia in materias],
            "restricciones": [restriccion.to_dict() for restriccion in restricciones],
            "salones": [salon.to_dict() for salon in salones]
        }

        # 🔍 Verificar la respuesta que se envía
        print("JSON Response:", response_data)

        return jsonify(response_data)

    except Exception as e:
        print("Error en la carga:", str(e))
        return jsonify({"error": str(e)}), 500

@index_bp.route('/generar_horario', methods=['POST'])
def generar_horario():
    try:
        data = request.json
        generador = GeneradorHorarios()
        generador.cargar_datos(
            data['docentes'],
            data['materias'],
            data['restricciones'],
            data['salones']
        )
        horario = generador.asignar_horarios()
        return jsonify({'success': True, 'horario': horario})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    index_bp.run(debug=True)