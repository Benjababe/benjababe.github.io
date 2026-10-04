#!/usr/bin/env sh

PORT=5173
PID_FILE="/tmp/vite-lhci.pid"

# Start Vite dev server in background
pnpm dev --host --port $PORT &
DEV_PID=$!
echo $DEV_PID > "$PID_FILE"

cleanup() {
  kill $DEV_PID 2>/dev/null
  rm -f "$PID_FILE"
}
trap cleanup EXIT

# Wait for server to be ready
echo "Waiting for dev server on port $PORT..."
for i in $(seq 1 30); do
  if curl -s "http://localhost:$PORT" > /dev/null; then
    echo "Server is ready"
    break
  fi
  sleep 1
done

# Run Lighthouse CI
echo "Running Lighthouse CI..."
npx lhci autorun
