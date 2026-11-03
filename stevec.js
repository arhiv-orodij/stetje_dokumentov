(function(){
    // OBSTOJEČI DOKUMENTI (Mesečno / Faktor)
    const docsA = {
        "Odločba: odklop od infrastrukture": ["I"],
        "Odločba: odprava in nadomestna": ["I"],
        "Odločba: opomin": ["I"],
        "Odločba: pisni odpravek ustne odločbe": ["I"],
        "Odločba: pisni odpravek ustne odločbe (N)": ["I"],
        "Odločba: plačilni nalog": ["I"],
        "Odločba: prekrškovna": ["I"],
        "Odločba: upravna": ["I"],
        "Odločba: upravna (N)": ["I"],
        "Sklep: denarna kazen": ["I"],
        "Sklep: denarna kazen v upravni izvršbi s PRISILITVIJO": ["I"],
        "Sklep: dovolitev izvršbe (po II.osebi)": ["I"],
        "Sklep: dovolitev izvršbe (po II.osebi) (N)": ["I"],
        "Sklep: dovolitev izvršbe (po II.OSEBI)_G": ["I"],
        "Sklep: dovolitev izvršbe (PRISILITEV)": ["I"],
        "Sklep: dovolitev izvršbe (PRISILITEV) (N)": ["I"],
        "Sklep: dovolitev izvršbe s prisilitvijo-POSEBNE PREPOVEDI": ["I"],
        "Sklep: o izvršbi z denarno prisilitvijo (N)": ["I"],
        "Sklep: o stroških izvršbe po II. osebi": ["I"],
        "Sklep: o založitvi stroškov": ["I"],
        "Sklep: ustavitev izvršbe": ["I"],
        "Sklep: ustavitev postopka": ["I"],
        "Zapisnik: izvršba po I.osebi (legalizacija)": ["I", "L"]
    };

    const docsIP = {
        "Zapisnik: izredni kontrolni pregled": ["I", "L"],
        "Zapisnik: izredni kontrolni pregled - izvršba po I.osebi (izvršitev odločbe)": ["I", "L"],
        "Zapisnik: izredni pregled": ["I", "L"],
        "Zapisnik: izredni pregled (N)": ["I", "L"],
        "Zapisnik: izredni pregled z zaslišanjem": ["I", "L"],
        "Zapisnik: izvršba po II.osebi": ["I", "L"],
        "Zapisnik: o izvršbi po II.osebi (N)": ["I", "L"],
        "Zapisnik: redni kontrolni pregled": ["I", "L"],
        "Zapisnik: redni kontrolni pregled - izvršba po I.osebi (izvršitev odločbe)": ["I", "L"],
        "Zapisnik: redni pregled": ["I", "L"],
        "Zapisnik: redni pregled (N)": ["I", "L"],
        "Zapisnik: redni pregled z zaslišanjem": ["I", "L"]
    };

    // NOVI DOKUMENTI (Letna norma)
    const normaDocsA = {
        "Odločba: odklop od infrastrukture": ["I"],
        "Odločba: odprava in nadomestna": ["I"],
        "Odločba: odprava ODL (prekrškovna)": ["I"],
        "Odločba: odprava ODL (prekrškovna) in nadomestitev": ["I"],
        "Odločba: odprava PN in nadomestitev": ["I"],
        "Odločba: opomin": ["I"],
        "Odločba: pisni odpravek ustne odločbe": ["I"],
        "Odločba: plačilni nalog": ["I"],
        "Odločba: prekrškovna": ["I"],
        "Odločba: upravna": ["I"],
        "Sklep: denarna kazen": ["I"],
        "Sklep: denarna kazen v upravni izvršbi s PRISILITVIJO": ["I"],
        "Sklep: dovolitev izvršbe (po II.OSEBI)_G": ["I"],
        "Sklep: dovolitev izvršbe (PRISILITEV)": ["I"],
        "Sklep: o dovolitvi pravnega posla (107.čl.GZ-1)": ["I"],
        "Sklep: o stroških izvršbe po II. osebi": ["I"],
        "Sklep: o založitvi stroškov": ["I"],
        "Sklep: odlog izvršbe zaradi doma se DOVOLI_(na podlagi odločitve sodišča)": ["I"],
        "Sklep: odlog izvršbe zaradi doma se DOVOLI_(na podlagi vloge)": ["I"],
        "Sklep: odlog izvršbe zaradi doma se ZAVRŽE": ["I"],
        "Sklep: postopek odloga izvršbe zaradi doma se PREKINE": ["I"],
        "Sklep: postopek odloga izvršbe zaradi doma se USTAVI": ["I"],
        "Sklep: ustavitev izvršbe": ["I"],
        "Sklep: ustavitev postopka": ["I"],
        "Sklep: vloga za odlog izvršbe zaradi doma se ZAVRNE": ["I"],
        "x(IPS) Odločba o predlogu: NIČNOST-zavrnitev": ["I"],
        "x(IPS) Odločba o predlogu: OBNOVA-zavrnitev": ["I"],
        "x(IPS) Odločba: NIČNOST": ["I"],
        "x(IPS) Odločba: OBNOVA": ["I"],
        "x(IPS) Odločba: SPREMEMBA / ODPRAVA v vezi z Upr.Spor.": ["I"],
        "x(IPS) Sklep o predlogu: NIČNOST-zavrženje": ["I"],
        "x(IPS) Sklep o predlogu: OBNOVA-se ugodi": ["I"],
        "x(IPS) Sklep o predlogu: OBNOVA-zavrženje": ["I"],
        "x(IPS) Sklep: NIČNOST-po uradni dolžnosti": ["I"],
        "x(IPS) Sklep: OBNOVA-po uradni dolžnosti": ["I"],
        "Zapisnik: izvršba po I.osebi (legalizacija)": ["I", "L"],
        "Zapisnik: prekrškovni - teren": ["I", "L"],
        "Zapisnik: zaslišanje": ["I", "L"],
        "Sklep: odlog izvršbe": ["I"],
        "Sklep: upravni": ["I"],
        "Sklep: stroški postopka": ["I"],
        "Zapisnik: prekrškovni": ["L"]
    };

    const normaDocsIP = {
        "Zapisnik: izredni kontrolni pregled": ["I", "L"],
        "Zapisnik: izredni kontrolni pregled - izvršba po I.osebi (izvršitev odločbe)": ["I", "L"],
        "Zapisnik: izredni pregled": ["I", "L"],
        "Zapisnik: izredni pregled z zaslišanjem": ["I", "L"],
        "Zapisnik: izvršba po II.osebi": ["I", "L"],
        "Zapisnik: redni kontrolni pregled": ["I", "L"],
        "Zapisnik: redni kontrolni pregled - izvršba po I.osebi (izvršitev odločbe)": ["I", "L"],
        "Zapisnik: redni pregled": ["I", "L"],
        "Zapisnik: redni pregled z zaslišanjem": ["I", "L"]
    };

    // Spremenljivke za seštevke
    let sumA = 0;
    let sumIP = 0;
    
    let normaSumA = 0;
    let normaSumIP = 0;

    function clean(str) {
        return (str || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    }

    function processDoc(doc) {
        if (!doc) return;
        const rows = doc.querySelectorAll('tr');

        rows.forEach(tr => {
            const cells = tr.querySelectorAll('td');
            if (cells.length < 3) return;

            const smer = clean(cells[0].textContent).toUpperCase();
            const docName = clean(cells[1].textContent);

            let countCell = (cells.length === 3) ? cells[cells.length - 1] : cells[cells.length - 2];
            let countRaw = clean(countCell.textContent);
            let count = parseInt(countRaw.replace(/\./g, '').replace(/,/g, ''), 10);

            if (isNaN(count)) {
                for (let i = cells.length - 1; i >= 2; i--) {
                    let n = parseInt(clean(cells[i].textContent).replace(/\./g, '').replace(/,/g, ''), 10);
                    if (!isNaN(n)) {
                        count = n;
                        break;
                    }
                }
            }
            if (isNaN(count)) count = 0;

            // 1. Štetje in barvanje za OSNOVNO statistiko (mesečno)
            if (docsA[docName] && docsA[docName].includes(smer)) {
                sumA += count;
                tr.style.backgroundColor = '#fff3cd'; // Rumena
            } else if (docsIP[docName] && docsIP[docName].includes(smer)) {
                sumIP += count;
                tr.style.backgroundColor = '#d4edda'; // Zelena
            }

            // 2. Štetje za LETNO NORMO (v ozadju, brez spreminjanja barv)
            if (normaDocsA[docName] && normaDocsA[docName].includes(smer)) {
                normaSumA += count;
            } else if (normaDocsIP[docName] && normaDocsIP[docName].includes(smer)) {
                normaSumIP += count;
            }
        });
    }

    function processWindow(win) {
        try {
            processDoc(win.document);
            for (let i = 0; i < win.frames.length; i++) {
                processWindow(win.frames[i]);
            }
        } catch(e) {}
    }

    processWindow(window);

    // Izračun obstoječega faktorja
    const tocke = (sumIP / 16) + (sumA / 4);
    let faktor = "0%";
    if (tocke >= 3) {
        faktor = "4%";
    } else if (tocke >= 2.5) {
        faktor = "3%";
    } else if (tocke >= 2) {
        faktor = "2%";
    } else if (tocke >= 1.5) {
        faktor = "1%";
    }

// Izračun skupnih vrednosti in odstotkov za DELOVNO USPEŠNOST
    let skupnoDelovno = sumA + sumIP;
    let odstotekDelovnoA = skupnoDelovno > 0 ? ((sumA / skupnoDelovno) * 100).toFixed(1) + "%" : "0%";
    let odstotekDelovnoIP = skupnoDelovno > 0 ? ((sumIP / skupnoDelovno) * 100).toFixed(1) + "%" : "0%";

    // Cilji za LETNO NORMO
    const ciljNormaA = 54;
    const ciljNormaIP = 119;
    
    // Izračun doseženih odstotkov glede na celoletno normo
    let dosezenoNormaA = ((normaSumA / ciljNormaA) * 100).toFixed(1) + "%";
    let dosezenoNormaIP = ((normaSumIP / ciljNormaIP) * 100).toFixed(1) + "%";

    // --- NOVA STATISTIKA: ČASOVNI PRESEK (Kje si danes) ---
    const zdaj = new Date();
    const zacetekLeta = new Date(zdaj.getFullYear(), 0, 1);
    const konecLeta = new Date(zdaj.getFullYear(), 11, 31);
    const msVDnevu = 1000 * 60 * 60 * 24;
    
    // Izračun dni
    const pretekliDni = Math.floor((zdaj - zacetekLeta) / msVDnevu) + 1; // vključno z današnjim dnem
    const vsiDniLeta = Math.floor((konecLeta - zacetekLeta) / msVDnevu) + 1;
    const preostaliDni = vsiDniLeta - pretekliDni;
    
    // Odstotek preteklega leta
    const casovniFaktor = pretekliDni / vsiDniLeta;
    const odstotekLeta = (casovniFaktor * 100).toFixed(1) + "%";
    
    // Pričakovano število glede na pretekel čas
    const pricakovanoA = Math.round(ciljNormaA * casovniFaktor);
    const pricakovanoIP = Math.round(ciljNormaIP * casovniFaktor);
    
    // Razlika od pričakovanega stanja (zaostanek ali prednost)
    const razlikaA = normaSumA - pricakovanoA;
    const razlikaIP = normaSumIP - pricakovanoIP;
    const predznakA = razlikaA >= 0 ? "+" : "";
    const predznakIP = razlikaIP >= 0 ? "+" : "";

    // Prikaz rezultatov
    alert(
        "--- DELOVNA USPEŠNOST ---\n" +
        "Skupno število aktov (A_Gradb): " + sumA + " (" + odstotekDelovnoA + ")\n" +
        "Skupno število pregledov (IP_Gradb): " + sumIP + " (" + odstotekDelovnoIP + ")\n" +
        "Skupaj (A + IP): " + skupnoDelovno + "\n\n" +
        "Vsota točk: " + tocke.toFixed(2) + "\n" +
        "Faktor realizacije: " + faktor + "\n\n" +
        "--- LETNA NORMA ---\n" +
        "Skupno število aktov (A): " + normaSumA + " od " + ciljNormaA + " (" + dosezenoNormaA + ")\n" +
        "Skupno število pregledov (IP): " + normaSumIP + " od " + ciljNormaIP + " (" + dosezenoNormaIP + ")\n\n" +
        "--- KJE SEM DANES? (" + odstotekLeta + " leta je mimo) ---\n" +
        "Do konca leta: še " + preostaliDni + " dni.\n" +
        "Pričakovani akti (A) do danes: " + pricakovanoA + " (Stanje: " + predznakA + razlikaA + ")\n" +
        "Pričakovani pregledi (IP) do danes: " + pricakovanoIP + " (Stanje: " + predznakIP + razlikaIP + ")"
    );
})();
