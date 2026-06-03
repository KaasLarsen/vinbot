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
    { slug: "oksesuppe-med-rodvin", label: "Oksesuppe med rødvin" },
  ],
  "vin-til-suppe": [
    { slug: "oksesuppe-med-rodvin", label: "Oksesuppe med rødvin" },
    { slug: "tomatsuppe-med-hvidvin", label: "Tomatsuppe med hvidvin" },
    { slug: "loegsuppe-med-hvidvin", label: "Løgsuppe med hvidvin" },
  ],
  "vin-til-tarteletter": [
    { slug: "tarteletter-i-hvidvin", label: "Tarteletter i hvidvin" },
  ],
  "vin-til-pizza-og-pasta": [
    { slug: "tomatsauce-med-rodvin-til-pizza", label: "Tomatsauce med rødvin" },
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin" },
    { slug: "bolognese-med-rodvin", label: "Bolognese med rødvin" },
  ],
  "rodvin-til-pizza": [
    { slug: "tomatsauce-med-rodvin-til-pizza", label: "Tomatsauce med rødvin til pizza" },
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin" },
  ],
  "vin-til-nytaar-og-nytaarsmenu": [
    { slug: "chorizo-i-rodvin", label: "Chorizo al vino" },
    { slug: "figner-og-dadler-i-rodvin", label: "Figner og dadler i rødvin" },
  ],
  "vin-til-lasagne": [
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin i kødsovs" },
    { slug: "ragu-med-rodvin", label: "Ragù med rødvin" },
  ],
  "vin-til-pizza": [
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin (samme sovs-logik)" },
  ],
  "rodvin-til-pizza": [
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin" },
  ],
  "vin-til-julefrokost": [
    { slug: "roedkaal-med-rodvin", label: "Rødkål med rødvin" },
    { slug: "medister-i-rodvinssauce", label: "Medister i rødvinsauce" },
    { slug: "flaesketesteg-med-rodvin-i-brun-sovs", label: "Flæskesteg med rødvin" },
    { slug: "kartoffelgratin-med-hvidvin", label: "Kartoffelgratin med hvidvin" },
    { slug: "groenlangkaal-med-hvidvin", label: "Grønlangkål med hvidvin" },
    { slug: "fiskefrikadeller-i-hvidvinsauce", label: "Fiskefrikadeller i hvidvinsauce" },
    { slug: "tarteletter-i-hvidvin", label: "Tarteletter i hvidvin" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "fiskefrikadeller-i-hvidvinsauce", label: "Fiskefrikadeller i hvidvinsauce" },
    { slug: "fisk-i-hvidvinsauce", label: "Fisk i hvidvinsauce" },
    { slug: "torsk-i-hvidvin", label: "Torsk i hvidvin" },
  ],
  "vin-til-boeff": [
    { slug: "cote-de-boeuf-med-rodvin", label: "Côte de bœuf med rødvin" },
    { slug: "peberboef-med-rodvinsauce", label: "Peberbøf med rødvinsauce" },
    { slug: "roedvinssauce-til-boef", label: "Rødvinsauce til bøf" },
  ],
  "vin-til-grill-og-bbq": [
    { slug: "porchetta-med-hvidvin", label: "Porchetta med hvidvin" },
    { slug: "cote-de-boeuf-med-rodvin", label: "Côte de bœuf med rødvin" },
    { slug: "paella-med-rodvin", label: "Paella med rødvin" },
  ],
  "vin-til-kartoffelmad": [
    { slug: "kartoffelgratin-med-hvidvin", label: "Kartoffelgratin med hvidvin" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "porchetta-med-hvidvin", label: "Porchetta med hvidvin" },
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin" },
    { slug: "bolognese-med-rodvin", label: "Bolognese med rødvin" },
  ],
  "vin-til-spansk-mad": [
    { slug: "paella-med-rodvin", label: "Paella med rødvin" },
    { slug: "paella-med-hvidvin", label: "Paella med hvidvin" },
    { slug: "chorizo-i-rodvin", label: "Chorizo al vino" },
  ],
  "vin-til-wok": [
    { slug: "wok-kylling-med-hvidvin", label: "Wok-kylling med hvidvin" },
  ],
  "vin-til-oksekoed": [
    { slug: "cote-de-boeuf-med-rodvin", label: "Côte de bœuf med rødvin" },
    { slug: "peberboef-med-rodvinsauce", label: "Peberbøf med rødvinsauce" },
    { slug: "hakkeboef-i-rodvinssauce", label: "Hakkebøf i rødvinsauce" },
  ],
  "sangiovese-til-pasta": [
    { slug: "bolognese-med-rodvin", label: "Bolognese med rødvin" },
    { slug: "ragu-med-rodvin", label: "Ragù med rødvin" },
    { slug: "tomatsauce-med-rodvin-til-pizza", label: "Tomatsauce med rødvin" },
  ],
  "vin-til-kylling-og-lyst-koed": [
    { slug: "kyllingefilet-i-rodvin-med-svampe", label: "Kyllingefilet i rødvin" },
    { slug: "coq-au-vin", label: "Coq au vin" },
    { slug: "citronkylling-i-hvidvin", label: "Citronkylling i hvidvin" },
    { slug: "wok-kylling-med-hvidvin", label: "Wok-kylling med hvidvin" },
    { slug: "tarteletter-i-hvidvin", label: "Tarteletter i hvidvin" },
  ],
};
