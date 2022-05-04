// console.log("welcome to the edit section");

// variables declarations and initialization
let saveNoteBtn = document.getElementById("saveNoteBtn");
let editPageMainContainer = document.getElementById("editPageMainContainer");
let editPop = document.getElementById("editPop");

// patch request handle function - for editing notes
const patchRequestHandler = async (e) => {
    e.preventDefault();
    let updatedTitle = document.getElementById("updatedTitle").value;
    let updatedNote = document.getElementById("updatedNote").value;
    const response = await fetch(window.location.pathname, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: updatedTitle,
            note: updatedNote
        })
    });
    if (response.ok) {
        //  have to change some things
        let node = `<div class="alert alert-success alert-dismissible fade show d-flex align-items-center p-4" role="alert">
            <strong>Hurray!!!!😍</strong>&nbsp;&nbsp;Your note is saved successfully
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
        editPop.style.fontSize = "2.3rem";
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        editPop.innerHTML = node;
        setTimeout(() => {
            editPop.innerHTML = "";
        }, 3000);
    }else{
        let node = `<div class="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert" p-5>
            <strong>Sorry!!!!☹</strong>&nbsp;&nbsp;Your note is not saved due to some issues.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
        editPop.style.fontSize = "2.3rem";
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        editPop.innerHTML = node;
        setTimeout(() => {
            editPop.innerHTML = "";
        }, 3000);
    }
}
saveNoteBtn.addEventListener("click", patchRequestHandler);