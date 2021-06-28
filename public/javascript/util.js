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
        createPostElement(postData[i].title, postData[i].content);
      }
    });
}

function createPostElement(title = "", content = "") {
  var postContainer = document.createElement("DIV");
  var header = document.createElement("H3");
  var p = document.createElement("P");
  var delBtn = document.createElement("BUTTON");

  postContainer.className = "row post mx-auto";
  header.className = "title";
  p.className = "description";
  delBtn.className = "btn btn-danger";
  delBtn.setAttribute("type", "button");

  header.innerText = title;
  p.innerText = content;
  delBtn.innerText = "Del";

  postContainer.appendChild(header);
  postContainer.appendChild(p);
  postContainer.appendChild(delBtn);

  myPostContainer.appendChild(postContainer);
}
