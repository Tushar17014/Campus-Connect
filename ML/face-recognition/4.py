import cv2
import face_recognition as fr
import numpy as np
import os

encList = []

trainPath = "data/train/"
testPath = "data/test/4/"

student_image = fr.load_image_file(trainPath + "train4.jpg")
student_image = cv2.cvtColor(student_image, cv2.COLOR_BGR2RGB)
student_encoding = fr.face_encodings(student_image)[0]
encList.append(student_encoding)

for file in os.listdir(testPath):
    img = cv2.imread(testPath + file)
    img2 = img
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    faceFrame = fr.face_locations(img)
    enc = fr.face_encodings(img, faceFrame)
    for encFace, face in zip(enc, faceFrame):
        matches = fr.compare_faces(encList, encFace)
        dist = fr.face_distance(encList, encFace)
        ind = np.argmin(dist)
        if matches[ind] and dist[ind] < 0.5:
            print("Dist:", dist[ind])
            y1, x2, y2, x1 = face
            bbox = x1, y1, x2 - x1, y2 - y1
            cv2.rectangle(img2, (x1, y1), (x2, y2), (0, 255, 0), 2)
            font = cv2.FONT_HERSHEY_SIMPLEX
            print(1)
        else:
            y1, x2, y2, x1 = face
            bbox = x1, y1, x2 - x1, y2 - y1
            cv2.rectangle(img2, (x1, y1), (x2, y2), (0, 0, 255), 2)
            print(0)
    cv2.imshow('Video', img2)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

