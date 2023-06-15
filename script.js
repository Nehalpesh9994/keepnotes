var addNotesBtn = document.querySelector("#addNotesBtn");
var notesArea = document.querySelector("#notesArea");
var notes = [];

loadNotes(); // Call loadNotes() before creating new note boxes

addNotesBtn.addEventListener("click", createNoteBox);

function createNoteBox(noteData) {
  var notebox = document.createElement("div");
  notebox.classList.add("notebox_class");

  var noteboxTop = document.createElement("div");
  noteboxTop.classList.add("noteboxTop");

  var saveButton = document.createElement("button");
  saveButton.classList.add("saveButton");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", function () {
    saveElement(this.parentNode.parentNode);
  });

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteElement(this.parentNode.parentNode);
  });

  noteboxTop.appendChild(saveButton);
  noteboxTop.appendChild(deleteButton);

  var noteboxBottom = document.createElement("div");
  noteboxBottom.classList.add("noteboxBottom");

  var noteTitleInput = document.createElement("input");
  noteTitleInput.setAttribute("placeholder", "Title");
  noteTitleInput.classList.add("noteTitleInput");
  noteTitleInput.value = noteData && noteData.title ? noteData.title : "";

  var noteDescInput = document.createElement("textarea");
  noteDescInput.setAttribute("placeholder", "Description");
  noteDescInput.classList.add("noteDescInput");
  noteDescInput.value =
    noteData && noteData.description ? noteData.description : "";

  noteboxBottom.appendChild(noteTitleInput);
  noteboxBottom.appendChild(noteDescInput);

  notebox.appendChild(noteboxTop);
  notebox.appendChild(noteboxBottom);

  notesArea.appendChild(notebox);

  var note = {
    element: notebox,
    titleInput: noteTitleInput,
    descInput: noteDescInput,
  };

  notes.push(note);
}



function saveElement(notebox) {
  var note = getNoteByElement(notebox);

  if (note) {
    var index = notes.indexOf(note);

    var noteData = {
      title: note.titleInput.value,
      description: note.descInput.value,
    };

    var savedData = document.createElement("h2");
    savedData.classList.add("savedData");
    savedData.innerHTML = "Your note is saved!";
    notesArea.appendChild(savedData);

    // Save noteData to localStorage
    localStorage.setItem(`note_${index}`, JSON.stringify(noteData));

    // Remove the "Your note is saved!" message after 3 seconds
    setTimeout(function () {
      savedData.remove();
    }, 3000);
  } else {
    console.log("Note not found.");
  }
}



function deleteElement(notebox) {
  var note = getNoteByElement(notebox);

  // Remove note from array
  var index = notes.indexOf(note);
  if (index > -1) {
    notes.splice(index, 1);
  }

  // Remove note from DOM
  notebox.remove();

  // Remove noteData from localStorage
  localStorage.removeItem(`note_${index}`);
}

function getNoteByElement(notebox) {
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].element === notebox) {
      return notes[i];
    }
  }
  return null;
}

function loadNotes() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith("note_")) {
      var index = parseInt(key.substring(5));
      var noteData = JSON.parse(localStorage.getItem(key));
      createNoteBox(noteData);
    }
  }
}
