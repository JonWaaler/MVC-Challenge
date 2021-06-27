/* POST HTML SET-UP
<div class="row post mx-auto">
    <h3 class="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Debitis quaerat tempora ea cupiditate nisi, quo optio vero distinctio
      consequuntur culpa!</h3>
    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Dolorum nostrum laudantium ratione repellat voluptatem omnis
      corporis, cumque officiis magnam aliquid, commodi qui quis! Illo animi
      praesentium in aut maiores odio distinctio numquam sed corporis natus!
      Saepe similique atque deleniti in modi, laboriosam optio ipsa non
      voluptatum assumenda quos animi enim.</p>
  </div>
*/
// post information
const postTitle = document.getElementById("title");
const postContent = document.getElementById("desc");

function createPost() {
  postData("/api/posts", {
    title: postTitle.value,
    content: postContent.value,
    userId: 1,
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
