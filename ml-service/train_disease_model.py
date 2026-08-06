import os
import json
import tensorflow as tf
from tensorflow.keras import layers, models, applications
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
import matplotlib.pyplot as plt

# ==========================================
# CONFIGURATION
# ==========================================
DATASET_DIR = "dataset/" 
IMG_SIZE = (160, 160)    # EfficientNetB0 standard input
BATCH_SIZE = 32
EPOCHS = 20
MODEL_SAVE_PATH = "crop_model_v2.keras"
CLASSES_SAVE_PATH = "../knowledge-base/data/class_names.json"

def main():
    print("==========================================")
    print("🌾 KrishiMitra Disease Model Training 🌾")
    print("==========================================")
    
    if not os.path.exists(DATASET_DIR):
        print(f"❌ Error: Dataset directory '{DATASET_DIR}' not found.")
        print("Please create it and place your image folders inside.")
        print("Example structure:")
        print("dataset/")
        print("  ├── Apple___Apple_scab/")
        print("  ├── Apple___healthy/")
        print("  └── ...")
        return

    # 1. Load Dataset
    print("\n📦 Loading Dataset...")
    train_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    class_names = train_ds.class_names
    num_classes = len(class_names)
    print(f"\n✅ Found {num_classes} classes.")
    
    # Save classes to JSON so the Flask API knows the exact order
    with open(CLASSES_SAVE_PATH, "w") as f:
        json.dump(class_names, f)
    print(f"✅ Saved class names to {CLASSES_SAVE_PATH}")

    # Optimize dataset for performance
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

    # 2. Data Augmentation
    print("\n🌱 Applying Data Augmentation...")
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.2),
        layers.RandomBrightness(0.2),
    ])

    # 3. Build Model (Transfer Learning with EfficientNetB0)
    print("\n🧠 Building EfficientNetB0 Model (Transfer Learning)...")
    
    base_model = applications.EfficientNetB0(
        input_shape=IMG_SIZE + (3,),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False

    inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
    x = data_augmentation(inputs)
    # EfficientNetB0 handles its own preprocessing
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.3)(x)
    outputs = layers.Dense(num_classes, activation='softmax')(x)

    model = tf.keras.Model(inputs, outputs)
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss=tf.keras.losses.SparseCategoricalCrossentropy(),
        metrics=['accuracy']
    )
    
    model.summary()

    # 4. Callbacks
    callbacks = [
        EarlyStopping(patience=5, restore_best_weights=True, monitor='val_accuracy'),
        ModelCheckpoint(MODEL_SAVE_PATH, save_best_only=True, monitor='val_accuracy'),
        ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=3, min_lr=1e-6)
    ]

    # 5. Train the Model
    print("\n🚀 Starting Training...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS,
        callbacks=callbacks
    )

    print(f"\n🎉 Training Complete! Best model saved to {MODEL_SAVE_PATH}")
    
    # Overwrite the old model used by the API
    if os.path.exists("../crop_model.keras"):
        os.remove("../crop_model.keras")
    os.rename(MODEL_SAVE_PATH, "../crop_model.keras")
    print("✅ Successfully updated the KrishiMitra API with your new custom model!")

if __name__ == "__main__":
    main()
