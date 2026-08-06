import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
import json
import tensorflow as tf
from tensorflow.keras import layers, applications
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import tensorflow_datasets as tfds

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 1
MODEL_SAVE_PATH = "crop_model_v2.keras"
CLASSES_SAVE_PATH = "../knowledge-base/data/class_names.json"

def main():
    print("==================================================")
    print("🌾 Starting Professional Disease Model Training...")
    print("==================================================")
    
    # 1. Load dataset (Downloads 827MB if not already cached)
    print("\n📦 Downloading PlantVillage dataset (827MB) - This may take a while...")
    ds, info = tfds.load('plant_village', split=['train[:80%]', 'train[80%:]'], with_info=True, as_supervised=True)
    train_ds_raw, val_ds_raw = ds
    
    # Get class names
    class_names = info.features['label'].names
    num_classes = len(class_names)
    print(f"✅ Found {num_classes} classes.")
    
    with open(CLASSES_SAVE_PATH, "w") as f:
        json.dump(class_names, f)

    # 2. Preprocess
    def preprocess(image, label):
        image = tf.image.resize(image, IMG_SIZE)
        image = tf.cast(image, tf.float32)
        return image, label

    train_ds = train_ds_raw.map(preprocess, num_parallel_calls=tf.data.AUTOTUNE).cache().shuffle(1000).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
    val_ds = val_ds_raw.map(preprocess, num_parallel_calls=tf.data.AUTOTUNE).cache().batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)

    # 3. Augmentation
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.2),
    ])

    # 4. Model
    print("\n🧠 Building MobileNetV2 Model...")
    base_model = applications.MobileNetV2(input_shape=IMG_SIZE + (3,), include_top=False, weights='imagenet')
    base_model.trainable = False

    inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
    x = data_augmentation(inputs)
    x = layers.Rescaling(1./127.5, offset=-1)(x)
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.3)(x)
    outputs = layers.Dense(num_classes, activation='softmax')(x)

    model = tf.keras.Model(inputs, outputs)
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), loss=tf.keras.losses.SparseCategoricalCrossentropy(), metrics=['accuracy'])

    # 5. Train
    callbacks = [
        EarlyStopping(patience=3, restore_best_weights=True, monitor='val_accuracy'),
        ModelCheckpoint(MODEL_SAVE_PATH, save_best_only=True, monitor='val_accuracy')
    ]

    print("\n🚀 Starting Training Loop...")
    model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS, callbacks=callbacks)

    print(f"\n🎉 Training Complete! Replacing old model...")
    os.rename(MODEL_SAVE_PATH, "../crop_model.keras")
    print("✅ Successfully updated to professional model!")

if __name__ == "__main__":
    main()
