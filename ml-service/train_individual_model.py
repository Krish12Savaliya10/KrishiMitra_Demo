import os
import json
import argparse
import tensorflow as tf
from tensorflow.keras import layers, applications
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

IMG_SIZE = (160, 160) # Matched to app.py's expected EfficientNetB0 dimensions
BATCH_SIZE = 32
EPOCHS = 20

def main():
    parser = argparse.ArgumentParser(description="Train a crop-specific disease model")
    parser.add_argument("--crop", type=str, required=True, help="Name of the crop (e.g., Rice, Cotton)")
    args = parser.parse_args()
    
    crop_name = args.crop
    dataset_dir = f"dataset/{crop_name}"
    
    print("==========================================")
    print(f"🌾 Training Specialized Model for: {crop_name}")
    print("==========================================")
    
    if not os.path.exists(dataset_dir):
        print(f"❌ Error: Dataset directory '{dataset_dir}' not found.")
        print(f"Please create it and place your {crop_name} disease folders inside.")
        print("Example:")
        print(f"dataset/{crop_name}/")
        print(f"  ├── {crop_name}_Healthy/")
        print(f"  └── {crop_name}_Blight/")
        return

    # 1. Load Dataset
    print("\n📦 Loading Dataset...")
    train_ds = tf.keras.utils.image_dataset_from_directory(
        dataset_dir,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        dataset_dir,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    class_names = train_ds.class_names
    num_classes = len(class_names)
    print(f"\n✅ Found {num_classes} classes for {crop_name}.")
    
    # Ensure models directory exists
    os.makedirs("../models", exist_ok=True)
    
    # Save classes for this specific crop
    classes_save_path = f"../models/{crop_name}_classes.json"
    with open(classes_save_path, "w") as f:
        json.dump(class_names, f)
    print(f"✅ Saved class names to {classes_save_path}")

    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

    # 2. Data Augmentation
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.2),
        layers.RandomBrightness(0.2),
    ])

    # 3. Build Model (EfficientNetB0 to match master architecture)
    print("\n🧠 Building EfficientNetB0 Micro-Model...")
    
    base_model = applications.EfficientNetB0(
        input_shape=IMG_SIZE + (3,),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False

    inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
    x = data_augmentation(inputs)
    # EfficientNetB0 natively expects [0, 255] pixels, so no rescaling needed here!
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
    
    # 4. Callbacks
    model_save_path = f"../models/{crop_name}_model.keras"
    callbacks = [
        EarlyStopping(patience=5, restore_best_weights=True, monitor='val_accuracy'),
        ModelCheckpoint(model_save_path, save_best_only=True, monitor='val_accuracy')
    ]

    # 5. Train
    print("\n🚀 Starting Training...")
    model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS,
        callbacks=callbacks
    )

    print(f"\n🎉 Training Complete! Best model saved to {model_save_path}")
    print(f"The KrishiMitra API will now automatically use this model when a user scans {crop_name}!")

if __name__ == "__main__":
    main()
