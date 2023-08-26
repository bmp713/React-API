
require("dotenv").config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 4000; 
const app = express(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); 
app.use('/assets', express.static('assets'));

app.listen(port, () => 
    console.log('Server listening on port', port) 
);

// MongoDB Atlas for data
const mongoose = require('mongoose'); 
const Posts = require("./posts");

const connection = mongoose.connect(
    'mongodb+srv://bmp713:%40MongoDB310@cluster0.68vf5.mongodb.net/social/?retryWrites=true&w=majority', 
    { useUnifiedTopology: true, dbName: 'social' }
)
    .then( () => {
        console.log('Connected to the database ');
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. ${err}`);
    })


app.get("/read", async (req, res) => {
    try{
        readPosts()
            .then( (result) => {
                console.log("read/ posts => ", result);
                res.send(result);     
            });
    }catch(err){console.log(err)}
})


const readPosts = async () => {
    try{
        const posts = await Posts.find({});

        console.log('readPosts =>', posts);
        return posts;
    }catch(err){console.log(err)}
}

app.get("/read/:id", async (req, res) => {
    try{
        readPost( req.params.id )
            .then( (result) => {
                console.log("read/id => ", result);
                res.send(result);    
            });
    }catch(err){console.log(err)};
})


const readProperty = async (id) => {
    console.log("readProperty id =>",id);
    try{
        const post = await Posts.findOne({id:id});
        console.log('readProperty =>', property);
        return posts;
    }catch(err){
        console.log(err);
    }
}


app.post("/create", async (req, res) => {
    console.log("/create req.body =>", req.body);

    try{
        let post = {
            id: req.body.id,
            city: req.body.city,
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            rooms: req.body.rooms,
            price: req.body.price,
            img: req.body.img
        }

        console.log("/create =", post);
        createPost(post);

        //await property.save();
        res.send( post ); 

    }catch(err){
        console.log(err);
    }

}); 


const createPost = async (data) => {
    try{
        const post = await Posts.create(data);
        console.log('createPost =>', post);
        return post;
    }catch(err){
        console.log(err);
    }
}


// // Update product
// app.post("/update/:id", async (req, res) => {
//     console.log("/update POST req.body =>", req.body);

//     try{
//         const property = await Properties.findOne({id:req.params.id});
//         console.log('property =>', property);

//         property.city = req.body.city;
//         property.name = req.body.name;
//         property.type = req.body.type;
//         property.rooms = req.body.rooms;
//         property.price = req.body.price;
//         property.description = req.body.description;
//         property.img = req.body.img;

//         await property.save();
//         res.send( property );

//     }catch(err){
//         console.log(err);
//     }

// }); 


// // Delete product by id
// app.delete("/delete/:id", async (req, res) => {
    
//     try{
//         const property = await Properties.deleteOne({id:req.params.id});
//         console.log('property =>', property);

//         //await property.save();
//         res.send( property );
//         //res.status(204).send();
//     }catch(err){
//         console.log(err);
//     }

// }); 


// // Access file from multer
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./assets/")
//     },
//     filename: function (req, file, cb) {
//         console.log(file.mimetype);
//         console.log("file = ", file);

//         cb(null, Date.now() + '.jpg')  
//         // cb(null, file.originalfilename);  
//     }
// });
// const upload = multer({
//     storage: storage
// })


// // Upload new image
// app.post("/upload", upload.single("image"), async (req, res) => {

//     console.log("/upload req.file =>", req.file);
//     console.log("/upload POST req.body =>", req.body);
//     console.log("/upload req.file.filename =>", req.file.filename);
//     console.log("/upload req.file.originalname =>", req.file.originalname);
    
//     // Pass new name of file to create() 
//     imageName = req.file.filename;


//     // Upload image file to Firestore, S3
//     // Initialize Cloud Storage reference
//     // const firebase = initializeApp(firebaseConfig);
//     // const storage = getStorage(firebase);

//     // const file = req.file.filename;
//     // const storageRef = ref(storage, 'assets/'+ file.name );

//     // uploadBytes(storageRef, file )
//     //     .then( (snapshot) => {
//     //         console.log('server.js => Uploaded file, ', file);
//     //         console.log('server.js => snapshot =>', snapshot);

//     //         getDownloadURL(snapshot.ref).then( (url) => {
//     //             console.log('getDownloadURL() url =>', url);
//     //             this.url =  url;
//     //         });
//     //     })
//     //     .catch( (error) => {
//     //         console.log("File error =>", error);
//     //     })


//     try{
//         res.send(req.file);
//     }catch(err){
//         console.log(err);
//     }

 
// }); 



