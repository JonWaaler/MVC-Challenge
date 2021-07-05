//const postTitle = document.getElementById("title");
const postContent = document.getElementById("desc");
const myPostContainer = document.getElementById("my-posts");
const singlePostContainer = document.getElementById("single-post");

loadHomePosts();

function loadHomePosts() {
  // clear html
  myPostContainer.innerHTML = "";

  // reload in all users posts
  fetch(`/api/posts`)
    .then((res) => res.json())
    .then((userPostData) => {
      // Loop through all of the users posts and create elements
      for (let i = 0; i < userPostData.length; i++) {
        fetch(`/api/users/${userPostData[i].userId}`)
          .then((res) => res.json())
          .then((userInfo) => {
            createPostElement(
              userPostData[i].title,
              userPostData[i].content,
              userPostData[i].id,
              userInfo.username,
              userPostData[i].createdAt
            );
          });
      }
    });
}

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

function expandPost() {
  //console.log("Expanding post...");
  //console.log(this);
}
