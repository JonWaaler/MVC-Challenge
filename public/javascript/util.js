// post information
const postTitle = document.getElementById("title");
const postContent = document.getElementById("desc");
const myPostContainer = document.getElementById("my-posts");

loadHomePosts();

function loadHomePosts() {
  // clear html
  myPostContainer.innerHTML = "";

  fetch("/api/posts")
    .then((response) => response.json())
    .then((postData) => {
      for (let i = 0; i < postData.length; i++) {
        createPostElement(
          postData[i].title,
          postData[i].content,
          postData[i].id
        );
      }
    });
}

function createPostElement(title = "", content = "", id = "") {
  var postContainer = document.createElement("DIV");
  var header = document.createElement("H3");
  var p = document.createElement("P");
  var hiddenIdTag = document.createElement("P");
  var creator = document.createElement("H6");

  var bottomDiv = document.createElement("DIV");
  var showmore = document.createElement("H5");

  postContainer.className = "row post mx-auto";
  header.className = "title";
  p.className = "description";

  bottomDiv.className = "row mx-auto justify-content-center btm-div";
  showmore.style = "text-decoration: underline;";
  showmore.innerText = "expand post";
  console.log("CREATOR: " + creator);
  header.innerText = title;
  p.innerText = content;
  hiddenIdTag.innerText = id;
  hiddenIdTag.className = "hide";

  fetch(`/api/posts/${id}`)
    .then((res) => res.json())
    .then((userData) => {
      console.log(userData);
      creator.innerText = "posted by: " + userData[0].user.username;

      postContainer.appendChild(creator);
      postContainer.appendChild(header);
      postContainer.appendChild(p);

      bottomDiv.appendChild(showmore);
      bottomDiv.appendChild(hiddenIdTag);
      postContainer.appendChild(bottomDiv);

      myPostContainer.appendChild(postContainer);
    });
}
