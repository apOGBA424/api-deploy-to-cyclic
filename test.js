const dataList = require('./mock_data');


// output data object
// console.log(dataList);

// output only users data
// console.log(dataList[0]);

// output only users data
// console.log(dataList[0]['users']);

// output only posts data
// console.log(dataList[1]);

// output only posts' length
// console.log(dataList[1]['posts'].length);


let allPost = dataList[1]['posts'];
let allPost_length = allPost.length;
// console.log(`Number of Posts: ${allPost_length}`);


// output only the author ID(s)
allPost.forEach((data, index) => {
    // console.log(`posts${index} author id : ${data['author_id']}`)
});


// output only users length
const allUsers_length = dataList[0]['users'].length;
console.log(`allUsers_length:  ${allUsers_length}`)

// output only allUsers ID
const allUsers = dataList[0]['users'];
allUsers.forEach((user, index) =>{
    console.log(`user${index} ID:  ${user.id}`)
});


for (let index = 0; index < allPost.length; index++) {
    const allPost_authorID = allPost[index]['author_id'];
    console.log(`allPost_authorID:  ${allPost_authorID}`)
    // console.log(allUsers[allPost_authorID]['name']);
    console.log(allUsers[Number(allPost_authorID-1)]['name']);
}
