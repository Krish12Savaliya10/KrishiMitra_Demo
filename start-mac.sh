#!/bin/bash
echo "========================================="
echo " Starting KrishiMitra Services "
echo "========================================="

# Trap CTRL+C to stop all background processes
trap "echo '\nStopping all services...'; kill 0" EXIT

echo ""
echo "[1/3] Starting Backend API server on port 5001..."
cd backend
node server.js &
cd ..
sleep 2

echo ""
echo "[2/3] Starting ML Service on port 5005..."
cd ml-service
if [ -d "venv" ]; then
    source venv/bin/activate
fi
python3 manage.py runserver 0.0.0.0:5005 --noreload &
cd ..
sleep 2

echo ""
echo "[3/3] Starting Frontend on port 3000..."
cd frontend
npm run dev -- --port 3000 &
cd ..

echo ""
echo "====================================================="
echo " KrishiMitra is running!"
echo " Frontend:  http://localhost:3000"
echo " Backend:   http://localhost:5001"
echo " ML:        http://localhost:5005"
echo " "
echo " Press Ctrl+C in this terminal to stop all services."
echo "====================================================="

# Wait for background processes to keep terminal open
wait
