const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const engine = require('express-handlebars');
const { title } = require('process');
const members = require('./Members');


const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Homepage Route
app.get('/', (req, res)=>{
     res.render('index', {
     title: 'Best Player for Each Team',
     members
})
});

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Members API Route
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server is Running on Port ${PORT}`));