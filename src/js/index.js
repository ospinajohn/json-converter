// ===== VARIABLES GLOBALES =====
let toastId = 0;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Obtener elementos del DOM
    const elements = getElements();
    
    // Configurar event listeners
    setupEventListeners(elements);
    
    // Inicializar componentes
    initializeToggles();
    updatePreview();
}

function getElements() {
    return {
        convertButton: document.getElementById('convertButton'),
        inputText: document.getElementById('inputText'),
        outputElement: document.getElementById('outputJson'),
        resultContainer: document.getElementById('resultContainer'),
        emptyState: document.getElementById('emptyState'),
        prettyPrintCheckbox: document.getElementById('prettyPrint'),
        combineArraysCheckbox: document.getElementById('combineArrays'),
        previewText: document.getElementById('previewText'),
        charCount: document.getElementById('charCount'),
        copyBtn: document.getElementById('copyBtn'),
        itemCount: document.getElementById('itemCount'),
        jsonSize: document.getElementById('jsonSize')
    };
}

function setupEventListeners(elements) {
    // Contador de caracteres y vista previa
    elements.inputText.addEventListener('input', () => {
        updateCharacterCount(elements);
        updatePreview();
    });

    // Botón convertir
    elements.convertButton.addEventListener('click', () => {
        handleConversion(elements);
    });
}

// ===== FUNCIONES DE UI =====
function updateCharacterCount(elements) {
    const count = elements.inputText.value.length;
    elements.charCount.textContent = `${count} caracteres`;
}

function initializeToggles() {
    const checkboxes = [
        document.getElementById('prettyPrint'),
        document.getElementById('combineArrays')
    ];

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            handleToggleChange(e);
        });
        
        // Inicializar estado visual
        if (checkbox.checked) {
            const toggleBg = checkbox.nextElementSibling;
            toggleBg.classList.add('bg-gradient-to-r', 'from-blue-400', 'to-blue-600');
        }
    });
}

function handleToggleChange(e) {
    const toggleBg = e.target.nextElementSibling;
    
    if (e.target.checked) {
        toggleBg.classList.add('bg-gradient-to-r', 'from-blue-400', 'to-blue-600');
        toggleBg.classList.remove('bg-gray-300');
    } else {
        toggleBg.classList.remove('bg-gradient-to-r', 'from-blue-400', 'to-blue-600');
        toggleBg.classList.add('bg-gray-300');
    }
}

// ===== FUNCIONES DE PROCESAMIENTO =====
function updatePreview() {
    const previewText = document.getElementById('previewText');
    const inputText = document.getElementById('inputText');
    const text = inputText.value.trim();
    
    if (!text) {
        previewText.innerHTML = '<span class="text-gray-500 italic">Esperando datos...</span>';
        return;
    }

    try {
        const processed = processText(text);
        const preview = processed.substring(0, 200) + (processed.length > 200 ? '...' : '');
        previewText.innerHTML = `<span class="text-green-600">✓ Datos procesados correctamente</span><br><span class="text-xs text-gray-600">${preview}</span>`;
    } catch (e) {
        previewText.innerHTML = `<span class="text-red-500">⚠ Error en el procesamiento</span><br><span class="text-xs text-red-600">${e.message}</span>`;
    }
}

function processText(text) {
    let cleanedText = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.match(/^(Data|Datos?):\s*$/i))
        .map(line => line.replace(/^(Data|Datos?):\s*/i, ''))
        .join('\n');

    return cleanedText
        .replace(/'/g, '"')
        .replace(/None/g, 'null')
        .replace(/False/g, 'false')
        .replace(/True/g, 'true');
}

function extractArrays(text) {
    const arrays = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('[') && line.endsWith(']')) {
            try {
                const parsed = JSON.parse(line);
                if (Array.isArray(parsed)) {
                    arrays.push(parsed);
                }
            } catch (e) {
                console.warn('Error parsing line:', line.substring(0, 50));
            }
        }
    }
    
    return arrays;
}

