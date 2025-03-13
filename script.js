function getUserProfile(){
  //Decalre variable
  const name = document.getElementById('name').value;
  const usersDetails = document.getElementById('users-details')

  //Check if the name is empty or null throw an error and return
  if(name === '' || name === ' '){
    usersDetails.innerHTML += `
    <div class="error-container">
      <p>Please enter a valid user name</p>
    </div>
  `
  return 
  }
    //Get the github user api from the sever
    const xhr = new XMLHttpRequest;
    xhr.open('GET', `https://api.github.com/users/${name}`, true);

    //check if xhr is full load
  xhr.onload = function (){

      //check if the xhr readyState is 4 and if the status code is 200
    if(xhr.readyState === 4 && xhr.status === 200){
        //convert the response to javascript object
        const user = JSON.parse(this.responseText);
        //check the user.name is undefined 
        //that is the search is not found
      if(typeof user.name === undefined){
          //notify the user with an error message
          usersDetails.innerHTML += `
          <div class="error-container">
            <p>Your search did not match any github profile</p>
          </div>
        `
      }
      else{
          //If the search is found update the page with the object convert back to the javascript object
          usersDetails.innerHTML += `
          <div class="card">
          <img src="${user.avatar_url}" alt="" />
          <div class="card-body">
            <h2 class="user-name">${user.name}</h2>
            <span class="followers">Followers: ${user.followers}</span> <br>
            <span class="following">Following: ${user.following}</span> <br />
            <span class="repos">Repository: ${user.public_repos}</span> <br />
            <p class="action">
              <button class="follow">Follow</button>
              <a href="${user.url}" class="profile">Visit Profile</a>
            </p>
          </div>
        </div>
      `
      }
    }
  }

    //send the xmlHTTPRequest
    xhr.send();

    //Add event listener for handling any connection error
  xhr.addEventListener('error', (error) =>{
      usersDetails.innerHTML += `
      <div class="error-container">
        <img src="download.png">
        <p class="error">Connection Error pleaser review your network and try again</p>
      </div>
    `
  });
}

document.getElementById('search').addEventListener('click', (e) =>{
  e.preventDefault();
  getUserProfile();
});