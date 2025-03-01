from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
import requests
from faceRecognition import fun
from train import createEncodings

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config["MONGO_URI"] = "mongodb://localhost:27017/mainv1"
db = PyMongo(app).db


@app.route('/')
def index():
    return "Hello World!"


@app.route('/api', methods=['GET'])
def api():
    documents = list(db.Attendance.find())
    res = []
    for i in documents:
        if '_id' in i:
            i['_id'] = str(i['_id'])
        res.append(i)
    print(res)
    return jsonify(res)

@app.route('/sendStudentAttendance', methods=['POST'])
def sendStudentAttendance():
    documents = db.StudentEncodings.find()
    res = []
    for i in documents:
        i['_id'] = str(i['_id'])
        res.append(i)
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    res = fun(res, filepath)
    os.remove(filepath)
    print(res)
    return jsonify(res)


@app.route('/sendStudentEncoding', methods=['POST'])
def sendStudentEncoding():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    encoding = createEncodings(filepath)
    os.remove(filepath)
    return jsonify(encoding)


if __name__ == '__main__':
    app.run(debug=True, port=5010)
