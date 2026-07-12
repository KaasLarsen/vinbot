/** Guide → opskrifter med vin i gryden (intern linking). */
export const GUIDE_RECIPE_LINKS: Record<string, readonly { slug: string; label: string }[]> = {
  "vin-til-tapas": [
    { slug: "chorizo-i-rodvin", label: "Chorizo al vino" },
    { slug: "champignons-al-ajillo-med-hvidvin", label: "Champignons al ajillo" },
    { slug: "figner-og-dadler-i-rodvin", label: "Figner og dadler i rødvin" },
    { slug: "spansk-koedboller-i-rodvinsauce", label: "Almóndigas i rødvinsauce" },
    { slug: "syltede-roedloeg-med-hvidvin", label: "Syltede rødløg med hvidvin" },
    { slug: "roedvinsgele-til-charcuteri", label: "Rødvinsgelé til charcuteri" },
    { slug: "chimichurri-med-rodvin", label: "Chimichurri med rødvin" },
    { slug: "romesco-med-rodvin", label: "Romesco med rødvin" },
    { slug: "hummus-med-hvidvin", label: "Hummus med hvidvin" },
    { slug: "aioli-med-hvidvin", label: "Aioli med hvidvin" },
    { slug: "marinerede-oliven-med-hvidvin", label: "Marinerede oliven med hvidvin" },
    { slug: "kamskjell-med-hvidvin", label: "Kamskjell med hvidvin" },
  ],
  "vin-til-gryderet": [
    { slug: "coq-au-vin", label: "Coq au vin" },
    { slug: "boeuf-bourguignon", label: "Boeuf bourguignon" },
    { slug: "braiseret-lammeskank-med-rodvin", label: "Braiseret lammeskank" },
    { slug: "braiseret-oksekaebe-med-rodvin", label: "Braiseret oksekaebe" },
    { slug: "svinekaebber-i-rodvinssky", label: "Svinekæber i rødvinssky" },
    { slug: "estofado-oksestuvning-i-rodvin", label: "Estofado" },
    { slug: "oksesuppe-med-rodvin", label: "Oksesuppe med rødvin" },
    { slug: "braiseret-kylling-med-rodvin", label: "Braiseret kylling med rødvin" },
    { slug: "stuvet-kylling-med-hvidvin", label: "Stuvet kylling med hvidvin" },
    { slug: "cassoulet-med-rodvin", label: "Cassoulet med rødvin" },
    { slug: "caponata-med-rodvin", label: "Caponata med rødvin" },
    { slug: "lammetagine-med-rodvin", label: "Lammetagine med rødvin" },
    { slug: "feijoada-med-rodvin", label: "Feijoada med rødvin" },
    { slug: "bigos-med-rodvin", label: "Bigos med rødvin" },
  ],
  "vin-til-suppe": [
    { slug: "oksesuppe-med-rodvin", label: "Oksesuppe med rødvin" },
    { slug: "tomatsuppe-med-hvidvin", label: "Tomatsuppe med hvidvin" },
    { slug: "loegsuppe-med-hvidvin", label: "Løgsuppe med hvidvin" },
    { slug: "kyllingesuppe-med-hvidvin", label: "Kyllingesuppe med hvidvin" },
    { slug: "champignonsuppe-med-hvidvin", label: "Champignonsuppe med hvidvin" },
    { slug: "sellerisuppe-med-hvidvin", label: "Sellerisuppe med hvidvin" },
    { slug: "caldeirada-med-hvidvin", label: "Caldeirada med hvidvin" },
    { slug: "krebsesuppe-med-hvidvin", label: "Krebsesuppe med hvidvin" },
    { slug: "minestrone-med-rodvin", label: "Minestrone med rødvin" },
  ],
  "vin-til-tarteletter": [
    { slug: "tarteletter-i-hvidvin", label: "Tarteletter i hvidvin" },
    { slug: "vol-au-vent-med-hvidvin", label: "Vol-au-vent med hvidvin" },
  ],
  "vin-til-pizza-og-pasta": [
    { slug: "pasta-puttanesca-med-rodvin", label: "Pasta puttanesca med rødvin" },
    { slug: "tomatsauce-med-rodvin-til-pizza", label: "Tomatsauce med rødvin" },
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin" },
    { slug: "bolognese-med-rodvin", label: "Bolognese med rødvin" },
    { slug: "pesto-med-hvidvin", label: "Pesto med hvidvin" },
    { slug: "caponata-med-rodvin", label: "Caponata med rødvin" },
    { slug: "pesto-pasta-hvidvin", label: "Pesto-pasta med hvidvin" },
  ],
  "rodvin-til-pizza": [
    { slug: "tomatsauce-med-rodvin-til-pizza", label: "Tomatsauce med rødvin til pizza" },
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin" },
  ],
  "vin-til-nytaar-og-nytaarsmenu": [
    { slug: "gravad-laks-med-hvidvin", label: "Gravad laks med hvidvin" },
    { slug: "oksesteg-med-rodvin", label: "Oksesteg med rødvin" },
    { slug: "chorizo-i-rodvin", label: "Chorizo al vino" },
    { slug: "figner-og-dadler-i-rodvin", label: "Figner og dadler i rødvin" },
    { slug: "okse-wellington-med-rodvinssauce", label: "Okse-wellington med rødvinssauce" },
  ],
  "vin-til-lasagne": [
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin i kødsovs" },
    { slug: "ragu-med-rodvin", label: "Ragù med rødvin" },
  ],
  "vin-til-pizza": [
    { slug: "tomatsauce-med-rodvin-til-pizza", label: "Tomatsauce med rødvin til pizza" },
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin" },
    { slug: "pasta-puttanesca-med-rodvin", label: "Pasta puttanesca med rødvin" },
  ],
  "vin-til-julefrokost": [
    { slug: "roedkaal-med-rodvin", label: "Rødkål med rødvin" },
    { slug: "medister-i-rodvinssauce", label: "Medister i rødvinsauce" },
    { slug: "flaesketesteg-med-rodvin-i-brun-sovs", label: "Flæskesteg med rødvin" },
    { slug: "kartoffelgratin-med-hvidvin", label: "Kartoffelgratin med hvidvin" },
    { slug: "groenlangkaal-med-hvidvin", label: "Grønlangkål med hvidvin" },
    { slug: "fiskefrikadeller-i-hvidvinsauce", label: "Fiskefrikadeller i hvidvinsauce" },
    { slug: "tarteletter-i-hvidvin", label: "Tarteletter i hvidvin" },
    { slug: "gravad-laks-med-hvidvin", label: "Gravad laks med hvidvin" },
    { slug: "svinekam-med-rodvin", label: "Svinekam med rødvin" },
    { slug: "oksesteg-med-rodvin", label: "Oksesteg med rødvin" },
    { slug: "risalamande-med-hvidvin", label: "Risalamande med hvidvin" },
    { slug: "aeblekage-hvidvin-karamel", label: "Æblekage med hvidvin-karamel" },
    { slug: "sild-i-hvidvinseddike", label: "Sild i hvidvinseddike" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "gravad-laks-med-hvidvin", label: "Gravad laks med hvidvin" },
    { slug: "rodspette-med-hvidvin", label: "Rødspætte med hvidvin" },
    { slug: "fiskefrikadeller-i-hvidvinsauce", label: "Fiskefrikadeller i hvidvinsauce" },
    { slug: "fisk-i-hvidvinsauce", label: "Fisk i hvidvinsauce" },
    { slug: "torsk-i-hvidvin", label: "Torsk i hvidvin" },
    { slug: "muslinger-i-hvidvin", label: "Muslinger i hvidvin" },
    { slug: "bouillabaisse-med-hvidvin", label: "Bouillabaisse med hvidvin" },
    { slug: "caldeirada-med-hvidvin", label: "Caldeirada med hvidvin" },
    { slug: "aioli-med-hvidvin", label: "Aioli med hvidvin" },
    { slug: "helleflynder-med-hvidvin", label: "Helleflynder med hvidvin" },
    { slug: "krebsesuppe-med-hvidvin", label: "Krebsesuppe med hvidvin" },
    { slug: "kamskjell-med-hvidvin", label: "Kamskjell med hvidvin" },
    { slug: "oesters-gratineret-med-hvidvin", label: "Østers gratineret med hvidvin" },
  ],
  "vin-til-boeff": [
    { slug: "entrecote-med-rodvinsmarinade", label: "Entrecôte med rødvinsmarinade" },
    { slug: "oksesteg-med-rodvin", label: "Oksesteg med rødvin" },
    { slug: "cote-de-boeuf-med-rodvin", label: "Côte de bœuf med rødvin" },
    { slug: "peberboef-med-rodvinsauce", label: "Peberbøf med rødvinsauce" },
    { slug: "roedvinssauce-til-boef", label: "Rødvinsauce til bøf" },
    { slug: "okse-wellington-med-rodvinssauce", label: "Okse-wellington med rødvinssauce" },
    { slug: "bearnaisesauce-med-hvidvin", label: "Bearnaisesauce med hvidvin" },
  ],
  "vin-til-grill-og-bbq": [
    { slug: "svineribs-med-rodvin", label: "Svineribs med rødvin" },
    { slug: "entrecote-med-rodvinsmarinade", label: "Entrecôte med rødvinsmarinade" },
    { slug: "svinekam-med-rodvin", label: "Svinekam med rødvin" },
    { slug: "porchetta-med-hvidvin", label: "Porchetta med hvidvin" },
    { slug: "cote-de-boeuf-med-rodvin", label: "Côte de bœuf med rødvin" },
    { slug: "lammekoteletter-i-rodvin", label: "Lammekoteletter i rødvin" },
    { slug: "paella-med-rodvin", label: "Paella med rødvin" },
    { slug: "pulled-pork-med-rodvin", label: "Pulled pork med rødvin" },
    { slug: "chimichurri-med-rodvin", label: "Chimichurri med rødvin" },
    { slug: "romesco-med-rodvin", label: "Romesco med rødvin" },
    { slug: "brisket-braiseret-i-rodvin", label: "Brisket braiseret i rødvin" },
  ],
  "vin-til-kartoffelmad": [
    { slug: "kartoffelgratin-med-hvidvin", label: "Kartoffelgratin med hvidvin" },
    { slug: "kartoffelmos-med-hvidvin", label: "Kartoffelmos med hvidvin" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "pasta-puttanesca-med-rodvin", label: "Pasta puttanesca med rødvin" },
    { slug: "fennikelkylling-med-hvidvin", label: "Fennikelkylling med hvidvin" },
    { slug: "porchetta-med-hvidvin", label: "Porchetta med hvidvin" },
    { slug: "lasagne-med-rodvin", label: "Lasagne med rødvin" },
    { slug: "bolognese-med-rodvin", label: "Bolognese med rødvin" },
    { slug: "pesto-med-hvidvin", label: "Pesto med hvidvin" },
    { slug: "caponata-med-rodvin", label: "Caponata med rødvin" },
    { slug: "minestrone-med-rodvin", label: "Minestrone med rødvin" },
    { slug: "carpaccio-med-hvidvindressing", label: "Carpaccio med hvidvindressing" },
    { slug: "tiramisu-med-marsala-og-hvidvin", label: "Tiramisu med marsala og hvidvin" },
  ],
  "vin-til-spansk-mad": [
    { slug: "paella-med-rodvin", label: "Paella med rødvin" },
    { slug: "paella-med-hvidvin", label: "Paella med hvidvin" },
    { slug: "chorizo-i-rodvin", label: "Chorizo al vino" },
    { slug: "sangria-med-rodvin", label: "Sangria med rødvin" },
  ],
  "vin-til-wok": [
    { slug: "wok-kylling-med-hvidvin", label: "Wok-kylling med hvidvin" },
    { slug: "wok-rejer-hvidvin", label: "Wok-rejer med hvidvin" },
  ],
  "vin-til-oksekoed": [
    { slug: "oksesteg-med-rodvin", label: "Oksesteg med rødvin" },
    { slug: "entrecote-med-rodvinsmarinade", label: "Entrecôte med rødvinsmarinade" },
    { slug: "cote-de-boeuf-med-rodvin", label: "Côte de bœuf med rødvin" },
    { slug: "peberboef-med-rodvinsauce", label: "Peberbøf med rødvinsauce" },
    { slug: "hakkeboef-i-rodvinssauce", label: "Hakkebøf i rødvinsauce" },
    { slug: "okse-wellington-med-rodvinssauce", label: "Okse-wellington med rødvinssauce" },
    { slug: "brisket-braiseret-i-rodvin", label: "Brisket braiseret i rødvin" },
    { slug: "bearnaisesauce-med-hvidvin", label: "Bearnaisesauce med hvidvin" },
  ],
  "vin-til-lam": [
    { slug: "lammekoteletter-i-rodvin", label: "Lammekoteletter i rødvin" },
    { slug: "braiseret-lammeskank-med-rodvin", label: "Braiseret lammeskank" },
    { slug: "lammegryde-mynte-hvidvin", label: "Lammegryde med mynte og hvidvin" },
    { slug: "lammetagine-med-rodvin", label: "Lammetagine med rødvin" },
  ],
  "vin-til-svinekoed": [
    { slug: "svinekam-med-rodvin", label: "Svinekam med rødvin" },
    { slug: "svineribs-med-rodvin", label: "Svineribs med rødvin" },
    { slug: "svinefilet-i-rodvinssauce", label: "Svinefilet i rødvinsauce" },
    { slug: "porchetta-med-hvidvin", label: "Porchetta med hvidvin" },
    { slug: "svinebryst-braiseret-i-rodvin", label: "Svinebryst braiseret i rødvin" },
  ],
  "sangiovese-til-pasta": [
    { slug: "pasta-puttanesca-med-rodvin", label: "Pasta puttanesca med rødvin" },
    { slug: "bolognese-med-rodvin", label: "Bolognese med rødvin" },
    { slug: "ragu-med-rodvin", label: "Ragù med rødvin" },
    { slug: "tomatsauce-med-rodvin-til-pizza", label: "Tomatsauce med rødvin" },
  ],
  "vin-til-kylling-og-lyst-koed": [
    { slug: "braiseret-kylling-med-rodvin", label: "Braiseret kylling med rødvin" },
    { slug: "fennikelkylling-med-hvidvin", label: "Fennikelkylling med hvidvin" },
    { slug: "stuvet-kylling-med-hvidvin", label: "Stuvet kylling med hvidvin" },
    { slug: "kyllingesuppe-med-hvidvin", label: "Kyllingesuppe med hvidvin" },
    { slug: "kyllingefilet-i-rodvin-med-svampe", label: "Kyllingefilet i rødvin" },
    { slug: "coq-au-vin", label: "Coq au vin" },
    { slug: "citronkylling-i-hvidvin", label: "Citronkylling i hvidvin" },
    { slug: "wok-kylling-med-hvidvin", label: "Wok-kylling med hvidvin" },
    { slug: "tarteletter-i-hvidvin", label: "Tarteletter i hvidvin" },
  ],
  "vin-til-vegetar-og-gront": [
    { slug: "champignonsuppe-med-hvidvin", label: "Champignonsuppe med hvidvin" },
    { slug: "sellerisuppe-med-hvidvin", label: "Sellerisuppe med hvidvin" },
    { slug: "ratatouille-med-hvidvin", label: "Ratatouille med hvidvin" },
    { slug: "vegetar-gryderet-rodvin", label: "Vegetar-gryderet med rødvin" },
    { slug: "shakshuka-med-hvidvin", label: "Shakshuka med hvidvin" },
    { slug: "hummus-med-hvidvin", label: "Hummus med hvidvin" },
    { slug: "romesco-med-rodvin", label: "Romesco med rødvin" },
    { slug: "marinerede-oliven-med-hvidvin", label: "Marinerede oliven med hvidvin" },
    { slug: "caponata-med-rodvin", label: "Caponata med rødvin" },
    { slug: "minestrone-med-rodvin", label: "Minestrone med rødvin" },
  ],
  "vin-til-nachos": [
    { slug: "nachos-med-rodvinskaesesovs", label: "Nachos med rødvinskaesesovs" },
  ],
  "vin-til-kebab-og-shawarma": [
    { slug: "shawarma-kylling-med-hvidvin", label: "Shawarma-kylling med hvidvin" },
    { slug: "kebab-spyd-med-rodvin", label: "Kebab-spyd med rødvin" },
  ],
  "vin-til-burger": [
    { slug: "burger-med-rodvinsglace", label: "Burger med rødvinsglace" },
  ],
  "vin-til-pho": [
    { slug: "pho-kylling-med-hvidvin", label: "Pho med kylling og hvidvin" },
  ],
  "vin-til-ramen": [
    { slug: "ramen-kylling-med-hvidvin", label: "Ramen med kylling og hvidvin" },
  ],
  "vin-til-tacos": [
    { slug: "tacos-med-rodvin-okse", label: "Tacos med okse og rødvin" },
  ],
  "vin-til-karryretter": [
    { slug: "karrykylling-med-hvidvin", label: "Karrykylling med hvidvin" },
  ],
  "vin-til-ceviche": [
    { slug: "ceviche-med-hvidvin", label: "Ceviche med hvidvin" },
  ],
  "vin-til-quiche": [
    { slug: "quiche-med-hvidvin", label: "Quiche med hvidvin" },
  ],
  "vin-til-sild": [
    { slug: "sild-i-hvidvinseddike", label: "Sild i hvidvinseddike" },
    { slug: "stegte-sild-i-hvidvin", label: "Stegte sild i hvidvin" },
  ],
  "vin-til-falafel-og-hummus": [
    { slug: "falafel-tallerken-med-hvidvin", label: "Falafel-tallerken med hvidvin" },
  ],
  "vin-til-asiatisk-mad": [
    { slug: "pad-thai-med-hvidvin", label: "Pad thai med hvidvin" },
    { slug: "dim-sum-kylling-hvidvin", label: "Dim sum med kylling og hvidvin" },
    { slug: "couscous-kylling-med-hvidvin", label: "Couscous med kylling og hvidvin" },
    { slug: "pho-kylling-med-hvidvin", label: "Pho med kylling og hvidvin" },
    { slug: "ramen-kylling-med-hvidvin", label: "Ramen med kylling og hvidvin" },
  ],
  "vin-til-laks": [
    { slug: "grillet-laks-hvidvin-dressing", label: "Grillet laks med hvidvindressing" },
  ],
  "vin-til-sushi": [
    { slug: "dim-sum-kylling-hvidvin", label: "Dim sum med kylling og hvidvin" },
  ],
  "vin-til-stegt-flaesk": [
    { slug: "stegt-flaesk-i-hvidvinsauce", label: "Stegt flæsk i hvidvinsauce" },
  ],
  "vin-til-smorrebrod": [
    { slug: "sild-i-hvidvinseddike", label: "Sild i hvidvinseddike" },
    { slug: "stegte-sild-i-hvidvin", label: "Stegte sild i hvidvin" },
    { slug: "aebleflaesk-med-hvidvin", label: "Æbleflæsk med hvidvin" },
    { slug: "frikadeller-i-hvidvinsauce", label: "Frikadeller i hvidvinsauce" },
  ],
  "vin-til-flaesketesteg": [
    { slug: "flaesketesteg-med-rodvin-i-brun-sovs", label: "Flæskesteg med rødvin i brun sovs" },
    { slug: "roedkaal-med-rodvin", label: "Rødkål med rødvin" },
  ],
  "vin-til-graesk-mad": [
    { slug: "moussaka-med-rodvin", label: "Moussaka med rødvin" },
    { slug: "paella-med-hvidvin", label: "Paella med hvidvin" },
    { slug: "chorizo-i-rodvin", label: "Chorizo al vino (tapas-stil)" },
  ],
  "vin-til-mortensaften": [
    { slug: "andesteg-med-port-og-hvidvin", label: "Andesteg med port og hvidvin" },
    { slug: "medister-i-rodvinssauce", label: "Medister i rødvinsauce" },
    { slug: "roedkaal-med-rodvin", label: "Rødkål med rødvin" },
  ],
  "vin-til-poelser-og-kartoffel": [
    { slug: "poelser-i-rodvinsglace", label: "Pølser i rødvinsglace" },
  ],
  "vin-til-roedgroed": [
    { slug: "roedgroed-med-portvin", label: "Rødgrød med portvin" },
  ],
  "vin-til-kalkun": [
    { slug: "kalkunsteg-med-hvidvin", label: "Kalkunsteg med hvidvin" },
  ],
  "vin-til-hummer": [
    { slug: "hummer-i-hvidvinsauce", label: "Hummer i hvidvinsauce" },
  ],
  "vin-til-paaske-og-paaskefrokost": [
    { slug: "lammesteg-med-rodvin-rosmarin", label: "Lammesteg med rødvin og rosmarin" },
  ],
  "vin-til-mexicansk-mad": [
    { slug: "enchiladas-med-rodvin", label: "Enchiladas med rødvin" },
  ],
  "vin-til-thai-mad": [
    { slug: "thai-gron-karry-med-hvidvin", label: "Thai grøn karry med hvidvin" },
  ],
  "vin-til-brittisk-mad": [
    { slug: "shepherd-pie-med-rodvin", label: "Shepherd's pie med rødvin" },
    { slug: "okse-wellington-med-rodvinssauce", label: "Okse-wellington med rødvinssauce" },
  ],
  "vin-til-vietnamesisk-mad": [
    { slug: "bun-cha-med-hvidvin", label: "Bun cha med hvidvin" },
  ],
  "vin-til-kinesisk-mad": [
    { slug: "kung-pao-kylling-med-hvidvin", label: "Kung pao kylling med hvidvin" },
  ],
  "vin-til-spareribs": [
    { slug: "pulled-pork-med-rodvin", label: "Pulled pork med rødvin" },
    { slug: "brisket-braiseret-i-rodvin", label: "Brisket braiseret i rødvin" },
  ],
  "vin-til-aebleskiver": [
    { slug: "aebleskiver-med-hvidvin", label: "Æbleskiver med hvidvin" },
  ],
  "vin-til-frikadeller": [
    { slug: "karbonader-i-hvidvinsauce", label: "Karbonader i hvidvinsauce" },
  ],
  "vin-til-torsk": [
    { slug: "torsk-i-rodvinsauce", label: "Torsk i rødvinsauce" },
    { slug: "torsk-i-hvidvin", label: "Torsk i hvidvin" },
    { slug: "helleflynder-med-hvidvin", label: "Helleflynder med hvidvin" },
  ],
  "vin-til-moussaka": [
    { slug: "moussaka-med-rodvin", label: "Moussaka med rødvin" },
  ],
  "vin-til-carbonara": [
    { slug: "carbonara-med-hvidvin", label: "Carbonara med hvidvin" },
  ],
  "vin-til-risotto": [
    { slug: "risotto-med-hvidvin", label: "Risotto med hvidvin" },
  ],
  "vin-til-paella": [
    { slug: "paella-med-rodvin", label: "Paella med rødvin" },
  ],
  "vin-til-chili-con-carne": [
    { slug: "chili-con-carne-med-rodvin", label: "Chili con carne med rødvin" },
  ],
  "vin-til-medister": [
    { slug: "medister-i-rodvinssauce", label: "Medister i rødvinsauce" },
  ],
  "vin-til-gulasch": [
    { slug: "gullasch-med-rodvin", label: "Gullasch med rødvin" },
    { slug: "gullaschsuppe-med-rodvin", label: "Gullaschsuppe med rødvin" },
    { slug: "bigos-med-rodvin", label: "Bigos med rødvin" },
  ],
  "vin-til-muslinger": [
    { slug: "muslinger-i-hvidvin", label: "Muslinger i hvidvin" },
  ],
  "vin-til-blaeksprutte": [
    { slug: "blaeksprutte-i-rodvin", label: "Blæksprutte i rødvin" },
  ],
  "vin-til-fondue": [
    { slug: "fondue-med-hvidvin", label: "Fondue med hvidvin" },
  ],
  "vin-til-shakshuka": [
    { slug: "shakshuka-med-hvidvin", label: "Shakshuka med hvidvin" },
  ],
  "vin-til-and": [
    { slug: "andesteg-med-port-og-hvidvin", label: "Andesteg med port og hvidvin" },
    { slug: "andebaer-portvin-sauce", label: "Andebryst med portvinsauce" },
    { slug: "andeconfit-med-rodvin", label: "Andeconfit med rødvin" },
    { slug: "canard-a-l-orange-med-rodvin", label: "Canard à l'orange med rødvin" },
  ],
  "vin-til-dessert-og-kransekage": [
    { slug: "paerer-i-rodvin", label: "Pærer i rødvin" },
    { slug: "aebletaerte-med-calvados-og-hvidvin", label: "Æbletærte med calvados og hvidvin" },
    { slug: "aeblekage-hvidvin-karamel", label: "Æblekage med hvidvin-karamel" },
    { slug: "zabaglione-med-hvidvin", label: "Zabaglione med hvidvin" },
    { slug: "tiramisu-med-marsala-og-hvidvin", label: "Tiramisu med marsala og hvidvin" },
  ],
  "vin-til-brasiliansk-mad": [
    { slug: "feijoada-med-rodvin", label: "Feijoada med rødvin" },
  ],
  "vin-til-oesters": [
    { slug: "oesters-gratineret-med-hvidvin", label: "Østers gratineret med hvidvin" },
  ],
  "vin-til-klassisk-fransk-mad": [
    { slug: "bearnaisesauce-med-hvidvin", label: "Bearnaisesauce med hvidvin" },
    { slug: "asparges-i-hvidvinsauce", label: "Asparges i hvidvinsauce" },
    { slug: "canard-a-l-orange-med-rodvin", label: "Canard à l'orange med rødvin" },
  ],
  "vin-til-amerikansk-comfort-mad": [
    { slug: "brisket-braiseret-i-rodvin", label: "Brisket braiseret i rødvin" },
  ],
  "vin-til-tatar-og-carpaccio": [
    { slug: "carpaccio-med-hvidvindressing", label: "Carpaccio med hvidvindressing" },
  ],
  "vin-til-asparges": [
    { slug: "asparges-i-hvidvinsauce", label: "Asparges i hvidvinsauce" },
  ],
  "vin-i-cocktails-spritz-og-drikke": [
    { slug: "sangria-med-rodvin", label: "Sangria med rødvin" },
  ],

};
