import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

df = pd.read_csv("dataset.csv")

career_subject_map = {
    "Web Developer": ["Web Development", "Data Structures and Algorithms"],
    "MBA": ["Basic Numerical Methods", "Operating Systems"],
    "Design": ["Machine Learning", "Deep Learning"],
    "Research": ["Quantum Physics", "Astro Physics"],
    "Data Scientist": ["Machine Learning", "Deep Learning", "Data Structures and Algorithms"],
    "AI Engineer": ["Machine Learning", "Deep Learning"],
    "Developer": ["Web Development", "Operating Systems"],
}

common_features = ["career_goal", "cgpa", "attendance"]

def filter_features(row):
    career = row["career_goal"]
    relevant_subjects = career_subject_map.get(career, [])
    return row[relevant_subjects + common_features]

rows = []
labels = []
for _, row in df.iterrows():
    try:
        new_row = filter_features(row)
        rows.append(new_row)
        labels.append(row["selected_subject"])
    except:
        continue

filtered_df = pd.DataFrame(rows)
filtered_df["selected_subject"] = labels

X = filtered_df.drop("selected_subject", axis=1)
y = filtered_df["selected_subject"]

numerical_cols = X.select_dtypes(include=["float64", "int64"]).columns.tolist()
categorical_cols = X.select_dtypes(include=["object"]).columns.tolist()

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numerical_cols),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
    ]
)

pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline.fit(X_train, y_train)

y_pred = pipeline.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Filtered Feature Accuracy: {accuracy:.2f}")

joblib.dump(pipeline, "subject_recommender_model.pkl")
