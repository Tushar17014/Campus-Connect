import cv2
import face_recognition as fr
import numpy as np
import cvzone

Ids = []
encList = []
flag = 0
cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)
trainPath = "data/train/"
testPath = "data/test/"
student_image = fr.load_image_file(trainPath + "train1.png")
student_encoding = fr.face_encodings(student_image)[0]
encList.append(student_encoding)
while True:
    success, img = cap.read()
    img2 = img
    img = cv2.resize(img, (0, 0), None, 1, 1)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    faceFrame = fr.face_locations(img)
    enc = fr.face_encodings(img, faceFrame)
    for encFace, face in zip(enc, faceFrame):
        matches = fr.compare_faces(encList, encFace)
        dist = fr.face_distance(encList, encFace)
        ind = np.argmin(dist)
        if matches[ind] and dist[ind] < 0.5:
            y1, x2, y2, x1 = face
            y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
            bbox = x1, y1, x2 - x1, y2 - y1
            img2 = cvzone.cornerRect(img2, bbox, rt = 0)
            font = cv2.FONT_HERSHEY_SIMPLEX
            print(1)
        else:
            y1, x2, y2, x1 = face
            y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
            bbox = x1, y1, x2 - x1, y2 - y1
            img2 = cvzone.cornerRect(img2, bbox, rt = 0, colorR=(0, 0, 255), colorC=(0, 0, 255))
            print(0)
    cv2.imshow('Video', img2)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
