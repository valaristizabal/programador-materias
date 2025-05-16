import pandas as pd
from models.clases import Docente, Materia, Restriccion, Salon

def mapear_asignacion(dataframe):
    """
    Procesa el dataframe completo de asignación docente-materia, manejando:
    - Docentes con múltiples materias
    - Materias con el mismo nombre pero diferente código/grupo/franja
    - Filas vacías o incompletas
    - Validación de datos esenciales
    """
    docentes_dict = {}  # {numero_docente: objeto Docente}
    materias_dict = {}  # {codigo_materia: objeto Materia}
    materias_list = []  # Lista final de materias
    
    # Columnas requeridas
    required_columns = ['N°', 'NOMBRE DEL DOCENTE', 'Código Espacio Académico', 
                       'Nombre Espacio Académico', 'Franja', 'Grupo']
    
    # Verificar columnas
    if not all(col in dataframe.columns for col in required_columns):
        missing = [col for col in required_columns if col not in dataframe.columns]
        raise ValueError(f"Faltan columnas: {missing}")

    current_docente = None
    
    for index, row in dataframe.iterrows():
        try:
            # Manejar docentes (filas con número y nombre)
            if pd.notna(row['N°']) and pd.notna(row['NOMBRE DEL DOCENTE']):
                numero_docente = int(row['N°'])
                nombre_docente = str(row['NOMBRE DEL DOCENTE']).strip()
                
                if numero_docente not in docentes_dict:
                    current_docente = Docente(numero=numero_docente, nombre=nombre_docente)
                    docentes_dict[numero_docente] = current_docente
                else:
                    current_docente = docentes_dict[numero_docente]
            
            # Si no hay docente actual, saltar fila
            if current_docente is None:
                continue
                
            # Procesar materia si tiene código
            if pd.notna(row['Código Espacio Académico']):
                codigo_materia = str(row['Código Espacio Académico']).strip()
                
                # Validar código único
                if not codigo_materia:
                    continue
                    
                # Crear o obtener materia
                if codigo_materia not in materias_dict:
                    materia = Materia(
                        codigo=codigo_materia,
                        nombre=str(row['Nombre Espacio Académico']).strip() if pd.notna(row['Nombre Espacio Académico']) else f"Materia {codigo_materia}",
                        franja=str(row['Franja']).strip() if pd.notna(row['Franja']) else "Sin franja",
                        grupo=str(row['Grupo']).strip() if pd.notna(row['Grupo']) else "Sin grupo",
                        docente=current_docente
                    )
                    materias_dict[codigo_materia] = materia
                    materias_list.append(materia)
                else:
                    materia = materias_dict[codigo_materia]
                
                # Asignar materia al docente (sin duplicados)
                if materia not in current_docente.materias:
                    current_docente.agregar_materia(materia)
                    
        except Exception as e:
            print(f"Error en fila {index+2}: {str(e)}")
            continue
    
    # Validación final
    print("\nResumen de carga:")
    print(f"- Total docentes: {len(docentes_dict)}")
    print(f"- Total materias únicas: {len(materias_dict)}")
    
    # Docentes con más materias
    top_docentes = sorted(docentes_dict.values(), key=lambda d: len(d.materias), reverse=True)[:5]
    print("\nTop 5 docentes con más materias:")
    for docente in top_docentes:
        print(f"  {docente.nombre} ({docente.numero}): {len(docente.materias)} materias")
    
    return list(docentes_dict.values()), materias_list

def mapear_restricciones(dataframe):
    return [Restriccion(
        id_res=row['ID'] if pd.notna(row['ID']) else 0,
        cedula_profesor=row['Cédula Profesor'] if pd.notna(row['Cédula Profesor']) else "Sin cédula",
        tipo_restriccion=row['Tipo Restricción'] if pd.notna(row['Tipo Restricción']) else "Sin tipo",
        valor_restriccion=row['Valor Restricción'] if pd.notna(row['Valor Restricción']) else "Sin valor",
        hora_inicio=row['Hora Inicio'] if pd.notna(row['Hora Inicio']) else "00:00",
        hora_fin=row['Hora Fin'] if pd.notna(row['Hora Fin']) else "00:00",
        descripcion=row['Descripción'] if pd.notna(row['Descripción']) else "Sin descripción"
    ) for _, row in dataframe.iterrows()]

def mapear_salones(dataframe):
    return [Salon(
        id_salon=row['ID Salon'] if pd.notna(row['ID Salon']) else 0,
        ubicacion=row['Ubicación'] if pd.notna(row['Ubicación']) else "Sin ubicación",
        tipo=row['Tipo'] if pd.notna(row['Tipo']) else "Sin tipo",
        capacidad=row['Capacidad'] if pd.notna(row['Capacidad']) else 0
    ) for _, row in dataframe.iterrows()]
