const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" x 7.5" — closest to 1920x1080 ratio

// SLIDE 1 — CREDIBILITY OPEN
let slide1 = pres.addSlide();
slide1.background = { color: "000000" };

slide1.addText("$70,000 A YEAR", {
  x: 0,
  y: 1.8,
  w: 13.3,
  h: 2.0,
  fontFace: "Montserrat",
  fontSize: 88,
  bold: true,
  color: "FFD700",
  align: "center",
  valign: "middle",
  margin: 0,
});

slide1.addText("MISSED CALLS", {
  x: 0,
  y: 4.0,
  w: 13.3,
  h: 1.2,
  fontFace: "Montserrat",
  fontSize: 40,
  bold: false,
  color: "FFFFFF",
  align: "center",
  valign: "middle",
  margin: 0,
});

// SLIDE 2 — BINARY FRAME
let slide2 = pres.addSlide();
slide2.background = { color: "000000" };

slide2.addText("TWO PLACES", {
  x: 0,
  y: 1.8,
  w: 13.3,
  h: 2.0,
  fontFace: "Montserrat",
  fontSize: 88,
  bold: true,
  color: "FFD700",
  align: "center",
  valign: "middle",
  margin: 0,
});

slide2.addText("Which one is your business?", {
  x: 0,
  y: 4.0,
  w: 13.3,
  h: 1.2,
  fontFace: "Montserrat",
  fontSize: 40,
  bold: false,
  color: "FFFFFF",
  align: "center",
  valign: "middle",
  margin: 0,
});

pres.writeFile({ fileName: "C:\\Users\\19202\\locoslogic\\easier-systems\\slides\\video1_slides.pptx" })
  .then(() => console.log("Done: video1_slides.pptx saved."))
  .catch(err => console.error("Error:", err));
