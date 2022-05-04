// console.log("welcome to the myprofile section");

// variables declarations and initialization
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let email = document.getElementById("email")
let profileImg = document.getElementById("profileImg");

// get user info from server
async function getUserInfo() {
    let response = await fetch("http://localhost:5001/api/user")
    let data = await response.json();
    firstName.innerHTML = `<strong>First Name : </strong>${data.firstName}`;
    lastName.innerHTML = `<strong>Last Name : </strong>${data.lastName}`;
    email.innerHTML = `<strong>Email : </strong>${data.email}`;
    gender.innerHTML = `<strong>Gender : </strong>${data.gender}`;
}

// get avatar according to gender
async function getAvatar(){
    let response = await fetch("http://localhost:5001/api/user")
    let data = await response.json();
    if(data.gender == "female"){
        profileImg.setAttribute("src" , "/images/female_avatar.svg")
    }else{
        profileImg.setAttribute("src" , "/images/profile.svg")
    }
}
getAvatar();
getUserInfo();