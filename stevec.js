(function(){
    // DOKUMENTI ZA DELOVNO USPEŠNOST (OSNOVNO)
    const docsA = [
        "Odločba: odklop od infrastrukture",
        "Odločba: odprava in nadomestna",
        "Odločba: opomin",
        "Odločba: pisni odpravek ustne odločbe",
        "Odločba: pisni odpravek ustne odločbe (N)",
        "Odločba: plačilni nalog",
        "Odločba: prekrškovna",
        "Odločba: upravna",
        "Odločba: upravna (N)",
        "Sklep: denarna kazen",
        "Sklep: denarna kazen v upravni izvršbi s PRISILITVIJO",
        "Sklep: dovolitev izvršbe (po II.osebi)",
        "Sklep: dovolitev izvršbe (po II.osebi) (N)",
        "Sklep: dovolitev izvršbe (po II.OSEBI)_G",
        "Sklep: dovolitev izvršbe (PRISILITEV)",
        "Sklep: dovolitev izvršbe (PRISILITEV) (N)",
        "Sklep: dovolitev izvršbe s prisilitvijo-POSEBNE PREPOVEDI",
        "Sklep: o izvršbi z denarno prisilitvijo (N)",
        "Sklep: o stroških izvršbe po II. osebi",
        "Sklep: o založitvi stroškov",
        "Sklep: ustavitev izvršbe",
        "Sklep: ustavitev postopka",
        "Zapisnik: izvršba po I.osebi (legalizacija)"
    ];

    const docsIP = [
        "Zapisnik: izredni kontrolni pregled",
        "Zapisnik: izredni kontrolni pregled - izvršba po I.osebi (izvršitev odločbe)",
        "Zapisnik: izredni pregled",
        "Zapisnik: izredni pregled (N)",
        "Zapisnik: izredni pregled z zaslišanjem",
        "Zapisnik: izvršba po II.osebi",
        "Zapisnik: o izvršbi po II.osebi (N)",
        "Zapisnik: redni kontrolni pregled",
        "Zapisnik: redni kontrolni pregled - izvršba po I.osebi (izvršitev odločbe)",
        "Zapisnik: redni pregled",
        "Zapisnik: redni pregled (N)",
        "Zapisnik: redni pregled z zaslišanjem"
    ];

    // DOKUMENTI ZA LETNO NORMO
    const normaDocsA = [
        "Odločba: odklop od infrastrukture",
        "Odločba: odprava in nadomestna",
        "Odločba: odprava ODL (prekrškovna)",
        "Odločba: odprava ODL (prekrškovna) in nadomestitev",
        "Odločba: odprava PN in nadomestitev",
        "Odločba: opomin",
        "Odločba: pisni odpravek ustne odločbe",
        "Odločba: plačilni nalog",
        "Odločba: prekrškovna",
        "Odločba: upravna",
        "Sklep: denarna kazen",
        "Sklep: denarna kazen v upravni izvršbi s PRISILITVIJO",
        "Sklep: dovolitev izvršbe (po II.OSEBI)_G",
        "Sklep: dovolitev izvršbe (PRISILITEV)",
        "Sklep: o dovolitvi pravnega posla (107.čl.GZ-1)",
        "Sklep: o stroških izvršbe po II. osebi",
        "Sklep: o založitvi stroškov",
        "Sklep: odlog izvršbe zaradi doma se DOVOLI_(na podlagi odločitve sodišča)",
        "Sklep: odlog izvršbe zaradi doma se DOVOLI_(na podlagi vloge)",
        "Sklep: odlog izvršbe zaradi doma se ZAVRŽE",
        "Sklep: postopek odloga izvršbe zaradi doma se PREKINE",
        "Sklep: postopek odloga izvršbe zaradi doma se USTAVI",
        "Sklep: ustavitev izvršbe",
        "Sklep: ustavitev postopka",
        "Sklep: vloga za odlog izvršbe zaradi doma se ZAVRNE",
        "x(IPS) Odločba o predlogu: NIČNOST-zavrnitev",
        "x(IPS) Odločba o predlogu: OBNOVA-zavrnitev",
        "x(IPS) Odločba: NIČNOST",
        "x(IPS) Odločba: OBNOVA",
        "x(IPS) Odločba: SPREMEMBA / ODPRAVA v vezi z Upr.Spor.",
        "x(IPS) Sklep o predlogu: NIČNOST-zavrženje",
        "x(IPS) Sklep o predlogu: OBNOVA-se ugodi",
        "x(IPS) Sklep o predlogu: OBNOVA-zavrženje",
        "x(IPS) Sklep: NIČNOST-po uradni dolžnosti",
        "x(IPS) Sklep: OBNOVA-po uradni dolžnosti",
        "Zapisnik: izvršba po I.osebi (legalizacija)",
        "Zapisnik: prekrškovni - teren",
        "Zapisnik: zaslišanje",
        "Sklep: odlog izvršbe",
        "Sklep: upravni",
        "Sklep: stroški postopka",
        "Zapisnik: prekrškovni"
    ];

    const normaDocsIP = [
        "Zapisnik: izredni kontrolni pregled",
        "Zapisnik: izredni kontrolni pregled - izvršba po I.osebi (izvršitev odločbe)",
        "Zapisnik: izredni pregled",
        "Zapisnik: izredni pregled z zaslišanjem",
        "Zapisnik: izvršba po II.osebi",
        "Zapisnik: redni kontrolni pregled",
        "Zapisnik: redni kontrolni pregled - izvršba po I.osebi (izvršitev odločbe)",
        "Zapisnik: redni pregled",
        "Zapisnik: redni pregled z zaslišanjem"
    ];

    let sumA = 0, sumIP = 0;
    let normaSumA = 0, normaSumIP = 0;

    function clean(str) {
        return (str || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    }

    // Pomožna funkcija za iskanje ujemanja v seznamu dokumentov
    function checkDocMatch(docString, list) {
        // dokumenti imajo na koncu "; opis...", zato pogledamo ali se začne z enim od iskanih ali ga vsebuje
        return list.some(item => docString.toLowerCase().startsWith(item.toLowerCase()));
    }

    function processDoc(doc) {
        if (!doc) return;
        const rows = doc.querySelectorAll('tr');

        rows.forEach(tr => {
            const cells = tr.querySelectorAll('td');
            // Iščemo vrstice, ki imajo vsaj 6 stolpcev (Smer, Datum, Zadeva, Str. delavec, Vrsta in opis, Knjižil)
            if (cells.length < 5) return; 

            // Preverimo Smer in Dokument
            const smer = clean(cells[0].textContent).toUpperCase();
            
            // Če prvi stolpec ni I ali L (ali V - ki ga itak ne rabimo), preskočimo 
            if (!['I', 'L'].includes(smer)) return;
            
            // Dokument je običajno v predzadnjem (ali ustreznem) stolpcu. Zgornji primer: 5. stolpec (indeks 4)
            // Preverimo vse celice, če slučajno najdemo "; " separator (značilen za vašo vrsto/opis)
            let docName = "";
            for (let i = 2; i < cells.length; i++) {
                let cellText = clean(cells[i].textContent);
                if (cellText.includes(':') && (cellText.includes('Sklep') || cellText.includes('Odločba') || cellText.includes('Zapisnik'))) {
                     // Odstrani vse za podpičjem za lažje ujemanje
                     docName = cellText.split(';')[0].trim(); 
                     break;
                }
            }

            if (!docName) return; // Nismo našli tipa dokumenta

            // ŠTETJE DELOVNA USPEŠNOST
            let counted = false;
            if (smer === 'I' || smer === 'L') {
                if (checkDocMatch(docName, docsA)) {
                    sumA++;
                    tr.style.backgroundColor = '#fff3cd'; // Obarvamo, da vidimo zajeto
                    counted = true;
                } else if (checkDocMatch(docName, docsIP)) {
                    sumIP++;
                    tr.style.backgroundColor = '#d4edda';
                    counted = true;
                }
            }

            // ŠTETJE LETNA NORMA
            if (smer === 'I' || smer === 'L') {
                if (checkDocMatch(docName, normaDocsA)) {
                    normaSumA++;
                } else if (checkDocMatch(docName, normaDocsIP)) {
                    normaSumIP++;
                }
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

    // Izračuni (ostane popolnoma enako kot prej)
    const tocke = (sumIP / 16) + (sumA / 4);
    let faktor = "0%";
    if (tocke >= 3) faktor = "4%";
    else if (tocke >= 2.5) faktor = "3%";
    else if (tocke >= 2) faktor = "2%";
    else if (tocke >= 1.5) faktor = "1%";

    let skupnoDelovno = sumA + sumIP;
    let odstotekDelovnoA = skupnoDelovno > 0 ? ((sumA / skupnoDelovno) * 100).toFixed(1) : "0";
    let odstotekDelovnoIP = skupnoDelovno > 0 ? ((sumIP / skupnoDelovno) * 100).toFixed(1) : "0";

    const ciljNormaA = 54;
    const ciljNormaIP = 119;
    
    let dosezenoNormaA_num = ((normaSumA / ciljNormaA) * 100);
    let dosezenoNormaIP_num = ((normaSumIP / ciljNormaIP) * 100);
    
    const zdaj = new Date();
    const zacetekLeta = new Date(zdaj.getFullYear(), 0, 1);
    const konecLeta = new Date(zdaj.getFullYear(), 11, 31);
    const msVDnevu = 1000 * 60 * 60 * 24;
    
    const pretekliDni = Math.floor((zdaj - zacetekLeta) / msVDnevu) + 1; 
    const vsiDniLeta = Math.floor((konecLeta - zacetekLeta) / msVDnevu) + 1;
    const preostaliDni = vsiDniLeta - pretekliDni;
    
    const casovniFaktor = pretekliDni / vsiDniLeta;
    const odstotekLeta_num = (casovniFaktor * 100);
    
    const pricakovanoA = Math.round(ciljNormaA * casovniFaktor);
    const pricakovanoIP = Math.round(ciljNormaIP * casovniFaktor);
    
    const razlikaA = normaSumA - pricakovanoA;
    const razlikaIP = normaSumIP - pricakovanoIP;
    
    const renderBadge = (razlika) => {
        if (razlika >= 0) return `<span style="background:#dcfce7; color:#166534; padding:2px 8px; border-radius:12px; font-weight:600; font-size:12px;">+${razlika}</span>`;
        return `<span style="background:#fee2e2; color:#991b1b; padding:2px 8px; border-radius:12px; font-weight:600; font-size:12px;">${razlika}</span>`;
    };

    // UIX OBLIKOVANJE
    const obstojeciModal = document.getElementById("moj-top-stat-modal");
    if (obstojeciModal) obstojeciModal.remove();

    const overlay = document.createElement("div");
    overlay.id = "moj-top-stat-modal";
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.6); backdrop-filter:blur(4px); z-index:999999; display:flex; align-items:center; justify-content:center; font-family:system-ui, -apple-system, sans-serif; overflow:hidden; margin:0; padding:0;";

    const modalHTML = `
        <div style="background:#ffffff; width:650px; border-radius:16px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); overflow:hidden; display:flex; flex-direction:column;">
            
            <div style="background:#f8fafc; padding:20px 24px; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                <h2 style="margin:0; font-size:18px; color:#0f172a; font-weight:700; letter-spacing:-0.5px;">Statistika Realizacije</h2>
                <button id="zapri-stat-btn" style="background:none; border:none; font-size:24px; color:#64748b; cursor:pointer; line-height:1;">&times;</button>
            </div>

            <div style="padding:24px; display:flex; flex-direction:column; gap:24px;">
                
                <div>
                    <h3 style="margin:0 0 12px 0; font-size:13px; text-transform:uppercase; color:#64748b; font-weight:700; letter-spacing:0.5px;">Delovna uspešnost</h3>
                    <div style="display:flex; gap:16px;">
                        <div style="flex:1; background:#fffbea; border:1px solid #fef08a; padding:16px; border-radius:12px;">
                            <div style="font-size:12px; color:#a16207; font-weight:600; margin-bottom:4px;">AKTI (A)</div>
                            <div style="font-size:24px; font-weight:800; color:#854d0e;">${sumA} <span style="font-size:14px; font-weight:500; color:#ca8a04;">(${odstotekDelovnoA}%)</span></div>
                        </div>
                        <div style="flex:1; background:#f0fdf4; border:1px solid #bbf7d0; padding:16px; border-radius:12px;">
                            <div style="font-size:12px; color:#166534; font-weight:600; margin-bottom:4px;">PREGLEDI (IP)</div>
                            <div style="font-size:24px; font-weight:800; color:#15803d;">${sumIP} <span style="font-size:14px; font-weight:500; color:#22c55e;">(${odstotekDelovnoIP}%)</span></div>
                        </div>
                        <div style="flex:1; background:#f8fafc; border:1px solid #e2e8f0; padding:16px; border-radius:12px; text-align:center;">
                            <div style="font-size:12px; color:#475569; font-weight:600; margin-bottom:4px;">TOČKE / FAKTOR</div>
                            <div style="font-size:24px; font-weight:800; color:#0f172a;">${tocke.toFixed(2)} <span style="color:#0ea5e9;">/ ${faktor}</span></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px;">
                        <h3 style="margin:0; font-size:13px; text-transform:uppercase; color:#64748b; font-weight:700; letter-spacing:0.5px;">Letna norma</h3>
                        <div style="font-size:12px; color:#64748b;">Mimo je <b>${odstotekLeta_num.toFixed(1)}%</b> leta (${preostaliDni} dni do konca)</div>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:16px; background:#ffffff; border:1px solid #e2e8f0; padding:16px; border-radius:12px;">
                        
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; font-weight:600; color:#334155;">
                                <span>Akti: ${normaSumA} / ${ciljNormaA} <span style="color:#64748b; font-weight:400;">(${dosezenoNormaA_num.toFixed(1)}%)</span></span>
                                <span>Pričakovano: ${pricakovanoA} ${renderBadge(razlikaA)}</span>
                            </div>
                            <div style="width:100%; background:#f1f5f9; height:8px; border-radius:4px; overflow:hidden;">
                                <div style="width:${Math.min(dosezenoNormaA_num, 100)}%; background:${dosezenoNormaA_num >= odstotekLeta_num ? '#10b981' : '#f59e0b'}; height:100%; border-radius:4px; transition:width 1s ease-in-out;"></div>
                            </div>
                        </div>

                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; font-weight:600; color:#334155;">
                                <span>Pregledi: ${normaSumIP} / ${ciljNormaIP} <span style="color:#64748b; font-weight:400;">(${dosezenoNormaIP_num.toFixed(1)}%)</span></span>
                                <span>Pričakovano: ${pricakovanoIP} ${renderBadge(razlikaIP)}</span>
                            </div>
                            <div style="width:100%; background:#f1f5f9; height:8px; border-radius:4px; overflow:hidden;">
                                <div style="width:${Math.min(dosezenoNormaIP_num, 100)}%; background:${dosezenoNormaIP_num >= odstotekLeta_num ? '#10b981' : '#f59e0b'}; height:100%; border-radius:4px; transition:width 1s ease-in-out;"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `;

    overlay.innerHTML = modalHTML;
    document.body.appendChild(overlay);

    document.getElementById("zapri-stat-btn").addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
        if(e.target === overlay) overlay.remove();
    });
})();
