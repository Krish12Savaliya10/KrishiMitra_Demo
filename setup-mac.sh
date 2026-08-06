#!/bin/bash
echo "========================================="
echo " Setting up KrishiMitra dependencies... "
echo "========================================="

echo ""
echo "[1/2] Installing Frontend packages..."
cd frontend
npm install
cd ..

echo ""
echo "[2/2] Installing Backend (Django) packages..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install chromadb flask flask-cors pandas numpy pillow opencv-python ultralytics joblib python-dotenv requests djangorestframework-simplejwt django-apscheduler
python manage.py migrate
cd ..

echo ""
echo "========================================="
echo " Setup complete! "
echo " You can now run ./start-mac.sh to start."
echo "========================================="
