const fs = require("fs");
const pdf = require("pdf-parse");

const pdfFile = fs.readFileSync("OCRQS2.pdf");

async function extractPDF() {
  try {
    const data = await pdf(pdfFile);
    const result = data.text;
    console.log(typeof result);
    return result;
  } catch (error) {
    console.error("Error extracting text:", error);
    return null;
  }
}

async function main() {
  const result = await extractPDF();
  // console.log(result);
  extractText(result);
}

function extractText(file) {
  const sectionAStartIndex = file.indexOf("Put a tick () in the box next to the one correct answer for each question.");
  const sectionATotalEndIndex = file.indexOf("Section A T");
  const extractedText = file.slice(sectionAStartIndex + 76, sectionATotalEndIndex - 1);
  console.log(extractedText);
  
  fs.writeFile("pdf.txt", file, (err) => {});
  // extractQuestion(extractedText);
}

function extractQuestion(question){

}

main();


// ([0-9A-D]+)[\n\s]+([^\?]+\?)