# Dynamic UI

This project aims to demonstrate the concept of intelligent UI through the abstract e-commerce mobile app with a focus on optimizing user engagement and interaction. The application adapts its UI components based on user interactions to either maximize overall engagement time on the product details page or minimize the time it takes to click the 'Add to Cart' button.

## Table of Contents
[System Achitecture and Sequence](https://github.com/sarthak7awasthi/PETGNNs#system-architecture-and-sequence)



[Usage](https://github.com/sarthak7awasthi/PETGNNs#usage)


## System Architecture and Sequence 
![image](https://github.com/user-attachments/assets/5049ab7e-92c5-49e2-a297-2c9409b8a905)



#### Frontend
##### Framework: React Native Expo
- Components:
  - Landing/Home Page
  - Product Details Page
    
#### Backend
##### Framework: Flask
- Components:
  - API Endpoints:
    - /predict-order: Post Request for returning predicted order for rendering components
 
#### Machine Learning
##### Framework: Scikitlearn's RandomForestRegressor
  - Components:
    - Data preprocessing
    - Training
  
## Usage

For Backend
```
pip install -r requirements.txt
python model.py
python app.py
```

For Frontend

```
npm install -g expo-cli
npm install
npx expo start
```
