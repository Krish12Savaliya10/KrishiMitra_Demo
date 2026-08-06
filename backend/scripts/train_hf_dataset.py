import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
import json
import tensorflow as tf
from tensorflow.keras import layers, models, applications
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from datasets import load_dataset
import numpy as np
from PIL import Image

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 15  # Restored to 15 for full training
MODEL_SAVE_PATH = "crop_model_v2.keras"
CLASSES_SAVE_PATH = "../knowledge-base/data/class_names.json"
DATASET_DIR = "dataset_hf"

def main():
    print("==========================================")
    print("🌾 Downloading Hugging Face Dataset & Fixing macOS Locks...")
    print("==========================================")
    
    # Load dataset
    ds = load_dataset('nateraw/plant-village')
    
    # Get class names
    class_names = ds['train'].features['label'].names
    num_classes = len(class_names)
    print(f"✅ Found {num_classes} classes.")
    
    # Save classes
    with open(CLASSES_SAVE_PATH, "w") as f:
        json.dump(class_names, f)

    print("\n📦 Extracting images to local disk to prevent macOS threading crashes...")
    if not os.path.exists(DATASET_DIR):
        os.makedirs(DATASET_DIR)
        
        # Create class subdirectories
        for c in class_names:
            os.makedirs(os.path.join(DATASET_DIR, c), exist_ok=True)
            
        # Save images to disk
        for idx, sample in enumerate(ds['train']):
            label_name = class_names[sample['label']]
            img = sample['image'].convert('RGB')
            img_path = os.path.join(DATASET_DIR, label_name, f"{idx}.jpg")
            img.save(img_path)
            
            if idx % 5000 == 0 and idx > 0:
                print(f"   ... extracted {idx} images")
        print("✅ Finished extracting images to disk.")
    else:
        print("✅ Dataset already extracted to disk.")

    print("\n📦 Preparing data pipeline...")
    # Use native C++ TF data loaders (bypasses Python GIL locks)
    train_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="training",
        seed=42,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="validation",
        seed=42,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    # Optimize pipeline
    train_ds = train_ds.cache().prefetch(buffer_size=tf.data.AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=tf.data.AUTOTUNE)

    print("\n🌱 Building Data Augmentation...")
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.2),
    ])

    print("\n🧠 Building MobileNetV2 Model...")
    base_model = applications.MobileNetV2(
        input_shape=IMG_SIZE + (3,),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False

    inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
    x = data_augmentation(inputs)
    # Rescale [0, 255] to [-1, 1]
    x = layers.Rescaling(1./127.5, offset=-1)(x)
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

    callbacks = [
        EarlyStopping(patience=3, restore_best_weights=True, monitor='val_accuracy'),
        ModelCheckpoint(MODEL_SAVE_PATH, save_best_only=True, monitor='val_accuracy')
    ]

    print("\n🚀 Starting Training...")
    model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS,
        callbacks=callbacks
    )

    print(f"\n🎉 Training Complete! Model saved to {MODEL_SAVE_PATH}")
    
    # Overwrite the old model
    os.rename(MODEL_SAVE_PATH, "../crop_model.keras")
    print("✅ Successfully replaced the old crop_model.keras!")

if __name__ == "__main__":
    main()
