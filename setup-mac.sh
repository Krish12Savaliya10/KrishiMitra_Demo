#!/bin/bash
echo "========================================="
echo " Setting up KrishiMitra dependencies... "
echo "========================================="

echo ""
echo "[1/3] Installing Backend packages..."
cd backend
npm install
cd ..

echo ""
echo "[2/3] Installing Frontend packages..."
cd frontend
npm install
cd ..

echo ""
echo "[3/3] Installing ML Service packages..."
cd ml-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Install any missing specific libraries observed in app.py if not in requirements.txt
pip install chromadb flask flask-cors pandas numpy pillow opencv-python ultralytics joblib python-dotenv requests
cd ..

echo ""
echo "========================================="
echo " Setup complete! "
echo " You can now run ./start-mac.sh to start."
echo "========================================="
