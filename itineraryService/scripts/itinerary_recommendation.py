import os
import pandas as pd
import pickle
import random
from sklearn.feature_extraction.text import TfidfVectorizer

# Directory containing the recommendation.py script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load the pre-trained model
def load_model(model_path):
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
    return model

class ItineraryRecommendation:
    def __init__(self):
        # Initialize any necessary resources or dependencies
        self.model_path=os.path.join(script_dir, 'data', 'model_destination.pkl')
        self.data_path=os.path.join(script_dir, 'data', 'cleaned_data.xlsx')

    def generate_recommendation(self):
        # Implement logic to generate itinerary based on user preferences
        data = pd.read_excel(self.data_path)

        # Load the pre-trained model
        model = load_model(self.model_path)

        # Preprocess the data (TF-IDF vectorization)
        data.dropna(subset=["Interests"], inplace=True)
        random_interest = random.choice(data["Interests"])
        vectorizer = TfidfVectorizer()
        X = vectorizer.fit_transform(data["Interests"])

        user_interests_vectorized = vectorizer.transform([random_interest])

        # Predict destination
        destination = model.predict(user_interests_vectorized)[0]

       # Retrieve other details based on destination
        row = data[data["City"] == destination].iloc[0]
        budget = row["Budget"]
        accommodation = row["Accommodation"]
        activities = row["Activities"]

        # Return recommendations
        return {
           "Destination": destination,
           "Budget": budget,
           "Accommodation": accommodation,
           "Activities": activities
        }
    def generate_recommendations(self):
        recommendations=[]

        for i in range(10):
           rec = self.generate_recommendation()
           recommendations.append(
               {
                   'destination':rec["Destination"],
                   'budget':rec["Budget"],
                   'Accommodation':rec["Accommodation"],
                   'activities':rec["Activities"]
               }
            )
        
        return (recommendations)
    

    
