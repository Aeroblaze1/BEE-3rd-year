//function to get comments data

function getComment(URL){
    axios.get(URL).then((data)=>{
        console.log(data)
    })
    .catch(err=>console.log(err));
}

getComment("https://jsonplaceholder.typicode.com/comments");




/** async and await code
 
 async function getComment(URL) {
    try {
        const response = await axios.get(URL);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

getComment("https://jsonplaceholder.typicode.com/comments");

 */

//function to add new blog
addBlog("https://localhost:3000/blog", "first blog", "first blog description");
async function addBlog(URL,title,description){
   try{
     let newBlog = {
        title:title,
        description:description
    }
let response = axios.post(URL,newBlog);
console.log(response)
   }catch(error){
    console.log(error);
   }
}