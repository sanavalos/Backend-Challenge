var express = require("express");
var app = express();
var PORT = 3000;
const axios = require("axios");

const getPostsInfo = async () => {
  const allPosts = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  const apiInfo = allPosts.data.map((post) => {
    return {
      userId: post.userId,
      id: post.id,
      title: post.title,
      body: post.body,
    };
  });
  return apiInfo;
};

const getUsersInfo = async () => {
  const allUsers = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );
  const apiInfo = allUsers.data.map((user) => {
    return {
      name: user.name,
      id: user.id,
    };
  });
  return apiInfo;
};

const concatUsersPosts = async () => {
  const getPosts = await getPostsInfo();
  const getUsers = await getUsersInfo();
  const postsUsers = [];
  for (let i = 0; i < getPosts.length; i++) {
    const post = getPosts[i];
    for (let j = 0; j < getUsers.length; j++) {
      const user = getUsers[j];
      if (post.userId === user.id) {
        post.userName = user.name;
        postsUsers.push(post);
      }
    }
  }
  return postsUsers;
};

app.get("/postuser", async (req, res) => {
  try {
    const getAll = await concatUsersPosts();
    res.send(getAll);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
