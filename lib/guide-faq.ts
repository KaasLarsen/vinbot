/** FAQ til FAQPage JSON-LD — korte, rene svar (flere sider kan tilføjes efter behov). */
export const guideFaqBySlug: Record<string, { question: string; answer: string }[]> = {
  "vin-til-sushi": [
    {
      question: "Hvilken vin passer bedst til sushi og sashimi?",
      answer:
        "Tør hvidvin med tydelig syre og bobler er ofte bedst: riesling, grüner veltliner, muscadet, albariño eller champagne/cremant. De matcher rå fisk og renser ganen uden tung fad eller hårde tanniner.",
    },
    {
      question: "Kan man drikke rødvin til sushi?",
      answer:
        "Ja, primært til uramaki eller ruller med fed mayo, avocado eller sprød tempura. Vælg let rød med lav tannin, fx gamay eller kølig pinot noir, og undgå unge, kraftige røde med høj alkohol.",
    },
    {
      question: "Hvorfor smager tung rødvin ofte dårligt til sushi?",
      answer:
        "Kraftige tanniner og høj alkohol konkurrerer med soja, wasabi og delikat fisk og kan føles bittert eller dominerende. Sushi har typisk brug for friskhed og syre frem for struktur fra grove tanniner.",
    },
  ],
  "opbevaring-af-vin-temperatur-og-aabnet-flaske": [
    {
      question: "Hvilken temperatur skal rødvin have?",
      answer:
        "De fleste rødvine smager bedst omkring 15–18 °C afhængigt af krop og tanniner. Let rød kan med fordel serveres 14–16 °C; kraftig rød ofte 16–18 °C. Afkøl flasken kort, hvis rummet er over ca. 22 °C.",
    },
    {
      question: "Hvor kold skal hvidvin og rosé være?",
      answer:
        "Let hvid og rosé typisk 8–12 °C. Fyldig hvid (fx moden chardonnay) ofte 10–14 °C, så fad og frugt ikke forsvinder, hvis vinen er iskold.",
    },
    {
      question: "Hvilken temperatur skal champagne og bobler have?",
      answer:
        "Champagne og kvalitetsbobler ofte omkring 8–10 °C. Cava og prosecco ofte 6–9 °C. For koldt skjuler aroma; for varmt bliver alkoholen dominerende.",
    },
    {
      question: "Hvilken temperatur skal riesling have?",
      answer:
        "Riesling serveres typisk køligt: omkring 8–12 °C for tør riesling og lidt koldere for sødere udgaver, så syren forbliver frisk.",
    },
    {
      question: "Hvor længe holder en åbnet flaske vin?",
      answer:
        "Tommelfingerregel: let hvid og rosé 2–4 dage i køleskab; fyldig hvid ofte op til 4–5 dage; let rød 2–4 dage; tung ung rød ofte 4–6 dage eller mere; bobler 1–3 dage med god prop. Smag og lugt afgør altid.",
    },
  ],
};
