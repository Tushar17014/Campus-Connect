from flask import Flask, request, jsonify
from predictor import course_predictor

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World!"

@app.route('/predictCourse', methods=['POST'])
def predictCourse():

    student_data = request.form.get("studentData")

    response = course_predictor(student_data)

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, port=5030)
