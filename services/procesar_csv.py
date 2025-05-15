import pandas as pd
from models.clases import Docente, Materia, Restriccion, Salon

def mapear_asignacion(dataframe):
    docentes = []
    materias = []
    last_docente = None

    for _, row in dataframe.iterrows():
        if pd.notna(row['NOMBRE DEL DOCENTE']):
            last_docente = Docente(
                numero=row['N°'] if pd.notna(row['N°']) else 0,
                nombre=row['NOMBRE DEL DOCENTE'] if pd.notna(row['NOMBRE DEL DOCENTE']) else "Sin nombre"
            )
            docentes.append(last_docente)

            # Mapear materias asociadas al docente
            materias.append(Materia(
                codigo=row['Código Espacio Académico'] if pd.notna(row['Código Espacio Académico']) else "Sin código",
                nombre=row['Nombre Espacio Académico'] if pd.notna(row['Nombre Espacio Académico']) else "Sin nombre",
                franja=row['Franja'] if pd.notna(row['Franja']) else "Sin franja",
                grupo=row['Grupo'] if pd.notna(row['Grupo']) else "Sin grupo",
                docente=last_docente
            ))

    return docentes, materias

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
