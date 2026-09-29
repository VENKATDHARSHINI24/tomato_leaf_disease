
# 🍅 Tomato Leaf Disease Detection AI

### Real-Time Tomato Leaf Disease Identification Using Deep Learning

An AI-powered tomato leaf disease detection system built using **Python, TensorFlow, Keras, and Convolutional Neural Networks (CNN)**. The application identifies 10 tomato leaf disease and healthy-plant categories from uploaded leaf images and displays prediction probabilities.

## 🌿 Project Overview

Tomato plants are affected by various diseases that can reduce crop yield and quality. This project uses deep learning and image classification to identify tomato leaf diseases from images.

The system accepts a tomato leaf image, preprocesses it, extracts visual features using a CNN, and predicts the corresponding disease class using a Softmax output layer.

## ✨ Features

* 🍃 **10-Class Disease Classification** – Identifies nine tomato diseases and healthy leaves.
* 📸 **Image Upload** – Upload custom tomato leaf images for prediction.
* 📷 **Live Camera Scanner** – Capture leaf images using the camera, if enabled in the application.
* 🧠 **CNN-Based Classification** – Uses a custom Convolutional Neural Network.
* 📊 **Prediction Confidence** – Displays the predicted disease and its probability.
* 📈 **Model Evaluation** – Includes accuracy, loss curves, ROC-AUC curves and a confusion matrix.
* 📋 **Field Report** – Provides disease identification information through the application interface.

## 🎯 Disease Classes

The model classifies images into the following 10 categories:

| No. | Disease / Class                        |
| --- | -------------------------------------- |
| 1   | Bacterial Spot                         |
| 2   | Early Blight                           |
| 3   | Healthy Tomato Plant                   |
| 4   | Late Blight                            |
| 5   | Leaf Mold                              |
| 6   | Septoria Leaf Spot                     |
| 7   | Spider Mites (Two-spotted Spider Mite) |
| 8   | Target Spot                            |
| 9   | Tomato Mosaic Virus                    |
| 10  | Tomato Yellow Leaf Curl Virus (TYLCV)  |

## 📂 Dataset

The model was trained using the Kaggle Tomato Leaf Disease Dataset.

