
# Consumer Lending Application

## Stack
- ReactJS
- Spring Boot
- Kafka
- Cassandra
- Grafana + Prometheus
- Docker Compose
- OKD manifests

## Run Instructions

### 1. Install
- Docker Desktop
- Java 17
- Maven
- NodeJS

### 2. Start Entire Platform
```bash
docker compose up --build
```

### 3. Access
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Grafana: http://localhost:3001
- Prometheus metrics: http://localhost:8080/actuator/prometheus

## Kafka Flow
1. Loan calculate request pushes event to Kafka
2. Kafka consumer stores event in Cassandra

## Bruno Collection
Import `collection.json`

## OKD
Apply manifests:
```bash
oc apply -f okd/
```
