# Stage 1: Build Next.js static export
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Stage 2: FastAPI backend serving static frontend
FROM python:3.12-slim
WORKDIR /app/backend

RUN pip install --no-cache-dir uv

COPY backend/pyproject.toml ./
RUN uv sync --no-install-project

COPY backend/ ./
COPY --from=frontend-builder /app/frontend/out ./static

ENV STATIC_DIR=/app/backend/static
ENV DB_PATH=/data/prelegal.db

VOLUME /data

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
