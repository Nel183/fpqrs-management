// ===================================
// GESTIÓN DE CASOS
// ===================================

let filteredCases = [...mockCases];
let currentPage_pagination = 1;
const itemsPerPage = 5;

// ===================================
// CARGAR LISTA DE CASOS
// ===================================

function loadCases() {
    const tbody = document.getElementById('casesTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredCases.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Calculate pagination
    const startIndex = (currentPage_pagination - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCases = filteredCases.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageCases.map((caseItem, index) => `
        <tr>
            <td>${startIndex + index + 1}</td>
            <td class="case-number" onclick="viewCase(${caseItem.id})">${caseItem.number}</td>
            <td>
                <span class="case-type ${caseItem.type.toLowerCase().replace(/\s+/g, '-')}">
                    ${caseItem.type}
                </span>
            </td>
            <td>${caseItem.subject}</td>
            <td>
                <span class="case-status ${caseItem.status.toLowerCase().replace(/\s+/g, '-')}">
                    ${caseItem.status}
                </span>
            </td>
            <td>
                <span class="case-priority ${caseItem.priority.toLowerCase()}">
                    ${caseItem.priority}
                </span>
            </td>
            <td>${formatDate(caseItem.createdAt)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-view" title="Ver" onclick="viewCase(${caseItem.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-edit" title="Editar" onclick="editCase(${caseItem.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" title="Eliminar" onclick="deleteCase(${caseItem.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ===================================
// VER DETALLE DEL CASO
// ===================================

function viewCase(id) {
    currentCaseId = id;
    navigateToPage('detail');
}

function loadCaseDetail() {
    const caseItem = mockCases.find(c => c.id === currentCaseId);
    if (!caseItem) {
        showErrorMessage('Caso no encontrado');
        navigateToPage('inbox');
        return;
    }

    // Header
    document.getElementById('caseDetailNumber').textContent = caseItem.number;
    document.getElementById('caseDetailSubject').textContent = caseItem.subject;
    document.getElementById('caseDetailType').textContent = caseItem.type;
    document.getElementById('caseDetailStatus').textContent = caseItem.status;
    document.getElementById('caseDetailPriority').textContent = caseItem.priority;
    document.getElementById('caseDetailCreatedAt').textContent = formatDate(caseItem.createdAt);

    // Description
    document.getElementById('caseDetailDescription').textContent = caseItem.description;

    // Attachments
    const attachmentsSection = document.getElementById('attachmentsSection');
    if (caseItem.attachments.length > 0) {
        attachmentsSection.style.display = 'block';
        document.getElementById('attachmentsList').innerHTML = caseItem.attachments.map(att => `
            <div class="attachment-item">
                <span class="attachment-icon"><i class="fas fa-file"></i></span>
                <div class="attachment-info">
                    <div class="attachment-name">${att.name}</div>
                    <div class="attachment-size">${att.size}</div>
                </div>
                <div class="attachment-actions">
                    <button title="Descargar"><i class="fas fa-download"></i></button>
                    <button title="Ver"><i class="fas fa-eye"></i></button>
                </div>
            </div>
        `).join('');
    } else {
        attachmentsSection.style.display = 'none';
    }

    // Comments
    loadComments(caseItem);

    // History
    loadHistory(caseItem);

    // Sidebar
    document.getElementById('sidebarUserName').textContent = caseItem.user;
    document.getElementById('sidebarUserEmail').textContent = caseItem.email;
    document.getElementById('sidebarUserPhone').textContent = authManager.getCurrentUser().phone || '-';
    document.getElementById('sidebarUserDocument').textContent = authManager.getCurrentUser().document || '-';
    
    const statusClass = caseItem.status.toLowerCase().replace(/\s+/g, '-');
    const priorityClass = caseItem.priority.toLowerCase();
    
    document.getElementById('sidebarStatusBadge').className = `status-badge ${statusClass}`;
    document.getElementById('sidebarStatusBadge').textContent = caseItem.status;
    
    document.getElementById('sidebarPriorityBadge').className = `priority-badge ${priorityClass}`;
    document.getElementById('sidebarPriorityBadge').textContent = caseItem.priority;
    
    document.getElementById('sidebarDueDate').textContent = formatDate(caseItem.dueDate);
    document.getElementById('sidebarCompletedAt').textContent = caseItem.completedAt ? formatDate(caseItem.completedAt) : '-';
}

// ===================================
// CARGAR COMENTARIOS
// ===================================

function loadComments(caseItem) {
    const commentsList = document.getElementById('commentsList');
    
    if (caseItem.comments.length === 0) {
        commentsList.innerHTML = '<p class="text-muted">No hay comentarios aún. Sé el primero en comentar.</p>';
    } else {
        commentsList.innerHTML = caseItem.comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${formatDate(comment.date)}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
            </div>
        `).join('');
    }
}

// ===================================
// CARGAR HISTORIAL
// ===================================

function loadHistory(caseItem) {
    const timeline = document.getElementById('historyTimeline');
    timeline.innerHTML = caseItem.history.map(entry => `
        <div class="timeline-item">
            <div>
                <div class="timeline-date">${formatDate(entry.date)}</div>
                <span class="timeline-status">${entry.status}</span>
                <div class="timeline-note">${entry.note}</div>
            </div>
        </div>
    `).join('');
}

// ===================================
// ENVIAR COMENTARIO
// ===================================

function submitComment() {
    const textarea = document.getElementById('commentInput');
    const text = textarea.value.trim();
    
    if (!text) {
        showErrorMessage('Por favor ingrese un comentario');
        return;
    }
    
    const caseItem = mockCases.find(c => c.id === currentCaseId);
    const newComment = {
        id: caseItem.comments.length + 1,
        author: authManager.getCurrentUser().name,
        date: formatDate(new Date()),
        text: text
    };
    
    caseItem.comments.push(newComment);
    textarea.value = '';
    loadComments(caseItem);
    showSuccessMessage('Comentario agregado exitosamente');
}

function cancelComment() {
    document.getElementById('commentInput').value = '';
}

// ===================================
// EDITAR CASO
// ===================================

function editCase(id) {
    showErrorMessage('La funcionalidad de edición está en desarrollo');
}

// ===================================
// ELIMINAR CASO
// ===================================

function deleteCase(id) {
    if (confirm('¿Está seguro de que desea eliminar este caso? Esta acción no se puede deshacer.')) {
        mockCases = mockCases.filter(c => c.id !== id);
        filteredCases = [...mockCases];
        showSuccessMessage('Caso eliminado exitosamente');
        navigateToPage('inbox');
    }
}

// ===================================
// DESCARGAR CASO
// ===================================

function downloadCase() {
    const caseItem = mockCases.find(c => c.id === currentCaseId);
    const content = `
CASO: ${caseItem.number}
TIPO: ${caseItem.type}
ASTUNO: ${caseItem.subject}
ESTADO: ${caseItem.status}
PRIORIDAD: ${caseItem.priority}
DESCRIPCIÓN: ${caseItem.description}
FECHA DE CREACIÓN: ${caseItem.createdAt}
FECHA LÍMITE: ${caseItem.dueDate}
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${caseItem.number}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showSuccessMessage('Caso descargado exitosamente');
}

// ===================================
// FILTROS
// ===================================

function applyFilters() {
    const type = document.getElementById('filterType').value;
    const status = document.getElementById('filterStatus').value;
    const priority = document.getElementById('filterPriority').value;
    
    filteredCases = mockCases.filter(c => {
        const typeMatch = !type || c.type === type;
        const statusMatch = !status || c.status === status;
        const priorityMatch = !priority || c.priority === priority;
        return typeMatch && statusMatch && priorityMatch;
    });
    
    currentPage_pagination = 1;
    loadCases();
    showSuccessMessage('Filtros aplicados');
}

function resetFilters() {
    document.getElementById('filterType').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterPriority').value = '';
    
    filteredCases = [...mockCases];
    currentPage_pagination = 1;
    loadCases();
    showSuccessMessage('Filtros reiniciados');
}

// ===================================
// UTILIDADES
// ===================================

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
}
