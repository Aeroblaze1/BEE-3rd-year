const {PrismaClient} = require('./generated/prisma')

const prisma = new PrismaClient();

async function addUser(email,name,password){
     await prisma.user.upsert({
        where: { email: email },
        update: {},
        create: {
            email: email,
            name: name,
            password: password
        }
     })
}

addUser("siddhantb610@gmail.com","Siddhant","1234")
.then(()=>{
    console.log("user added successfully");
})
.catch(err => console.error(err))

addUser("arayan012@gmail.com","Arayan","0987")
.then(()=>{
    console.log("user added successfully");
})
.catch(err => console.error(err))

async function addTweet(content,userId){
    await prisma.tweet.create({
        data:{
            content:content,
            userId:userId
        }
    })
}

addTweet("my first tweet",1)
.then(()=>console.log("tweet is created"))
.catch(err => console.error(err))


async function getAllUser(){
    let allUser = await prisma.user.findMany();
    return allUser;
}

getAllUser().
then((data)=>{
    console.log(data);
})
.catch(err => console.error(err))




//find all tweet by user whos id is 1;

async function getUserTweet(userId){
    let tweets = await prisma.tweet.findMany({
        where:{
            userId:Number(userId)
        }
    })
    return tweets;
}


getUserTweet("1")
.then((data)=>{
    console.log(data)
})
.catch(err => console.error(err))

//user whos id is one wants to update his tweet--> tweet id is 1

async function updateTweet(tweetid,userId,updatedContent){
    let tweet = await prisma.tweet.findUnique({
        where:{
            id:Number(tweetid)
        }
    })
    if(!tweet){
        return "tweet does not exist"
    }
    if(tweet.userId!=Number(userId)){
        return "user cannot update this tweet"
    }

    await prisma.tweet.update({
        where:{
            id:Number(tweetid)
        },
        data:{
            content:updatedContent
        }
    })
}

updateTweet("1","1","update tweet")
.then(()=>{
    console.log("tweet updated successfully")
})
.catch(err => console.error(err))
.finally(() => {
    prisma.$disconnect();
})
