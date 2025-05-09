# -*- coding: utf-8 -*-
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.svm import SVC
from sklearn.metrics import classification_report, roc_auc_score
import pickle

# Load the dataset
cyber_data = pd.read_csv('cyberfeddefender_dataset.csv')

cyber_data.head()

cyber_data.columns = cyber_data.columns.str.lower().str.replace(' ', '_')

cyber_data.head()

insignificant_columns = ['timestamp','source_ip','destination_ip','flow_bytes/s']
cyber_data.copy = cyber_data.copy()
cyber_data.drop(insignificant_columns, axis=1, inplace=True)

#label encoding of data
encode_cols = ['protocol','flags','attack_type']
label_encoder = LabelEncoder()
# Fit and transform the categorical labels
for col in encode_cols:
    cyber_data[col] = label_encoder.fit_transform(cyber_data[col])

cyber_data.head()

# Standardization of continuous features
continuous_features = [
    'packet_length', 'source_port','destination_port', 'bytes_sent', 'bytes_received',
    'flow_packets/s', 'avg_packet_size', 'total_fwd_packets','total_bwd_packets',
    'fwd_header_length','bwd_header_length','sub_flow_fwd_bytes','sub_flow_bwd_bytes'
]


scaler = StandardScaler()
cyber_data[continuous_features] = scaler.fit_transform(cyber_data[continuous_features])

print(cyber_data.head())

cols_to_drop = ["inbound", "protocol", "bwd_header_length", "fwd_header_length", "flags", "avg_packet_size"]
cyber_data = cyber_data.drop(columns=cols_to_drop)

cyber_data.head()

X = cyber_data.drop(columns=['label'])
y = cyber_data['label']

"""# Split the data into training and testing sets"""

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)

"""Train the SVC model (Found the best in EDA and Model Selection process)"""

# Train model
svc = SVC(kernel='poly', C = 10, degree = 3, gamma = 'auto', probability=True, class_weight='balanced',random_state=42)
svc.fit(X_resampled, y_resampled)

"""Evaluate the model"""

y_pred = svc.predict(X_test)
y_prob = svc.predict_proba(X_test)[:, 1]
print("Classification Report:\n", classification_report(y_test, y_pred))
print("AUC-ROC:", roc_auc_score(y_test, y_prob))

"""# Save the model and scaler"""

with open('model.pkl', 'wb') as model_file:
    pickle.dump(svc, model_file)

print("Model and scaler saved successfully!")