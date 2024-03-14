const fs = require("fs");
const pdf = require("pdf-parse");

const pdfFile = fs.readFileSync("OCRQS2.pdf");

async function extractPDF() {
  try {
    const data = await pdf(pdfFile);
    const result = data.text;
    // console.log(typeof result);
    return result;
  } catch (error) {
    console.error("Error extracting text:", error);
    return null;
  }
}

async function main() {
  const result = await extractPDF();
  const extractedQuestions = extractText(result);
}

function extractText(pdf) {
  const StartIndex = pdf.indexOf("Put a tick () in the box next to the one correct answer for each question.");
  const EndIndex = pdf.indexOf("Section A T");
  let extractedText = pdf.slice(StartIndex + 76, EndIndex - 1);
  const regex = /^.*©.*$/gm;

  extractedText = extractedText.replace(regex, "");
  // Remove © OCR 2022
  console.log(extractedText);
  fs.writeFile("mp.txt", extractedText, (err) => {});
  // return extractedText;
}

main();


// ([0-9A-D]+)[\n\s]+([^\?]+\?)
// ([0-9A-D]+)[\n\s]+([^\[]+\[)