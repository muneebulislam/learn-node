const express = require('express');
const app = express();
const https = require('https');
app.use(express.json()); // for parsing application/json instead of body-parser
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/joke", (req,res) => {
    res.sendFile(__dirname+"/index.html");
});


app.post("/joke",(req,res) => {
    const query = req.body.containgWord;

    var url = "https://v2.jokeapi.dev/joke/Any?contains="+ query ;
    https.get(url ,(response) => {
        console.log(response.statusCode);
        response.on('data', (d) => {
            const dataObject = JSON.parse(d);
            var jokeString= dataObject.joke;
            var joke = "";
            if(typeof(jokeString)=== 'undefined') {
                joke = "There is no joke related to "+query;
            }
            else{
                joke = jokeString;
            }
            console.log(joke);
            res.write("<h1>Joke containing word: " + query + "</h1>");
            res.write("<h1>And joke is: \n" + joke +"</h1>");
             //Can have multiple res.write statements.
            res.send();//sends whatever is writen through write method
        })
    });

});



app.listen(3000,()=>{
    console.log("Server is running on http//localhost:3000 ");
});