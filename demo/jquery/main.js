$(document).ready(() => {
    $("body").bootstrapMaterialDesign();
    const diacriticRemover = new DiacriticRemover();

    $("#diacriticText")
        .on("paste keydown keyup", ({ target }) => $("#cleanText").val(diacriticRemover.replace(target.value)));
});
