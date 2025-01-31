import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import random

# Define the data path
script_dir = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(script_dir, 'data', 'cleaned_data.xlsx')

# Load dataset
dataset = pd.read_excel(data_path)

# Drop rows where "Interests" column has NaN values
dataset.dropna(subset=["Interests"], inplace=True)

# Preprocessing
# Split interests and activities into lists
dataset['Interests'] = dataset['Interests'].str.split(', ')
dataset['Activities'] = dataset['Activities'].str.split(', ')

# Feature Engineering
# Combine interests and activities into a single feature vector
dataset['features'] = dataset['Interests'] + dataset['Activities']

# Convert list of lists to list of strings
dataset['features'] = dataset['features'].apply(lambda x: ' '.join(x))

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(dataset['features'])

# Model Training (Cosine Similarity)
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

def create_sample_response(city="", recommended_activities=[]):
    response = {
        "Itinerary": {
            "city": city,
            "recommended_activities": recommended_activities
        }
    }
    return response

# Function to recommend a destination based on activities
def recommend_destination(activities, num_days=5):
    activities_str = ' '.join(activities)
    activities_tfidf = tfidf_vectorizer.transform([activities_str])
    
    # Calculate similarity scores for the input activities
    sim_scores = linear_kernel(activities_tfidf, tfidf_matrix)
    
    # Get the index of the most similar destination
    top_index = sim_scores[0].argmax()
    top_city = dataset.iloc[top_index]['City']
    
    # Get the activities for the most similar destination
    recommended_activities = []
    selected_activities = set()
    
    for _ in range(num_days):
        available_activities = [activity for activity in dataset.iloc[top_index]['Activities'] if activity not in selected_activities]
        if available_activities:
            selected_activity = random.choice(available_activities)
            recommended_activities.append(selected_activity)
            selected_activities.add(selected_activity)
        else:
            recommended_activities.append("No more unique activities available")
    
    return create_sample_response(city=top_city, recommended_activities=recommended_activities)

activities = ["Historical Sites"]
num_days = 5
response = recommend_destination(activities, num_days)
print(f"Recommended Destination: {response['Itinerary']['city']}")
for day, activity in enumerate(response['Itinerary']['recommended_activities'], start=1):
    print(f"Day {day}: {activity}")

test_activities = ["Historical Sites"]
print(recommend_destination(test_activities, 5))
