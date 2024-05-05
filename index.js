const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;
const Users = require("./MOCK_DATA.json");

// Middleware to parse JSON request body
// app.use(express.json());

//Middleware - Plugin
app.use(express.urlencoded({extended : false}));

app.use((req,res,next)=>{

    console.log("hello from middleware 1");
    //return res.json(({mgs:"Hello"}));
    next();
})


app.use((req,res,next)=>{

    console.log("hello from middleware 2");
    //return res.json(({mgs:"Hello"}));
    next();
})

// Routes

// GET all users
app.get('/api/Users', (req, res) => {
    // Return JSON data
    return res.json(Users);
});

// GET all users as HTML list
app.get('/Users', (req, res) => {
    // Generate HTML list of user names
    const html = `
    <ul>
        ${Users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>`;
    // Send HTML response
    res.send(html);
});

// GET user by ID
app.get('/api/Users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = Users.find((user) => user.id === id);
    if (!user) {
        // If user with given ID is not found, return 404
        return res.status(404).json({ error: 'User not found' });
    }
    // Return JSON data for the found user
    return res.json(user);
});

app.post('/api/Users', (req, res) => {
    const body = req.body;
    Users.push({...body, id: Users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(Users), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: "Internal Server Error"});
        }
        return res.json({status: "pending"});
    });
});

app.patch('/api/Users/:id', (req, res) => {
    //TO DO: Edit a user, you have to give id number as you want to edit
        return res.json({status: "pending"});
    });


app.delete('/api/Users/:id', (req, res) => {
    //TO DO: Delete a user, you have to give id number
    return res.json({status: "pending"});
    });
//these three are same so you can also write them in one as declaring 
//app.route("/api/Users/:id") only once and then .get((req,res) => {})
//.delete((req,res) => {}).it is good practice as you have to change route
//name only once in the code 

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));