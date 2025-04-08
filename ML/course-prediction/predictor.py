from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(api_key=os.getenv('GENAI_KEY'))

def course_predictor(student_data):

    prompt = f'''I want you to act as a subject recommendation assistant for college students. Based on the students academic performance, interests, and career goals, suggest the most suitable elective subject for the upcoming semester.
    Put the carrer goal at top most priority and also check if the student has scored good marks in the subject related to his career goal.
    Consider realistic academic trends. Heres the students data: 
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
        "career_goal" : "DevOps"
    Please suggest 1 to 2 elective subjects that would suit the student best out of these: 
    ["Artificial Intelligence", "Deep Learning", "Data Science", "Blockchain", "Operations Research", "Marketing Management", "Cloud Computing", "UI/UX", "Product Strategy", "Backend Development", "Database Management", "DevOps", "IOT"]'''
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    
    prompt2 = f'''
    {response.text}
    From the data provided above just give the names of the suggested subjects'''

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt2
    )

    return response.text