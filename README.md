# 🌽 Corn Leaf Disease Prediction (TF.js)

Aplikasi web untuk mengklasifikasikan penyakit daun jagung **(Blight, Common Rust, Gray Leaf Spot, Healthy)**.  
Model **MobileNetV2** hasil fine-tuning di TensorFlow/Keras dikonversi ke **TensorFlow.js**, sehingga inferensi berjalan **100% di browser** (tanpa server/backend).

---

## ✨ Fitur
- ⚡ Prediksi instan (top-k probabilitas)
- 🧩 Struktur UI sederhana: **preview kiri**, **hasil kanan**

---

## 🧠 Model
- Arsitektur: **MobileNetV2**, `include_top=False` + head: `Flatten → Dropout(0.5) → Dense(128, relu) → Dense(4, softmax)`
- Input: **150×150×3 (RGB)**
- Training: **TensorFlow 2.20** + **Keras 3.x**
- Konversi: **SavedModel → TensorFlow.js (graph model)**
- Label: `label.txt` (adjust `train_generator.class_indices`)

