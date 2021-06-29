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
          console.log("USERDATA:");
          console.log(userData.username);
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
/*
<div class="row post mx-auto">
    <h6>posted by: jonw</h6>
    <h3 class="title">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
    </h3>
    <p class="description">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
      nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
      Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
      enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
      felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
      elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
      ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
      ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla
      ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
      nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
      rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
      libero, sit amet adipiscing sem neque sed ipsum. N
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
function createPostElement(title = "", content = "", id = "") {
  var postContainer = document.createElement("DIV");
  var header = document.createElement("H3");
  var p = document.createElement("P");
  var hiddenIdTag = document.createElement("P");
  var creator = document.createElement("H6");

  var bottomDiv = document.createElement("DIV");
  var showmore = document.createElement("H5");
  var delBtn = document.createElement("BUTTON");

  postContainer.className = "row post mx-auto";
  header.className = "title";
  p.className = "description";
  delBtn.className = "btn btn-danger del";
  delBtn.setAttribute("type", "button");
  delBtn.addEventListener("click", deletePost);
  bottomDiv.className = "row mx-auto justify-content-center btm-div";
  showmore.style = "text-decoration: underline;";
  showmore.innerText = "expand post";
  console.log("CREATOR: " + creator);
  header.innerText = title;
  p.innerText = content;
  delBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  hiddenIdTag.innerText = id;
  hiddenIdTag.className = "hide";

  fetch(`/session`)
    .then((res) => res.json())
    .then((userData) => {
      console.log(userData);
      creator.innerText = "posted by: " + userData.username;

      postContainer.appendChild(creator);
      postContainer.appendChild(header);
      postContainer.appendChild(p);

      bottomDiv.appendChild(showmore);
      bottomDiv.appendChild(delBtn);
      bottomDiv.appendChild(hiddenIdTag);
      postContainer.appendChild(bottomDiv);

      myPostContainer.appendChild(postContainer);
    });
}
