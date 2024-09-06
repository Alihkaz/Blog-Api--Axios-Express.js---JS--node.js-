// 


import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;



let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






// 1---GET All posts
app.get("/posts", async (req, res) => {
  res.json(posts);
});





// 2---- creating a new post after requesting that from the server to this api 
app.post("/posts", async (req, res) => {


  let id = (posts.length)+1; //creating an id according to the last id in the array
  let title = (req.body.title); //extracting the title sended throgh the body oghe req to the api 
  let content = (req.body.content);  //extracting the content sended throgh the body oghe req to the api 
  let author = (req.body.author);    //extracting the author sended throgh the body oghe req to the api 
  let date= new Date().toLocaleString();   //getting date and time ! 
  
  let newPost={ id:id , title:title , content:content , author:author , date:date }; //creating the post that will be added to array
  posts.push(newPost); //adding the new post with the array

  res.json(newPost); //sending the response back to the server , it may be rebdered , or used along with 
                     // other data in the home page ! 
});






//3-----------GETING a specific post by id to be edited before submiting---------------------------------

// so the user will first click on the post to be edited , 
// then the server will send a get request to the api to get the data regarding that post to be edited
// so here the route will process this req , and send the data of the post back to the server
// which will render them to the front end , and later when the user clicks confirm
// the server will send again a patch req to the api , where the patch route will take the mission ! 

app.get("/posts/:id", async (req, res) => {
  let postId=  parseInt(req.params.id); //getting the id of the post we want to patchfrom req params
  let post= posts[postId-1]; //getting the post from the array according to the id sended
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(201).json(post);
});












// 4-----------------------------------PATCHing a post --------------------------------------

// when the user clicks submit on the edit page , the server will send a patch req to the api 
// which will update the post according to the id passed in the parans
app.patch("/posts/:id", async (req, res) => {

  const id = parseInt(req.params.id); //getting the id of the post we want to patch 
  const existingPost = posts.find((post) => post.id === id); //finding the post with the above id in the array 
  if (!existingPost) return res.status(404).json({ message: "Post not found" });

  const replacementPost = {
    id: id,
    //if the user sends a new data , then replace the old one with it , if not keep the old data attached to the post(patching) 
    title: req.body.title || existingPost.title, 
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author, 
    date: existingPost.date,  
  };


  const searchIndex = posts.findIndex((post) => post.id === id); //finding the index of the old post to replace it later
  posts[searchIndex] = replacementPost; //replacing the exiting post with old data with the patched post with new data
  
  
  console.log(posts[searchIndex]);
  res.json(replacementPost);



});








//5--------------------DELETING a specific post according to the id provided---------------------------------- 

app.delete("/posts/:id", (req, res) => {

  const id = parseInt(req.params.id); //extracting the id from the params of the request
  const searchIndex = posts.findIndex((post) => post.id === id); //finding the post with the above id in the array 


  if (searchIndex > -1) { //if the post exist

    posts.splice(searchIndex, 1); //deleting the post according to the post id which will be the index 
    res.json({ message: "Post deleted" });

  } 
  
  else {return res.status(404).json({ message: "Post not found" });}
});










// listening on the local port 4000
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});





// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];


// whats happening in this code is that the user send a request to the server , like a get request , then the 
// server send that request to the api through axios and a specific url according to the user request
// after that the api process thye request , and send back the data to the server ,
//  which then process it , pass it and render it in index.ejs as a data !