**Dataset:** [Tomato Leaf Disease Dataset – Kaggle](https://www.kaggle.com/datasets/noulam/tomato)

| Dataset Details   |              Value |
| ----------------- | -----------------: |
| Total Images      |             22,930 |
| Training Images   |             18,345 |
| Testing Images    |              4,585 |
| Number of Classes |                 10 |
| Image Input Size  |        64 × 64 × 3 |
| Dataset Type      | Tomato Leaf Images |

### Download the Dataset

```python
import kagglehub

# Download the latest dataset
path = kagglehub.dataset_download("noulam/tomato")

print("Path to dataset files:", path)
```

## 🧠 CNN Model Architecture

The proposed model uses a custom Convolutional Neural Network implemented using TensorFlow and Keras.

### Model Workflow

```text
Input Tomato Leaf Image
          |
          v
Image Preprocessing
(64 × 64 × 3)
          |
          v
Conv2D (32 filters, 3×3)
+ ReLU
          |
          v
MaxPooling2D (2×2)
+ Dropout (0.2)
          |
          v
Conv2D (64 filters, 3×3)
+ ReLU
          |
          v
MaxPooling2D (2×2)
+ Dropout (0.2)
          |
          v
Conv2D (128 filters, 3×3)
+ ReLU
          |
          v
MaxPooling2D (2×2)
+ Dropout (0.4)
          |
          v
Flatten
          |
          v
Dense (64, ReLU)
          |
          v
Dense (128, ReLU)
+ Dense (64, ReLU)
          |
          v
Dense (10, Softmax)
          |
          v
Predicted Disease Class
```

### Architecture Details

| Layer                 | Configuration            |
| --------------------- | ------------------------ |
| Input                 | 64 × 64 × 3              |
| Convolutional Layer 1 | 32 filters, 3 × 3, ReLU  |
| Max Pooling 1         | 2 × 2, Dropout 0.2       |
| Convolutional Layer 2 | 64 filters, 3 × 3, ReLU  |
| Max Pooling 2         | 2 × 2, Dropout 0.2       |
| Convolutional Layer 3 | 128 filters, 3 × 3, ReLU |
| Max Pooling 3         | 2 × 2, Dropout 0.4       |
| Flatten               | Feature vector           |
| Dense Layer           | 64 neurons, ReLU         |
| Dense Layers          | 128 and 64 neurons, ReLU |
| Output Layer          | 10 neurons, Softmax      |

## 📊 Model Performance

The following results are reported in the project's model evaluation report.

| Evaluation Metric        | Result |
| ------------------------ | -----: |
| Training Accuracy        | 98.63% |
| Validation Accuracy      | 95.48% |
| Test Accuracy            | 95.42% |
| Test Images              |  4,585 |
| Mean Multi-Class ROC-AUC | > 0.95 |
| Training Epochs          |     75 |

### Training and Validation

The model was trained for 75 epochs. The reported accuracy and loss curves show the training and validation performance over the training process.

### Class-Wise ROC-AUC

| Disease Class          | ROC-AUC |
| ---------------------- | ------: |
| Bacterial Spot         |   1.000 |
| Early Blight           |   0.997 |
| Healthy                |   1.000 |
| Late Blight            |   0.998 |
| Leaf Mold              |   0.999 |
| Septoria Leaf Spot     |   0.998 |
| Spider Mites           |   0.999 |
| Target Spot            |   0.996 |
| Mosaic Virus           |   1.000 |
| Yellow Leaf Curl Virus |   1.000 |

*These are the reported class-wise ROC-AUC values from the project evaluation report.*

## 🖥️ Application Interface

The Tomato Leaf Disease Detection AI application provides an interactive interface for uploading leaf images and viewing predictions.

### Main Modules

1. **Leaf Diagnostics** – Upload a tomato leaf image or use the camera scanner.
2. **Disease Encyclopedia** – Explore information about tomato diseases.
3. **Model & Metrics** – View the CNN architecture and model evaluation metrics.
4. **Field Report** – Access disease identification results and related information.

### Prediction Output

The application displays:

* Uploaded tomato leaf image
* Predicted disease name
* Prediction confidence
* Probability distribution across the 10 classes
* Related disease information

## 🛠️ Technologies Used

| Technology            | Purpose                         |
| --------------------- | ------------------------------- |
| Python                | Core programming language       |
| TensorFlow            | Deep learning framework         |
| Keras                 | CNN model development           |
| NumPy                 | Numerical computation           |
| OpenCV                | Image processing                |
| Matplotlib            | Training and evaluation plots   |
| Scikit-learn          | Model evaluation metrics        |
| HTML, CSS, JavaScript | Web interface, where applicable |
| KaggleHub             | Dataset downloading             |

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/VENKATDHARSHINI24/tomato_leaf_disease.git
```

### 2. Navigate to the Project Directory

```bash
cd tomato_leaf_disease
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 4. Install Dependencies

If a `requirements.txt` file is included:

```bash
pip install -r requirements.txt
```

Otherwise, install the required packages used by your application:

```bash
pip install tensorflow numpy opencv-python matplotlib scikit-learn kagglehub
```

### 5. Download the Dataset

```python
import kagglehub

path = kagglehub.dataset_download("noulam/tomato")
print(path)
```

### 6. Run the Application

Run the application's actual entry-point script, as configured in the repository. For example, if the application entry point is `app.py`:

```bash
python app.py
```

## 📁 Project Structure

```text
tomato_leaf_disease/
│
├── app.py
├── train.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── models/
│   └── trained_model.h5
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── templates/
│   └── index.html
│
├── notebooks/
│   └── model_training.ipynb
│
└── results/
    ├── accuracy_curve.png
    ├── loss_curve.png
    ├── roc_curve.png
    └── confusion_matrix.png
```

*This is an illustrative structure. Adjust the filenames and directories to match the actual files in your repository.*

## 📈 Evaluation

The model was evaluated using a separate test set of 4,585 images. The project report includes:

* Training and validation accuracy curves
* Training and validation loss curves
* Multi-class ROC-AUC curves
* 10-class test confusion matrix
* Test accuracy and prediction probabilities

The confusion matrix illustrates the number of correctly classified and misclassified samples for each disease class.

## 🚀 Future Enhancements

* Improve robustness under different lighting conditions and complex backgrounds.
* Develop mobile-friendly disease detection.
* Add multilingual support for farmers.
* Integrate treatment recommendations and preventive measures.
* Extend the system to support additional crop diseases.
* Deploy the application as a cloud-based service.
