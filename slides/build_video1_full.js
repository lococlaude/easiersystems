const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" x 7.5"

const slides = [
  { headline: "$70,000 A YEAR",            support: "MISSED CALLS" },
  { headline: "TWO PLACES",                support: "Which one is your business?" },
  { headline: "3 REASONS",                 support: "Your missed calls cost more" },
  { headline: "POINT 1",                   support: "The Silent Drain" },
  { headline: "POINT 2",                   support: "The 128-Hour Gap" },
  { headline: "POINT 3",                   support: "The 90-Second Fix" },
  { headline: "THE REAL PROBLEM",          support: "System failure. Not effort." },
  { headline: "5 NEW APPOINTMENTS",        support: "In 30 days or I work free" },
  { headline: 'DM "MATH"',                 support: "@easiersystems" },
];

slides.forEach(({ headline, support }) => {
  let slide = pres.addSlide();
  slide.background = { color: "000000" };

  slide.addText(headline, {
    x: 0.5,
    y: 1.5,
    w: 12.3,
    h: 2.5,
    fontFace: "Montserrat",
    fontSize: 80,
    bold: true,
    color: "FFD700",
    align: "center",
    valign: "middle",
    margin: 0,
  });

  slide.addText(support, {
    x: 0.5,
    y: 4.2,
    w: 12.3,
    h: 1.4,
    fontFace: "Montserrat",
    fontSize: 38,
    bold: false,
    color: "FFFFFF",
    align: "center",
    valign: "middle",
    margin: 0,
  });
});

pres.writeFile({ fileName: "C:\\Users\\19202\\locoslogic\\easier-systems\\slides\\video1_full.pptx" })
  .then(() => console.log("Done: video1_full.pptx saved — 9 slides."))
  .catch(err => console.error("Error:", err));
