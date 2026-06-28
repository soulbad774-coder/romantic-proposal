// State Management
const state = {
    currentPage: 1,
    answers: [
        { question: 'Will you send me a voice note?', answer: null },
        { question: 'Will you send me your waist photo?', answer: null },
        { question: 'Will you send me your photo?', answer: null },
        { question: 'Will you send me a photo of your mole (til)?', answer: null },
        { question: 'Will you send me a fit check photo?', answer: null }
    ],
    currentQuestion: 0
};

const questions = [
    'Will you send me a voice note?',
    'Will you send me your waist photo?',
    'Will you send me your photo?',
    'Will you send me a photo of your mole (til)?',
    'Will you send me a fit check photo?'
];

// Navigation
function goToPage(pageNumber) {
    // Hide current page
    document.getElementById(`page-${state.currentPage}`).classList.remove('active');
    
    // Show new page
    state.currentPage = pageNumber;
    document.getElementById(`page-${state.currentPage}`).classList.add('active');
    
    // Special logic for different pages
    if (pageNumber === 7) {
        setTimeout(() => {
            typewriterEffect();
        }, 300);
    }
    
    if (pageNumber === 9) {
        state.currentQuestion = 0;
        displayQuestion();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Typewriter effect for Page 7
function typewriterEffect() {
    const text = 'There is only one question left...';
    const element = document.querySelector('.typewriter-text');
    element.textContent = '';
    let index = 0;
    
    const speed = 50;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Handle proposal response
function handleProposal(response) {
    if (response === 'yes') {
        createConfetti();
        setTimeout(() => {
            goToPage(9);
        }, 800);
    } else {
        const rejectionMsg = document.getElementById('rejection-message');
        rejectionMsg.textContent = "I'll always respect your decision. Thank you for taking this journey with me.";
        rejectionMsg.classList.add('show');
        
        const yesBtn = document.querySelector('.btn-yes');
        const noBtn = document.querySelector('.btn-no');
        yesBtn.disabled = true;
        noBtn.disabled = true;
    }
}

// Display current question
function displayQuestion() {
    if (state.currentQuestion < questions.length) {
        document.getElementById('question-text').textContent = questions[state.currentQuestion];
        document.getElementById('progress-text').textContent = `Question ${state.currentQuestion + 1} of ${questions.length}`;
    } else {
        finishQuestions();
    }
}

// Answer question
function answerQuestion(answer) {
    state.answers[state.currentQuestion].answer = answer === 'yes' ? 'YES ❤️' : 'NO 💔';
    state.currentQuestion++;
    
    if (state.currentQuestion < questions.length) {
        displayQuestion();
    } else {
        finishQuestions();
    }
}

// Finish questions and go to thank you page
function finishQuestions() {
    goToPage(10);
    
    // Show popup after 1 second
    setTimeout(() => {
        showThankYouPopup();
    }, 1000);
}

// Show thank you popup
function showThankYouPopup() {
    const popup = document.getElementById('thank-you-popup');
    popup.classList.remove('hidden');
    
    // Display answers
    const answersDisplay = document.getElementById('answers-display');
    answersDisplay.innerHTML = '';
    
    state.answers.forEach((item, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-item';
        answerDiv.textContent = `${index + 1}. ${item.question}: ${item.answer}`;
        answersDisplay.appendChild(answerDiv);
    });
}

// Copy answers to clipboard
function copyAnswers() {
    let text = 'My Answers to Your Questions:\n\n';
    state.answers.forEach((item, index) => {
        text += `${index + 1}. ${item.question}: ${item.answer}\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied Successfully ❤️');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Create confetti
function createConfetti() {
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const startX = Math.random() * window.innerWidth;
        const startY = -10;
        const duration = 2000 + Math.random() * 1000;
        const delay = Math.random() * 200;
        
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animation = `fall ${duration}ms linear ${delay}ms forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, duration + delay);
    }
}

// Get random color for confetti
function getRandomColor() {
    const colors = ['#ff1493', '#ff69b4', '#9d4edd', '#c77dff', '#ffb3d9'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create floating hearts in background
function createFloatingHearts() {
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    
    // Create multiple heart elements for continuous floating effect
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('span');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = -10 + 'px';
        heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
        heart.style.opacity = Math.random() * 0.2 + 0.05;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        
        const duration = Math.random() * 8 + 8;
        const delay = Math.random() * 5;
        const xOffset = (Math.random() - 0.5) * 100;
        
        heart.style.animation = `customFloat ${duration}s linear ${delay}s infinite`;
        heart.style.setProperty('--x-offset', xOffset + 'px');
        
        floatingHeartsContainer.appendChild(heart);
    }
}

// Add custom float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes customFloat {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0.05;
        }
        50% {
            opacity: 0.15;
        }
        100% {
            transform: translateY(100vh) translateX(var(--x-offset));
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
});

// Mobile optimization
if (window.matchMedia('(max-width: 768px)').matches) {
    document.documentElement.style.fontSize = '14px';
}
