import json
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

def predict_house_price(features):
    """
    Hàm mô phỏng việc dự đoán giá nhà dựa trên 6 thuộc tính.
    Sử dụng một công thức tuyến tính đơn giản làm placeholder.
    """
    
    coeffs = {
        'OverallQual': 20000,
        'GrLivArea': 50,
        'GarageCars': 15000,
        'TotalBsmtSF': 30,
        'FullBath': 10000,
        'YearBuilt': 100
    }
    
    base_price = 50000
    
    prediction = base_price
    
    prediction += features['OverallQual'] * coeffs['OverallQual']
    prediction += features['GrLivArea'] * coeffs['GrLivArea']
    prediction += features['GarageCars'] * coeffs['GarageCars']
    prediction += features['TotalBsmtSF'] * coeffs['TotalBsmtSF']
    prediction += features['FullBath'] * coeffs['FullBath']
    prediction += (features['YearBuilt'] - 1900) * coeffs['YearBuilt']
    
    return max(100000, prediction) * 0.9

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        required_features = ['OverallQual', 'GrLivArea', 'GarageCars', 'TotalBsmtSF', 'FullBath', 'YearBuilt']
        for feature in required_features:
            if feature not in data:
                return jsonify({'error': f'Thiếu thuộc tính: {feature}'}), 400
        
        features = {k: float(v) for k, v in data.items()}
        
        predicted_price = predict_house_price(features)
        
        return jsonify({'prediction': predicted_price})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/data')
def get_data():
    """
    Mô phỏng dữ liệu phân tích từ cơ sở dữ liệu.
    """
    
    price_distribution = {
        'labels': ['< $150K', '$150K - $200K', '$200K - $250K', '$250K - $300K', '> $300K'],
        'data': [350, 620, 310, 150, 30] # Số lượng nhà
    }
    
    avg_price_by_qual = {
        'labels': ['3', '4', '5', '6', '7', '8', '9', '10'],
        'data': [87000, 115000, 140000, 175000, 210000, 270000, 350000, 430000]
    }
    
    avg_area_by_style = {
        'labels': ['2Story', '1Story', '1.5Fin', 'SFoyer', 'SLvl'],
        'data': [1950, 1480, 1250, 1100, 1050]
    }
    
    dashboard_data = {
        'price_distribution': price_distribution,
        'avg_price_by_qual': avg_price_by_qual,
        'avg_area_by_style': avg_area_by_style
    }
    
    return jsonify(dashboard_data)

if __name__ == '__main__':
    app.run(debug=True)
