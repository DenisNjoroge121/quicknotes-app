
// Select elements from the page
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all-btn");

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem("quicknotes", JSON.stringify(notes));
}

// Render notes
function render() {
    notesList.textContent = "";

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter(function(note) {
        return note.text.toLowerCase().includes(searchTerm);
    });

    // Show search message if nothing matches
    if (filteredNotes.length === 0 && searchTerm !== "") {
        const noResults = document.createElement("li");
        noResults.textContent = "No notes match your search.";
        notesList.appendChild(noResults);
    }

    filteredNotes.forEach(function(note) {

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

        // Category label
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

            saveNotes();
            render();
        });

        // Add elements to card
        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(dateText);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });

    // Update count
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

    // Empty note validation
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Character limit validation
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


    // Add note to array
    notes.push(newNote);

    // Save to localStorage
    saveNotes();

    // Clear input
    noteInput.value = "";

    // Display notes
    render();
});

clearAllButton.addEventListener("click", function() {
    if (confirm("Delete all notes?")) {
        notes = [];
        saveNotes();
        render();
    }
});

// Search notes while typing
searchInput.addEventListener("input", function() {
    render();
});

// Initial render
render();
