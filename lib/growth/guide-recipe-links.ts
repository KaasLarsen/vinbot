/** Guide → opskrifter med vin i gryden (intern linking). */
export const GUIDE_RECIPE_LINKS: Record<string, readonly { slug: string; label: string }[]> = {
  "vin-til-tapas": [
    { slug: "chorizo-i-rodvin", label: "Chorizo al vino" },
    { slug: "champignons-al-ajillo-med-hvidvin", label: "Champignons al ajillo" },
    { slug: "figner-og-dadler-i-rodvin", label: "Figner og dadler i rødvin" },
    { slug: "spansk-koedboller-i-rodvinsauce", label: "Almóndigas i rødvinsauce" },
    { slug: "syltede-roedloeg-med-hvidvin", label: "Syltede rødløg med hvidvin" },
    { slug: "roedvinsgele-til-charcuteri", label: "Rødvinsgelé til charcuteri" },
  ],
  "vin-til-gryderet": [
    { slug: "coq-au-vin", label: "Coq au vin" },
    { slug: "boeuf-bourguignon", label: "Boeuf bourguignon" },
    { slug: "braiseret-lammeskank-med-rodvin", label: "Braiseret lammeskank" },
    { slug: "braiseret-oksekaebe-med-rodvin", label: "Braiseret oksekaebe" },
    { slug: "svinekaebber-i-rodvinssky", label: "Svinekæber i rødvinssky" },
    { slug: "estofado-oksestuvning-i-rodvin", label: "Estofado" },
  ],
  "vin-til-nytaar-og-nytaarsmenu": [
    { slug: "chorizo-i-rodvin", label: "Chorizo al vino" },
    { slug: "figner-og-dadler-i-rodvin", label: "Figner og dadler i rødvin" },
  ],
};
