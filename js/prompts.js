document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch category ID from the URL
    function getCategoryId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // Return 'id' from the URL (e.g., ?id=1)
    }

    const categoryId = getCategoryId(); // Get the category ID from URL
    const searchInput = document.getElementById("searchInput");

    // Fetch the prompts data from a local JSON file or external API
    fetch(`../data/id${categoryId}.json`)  // Change the path as necessary
        .then(response => response.json())
        .then(data => {
         if (data && data.prompts) {
            // Set category title and description
            document.getElementById('category-title').textContent = data.category;
            document.getElementById('category-desc').textContent = data.description;

            // Render prompts
            renderPrompts(data.prompts);

            // Handle search input event
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', () => {
                renderPrompts(data.prompts, searchInput.value);
            });
        } else {
            // If no data or invalid category, show error message
            document.getElementById('category-title').textContent = "Category Not Found";
            document.getElementById('category-desc').textContent = "Please check the category ID or try again later.";
        }
    })
        .catch(err => {
            console.error('Failed to fetch prompts data:', err);
        });
});

// Function to render prompts based on search filter
function renderPrompts(prompts, filter = "") {
    const promptList = document.getElementById('prompt-list');
    promptList.innerHTML = ""; // Clear the prompt list before rendering

    // Filter prompts based on search query
    const filteredPrompts = prompts.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));

    filteredPrompts.forEach(prompt => {
        const card = document.createElement("div");
        card.className = "prompt-card"; // Add class for styling

        const text = document.createElement("p");
        text.innerHTML = prompt.title;
        text.classList.add("prompt-text");

        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.textContent = "";

        // Add event listener to handle copy functionality
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(prompt.title)
                .then(() => {
                    copyBtn.textContent = "Copied!";
                    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        };

        // Optionally, you can add tags or category to each card
        const tagsContainer = document.createElement("div");
        tagsContainer.className = "prompt-tags";
        prompt.tags.forEach(tag => {
            const tagElem = document.createElement("span");
            tagElem.textContent = tag;
            tagsContainer.appendChild(tagElem);
        });

        card.appendChild(text);
        card.appendChild(tagsContainer);
        card.appendChild(copyBtn);
        promptList.appendChild(card);
    });
}
