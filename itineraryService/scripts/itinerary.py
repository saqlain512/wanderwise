import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import random


script_dir = os.path.dirname(os.path.abspath(__file__))

data_path=os.path.join(script_dir, 'data', 'cleaned_data.xlsx')

# Load dataset
dataset = pd.read_excel(data_path)  # Load your dataset here

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

# Function to recommend activities for a given destination
def recommend_activities(destination, num_days=5):

    filtered_dataset = dataset[ (dataset['City'] == destination)]

    if len(filtered_dataset) == 0:
        return create_sample_response(city=destination)

    # Find index of the destination in the dataset
    destination_indices = dataset.index[dataset['City'] == destination].tolist()

    # Calculate similarity scores for each destination index
    all_sim_scores = []
    for idx in destination_indices:
        sim_scores = list(enumerate(cosine_sim[idx]))
        all_sim_scores.extend(sim_scores)
    
    # Sort activities based on similarity scores
    all_sim_scores = sorted(all_sim_scores, key=lambda x: x[1], reverse=True)
    
    # Filter out activities for other destinations
    top_activities_indices = [i[0] for i in all_sim_scores if dataset.iloc[i[0]]['City'] == destination]
    
    # Initialize recommended activities list and set to keep track of selected activities
    recommended_activities = []
    selected_activities = set()
    
    # Randomly select one activity for each day, avoiding repeated activities
    for _ in range(num_days):
        random_index = random.choice(top_activities_indices)
        available_activities = [activity for activity in dataset.iloc[random_index]['Activities'] if activity not in selected_activities]
        if available_activities:
            selected_activity = random.choice(available_activities)
            recommended_activities.append(selected_activity)
            selected_activities.add(selected_activity)
        else:
            recommended_activities.append("No more unique activities available")
    
    return create_sample_response(city=destination,recommended_activities=recommended_activities)

# # Example usage
# country = input("Enter country: ")
# city = input("Enter city: ")
# budget = float(input("Enter budget (in USD): "))
# num_days = int(input("Enter number of days for the trip: "))

# # Limit the number of days for the trip
# max_num_days = 10  # Set your desired maximum number of days
# num_days = min(num_days, max_num_days)

# # Filter dataset based on user input country and city
# filtered_dataset = dataset[(dataset['Country'] == country) & (dataset['City'] == city)]

# if len(filtered_dataset) == 0:
#     print("Sorry, no data available for the specified country and city.")
# else:
#     recommended_activities = recommend_activities(city, num_days)
#     print("\nGenerated Itinerary:")
#     for day, activity in enumerate(recommended_activities, start=1):
#         print(f"Day {day}: {activity}")
