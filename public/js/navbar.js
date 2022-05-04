// console.log("this is the navbar js");

// getting user data from server
async function userData() {
    let response = await fetch("/api/user");
    return response;

}

// checking authorization for updating navlinks
async function isAuthorized() {
    const userAuth = await userData();
    let navbarLinks = document.querySelector("#navbarScroll ul");
    if (userAuth.ok) {
        navbarLinks.innerHTML = `
        <li class="nav-item mx-3">
            <a class="nav-link active fs-2" aria-current="page" href="/">Home</a>
        </li>
       <li class="nav-item mx-3">
            <a class="nav-link fs-2" href="/notes">Notes</a>
       </li>
       <li class="nav-item mx-3">
            <a class="nav-link fs-2" href="/myprofile">Profile</a>
       </li>
       <li class="nav-item mx-3">
            <a class="nav-link fs-2" href="/logout">Logout</a>
       </li>
        `;
    } else {
        navbarLinks.innerHTML = `
        <li class="nav-item mx-3">
          <a class="nav-link active fs-2" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item mx-3">
          <a class="nav-link fs-2" href="/login">Login</a>
        </li>
        <li class="nav-item mx-3">
          <a class="nav-link fs-2" href="/signup">Register</a>
        </li>
        </li>
        `;
    }
    console.clear();
}
isAuthorized();