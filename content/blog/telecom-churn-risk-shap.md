---
title: "Predicting Telecom Churn: Optuna-Tuned XGBoost, 82.5% Recall & TreeSHAP Explainability"
date: "2026-08-01"
summary: "Upgrading a legacy 2020 classification pipeline into an Optuna-tuned XGBoost model achieving 82.5% recall on high-risk customer churn, paired with TreeSHAP explainability diagnostics and a live Streamlit calculator."
tags: ["Explainable AI", "Machine Learning", "XGBoost", "SHAP", "Streamlit", "Optuna"]
coverImage: "/img/projects/customer_churn_banner.png"
author: "Chamila Dharmawardhana, Ph.D."
originalBloggerUrl: "https://findingdata.blogspot.com/2020/08/new-post.html"
originalDate: "2020-07-15"
---

## Executive Overview & Business Objective

In the telecommunications sector, customer acquisition costs typically outweigh retention costs by a factor of 5 to 1. Customer attrition—or **churn**—directly erodes recurring revenue margins. Identifying churn-prone customers prior to account cancellation empowers customer success teams to deploy targeted retention incentives.

This project modernizes an early 2020 classification baseline into a **high-precision, cost-optimized ML engine**. Utilizing **XGBoost** tuned via **Optuna hyperparameter optimization**, the modernized model achieves an **82.5% recall rate** on churners while maintaining an **ROC-AUC of 0.865**.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MODERNIZED TELECOM CHURN PIPELINE                    │
├──────────────────┬──────────────────────┬───────────────────────────────┤
│ Model Architecture│ Optuna Hyperparameters│ Explainability Framework      │
│ XGBoost Classifier│ Cost-Sensitive Recall│ TreeSHAP (Beeswarm & Waterfall│
└──────────────────┴──────────────────────┴───────────────────────────────┘
```

---

## Technical Architecture & Pipeline Evolution

### 1. Data Cleaning & Feature Engineering
The dataset comprises customer account metrics including tenure, monthly charges, customer service call frequency, and subscription plan tiers. Key data preparation steps included:

- **State-Level Encoding**: Categorical variables transformed via target-guided encoding and binary indicators for international/voicemail plans.
- **Service Density Ratios**: Derived metrics capturing customer service interactions relative to tenure length ($Calls / Month$).
- **Class Imbalance Mitigation**: Implemented cost-sensitive scale weights (`scale_pos_weight`) to prioritize false negative reduction.

```python
import xgboost as xgb
import optuna
from sklearn.metrics import recall_score, roc_auc_score

def objective(trial):
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 100, 500),
        'max_depth': trial.suggest_int('max_depth', 3, 9),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.2, log=True),
        'subsample': trial.suggest_float('subsample', 0.6, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.6, 1.0),
        'scale_pos_weight': trial.suggest_float('scale_pos_weight', 1.5, 4.5),
    }
    
    model = xgb.XGBClassifier(**params, random_state=42)
    model.fit(X_train, y_train)
    preds = model.predict(X_val)
    
    # Direct optimization for recall on churned customers
    return recall_score(y_val, preds)
```

---

## Hyperparameter Optimization with Optuna

Rather than relying on exhaustive grid searches, we used **Optuna Bayesian optimization** over 100 trial iterations to search the hyperparameter space.

| Metric | Baseline Random Forest (2020) | Optuna-Tuned XGBoost (2026) | Delta improvement |
| :--- | :--- | :--- | :--- |
| **Recall (Churn Class)** | 71.2% | **82.5%** | **+11.3%** |
| **ROC-AUC** | 0.814 | **0.865** | **+0.051** |
| **F1-Score** | 0.680 | **0.784** | **+0.104** |
| **Log Loss** | 0.412 | **0.298** | **-0.114** |

---

## Explainable AI: TreeSHAP Diagnostic Plots

Model transparency is vital when non-technical business stakeholders make intervention decisions. We integrated **TreeSHAP (SHapley Additive exPlanations)** to break down feature importance globally and locally.

### Key SHAP Findings:
1. **Customer Service Calls**: Accounts registering 4+ support calls exhibit exponentially higher SHAP impact toward churn.
2. **Daytime Call Minutes**: High daytime usage paired with high monthly bills strongly correlates with churn risk when international plans are absent.
3. **Tenure Length**: Customers within their initial 6-month contract window carry the highest vulnerability.

```python
import shap

# Compute SHAP values for XGBoost model
explainer = shap.TreeExplainer(model)
shap_values = explainer(X_test)

# Summary Beeswarm Plot
shap.plots.beeswarm(shap_values)
```

---

## Streamlit Risk Calculator Deployment

To translate model output into actionable software, we developed an interactive **Streamlit churn risk calculator**. Customer support managers can adjust sliders for account features (tenure, support calls, monthly charges) and receive:

- Real-time churn probability percentage.
- Individual SHAP waterfall breakdown explaining *why* the customer is flagged.
- Recommended retention action triggers.

🔗 **Live Micro-App**: [https://telecom-churn-risk-calculator.streamlit.app](https://telecom-churn-risk-calculator.streamlit.app)  
🔗 **GitHub Repository**: [Customer_churn_classification_MOD_3](https://github.com/GitHub-ccd/Customer_churn_classification_MOD_3)
