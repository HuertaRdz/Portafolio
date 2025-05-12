// Respuestas correctas
const correctAnswers = {
    q1: 'b', 
    q2: 'c', 
    q3: 'b', 
    q4: 'b', 
    q5: 'b'  
};

// Texto de retroalimentación para cada pregunta
const feedbackText = {
    q1: {
        correct: "Correcto: 23 de mayo",
        incorrect: "Incorrecto: La respuesta correcta es '23 de mayo'."
    },
    q2: {
        correct: "Correcto: Es japonés",
        incorrect: "Incorrecto: El artista es japonés."
    },
    q3: {
        correct: "Correcto: Su primer mini álbum fue 'Wonder Word'",
        incorrect: "Incorrecto: Su primer mini álbum fue 'Wonder Word'"
    },
    q4: {
        correct: "Correcto: El zorro",
        incorrect: "Incorrecto: Su animal favorito es el zorro"
    },
    q5: {
        correct: "Correcto: El sushi",
        incorrect: "Incorrecto: Su comida favorita es el sushi"
    }
};

// Nombres de las preguntas para el gráfico
const questionNames = [
    "Cumpleaños",
    "Nacionalidad",
    "Album",
    "Animal favorito",
    "Comida favorita"
];

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitBtn').addEventListener('click', evaluateAnswers);
    document.getElementById('downloadPdf').addEventListener('click', generatePDF);
});

function evaluateAnswers() {
    const form = document.getElementById('diagnosticForm');
    const results = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    
    let score = 0;
    let feedbackHTML = '<h3>Retroalimentación:</h3><ul>';
    
    // Verificar cada pregunta
    for (let i = 1; i <= 5; i++) {
        const questionName = 'q' + i;
        const selectedOption = form.elements[questionName].value;
        
        if (selectedOption === correctAnswers[questionName]) {
            score++;
            feedbackHTML += `<li class="correct">${feedbackText[questionName].correct}</li>`;
        } else {
            feedbackHTML += `<li class="incorrect">${feedbackText[questionName].incorrect}</li>`;
        }
    }
    
    feedbackHTML += '</ul>';
    
    // Calcular porcentaje
    const percentage = (score / 5) * 100;
    
    // Mostrar resultados
    scoreElement.innerHTML = `Puntuación: ${score}/5 (${percentage}%)`;
    feedbackElement.innerHTML = feedbackHTML;
    results.style.display = 'block';
    
    // Generar gráfico
    generateChart(score, 5 - score);
    
    
    // Desplazarse a los resultados
    results.scrollIntoView({ behavior: 'smooth' });
}

function generateChart(correct, incorrect) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    
    // Destruir gráfico anterior si existe
    
    
    window.resultsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cumpleaños', 'Nacionalidad', 'Álbum', 'Animal Favorito', 'Comida Favorita'],
            datasets: [{
                label: 'Respuestas correctas',
                data: [1, 1, 1, 1, 1], // Máximo por pregunta
                backgroundColor: '#E78B48',
                borderColor: '#BE3D2A',
                borderWidth: 1
            }, {
                label: 'Respuestas contestadas correctamente',
                data: Array(5).fill(0).map((_, i) => {
                    const questionName = 'q' + (i + 1);
                    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`).value;
                    return selectedOption === correctAnswers[questionName] ? 1 : 0;
                }),
                backgroundColor: '#94B4C1',
                borderColor: '#547792',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Resultados por pregunta'
                }
            }
        }
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(20);
    doc.text('Resultados de la encuesta sobre Eve', 105, 20, { align: 'center' });
    
    // Fecha
    doc.setFontSize(12);
    const today = new Date();
    doc.text(`Fecha: ${today.toLocaleDateString()}`, 105, 30, { align: 'center' });
    
    // Puntuación
    doc.setFontSize(16);
    const scoreText = document.getElementById('score').textContent;
    doc.text(scoreText, 105, 40, { align: 'center' });
    
    // Gráfico (usamos una imagen del canvas)
    const canvas = document.getElementById('resultsChart');
    const chartImage = canvas.toDataURL('image/png');
    doc.addImage(chartImage, 'PNG', 30, 50, 150, 100);
    
    // Retroalimentación
    doc.setFontSize(12);
    doc.text('Retroalimentación:', 20, 160);
    
    let yPosition = 170;
    for (let i = 1; i <= 5; i++) {
        const questionName = 'q' + i;
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`).value;
        const isCorrect = selectedOption === correctAnswers[questionName];
        
        // Configurar color según si es correcto o no
        if (isCorrect) {
            doc.setTextColor(0, 128, 0); // Verde
        } else {
            doc.setTextColor(255, 0, 0); // Rojo
        }
        
        const feedback = isCorrect ? 
            feedbackText[questionName].correct : 
            feedbackText[questionName].incorrect;
        
        // Dividir el texto en líneas si es muy largo
        const lines = doc.splitTextToSize(`${i}. ${feedback}`, 170);
        doc.text(lines, 20, yPosition);
        
        yPosition += lines.length * 7 + 2; // Espacio entre preguntas
        
        // Verificar si necesitamos una nueva página
        if (yPosition > 270 && i < 5) {
            doc.addPage();
            yPosition = 20;
        }
    }
    
    // Guardar el PDF
    doc.save('diagnostico_programacion_web.pdf');
}