const postId = document.getElementById("post-id");

// pop up confirm confirmation
function deletePostModal() {
  // Open up a modal
  if (confirm("Are you sure you want to delete this post?")) {
    deletePost();
  } else {
    console.log("Deletion canceled");
  }
}

function deletePost() {
  deleteData(`/api/posts/${postId.innerText}`);

  location.assign("/dashboard");
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

// Editing a post
function editPostModal() {}
