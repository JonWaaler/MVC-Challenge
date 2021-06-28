// post information
const postTitle = document.getElementById("title");
const postContent = document.getElementById("desc");
const myPostContainer = document.getElementById("my-posts");

loadDashboardPosts();

function loadDashboardPosts() {
  // clear html
  myPostContainer.innerHTML = "";

  // reload in all users posts
  fetch("/session")
    .then((response) => response.json())
    .then((userData) => {
      // Now that we have the user data we can fetch all
      // of that users posts for their dashboard!
      fetch(`/api/users/${userData.user_id}`)
        .then((res) => res.json())
        .then((userData) => {
          // create html post elements
          for (let i = 0; i < userData.posts.length; i++) {
            createPostElement(
              userData.posts[i].title,
              userData.posts[i].content,
              userData.posts[i].id
            );
          }
        });
    });
}

function createPost() {
  fetch("/session")
    .then((response) => response.json())
    .then((userData) => {
      console.log("fetched user: " + userData);
      postData("/api/posts", {
        title: postTitle.value,
        content: postContent.value,
        userId: userData.user_id,
      }).then((data) => {
        loadDashboardPosts();
      });
    });
}

function deletePost() {
  this.parentNode.remove();

  var id = this.nextSibling.innerText;
  deleteData(`/api/posts/${id}`)
    .then((res) => res.json)
    .then((data) => {
      console.log(data);
    });
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Posted Data:", data.id);
    });
  //return response.json(); // parses JSON response into native JavaScript objects
}
async function putData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    //mode: "cors", // no-cors, *cors, same-origin
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
async function deleteData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    //mode: "cors", // no-cors, *cors, same-origin
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function createPostElement(title = "", content = "", id = "") {
  var postContainer = document.createElement("DIV");
  var header = document.createElement("H3");
  var p = document.createElement("P");
  var delBtn = document.createElement("BUTTON");
  var hiddenIdTag = document.createElement("P");

  postContainer.className = "row post mx-auto";
  header.className = "title";
  p.className = "description";
  delBtn.className = "btn btn-danger del";
  delBtn.setAttribute("type", "button");
  delBtn.addEventListener("click", deletePost);

  header.innerText = title;
  p.innerText = content;
  delBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  hiddenIdTag.innerText = id;

  postContainer.appendChild(header);
  postContainer.appendChild(p);
  postContainer.appendChild(delBtn);
  postContainer.appendChild(hiddenIdTag);

  myPostContainer.appendChild(postContainer);
}
// <button type="button" class="btn btn-danger">Danger</button>
