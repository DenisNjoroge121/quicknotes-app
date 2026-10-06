
// Select elements from the page
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

// Store notes in an array
let notes = [];

// Render notes
function render() {
    notesList.textContent = "";

    notes.forEach(function(note) {

        const listItem = document.createElement("li");
        listItem.classList.add("note-card");

        // Add category class
        if (note.category === "Personal") {
            listItem.classList.add("category-personal");
        } else if (note.category === "Work") {
            listItem.classList.add("category-work");
        } else if (note.category === "Study") {
            listItem.classList.add("category-study");
        }

        // Note text
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Category
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("note-category");
        categoryLabel.textContent = note.category;

        // Date
        const dateText = document.createElement("p");
        dateText.classList.add("note-date");
        dateText.textContent = note.createdAt;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            notes = notes.filter(function(item) {
                return item.id !== note.id;
            });

            render();
        });

        // Add everything to the card
        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(dateText);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });

    // Update note count
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

// Add note
noteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Validate empty note
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Validate note length
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    // Clear error
    errorMessage.textContent = "";

    // Create note object
    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    // Clear input
    noteInput.value = "";

    render();
});

// Initial render
render();

