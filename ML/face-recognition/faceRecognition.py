import cv2
import face_recognition as fr
import numpy as np

def fun(encData, imagePath):
    encList = []
    enrollList = []
    result = []
    for i in encData:
        temp = []
        enrollList.append(i['enroll'])
        for j in i['encoding']:
            temp.append(j)
        encList.append(temp)

    img = cv2.imread(imagePath)
    img = cv2.resize(img, (0, 0), None, 1, 1)
    img2 = img
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    faceFrame = fr.face_locations(img)
    enc = fr.face_encodings(img, faceFrame)
    countr = 1
    for encFace, face in zip(enc, faceFrame):
        matches = fr.compare_faces(encList, encFace)
        dist = fr.face_distance(encList, encFace)
        ind = np.argmin(dist)
        # print(f'Person {countr}: {dist[ind]}')
        if matches[ind] and dist[ind] < 0.515:
            y1, x2, y2, x1 = face
            bbox = x1, y1, x2 - x1, y2 - y1
            cv2.putText(img2, str(countr), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
            cv2.rectangle(img2, (x1, y1), (x2, y2), (0, 255, 0), 2)
            font = cv2.FONT_HERSHEY_SIMPLEX
            result.append(int(enrollList[ind]))
            
        else:
            y1, x2, y2, x1 = face
            bbox = x1, y1, x2 - x1, y2 - y1
            cv2.putText(img2, str(countr), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
            cv2.rectangle(img2, (x1, y1), (x2, y2), (0, 0, 255), 2)
        countr += 1
    screen_width = 800
    screen_height = 600
    scale_x = screen_width / img2.shape[1]
    scale_y = screen_height / img2.shape[0]
    scale = min(scale_x, scale_y)
    new_width = int(img2.shape[1] * scale)
    new_height = int(img2.shape[0] * scale)
    resized_img = cv2.resize(img2, (new_width, new_height), interpolation=cv2.INTER_AREA)
    cv2.imshow('Video', resized_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return result
