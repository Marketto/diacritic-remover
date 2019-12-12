import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import DiacriticRemover from "@marketto/diacritic-remover";
import LATIN_DICT from "@marketto/diacritic-remover/dictionaries/latin.json";
import i18n_global from "@marketto/diacritic-remover/dictionaries/i18n/global.json";

import "./diacritic-remover.page.css";

const diacriticRemover = new DiacriticRemover(LATIN_DICT, i18n_global);

export default () => {
    const [diacriticText, setDiacriticText] = React.useState("");
    const [cleanText, setCleanText] = React.useState("");
    const diacriticTextChange = ({ target }) => {
        setCleanText(diacriticRemover.replace(target.value));
        return setDiacriticText(target.value);
    };
    return (
        <div className="diacritic-remover-page">
            <Typography variant="h6" gutterBottom>
                Diacritic Remover
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="diacriticText"
                        name="diacriticText"
                        label="Type here text with accents/diacritics"
                        variant="outlined"
                        value={diacriticText}
                        onChange={diacriticTextChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        id="cleanText"
                        name="cleanText"
                        label="Diacritic-free text"
                        value={cleanText || " "}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </div>
    );
};