// ===== FUNCIÓN PRINCIPAL DE CONVERSIÓN =====
function handleConversion(elements) {
    const text = elements.inputText.value.trim();
    
    if (!text) {
        showToast('Por favor, ingresa algunos datos primero', 'warning');
        return;
    }
    
    // Estado de carga
    setLoadingState(elements.convertButton, true);

    setTimeout(() => {
        try {
            const result = convertToJSON(text, elements);
            displayResult(result, elements);
            showToast(`¡Éxito! ${result.count} elemento${result.count !== 1 ? 's' : ''} convertido${result.count !== 1 ? 's' : ''}`, 'success');
        } catch (e) {
            showToast(`Error: ${e.message}`, 'error');
            console.error('Conversion error:', e);
        } finally {
            setLoadingState(elements.convertButton, false);
        }
    }, 500);
}

function convertToJSON(text, elements) {
    const processedText = processText(text);
    let finalData;
    
    const extractedArrays = extractArrays(processedText);
    
    if (extractedArrays.length > 0) {
        if (elements.combineArraysCheckbox.checked && extractedArrays.length > 1) {
            finalData = extractedArrays.flat();
        } else if (extractedArrays.length === 1) {
            finalData = extractedArrays[0];
        } else {
            finalData = extractedArrays;
        }
    } else {
        finalData = JSON.parse(processedText);
    }

    const formattedJson = elements.prettyPrintCheckbox.checked 
        ? JSON.stringify(finalData, null, 2) 
        : JSON.stringify(finalData);
    
    const count = Array.isArray(finalData) 
        ? (Array.isArray(finalData[0]) ? finalData.reduce((sum, arr) => sum + arr.length, 0) : finalData.length)
        : 1;
    
    return {
        json: formattedJson,
        data: finalData,
        count: count
    };
}

function displayResult(result, elements) {
    // Aplicar syntax highlighting
    elements.outputElement.innerHTML = syntaxHighlight(result.json);
    
    // Actualizar estadísticas
    elements.itemCount.textContent = `${result.count} elemento${result.count !== 1 ? 's' : ''} procesado${result.count !== 1 ? 's' : ''}`;
    elements.jsonSize.textContent = `${(new Blob([result.json]).size / 1024).toFixed(2)} KB`;
    
    // Mostrar resultado
    elements.emptyState.style.display = 'none';
    elements.resultContainer.classList.remove('hidden');
    elements.resultContainer.classList.add('slide-in');
    elements.copyBtn.style.display = 'flex';
}

function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Convirtiendo...';
        button.disabled = true;
    } else {
        button.innerHTML = '<i class="fas fa-magic mr-2"></i>Convertir a JSON';
        button.disabled = false;
    }
}

// ===== FUNCIONES DE UTILIDAD =====
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

// ===== FUNCIONES GLOBALES (llamadas desde HTML) =====
window.copyToClipboard = function() {
    const outputElement = document.getElementById('outputJson');
    const copyBtn = document.getElementById('copyBtn');
    const textToCopy = outputElement.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('¡Copiado al portapapeles!', 'success');
        
        // Feedback visual
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check mr-2 text-green-600"></i><span class="text-green-700">¡Copiado!</span>';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        showToast('Error al copiar. Inténtalo manualmente', 'error');
    });
}

window.clearInput = function() {
    const elements = getElements();
    
    elements.inputText.value = '';
    elements.charCount.textContent = '0 caracteres';
    updatePreview();
    
    // Ocultar resultado
    elements.resultContainer.classList.add('hidden');
    elements.emptyState.style.display = 'block';
    elements.copyBtn.style.display = 'none';
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showToast(message, type) {
    const toast = document.createElement('div');
    const toastIdCurrent = ++toastId;
    
    const colors = {
        success: 'status-success text-white',
        error: 'status-error text-white', 
        warning: 'status-warning text-white'
    };
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle'
    };

    toast.className = `${colors[type]} px-6 py-4 rounded-xl shadow-lg slide-in max-w-sm`;
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="${icons[type]} mr-3"></i>
            <span class="font-medium">${message}</span>
            <button onclick="removeToast(${toastIdCurrent})" class="ml-4 hover:opacity-70">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    toast.id = `toast-${toastIdCurrent}`;
    document.getElementById('toastContainer').appendChild(toast);

    setTimeout(() => {
        removeToast(toastIdCurrent);
    }, type === 'error' ? 5000 : 3000);
}

window.removeToast = function(id) {
    const toast = document.getElementById(`toast-${id}`);
    if (toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }
}