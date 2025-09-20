# Clave Cosmica API

Una API de Node.js para gestionar información de pagos con encriptación de datos sensibles usando Express, Mongoose y criptografía AES-256-CBC.

## Características

- Guardar información de pagos con encriptación de campos sensibles
- Arquitectura MVC
- Integración con MongoDB usando Mongoose
- CORS habilitado
- Validación de entrada
- Manejo de errores
- Endpoints RESTful para gestión de pagos

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (opcional):

3. Iniciar el servidor:
```bash
npm start
```

El servidor se iniciará en el puerto 4000 por defecto. O en el que indiques en las variables de entorno.

## Endpoints de la API

### POST /api/payments

Guardar un nuevo pago. Los campos `transaction_id` y `accessCode` se encriptan automáticamente antes de guardarse en la base de datos.

**Cuerpo de la petición:**
```json
{
  "transaction_id": "TXN123456789",
  "email": "usuario@ejemplo.com",
  "accessCode": "ACC789012345",
  "amount": 100.50,
  "currency": "USD",
  "status": "pending"
}
```

**Campos requeridos:**
- `transaction_id` (string): ID único de la transacción
- `email` (string): Email del usuario
- `accessCode` (string): Código de acceso
- `amount` (number): Monto del pago

**Campos opcionales:**
- `currency` (string): Moneda (por defecto: "USD")
- `status` (string): Estado del pago (por defecto: "pending")

**Respuesta (Éxito - 201):**
```json
{
  "success": true,
  "message": "Payment saved successfully",
  "data": {
    "_id": "650f1234567890abcdef1234",
    "transaction_id": "TXN123456789",
    "email": "usuario@ejemplo.com",
    "accessCode": "ACC789012345",
    "amount": 100.5,
    "currency": "USD",
    "status": "pending",
    "createdAt": "2023-09-19T10:30:00.000Z",
    "updatedAt": "2023-09-19T10:30:00.000Z"
  }
}
```

**Respuesta (Error - 400):**
```json
{
  "success": false,
  "message": "transaction_id, email, accessCode, and amount are required fields"
}
```

### GET /api/payments

Obtener todos los pagos guardados. Los campos encriptados se desencriptan automáticamente en la respuesta.

**Respuesta (Éxito - 200):**
```json
{
  "success": true,
  "message": "Payments retrieved successfully",
  "count": 2,
  "data": [
    {
      "_id": "650f1234567890abcdef1234",
      "transaction_id": "TXN123456789",
      "email": "usuario@ejemplo.com",
      "accessCode": "ACC789012345",
      "amount": 100.5,
      "currency": "USD",
      "status": "pending",
      "createdAt": "2023-09-19T10:30:00.000Z",
      "updatedAt": "2023-09-19T10:30:00.000Z"
    }
  ]
}
```

### GET /health

Endpoint de verificación de salud del servidor.

**Respuesta:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2023-09-19T10:30:00.000Z"
}
```


## Estructura del Proyecto

```
├── src/
│   ├── app.js                    # Archivo principal de la aplicación
│   ├── config/
│   │   └── database.js           # Conexión a MongoDB
│   ├── controllers/
│   │   └── paymentController.js  # Lógica de negocio de pagos
│   ├── models/
│   │   └── Payment.js            # Esquema Mongoose de Payment
│   ├── routes/
│   │   └── paymentRoutes.js      # Rutas de pagos
│   └── utils/
│       └── crypto.js             # Utilidades de encriptación
├── package.json                  # Dependencias y scripts
├── .gitignore                   # Archivos ignorados por Git
└── README.md                    # Documentación del proyecto
```

## Pruebas de la API

### Usando curl

**Crear un pago:**
```bash
curl -X POST http://localhost:4000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_id": "TXN123456789",
    "email": "test@ejemplo.com",
    "accessCode": "ACC789012345",
    "amount": 100.50,
    "currency": "USD",
    "status": "pending"
  }'
```

**Obtener todos los pagos:**
```bash
curl -X GET http://localhost:4000/api/payments
```

**Verificar salud del servidor:**
```bash
curl -X GET http://localhost:4000/health
```

### Usando Postman

1. **POST** `http://localhost:4000/api/payments`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON): Ver ejemplo de curl arriba

2. **GET** `http://localhost:4000/api/payments`
   - Sin headers adicionales

3. **GET** `http://localhost:4000/health`
   - Sin headers adicionales

## Estados de Pago

Los pagos pueden tener los siguientes estados:
- `pending`: Pendiente (por defecto)
- `completed`: Completado
- `failed`: Fallido
- `cancelled`: Cancelado

## Códigos de Error

- **400**: Error de validación (campos requeridos faltantes)
- **500**: Error interno del servidor
- **201**: Pago creado exitosamente
- **200**: Consulta exitosa
