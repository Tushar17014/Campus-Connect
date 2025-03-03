from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from speechToText import convertSpeechToText
from translate import Translate
from summarize import summarize

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/audio'


@app.route('/')
def index():
    return "Hello World!"

@app.route('/lectureSummarize', methods=['POST'])
def sendStudentAttendance():
    subject = request.form.get("subject")
    degree = request.form.get("degree")

    if 'audio' not in request.files:
        return jsonify({'error': 'No audio provided'}), 400

    file = request.files['audio']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    textFromSpeech = convertSpeechToText(filepath)
    os.remove(filepath)

    translatedText = Translate(textFromSpeech)

    summarizedText = summarize(translatedText, subject, degree)

    return jsonify(summarizedText)



if __name__ == '__main__':
    app.run(debug=True, port=5020)
