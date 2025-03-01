import cv2
import numpy as np
import face_recognition as fr

trainPath = "data/train/"
testPath = "data/test/"

def createEncodings(imagePath):
    enc = []
    student_image = fr.load_image_file(imagePath)
    student_encoding = fr.face_encodings(student_image)[0]
    for i in student_encoding:
        enc.append(i)
    return enc

