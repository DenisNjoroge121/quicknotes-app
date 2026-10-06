
// Select elements from the page
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

// Store all notes in an array
let notes = [];

// Render notes on the page
function render() {
    // Clear the current list
    notesList.textContent = "";

    notes.forEach(function(note) {

        // Create the list item
        const listItem = document.createElement("li");
        listItem.classList.add("note-card");

        // Add the category class
        if (note.category === "Personal") {
            listItem.classList.add("category-personal");
        } else if (note.category === "Work") {
            listItem.classList.add("category-work");
        } else if (note.category === "Study") {
            listItem.classList.add("category-study");
        }

        // Create note text
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Create category label
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("note-category");
        categoryLabel.textContent = note.category;

        // Create date
        const dateText = document.createElement("p");
        dateText.classList.add("note-date");
        dateText.textContent = note.createdAt;

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        // Delete this note
        deleteButton.addEventListener("click", function() {
            notes = notes.filter(function(item) {
                return item.id !== note.id;
            });

            render();
        });

        // Add elements to the card
        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(dateText);
        listItem.appendChild(deleteButton);

        // Add card to the list
        notesList.appendChild(listItem);
    });
}

// Add a new note
noteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    noteInput.value = "";

    render();
});

// Display the initial notes
render();

