from googletrans import Translator
import json

translator = Translator()

def Translate(data):
    text = ""
    translated_text = ""

    for i in data['segments']:
        text += i["text"]
        if(len(text) > 3000):
            translated_text += translator.translate(text, src="hi", dest="en").text
            text = ""

    translated_text += translator.translate(text, src="hi", dest="en").text
    
    return translated_text
