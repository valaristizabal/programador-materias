import csv
from io import StringIO

def leer_csv(file_storage):
    stream = StringIO(file_storage.stream.read().decode("UTF8"), newline=None)
    csv_input = csv.DictReader(stream)
    return [row for row in csv_input]
