/*fetch and axios API - used to set HTTP request 

fetch api is promise based so we can use .then and .catch on the fetch api
*/
let userContainer = document.querySelector(".user-container");


function getUsersData(URL) {
  //.then chaining
  fetch(URL)
    .then((res) => {
      console.log(res);
      return res.json(); //returns a promise object
    })
    .then((data) => {
    console.log(data);
    // for(let i=0;i<data.length ; i++){
    //     console.log(`The username at index ${i} is ${data[i].username}`);
    // }

    data.forEach(user=>{
        displayUser(user);
    })
    })
    .catch((err) => {
      console.log(err);
    });
}


function displayUser(user){
    //{id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: {…}, …}
    let li = document.createElement("li");
 li.setAttribute("class", "user-item");
    li.setAttribute("style", "display:flex");

    li.innerHTML = ` <div class="user-info">
                <h1>${user.name}</h1>
                <p>${user.username}</p>
            </div>
            <div class="user-btn">
                <button class="user-delete">❌</button>
                <button class="user-edit">‼</button>
            </div> `;

            userContainer.appendChild(li);
}

getUsersData("https://jsonplaceholder.typicode.com/users");
//get request can be sent from browser too
