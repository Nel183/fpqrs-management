// ===================================
// GESTIÓN PRINCIPAL DE APLICACIÓN
// ===================================

// Mock data
let mockCases = [
    {
        id: 1,
        number: 'FPQRS-2026-001',
        type: 'Queja',
        status: 'En Proceso',
        priority: 'Alta',
        subject: 'Atención deficiente en el servicio',
        description: 'El personal fue muy desatento durante mi visita el día 15 de junio.',
        user: 'Juan Pérez',
        email: 'demo@example.com',
        createdAt: '2026-06-10',
        dueDate: '2026-06-25',
        attachments: [],
        comments: [
            {
                id: 1,
                author: 'Administrador',
                date: '2026-06-12',
                text: 'Se ha iniciado investigación sobre el incidente reportado.'
            }
        ],
        history: [
            { date: '2026-06-10', status: 'Radicada', note: 'Caso creado y asignado' },
            { date: '2026-06-12', status: 'En Proceso', note: 'Se inició investigación' }
        ]
    },
    {
        id: 2,
        number: 'FPQRS-2026-002',
        type: 'Petición',
        status: 'Resuelto',
        priority: 'Media',
        subject: 'Solicitud de información sobre servicios',
        description: 'Requiero conocer más detalles sobre los servicios disponibles.',
        user: 'Juan Pérez',
        email: 'demo@example.com',
        createdAt: '2026-06-05',
        dueDate: '2026-06-15',
        completedAt: '2026-06-14',
        attachments: [],
        comments: [
            {
                id: 1,
                author: 'Administrador',
                date: '2026-06-06',
                text: 'Se envió información completa del catálogo de servicios.'
            }
        ],
        history: [
            { date: '2026-06-05', status: 'Radicada', note: 'Petición creada' },
            { date: '2026-06-06', status: 'En Proceso', note: 'Se envió información' },
            { date: '2026-06-14', status: 'Resuelto', note: 'Petición completada' }
        ]
    },
    {
        id: 3,
        number: 'FPQRS-2026-003',
        type: 'Felicitación',
        status: 'Resuelto',
        priority: 'Baja',
        subject: 'Excelente atención del personal',
        description: 'Quiero expresar mi felicitación al equipo de atención al cliente por su excelente servicio.',
        user: 'Juan Pérez',
        email: 'demo@example.com',
        createdAt: '2026-06-08',
        dueDate: '2026-06-20',
        completedAt: '2026-06-12',
        attachments: [],
        comments: [],
        history: [
            { date: '2026-06-08', status: 'Radicada', note: 'Felicitación creada' },
            { date: '2026-06-12', status: 'Resuelto', note: 'Felicitación procesada' }
        ]
    },
    {
        id: 4,
        number: 'FPQRS-2026-004',
        type: 'Reclamo',
        status: 'Pendiente',
        priority: 'Alta',
        subject: 'Producto defectuoso recibido',
        description: 'El producto llegó con defectos de fábrica y requiere reemplazo inmediato.',
        user: 'Juan Pérez',
        email: 'demo@example.com',
        createdAt: '2026-06-15',
        dueDate: '2026-06-22',
        attachments: [{ id: 1, name: 'foto_defecto.jpg', size: '2.5 MB' }],
        comments: [],
        history: [
            { date: '2026-06-15', status: 'Pendiente', note: 'Reclamo radicado' }
        ]
    },
    {
        id: 5,
        number: 'FPQRS-2026-005',
        type: 'Sugerencia',
        status: 'En Proceso',
        priority: 'Media',
        subject: 'Mejora en el sistema de atención',
        description: 'Sugiero implementar un sistema de citas en línea para mejorar la experiencia del cliente.',
        user: 'Juan Pérez',
        email: 'demo@example.com',
        createdAt: '2026-06-12',
        dueDate: '2026-06-30',
        attachments: [],
        comments: [
            {
                id: 1,
                author: 'Administrador',
                date: '2026-06-13',
                text: 'Sugerencia evaluada por el equipo de mejora continua.'
            }
        ],
        history: [
            { date: '2026-06-12', status: 'Radicada', note: 'Sugerencia creada' },
            { date: '2026-06-13', status: 'En Proceso', note: 'En evaluación' }
        ]
    }
];

let currentPage = 'auth';
let currentCaseId = null;

// ===================================
// PAGE NAVIGATION
// ===================================

function navigateToPage(page) {
    if (!authManager.isAuthenticated() && page !== 'auth') {
        navigateToPage('auth');
        return;
    }

    // Hide all pages
    document.getElementById('authPage').classList.add('d-none');
    document.getElementById('caseManagementPage').classList.add('d-none');
    document.getElementById('caseDetailPage').classList.add('d-none');
    document.getElementById('registrationPage').classList.add('d-none');
    document.getElementById('navbar').classList.add('d-none');

    // Show selected page
    switch(page) {
        case 'auth':
            document.getElementById('authPage').classList.remove('d-none');
            currentPage = 'auth';
            break;
        case 'inbox':
            document.getElementById('caseManagementPage').classList.remove('d-none');
            document.getElementById('navbar').classList.remove('d-none');
            document.getElementById('userName').textContent = authManager.getCurrentUser().name;
            loadCases();
            currentPage = 'inbox';
            break;
        case 'detail':
            document.getElementById('caseDetailPage').classList.remove('d-none');
            document.getElementById('navbar').classList.remove('d-none');
            document.getElementById('userName').textContent = authManager.getCurrentUser().name;
            loadCaseDetail();
            currentPage = 'detail';
            break;
        case 'register':
            document.getElementById('registrationPage').classList.remove('d-none');
            document.getElementById('navbar').classList.remove('d-none');
            document.getElementById('userName').textContent = authManager.getCurrentUser().name;
            loadRegistrationForm();
            currentPage = 'register';
            break;
    }
}

// ===================================
// NAVBAR NAVIGATION
// ===================================

document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        navigateToPage(page);
    });
});

// ===================================
// INIT
// ===================================

window.addEventListener('load', function() {
    if (authManager.isAuthenticated()) {
        navigateToPage('inbox');
    } else {
        navigateToPage('auth');
    }
});
