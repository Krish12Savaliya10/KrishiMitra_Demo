#!/bin/bash
echo "========================================="
echo " Starting KrishiMitra... "
echo "========================================="

# Kill any existing processes on ports 3000, 5001
echo "Cleaning up old processes..."
kill -9 $(lsof -ti :3000,5001) 2>/dev/null
sleep 2

# Start Backend
echo "Starting Django Backend on port 5001..."
cd backend
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
source venv/bin/activate
python manage.py runserver 0.0.0.0:5001 --noreload &
cd ..

# Start Frontend
echo "Starting Vite Frontend..."
cd frontend
npm run dev &
cd ..

echo "========================================="
echo " KrishiMitra is running!"
echo " Frontend: http://localhost:3000"
echo " Backend API: http://localhost:5001"
echo "========================================="
wait
