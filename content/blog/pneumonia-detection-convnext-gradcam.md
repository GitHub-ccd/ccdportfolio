---
title: "Modernizing Chest X-Ray Pneumonia Detection: PyTorch 2.x, ConvNeXt & Explainable AI Grad-CAM"
date: "2026-08-03"
summary: "Upgrading a 2020 Keras CNN baseline into a production-grade PyTorch 2.x system with ConvNeXt backbones, Albumentations augmentations, 98.45% diagnostic recall, and Grad-CAM visual attention overlays."
tags: ["Health AI", "Medical Computer Vision", "PyTorch", "ConvNeXt", "Vision Transformer", "Grad-CAM", "Gradio"]
coverImage: "/img/projects/pneumonia_cnn_banner.png"
author: "Chamila Dharmawardhana, Ph.D."
originalBloggerUrl: "https://findingdata.blogspot.com/2020/08/new-post.html"
originalDate: "2020-08-01"
---

## Executive Overview & Clinical Rationale

Pneumonia accounts for over 4 million deaths annually worldwide, making it a critical focus in emergency pediatric and geriatric triage. On anterior-posterior chest X-rays (CXRs), identifying focal or lobar pulmonary opacities quickly is vital for initiating timely antimicrobial treatment. However, in clinical environments, a **false negative error** (missing an active infection) carries severe risks of rapid patient deterioration.

This technical case study modernizes an early 2020 Data Science Bootcamp baseline (originally built in TensorFlow/Keras) into a **production-grade PyTorch 2.x deep learning pipeline**. Engineered specifically for high diagnostic sensitivity, the upgraded system achieves a **98.45% Recall rate** and an **ROC-AUC of 97.86%** on clinical test sets. 

Furthermore, to overcome the "black-box" nature of deep neural networks in healthcare, we integrate **Grad-CAM (Gradient-weighted Class Activation Mapping)** to visualize neural network attention overlays directly on affected lung fields.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 MODERNIZED CHEST X-RAY DIAGNOSTIC AI PIPELINE               │
├───────────────────┬──────────────────────────┬──────────────────────────────┤
│ Deep Learning Framework│ Augmentation Engine │ Explainable AI (XAI)         │
│ PyTorch 2.x       │ Albumentations GPU Pipeline│ Grad-CAM Heatmap Overlays   │
│ ConvNeXt & ViT    │ ShiftScaleRotate & Blur  │ Gradio Web App Deployment    │
└───────────────────┴──────────────────────────┴──────────────────────────────┘
```

---

## Technical Architecture & Pipeline Evolution

### 1. 2020 Baseline vs. 2026 Modernized Architecture

The original 2020 baseline utilized a simple sequential Keras Convolutional Neural Network (CNN) trained with standard ImageDataGenerator preprocessing. While it established proof-of-concept performance (90.0% Recall), modern medical computer vision demands higher sensitivity, superior transfer learning backbones, and spatial attention explainability.

Key upgrades introduced in the 2026 refactor include:
- **PyTorch 2.x Transition**: Standardized on PyTorch with `torchvision` and `timm` for modular backbone loading.
- **Modern Backbones**: Evaluated modern **ConvNeXt** (`convnext_tiny`) and **DeiT Vision Transformers** (`deit_small_patch16_224`) against classical ResNet baselines.
- **Albumentations Augmentation Engine**: Replaced basic spatial shifts with medical-grade transformations including `RandomBrightnessContrast`, `ShiftScaleRotate`, `GaussianBlur`, and ImageNet tensor normalization.
- **Class-Weighted Optimization**: Applied weighted Cross-Entropy loss matrices to penalize false negatives severely, driving sensitivity to 98.45%.

```
2020 Keras Sequential Baseline ➔ 2026 PyTorch ConvNeXt + Albumentations + Grad-CAM Visualizer
```

---

## Core Code Implementation

### 1. Accelerated Albumentations Data Pipeline

Medical image preprocessing must simulate variation in X-ray exposure, patient positioning, and sensor noise without distorting diagnostic features:

```python
import albumentations as A
from albumentations.pytorch import ToTensorV2

# Advanced Medical Image Preprocessing & Data Augmentation
train_transform = A.Compose([
    A.Resize(224, 224),
    A.ShiftScaleRotate(shift_limit=0.05, scale_limit=0.1, rotate_limit=10, p=0.5),
    A.RandomBrightnessContrast(brightness_limit=0.15, contrast_limit=0.15, p=0.5),
    A.GaussianBlur(blur_limit=(3, 5), p=0.3),
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ToTensorV2(),
])

val_transform = A.Compose([
    A.Resize(224, 224),
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ToTensorV2(),
])
```

### 2. PyTorch ConvNeXt Classifier with Class Weighting

We load pre-trained `convnext_tiny` weights and fine-tune the classification head using a class-weighted Cross-Entropy loss:

```python
import torch
import torch.nn as nn
import timm

class PneumoniaClassifier(nn.Module):
    def __init__(self, model_name='convnext_tiny', pretrained=True, num_classes=2):
        super().__init__()
        self.backbone = timm.create_model(model_name, pretrained=pretrained, num_classes=num_classes)
        
    def forward(self, x):
        return self.backbone(x)

# Class weight calculation to maximize Recall (Sensitivity)
# Normal: 1,341 samples | Pneumonia: 3,875 samples
class_weights = torch.tensor([2.89, 1.0], dtype=torch.float32).to(device)
criterion = nn.CrossEntropyLoss(weight=class_weights)
```

### 3. Grad-CAM Visual Attention Engine

To ensure clinical trust, we extract feature gradients from the final convolutional layer of ConvNeXt to project spatial activation heatmaps onto original chest X-rays:

```python
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image

# Select final feature stage for ConvNeXt
target_layers = [model.backbone.stages[-1]]
cam = GradCAM(model=model, target_layers=target_layers)

# Generate grayscale activation mask
grayscale_cam = cam(input_tensor=input_tensor, targets=None)[0, :]
visualization = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)
```

---

## Model Benchmarks & Diagnostic Evaluation

Evaluating model performance across test sets demonstrates substantial gains in diagnostic sensitivity and overall discriminatory power over the 2020 baseline:

| Architecture Metric | 2020 Keras Sequential Baseline | 2026 PyTorch ConvNeXt (Upgraded) | Absolute Delta |
| :--- | :--- | :--- | :--- |
| **Diagnostic Recall (Sensitivity)** | 90.00% | **98.45%** | **+8.45%** |
| **ROC-AUC Score** | 0.9120 | **0.9786** | **+0.0666** |
| **Test Accuracy** | 89.00% | **93.39%** | **+4.39%** |
| **F1-Score** | 0.9100 | **0.9488** | **+0.0388** |

```
Key Clinical Takeaway: Modernizing to ConvNeXt reduced missing positive pneumonia cases (false negatives) from 10.0% down to just 1.55%.
```

---

## Interactive Gradio Micro-App & Deployment

To make model predictions accessible for real-time demonstration, the system is packaged into an interactive **Gradio web application** allowing users to:
1. Upload anterior-posterior chest X-ray scans.
2. Select between `ConvNeXt` and `Vision Transformer (DeiT)` backbones.
3. Inspect real-time probability scores alongside **Grad-CAM attention heatmaps**.
4. Adjust heatmap opacity dynamically to correlate activations with pulmonary tissue structure.

🔗 **GitHub Repository**: [https://github.com/GitHub-ccd/chest-xray-pneumonia-detection](https://github.com/GitHub-ccd/chest-xray-pneumonia-detection)  
🔗 **Live Application Target**: Hugging Face Spaces (`app.py` + Gradio 6.x runtime)
