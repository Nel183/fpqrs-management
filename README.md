# FPQRS Management System

Sistema de gestión de Peticiones, Quejas, Reclamos y Sugerencias (FPQRS) - Implementación HTML5, CSS3, Bootstrap y JavaScript/jQuery.

## Descripción
Aplicación web responsiva para la gestión de casos FPQRS con las siguientes vistas:

1. **Inicio de sesión / Registro** - Autenticación de usuarios
2. **Bandeja de casos** - Gestión e listado de casos
3. **Detalle del caso** - Visualización completa de casos
4. **Formulario de radicación FPQRS** - Creación de nuevos casos

## Características

- ✅ Diseño completamente responsivo
- ✅ HTML5 semántico
- ✅ Bootstrap 5 para componentes
- ✅ JavaScript/jQuery para interactividad
- ✅ Datos simulados en JSON
- ✅ Navegación entre vistas
- ✅ CRUD simulado (Create, Read, Update, Delete)
- ✅ Criterios básicos de accesibilidad web

## Estructura del Proyecto

```
fpqrs-management/
├── index.html                 # Inicio de sesión/Registro
├── cases.html                 # Bandeja de casos
├── case-detail.html           # Detalle del caso
├── fpqrs-form.html            # Formulario de radicación
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── jquery.min.js
│   │   ├── bootstrap.min.js
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── cases.js
│   │   └── data.js
│   └── img/
│       └── (imágenes)
├── data/
│   └── cases.json
└── README.md
```

## Tecnologías Utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript ES6+
- jQuery 3.x
- JSON para datos estáticos

## Instalación

1. Clonar el repositorio
2. Abrir `index.html` en el navegador
3. No requiere instalación de dependencias adicionales

## Uso

### Credenciales de prueba
- **Usuario:** usuario@example.com
- **Contraseña:** 123456

## Características Implementadas

### 1. Autenticación
- Formulario de login y registro
- Validación de formularios
- Sesión simulada con localStorage

### 2. Gestión de Casos
- Listado de casos con filtros
- Búsqueda de casos
- Visualización de detalles
- Creación de nuevos casos
- Edición de casos existentes
- Eliminación de casos

### 3. Formulario FPQRS
- Validación de campos
- Categorización de tipos (Petición, Queja, Reclamo, Sugerencia)
- Adjuntos simulados
- Radicación automática

## Responsividad

- Mobile-first approach
- Breakpoints: xs (< 576px), sm (≥ 576px), md (≥ 768px), lg (≥ 992px), xl (≥ 1200px)
- Diseño adaptable a cualquier dispositivo

## Accesibilidad

- HTML semántico
- Atributos ARIA
- Contraste de colores adecuado
- Navegación por teclado
- Etiquetas descriptivas

## Navegación

- Menú principal en todas las vistas
- Navegación fluida entre páginas
- Botones de acción contextuales

## Autor

Nel183

## Licencia

MIT
