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
        .then((userPostData) => {
          // Loop through all of the users posts and create elements
          for (let i = 0; i < userPostData.posts.length; i++) {
            createPostElement(
              userPostData.posts[i].title,
              userPostData.posts[i].content,
              userPostData.posts[i].id,
              userData.username,
              userPostData.posts[i].createdAt
            );
          }
        });
    });
}

// handles the DATABASE portion of
function createPost() {
  // Check length of title max: 256 chars
  if (postTitle.value.length > 255) {
    return 0;
  }

  // If title is within max length, create post
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
  console.log("Delete Post Attempt...");
  this.parentNode.parentNode.remove();

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

/*
<div class="row post mx-auto">
    <h6>posted by: jonw</h6>
    <h3 class="title">
      Lorem ipsum dolor sit amet, c
    </h3>
    <p class="description">
      Lorem ipsum dolor sit amet, conse
    </p>


    <div class="row mx-auto justify-content-center">
      <h5 id="show-more" style="text-decoration: underline;">
        show more
      </h5>
      <button class="btn btn-danger del" type="button">
        <i class="fas fa-trash-alt" aria-hidden="true"></i>
      </button>
    </div>
    <p class="hide">1</p>
  </div>
*/
function createPostElement(
  title = "",
  content = "",
  id = "",
  name = "",
  date = ""
) {
  var postContainer = document.createElement("DIV");
  var header = document.createElement("H3");
  var p = document.createElement("P");
  var hiddenIdTag = document.createElement("P");
  var creator = document.createElement("H6");

  postContainer.className = "row post mx-auto";
  header.className = "title";
  p.className = "description";
  hiddenIdTag.className = "hide";

  header.innerText = title;
  p.innerText = content;
  creator.innerText = "posted by: " + name + " at: " + date;
  hiddenIdTag.innerText = id;

  postContainer.addEventListener("click", () => {
    location.assign(`/post/${id}`);
  });

  postContainer.appendChild(creator);
  postContainer.appendChild(header);
  postContainer.appendChild(p);
  postContainer.appendChild(hiddenIdTag);

  myPostContainer.appendChild(postContainer);
}
