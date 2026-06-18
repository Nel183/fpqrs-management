// ===================================
// GESTIÓN DE FORMULARIO FPQRS
// ===================================

let uploadedFiles = [];

function loadRegistrationForm() {
    document.getElementById('fpqrsForm').reset();
    uploadedFiles = [];
    document.getElementById('fileList').innerHTML = '';
    document.getElementById('formSuccess').classList.remove('show');
    
    // Pre-fill user data
    const user = authManager.getCurrentUser();
    document.getElementById('fullName').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('document').value = user.document || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('address').value = user.address || '';
}

// ===================================
// MANEJO DE ARCHIVOS
// ===================================

const fileUpload = document.getElementById('fileInput');
const fileUploadLabel = document.querySelector('.file-upload-label');

// File input change event
fileUpload.addEventListener('change', function(e) {
    handleFiles(e.target.files);
});

// Drag and drop
fileUploadLabel.addEventListener('dragover', function(e) {
    e.preventDefault();
    fileUploadLabel.classList.add('dragover');
});

fileUploadLabel.addEventListener('dragleave', function() {
    fileUploadLabel.classList.remove('dragover');
});

fileUploadLabel.addEventListener('drop', function(e) {
    e.preventDefault();
    fileUploadLabel.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

function handleFiles(files) {
    const fileList = document.getElementById('fileList');
    
    for (let file of files) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            showErrorMessage(`El archivo ${file.name} excede el tamaño máximo permitido (5MB)`);
            continue;
        }
        
        // Check if file already uploaded
        if (uploadedFiles.find(f => f.name === file.name)) {
            showErrorMessage(`El archivo ${file.name} ya ha sido cargado`);
            continue;
        }
        
        uploadedFiles.push(file);
    }
    
    renderFileList();
}

function renderFileList() {
    const fileList = document.getElementById('fileList');
    
    if (uploadedFiles.length === 0) {
        fileList.innerHTML = '';
        return;
    }
    
    fileList.innerHTML = uploadedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-item-info">
                <span class="file-item-icon">
                    <i class="fas fa-file"></i>
                </span>
                <div class="file-item-details">
                    <div class="file-item-name">${file.name}</div>
                    <div class="file-item-size">${formatFileSize(file.size)}</div>
                </div>
            </div>
            <button type="button" class="file-item-remove" onclick="removeFile(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
    renderFileList();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ===================================
// VALIDACIÓN Y ENVÍO DEL FORMULARIO
// ===================================

document.getElementById('fpqrsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.form-group input.error, .form-group select.error, .form-group textarea.error').forEach(el => {
        el.classList.remove('error');
    });
    
    let hasErrors = false;
    
    // Validate required fields
    const requiredFields = [
        { id: 'fullName', label: 'Nombre Completo' },
        { id: 'document', label: 'Cédula' },
        { id: 'email', label: 'Correo Electrónico' },
        { id: 'phone', label: 'Teléfono' },
        { id: 'address', label: 'Dirección' },
        { id: 'fpqrsType', label: 'Tipo de FPQRS' },
        { id: 'priority', label: 'Prioridad' },
        { id: 'subject', label: 'Asunto' },
        { id: 'description', label: 'Descripción' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        const value = element.value.trim();
        
        if (!value) {
            element.classList.add('error');
            hasErrors = true;
        }
    });
    
    // Validate email format
    const email = document.getElementById('email').value.trim();
    if (email && !validateEmail(email)) {
        document.getElementById('email').classList.add('error');
        hasErrors = true;
    }
    
    // Validate phone format
    const phone = document.getElementById('phone').value.trim();
    if (phone && !/^[+\d\s\-()]+$/.test(phone)) {
        document.getElementById('phone').classList.add('error');
        hasErrors = true;
    }
    
    // Validate checkboxes
    if (!document.getElementById('agreeTerms').checked) {
        showErrorMessage('Debe aceptar que la información es verdadera y completa');
        hasErrors = true;
    }
    
    if (!document.getElementById('agreePrivacy').checked) {
        showErrorMessage('Debe aceptar los términos y condiciones de privacidad');
        hasErrors = true;
    }
    
    if (hasErrors) {
        showErrorMessage('Por favor corrija los errores en el formulario');
        return;
    }
    
    // Create case object
    const newCase = {
        id: mockCases.length + 1,
        number: `FPQRS-2026-${String(mockCases.length + 1).padStart(3, '0')}`,
        type: document.getElementById('fpqrsType').value,
        status: 'Pendiente',
        priority: document.getElementById('priority').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value,
        user: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        createdAt: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        attachments: uploadedFiles.map((file, index) => ({
            id: index + 1,
            name: file.name,
            size: formatFileSize(file.size)
        })),
        comments: [],
        history: [
            {
                date: new Date().toISOString().split('T')[0],
                status: 'Radicada',
                note: 'FPQRS radicado por el usuario'
            }
        ]
    };
    
    // Add to mock data
    mockCases.push(newCase);
    filteredCases = [...mockCases];
    
    // Show success message
    document.getElementById('formSuccess').classList.add('show');
    document.getElementById('successMessage').textContent = `Tu FPQRS ha sido radicado con el número: ${newCase.number}`;
    
    // Reset form
    this.reset();
    uploadedFiles = [];
    renderFileList();
    
    // Redirect after 3 seconds
    setTimeout(() => {
        navigateToPage('inbox');
    }, 3000);
});

// ===================================
// UTILIDADES
// ===================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
