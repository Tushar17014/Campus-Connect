import joblib
import pandas as pd

model = joblib.load("subject_recommender_model.pkl")

custom_input = pd.DataFrame([{
        "Quantum Physics" : 70,
        "Basic Numerical Methods" : 78,
        "Astro Physics" : 56,
        "Machine Learning" : 98,
        "Deep Learning" : 80,
        "Operating Systems" : 79,
        "Data Structures and Algorithms" : 98,
        "Web Development" : 100,
        "cgpa" : 8.7,
        "attendance" : 98,
        "ml_interest" : 1,
        "career_goal" : "Software Developer"
}])

prediction = model.predict(custom_input)
print(f"Recommended Subject: {prediction[0]}")
