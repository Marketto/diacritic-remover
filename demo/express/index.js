const express = require("express");
const DiacriticRemover = require("@marketto/diacritic-remover");
const LATIN_DICT = require("@marketto/diacritic-remover/dictionaries/latin.json");
const i18nGlobal = require("@marketto/diacritic-remover/dictionaries/i18n/global.json");
const diacriticRemover = new DiacriticRemover(LATIN_DICT, i18nGlobal);
const server = express();

server.get("/diacritic-remover/:text", (req, res) => {
    res.send(diacriticRemover.replace(req.params.text));
});

server.listen(3000, () => console.log("Running on port 3000"));