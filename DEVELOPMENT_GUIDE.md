# FPQRS Management System - Guía de Desarrollo

## 📋 Descripción del Proyecto

Sistema de gestión de Felicitaciones, Peticiones, Quejas, Reclamos y Sugerencias (FPQRS) con interfaz responsive desarrollada con HTML5, CSS3, Bootstrap, JavaScript y jQuery.

## 🎯 Vistas Implementadas

### 1. **Inicio de Sesión / Registro**
- **Ruta**: `index.html` (tab-based)
- **Funcionalidades**:
  - Formulario de login con email y contraseña
  - Formulario de registro con validación
  - Toggle entre vistas de login y registro
  - Mostrar/ocultar contraseña
  - Validación en cliente
  - Autenticación simulada con localStorage

### 2. **Bandeja de Casos**
- **Ruta**: Accesible después de autenticarse
- **Funcionalidades**:
  - Listado de casos FPQRS
  - Filtros por tipo, estado y prioridad
  - Tabla responsive con acciones
  - Paginación de resultados
  - Botón para crear nuevo FPQRS
  - Estados visuales diferenciados

### 3. **Detalle Completo del Caso**
- **Ruta**: Accesible desde la bandeja
- **Funcionalidades**:
  - Vista completa del caso con toda la información
  - Sección de descripción
  - Archivos adjuntos
  - Historial de cambios en timeline
  - Sistema de comentarios
  - Información del solicitante (sidebar)
  - Estado y prioridad
  - Acciones rápidas

### 4. **Formulario de Radicación FPQRS**
- **Ruta**: Accesible desde el menú
- **Funcionalidades**:
  - 4 secciones de formulario
  - Información del solicitante (pre-llenada)
  - Tipo y detalles del FPQRS
  - Carga de archivos con drag & drop
  - Validación de checkboxes de confirmación
  - Generación automática de número de caso
  - Simulación de envío exitoso

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados y variables CSS
- **Bootstrap 5**: Framework responsive
- **JavaScript Vanilla**: Lógica de aplicación
- **jQuery**: Manejo avanzado del DOM (opcional pero disponible)
- **Font Awesome**: Iconografía

## 📁 Estructura del Proyecto

```
fpqrs-management/
├── index.html                 # Punto de entrada - Auth y SPA
├── README.md                  # Este archivo
├── .gitignore
├── css/
│   ├── styles.css            # Estilos globales y variables
│   ├── auth.css              # Estilos de autenticación
│   ├── case-management.css   # Estilos de bandeja de casos
│   ├── case-detail.css       # Estilos de detalle del caso
│   └── registration.css      # Estilos del formulario FPQRS
├── js/
│   ├── main.js               # Controlador principal y navegación
│   ├── auth.js               # Lógica de autenticación
│   ├── case-manager.js       # Gestión de casos y filtros
│   └── form-handler.js       # Manejo del formulario FPQRS
├── pages/                     # Vistas estáticas (referencia)
│   ├── login.html
│   ├── register.html
│   ├── case-inbox.html
│   ├── case-detail.html
│   └── registration-form.html
└── data/
    └── mock-data.json        # Datos de prueba
```

## 🚀 Cómo Usar

### 1. Abrir la Aplicación
```bash
# Simplemente abre index.html en tu navegador
# No requiere servidor web
```

### 2. Credenciales de Prueba

**Usuario de Prueba:**
- Email: `demo@example.com`
- Contraseña: `demo123`

**Usuario Alternativo:**
- Email: `test@example.com`
- Contraseña: `test123`

### 3. Flujo de la Aplicación

1. **Acceso**: Inicia con la pantalla de login/registro
2. **Autenticación**: Ingresa credenciales de prueba
3. **Bandeja**: Visualiza lista de casos
4. **Filtrado**: Filtra por tipo, estado o prioridad
5. **Detalle**: Haz clic en un caso para ver detalles
6. **Comentarios**: Agrega comentarios a los casos
7. **Nuevo Caso**: Radica nuevos FPQRS desde el menú
8. **Logout**: Cierra sesión desde el menú de usuario

## ✨ Características Implementadas

### Autenticación
- ✅ Login con validación
- ✅ Registro de nuevos usuarios
- ✅ Persistencia de sesión (localStorage)
- ✅ Logout

