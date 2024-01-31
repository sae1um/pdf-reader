const inputFile = document.getElementById("inputFile");
const uploadBtn = document.getElementById("uploadBtn");
const resultTxt = document.getElementById("resultTxt");

uploadBtn.addEventListener("click", () => {
    const formData = new FormData();
    formData.append("pdfFile", inputFile.files[0]);

    fetch("/extract-text", {
        method: "post",
        body: formData,
    }).then((response) => {
            return response.text();
        }).then((extractedText) => {
            const StartIndex = extractedText.indexOf(
                "Put a tick () in the box next to the one correct answer for each question."
            );
            const EndIndex = extractedText.indexOf("Section A T");
            const cleanedText = extractedText.slice(StartIndex + 76, EndIndex - 1);
            resultTxt.value = cleanedText;
            // extractQuestion(extractedText);
        });
});
