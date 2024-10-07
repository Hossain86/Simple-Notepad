const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];

  notes.forEach((note) => {
    data.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(data)); 
};

const loadNotes = () => {
  const savedNotes = JSON.parse(localStorage.getItem("notes")); 
  if (savedNotes) {
    savedNotes.forEach((note) => {
      if (note.trim() !== "") {
        addNote(note); 
      }
    });
  }
}

addBtn.addEventListener("click", function () {
  addNote();
});

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
      <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
      </div>
      <textarea>${text}</textarea>`;

  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes(); 
  });

  note.querySelector("textarea").addEventListener("input", function () {
    saveNotes(); 
  });

  main.appendChild(note);
  saveNotes(); 
};

(function () {
  loadNotes();
})();