### Gestión de Casos
- ✅ Listado paginado
- ✅ Filtros avanzados
- ✅ Vista de detalle completo
- ✅ Historial de cambios
- ✅ Sistema de comentarios
- ✅ Archivos adjuntos
- ✅ Edición y eliminación (simulada)

### Formulario FPQRS
- ✅ Validación de campos
- ✅ Carga de archivos
- ✅ Drag & drop
- ✅ Auto-numeración de casos
- ✅ Confirmación de envío
- ✅ Datos pre-llenados

### Diseño
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Accesibilidad básica (ARIA labels)
- ✅ Paleta de colores consistente
- ✅ Espaciado y tipografía profesional
- ✅ Animaciones suaves
- ✅ Feedback visual (alertas, badges)

## 🎨 Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| Primario | #0066CC | Botones, links |
| Éxito | #28A745 | Estados positivos |
| Advertencia | #FFC107 | Estados en progreso |
| Peligro | #DC3545 | Eliminación, errores |
| Información | #17A2B8 | Información general |
| Gris | #6C757D | Texto secundario |

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 576px
- **Tablet**: 576px - 992px
- **Desktop**: > 992px

### Adaptaciones
- Menú responsivo en mobile
- Tablas con scroll horizontal en mobile
- Formularios adaptados para touch
- Botones ampliados en mobile

## ♿ Accesibilidad

- ✅ Atributos ARIA implementados
- ✅ Labels asociados a inputs
- ✅ Contraste de colores adecuado
- ✅ Navegación por teclado
- ✅ Estructura semántica HTML5
- ✅ Mensajes de error descriptivos

## 📊 Datos Mock

La aplicación incluye 5 casos de prueba:

1. **FPQRS-2026-001**: Queja (En Proceso, Alta)
2. **FPQRS-2026-002**: Petición (Resuelto, Media)
3. **FPQRS-2026-003**: Felicitación (Resuelto, Baja)
4. **FPQRS-2026-004**: Reclamo (Pendiente, Alta)
5. **FPQRS-2026-005**: Sugerencia (En Proceso, Media)

## 🔄 Flujos de Simulación

### Simulación de Login
```javascript
authManager.login(email, password)
// Verifica contra datos mock
// Guarda en localStorage
// Redirige a bandeja
```

### Simulación de Nuevo Caso
```javascript
// Radica nuevo FPQRS
// Genera número automático
// Lo agrega a la lista
// Muestra confirmación
```

### Simulación de Comentarios
```javascript
// Agrega comentario al caso
// Actualiza timestamp
// Recarga lista de comentarios
```

## 🐛 Testing Manual

### 1. Prueba de Autenticación
- [ ] Intenta login con email inválido
- [ ] Intenta login con contraseña incorrecta
- [ ] Login exitoso redirige a bandeja
- [ ] Logout borra sesión

### 2. Prueba de Filtrado
- [ ] Filtra por tipo de FPQRS
- [ ] Filtra por estado
- [ ] Filtra por prioridad
- [ ] Combinación de filtros funciona
- [ ] Reiniciar filtros limpia los campos

### 3. Prueba de Formulario
- [ ] Validación de campos requeridos
- [ ] Validación de email
- [ ] Carga de archivos funciona
- [ ] Drag & drop de archivos funciona
- [ ] Eliminación de archivos funciona
- [ ] Envío de formulario genera nuevo caso

### 4. Prueba Responsive
- [ ] Mobile (320px): Todo funciona
- [ ] Tablet (768px): Layout correcto
- [ ] Desktop (1200px): Optimizado

## 📝 Notas Importantes

- No usa frameworks JavaScript pesados (React, Angular, Vue)
- No usa plantillas comerciales pre-construidas
- Todo el código es desarrollado desde cero
- Los datos se almacenan localmente (no hay servidor)
- La navegación es SPA (Single Page Application)
- Compatible con navegadores modernos

## 🚀 Mejoras Futuras

- Integración con API real
- Base de datos en backend
- Autenticación OAuth
- Notificaciones en tiempo real
- Export de reportes
- Búsqueda avanzada
- Historial de cambios detallado

## 📄 Licencia

MIT

## 👤 Autor

Desarrollado por Nel183

---

**Última actualización**: 18 de Junio de 2026
