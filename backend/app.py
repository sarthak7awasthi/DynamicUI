from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('model_engagement.pkl', 'rb') as f:
    model_engagement = pickle.load(f)

with open('model_add_to_cart.pkl', 'rb') as f:
    model_add_to_cart = pickle.load(f)

# Convert categorical features to numerical
def preprocess_input(data):
    df = pd.DataFrame(data)
    df = pd.get_dummies(df, columns=['Component', 'Interaction Type'])
    return df

@app.route('/predict-order', methods=['POST'])
def predict_order():
    data = request.json['interactions']
    df = preprocess_input(data)
    
    # Predict engagement
    engagement_predictions = model_engagement.predict(df)
    engagement_order = sorted(range(len(engagement_predictions)), key=lambda k: engagement_predictions[k], reverse=True)
    
    # Predict time to add to cart
    cart_predictions = model_add_to_cart.predict(df)
    cart_order = sorted(range(len(cart_predictions)), key=lambda k: cart_predictions[k])
    
    # Send response
    response = {
        'engagement_order': engagement_order,
        'cart_order': cart_order
    }

    print("res", response)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
