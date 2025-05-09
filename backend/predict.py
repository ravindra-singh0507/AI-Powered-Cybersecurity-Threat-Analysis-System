# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
import pickle
import numpy as np
import json
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
import logging
from flask_cors import CORS


# Initialize Flask app
app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])


# Configure logging
logging.basicConfig(
    filename='predict.log',  # Log file name
    level=logging.INFO,      # Log level (e.g., DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Load the model and scaler
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Initialize preprocessors
scaler = StandardScaler()  # This should be fitted with your training data
label_encoder = LabelEncoder()  # This should also be fitted with your training data

# Example of preprocessing function
def preprocess_input(data):
    # Extract the features from the input data
    packet_length = data.get('packet_length', 0)
    duration = data.get('duration', 0)
    source_port = data.get('source_port', 0)
    destination_port = data.get('destination_port', 0)
    bytes_sent = data.get('bytes_sent', 0)
    bytes_received = data.get('bytes_received', 0)
    flow_packets = data.get('flow_packets', 0)
    total_fwd_packets = data.get('total_fwd_packets', 0)
    total_bwd_packets = data.get('total_bwd_packets', 0)
    sub_flow_fwd_bytes = data.get('sub_flow_fwd_bytes', 0)
    sub_flow_bwd_bytes = data.get('sub_flow_bwd_bytes', 0)
    attack_type = data.get('attack_type', 'Normal')  # Default to Normal if not provided

# Preprocess the features (assuming they need scaling or encoding)
    features = [
        packet_length,
        duration,
        source_port,
        destination_port,
        bytes_sent,
        bytes_received,
        flow_packets,
        total_fwd_packets,
        total_bwd_packets,
        sub_flow_fwd_bytes,
        sub_flow_bwd_bytes
    ]

# Scale the numerical features
    scaled_features = scaler.fit_transform([features])

    # Encode the categorical 'attack_type'
    attack_type_encoded = label_encoder.fit_transform([attack_type])

    # Combine features and the encoded attack_type
    final_input = np.hstack([scaled_features, attack_type_encoded.reshape(1, -1)])

    return final_input

@app.route('/predict', methods=['POST'])
def predict():
    logging.info("Received a prediction request:")
    print(f"Received a prediction request:")
    try:
        # Parse input JSON
        data = request.get_json()
        logging.info(f"Request data: {data}")
        print(f"Request data : {data} ")

        # Preprocess the data
        processed_data = preprocess_input(data)

        # Make a prediction
        prediction = model.predict(processed_data)
        probability = model.predict_proba(processed_data)[0, 1]
        logging.info(f"Prediction result: {prediction[0]}, Probability : {probability}")
        print(f"Prediction result: {prediction[0]}, Probability : {probability}")

        # Respond with prediction
        return jsonify({
            'prediction': int(prediction[0]),
            'probability': float(probability)
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)