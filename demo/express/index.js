const express = require("express");
const { DiacriticRemover } = require("@marketto/diacritic-remover");
const diacriticRemover = new DiacriticRemover();
const server = express();

server.get("/diacritic-remover/:text", (req, res) => {
    res.send(diacriticRemover.replace(req.params.text));
});

server.listen(3000, () => console.log("Running on port 3000"));