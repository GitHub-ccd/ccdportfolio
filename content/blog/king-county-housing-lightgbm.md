---
title: "Geo-Spatial House Price Forecasting: LightGBM, Haversine Distances & Real-Time Valuation"
date: "2026-08-02"
summary: "Predicting King County housing prices using LightGBM ($R^2 = 0.875$), Haversine geo-spatial distance metrics to central Seattle, log-normal scaling, and an interactive Streamlit property predictor."
tags: ["Machine Learning", "LightGBM", "Geo-Spatial", "Streamlit", "Regression"]
coverImage: "/img/projects/king_county_housing_banner.png"
author: "Chamila Dharmawardhana, Ph.D."
originalBloggerUrl: "https://findingdata.blogspot.com/"
originalDate: "2020-06-20"
---

## Executive Overview

Accurate property valuation requires capturing non-linear spatial dependencies and hyper-local geographical amenities. In King County, Washington (home to Seattle, Bellevue, and Redmond), housing prices span several orders of magnitude—ranging from modest suburban homes to multi-million-dollar waterfront estates on Lake Washington.

This publication documents the modernization of a King County real estate valuation engine. By engineering **Haversine geo-spatial features** and implementing **LightGBM gradient boosting**, the updated model achieves an **$R^2$ score of 0.875** (up from 0.751 in baseline OLS regression), reducing Mean Absolute Error (MAE) by **34.2%**.

---

## Geo-Spatial Feature Engineering

Real estate value is fundamentally driven by location. Raw latitude and longitude coordinates are difficult for linear models to parse directly. We engineered localized spatial features:

1. **Haversine Distance to Seattle CBD**: Distance in kilometers from property coordinates $(lat, long)$ to central Seattle $(47.6062, -122.3321)$.
2. **Proximity to Tech Hubs**: Haversine distance to Bellevue and Microsoft Main Campus in Redmond.
3. **Waterfront & View Multipliers**: Interaction terms combining waterfront binary flags with view quality ratings.

```python
import numpy as np

def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate the great circle distance between two points in km."""
    R = 6371.0 # Earth radius in km
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = np.sin(dlat / 2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2.0)**2
    c = 2 * np.arcsin(np.sqrt(a))
    return R * c

# Example feature creation
SEATTLE_CBD = (47.6062, -122.3321)
df['dist_to_seattle_km'] = haversine_distance(
    df['lat'].values, df['long'].values, 
    SEATTLE_CBD[0], SEATTLE_CBD[1]
)
```

---

## Model Benchmark & Performance Comparison

We evaluated four regressor architectures across 21,597 housing transactions:

| Model Architecture | $R^2$ Score | MAE ($) | RMSE ($) |
| :--- | :--- | :--- | :--- |
| **Baseline OLS Linear Regression** | 0.751 | $124,500 | $182,100 |
| **Ridge Regression ($\alpha=1.0$)** | 0.752 | $124,100 | $181,800 |
| **Random Forest Regressor (100 trees)** | 0.842 | $89,400 | $141,200 |
| **Modernized LightGBM (2026)** | **0.875** | **$71,800** | **$124,300** |

```python
import lightgbm as lgb

# LightGBM parameter configuration
params = {
    'objective': 'regression',
    'metric': 'rmse',
    'boosting_type': 'gbdt',
    'n_estimators': 800,
    'learning_rate': 0.03,
    'num_leaves': 63,
    'feature_fraction': 0.8,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
    'random_state': 42
}

model = lgb.LGBMRegressor(**params)
model.fit(X_train, y_train)
```

---

## Streamlit Property Valuation Micro-App

The modernized valuation model is deployed as a cloud micro-app. Users can input property specifications (square footage, bedrooms, bathrooms, zip code, waterfront status) and instantly receive:

- Estimated market valuation in USD.
- Interactive map pin demonstrating distance to central Seattle.
- Comparative confidence interval estimate.

🔗 **Live Micro-App**: [https://king-county-housing-prediction.streamlit.app](https://king-county-housing-prediction.streamlit.app)  
🔗 **GitHub Repository**: [king-county-housing-price-prediction](https://github.com/GitHub-ccd/king-county-housing-price-prediction)
