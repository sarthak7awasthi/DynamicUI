import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import numpy as np
import pickle


data = pd.read_csv('dataset.csv')

# Preprocessing
data['Interaction Duration'] = data['Interaction Duration'].str.replace('s', '').astype(float)
data['Total Screentime'] = data['Total Screentime'].str.replace('s', '').astype(float)
data['Time to Add to Cart'] = data['Time to Add to Cart'].str.replace('s', '').astype(float)


X = data[['User ID', 'Session ID', 'Component', 'Interaction Type']]
y_engagement = data['Total Screentime']
y_add_to_cart = data['Time to Add to Cart']

X = pd.get_dummies(X, columns=['Component', 'Interaction Type'])


X_train_eng, X_test_eng, y_train_eng, y_test_eng = train_test_split(X, y_engagement, test_size=0.2, random_state=42)
X_train_cart, X_test_cart, y_train_cart, y_test_cart = train_test_split(X, y_add_to_cart, test_size=0.2, random_state=42)

model_engagement = RandomForestRegressor(n_estimators=100, random_state=42)
model_engagement.fit(X_train_eng, y_train_eng)


model_add_to_cart = RandomForestRegressor(n_estimators=100, random_state=42)
model_add_to_cart.fit(X_train_cart, y_train_cart)

# Evaluate the model
y_pred_eng = model_engagement.predict(X_test_eng)
y_pred_cart = model_add_to_cart.predict(X_test_cart)
mae_eng = mean_absolute_error(y_test_eng, y_pred_eng)
mae_cart = mean_absolute_error(y_test_cart, y_pred_cart)

print(f'Mean Absolute Error for Engagement: {mae_eng}')
print(f'Mean Absolute Error for Time to Add to Cart: {mae_cart}')

# Save the models
with open('model_engagement.pkl', 'wb') as f:
    pickle.dump(model_engagement, f)

with open('model_add_to_cart.pkl', 'wb') as f:
    pickle.dump(model_add_to_cart, f)

print("Models saved successfully.")
