// Smooth scrolling for anchor links (SPA style)
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    window.scrollTo({
        top: targetSection.offsetTop - 60, // Adjust for header
        behavior: 'smooth'
    });
}

// Dynamic Search Functionality for Prompt Filtering
const searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('placeholder', 'Search for prompts...');
searchInput.classList.add('search-bar');
document.querySelector('#home header').appendChild(searchInput);

// Prompt Filtering: On Input Change
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const promptCards = document.querySelectorAll('.prompt-card');

    promptCards.forEach(card => {
        const promptText = card.textContent.toLowerCase();
        if (promptText.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Example data for Popular Prompts
const popularPrompts = [
    "Act as a motivational coach for someone who's given up on their dreams.",
    "Explain the concept of Web3 to a 10-year-old.",
    "Turn my blog idea into an engaging YouTube video script.",
    "Write a poem from the perspective of the moon."
];

// Add popular prompts dynamically to the homepage
const popularPromptContainer = document.querySelector('#popular .prompt-grid');
popularPrompts.forEach(prompt => {
    const promptCard = document.createElement('div');
    promptCard.classList.add('prompt-card');
    promptCard.textContent = prompt;
    popularPromptContainer.appendChild(promptCard);
});

// Add Copy Button to Each Prompt
document.querySelectorAll('.prompt-card').forEach(card => {
    const copyButton = document.createElement('button');
    copyButton.textContent = '';
    copyButton.classList.add('copy-btn');

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(card.textContent).then(() => {
            // Create a temporary success message
            console.log(card.textContent)
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Prompt copied to clipboard!';
            successMessage.style.position = 'fixed';
            successMessage.style.top = '40%';
            successMessage.style.right = '50%';
            successMessage.style.transform = 'translateX(50%)';
            successMessage.style.padding = '8px 12px';
            successMessage.style.backgroundColor = '#1e88e5';
            successMessage.style.color = 'white';
            successMessage.style.borderRadius = '5px';
            successMessage.style.fontSize = '1rem';
            successMessage.style.zIndex = '111999';
            successMessage.style.transition = 'opacity 1s ease-out';

            // Append to the body
            document.body.appendChild(successMessage);

            // Fade out the message after 2 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 1000); // Remove after fade-out
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    card.appendChild(copyButton);
});
