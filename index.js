const epxress = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = epxress();

app.use("/", epxress.static("public"));
app.use(fileUpload());

app.post("/extract-text",(req, res) => {
    if(!req.files && !req.files.pdfFile){
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    })
});

app.listen(3000);