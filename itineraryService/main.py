from flask import Flask, request, jsonify
from flask_cors import CORS
from scripts.itinerary_recommendation import ItineraryRecommendation
from scripts.itinerary import recommend_activities
app = Flask(__name__)
CORS(app)
# API endpoint for generating itinerary recommendations
@app.route('/recommendations', methods=['GET'])
def recommendations():
    
    # Generate itinerary recommendations
    model=ItineraryRecommendation()
    recommendations = model.generate_recommendations()

    # Return recommended itinerary as JSON response
    return jsonify(recommendations),200,{'Content-Type': 'application/json'}

@app.route('/generate-itinerary', methods=['POST'])
def generate_itinerary():
    # Get user preferences from request body
    user_preferences = request.json

    itinerary = recommend_activities(destination=user_preferences['destination'],num_days=int(user_preferences['num_days']))

    # Return recommended itinerary as JSON response
    return jsonify(itinerary),200,{'Content-Type': 'application/json'}
if __name__ == '__main__':
    app.run(debug=True)
