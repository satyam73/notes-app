// console.log("welcome to the notes page");
// variables declarations
let addNotesBtn = document.getElementById("addNotesBtn");
let deleteBtn = document.getElementsByClassName("deleteBtn");

// getting user from the server
async function getUser() {
    let response = await fetch("http://localhost:5001/api/user")
    let data = await response.json();
    return data;
}

// populating notes
const populateNotes = async () => {
    let user = await getUser();
    let notesContainer = document.querySelector("#notesContainer h1");
    let allNotesContainer = document.getElementById("allNotesContainer");
    let notes = user.notes;
    allNotesContainer.innerHTML = "";
    for (i = notes.length - 1; i >= 0; i--) {
        allNotesContainer.innerHTML += `<div class="noteCard card my-2 mx-2" id="${notes[i]._id}">
        <div class="card-body">
            <h5 class="card-title noteHeading">${notes[i].title}</h5>
            <p class="card-text noteText">${notes[i].note}</p>
            <a href="javascript:void(0)" class="btn btn-primary deleteBtn" onclick="deleteNoteHandler(this)">Delete Note</a>
            <a href="notes/edit/${notes[i]._id}" class="btn btn-primary editBtn">Edit Note</a>
        </div>
    </div>`;
    }
}

// addnotes button on click 
addNotesBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let title = document.getElementById("title");
    let note = document.getElementById("note");
    let response = await fetch("/notes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title.value,
            note: note.value
        })
    });
    if (!response.ok) {
        throw new Error("something went wrong")
    } else {
        title.value = note.value = "";
        let node = `<div class="alert alert-success alert-dismissible fade show d-flex align-items-center p-4" role="alert">
        <strong>Hurray!!!!😍</strong>&nbsp;&nbsp;Your note is added successfully
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
        notesPopup.innerHTML = node;
        notesPopup.style.fontSize = "2.3rem";
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setTimeout(() => {
            notesPopup.innerHTML = "";
        }, 3000)
        populateNotes();
    }
});

// function for deleting notes
async function deleteNoteHandler(elem) {
    try {
        let confirmation = confirm("This note will be deleted permanently");
        if (confirmation) {
            let notesPopup = document.getElementById("notesPopup");
            let _id = elem.parentElement.parentElement.getAttribute("id");
            let response = await fetch(`http://localhost:5001/notes/delete/${_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id
                })
            })
            if (!response.ok) {
                throw new Error('some error occured')
            } else {
                let node = `<div class="alert alert-danger alert-dismissible fade show d-flex align-items-center p-4" role="alert">
            <strong>Your Note is deleted</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
                notesPopup.innerHTML = node;
                notesPopup.style.fontSize = "2.3rem";
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                setTimeout(() => {
                    notesPopup.innerHTML = "";
                }, 3000)
                populateNotes();
            }
        }
    } catch (err) {
        console.log(err);
    }
}
// function calls
getUser();
populateNotes();