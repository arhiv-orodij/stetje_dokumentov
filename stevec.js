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
    let odstotekDelovnoA = skupnoDelovno > 0 ? ((sumA / skupnoDelovno) * 100).toFixed(1) : "0";
    let odstotekDelovnoIP = skupnoDelovno > 0 ? ((sumIP / skupnoDelovno) * 100).toFixed(1) : "0";

    // Cilji za LETNO NORMO
    const ciljNormaA = 54;
    const ciljNormaIP = 119;
    
    // Izračun doseženih odstotkov glede na celoletno normo
    let dosezenoNormaA_num = ((normaSumA / ciljNormaA) * 100);
    let dosezenoNormaIP_num = ((normaSumIP / ciljNormaIP) * 100);
    
    // --- NOVA STATISTIKA: ČASOVNI PRESEK (Kje si danes) ---
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

    // --- USTVARJANJE MODERNEGA UI/UX POPUP-A ---
    // Odstranimo prejšnje okno, če že obstaja (da se ne podvajajo)
    const obstojeciModal = document.getElementById("moj-top-stat-modal");
    if (obstojeciModal) obstojeciModal.remove();

    // Sestavimo HTML
    const overlay = document.createElement("div");
    overlay.id = "moj-top-stat-modal";
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.6); backdrop-filter:blur(4px); z-index:999999; display:flex; align-items:center; justify-content:center; font-family:system-ui, -apple-system, sans-serif; overflow:hidden; margin:0; padding:0;";

    const modalHTML = `
        <div style="background:#ffffff; width:650px; border-radius:16px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); overflow:hidden; display:flex; flex-direction:column;">
            
            <!-- Glava -->
            <div style="background:#f8fafc; padding:20px 24px; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                <h2 style="margin:0; font-size:18px; color:#0f172a; font-weight:700; letter-spacing:-0.5px;">Statistika Realizacije</h2>
                <button id="zapri-stat-btn" style="background:none; border:none; font-size:24px; color:#64748b; cursor:pointer; line-height:1;">&times;</button>
            </div>

            <!-- Vsebina -->
            <div style="padding:24px; display:flex; flex-direction:column; gap:24px;">
                
                <!-- Delovna Uspešnost -->
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

                <!-- Letna Norma -->
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px;">
                        <h3 style="margin:0; font-size:13px; text-transform:uppercase; color:#64748b; font-weight:700; letter-spacing:0.5px;">Letna norma</h3>
                        <div style="font-size:12px; color:#64748b;">Mimo je <b>${odstotekLeta_num.toFixed(1)}%</b> leta (${preostaliDni} dni do konca)</div>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:16px; background:#ffffff; border:1px solid #e2e8f0; padding:16px; border-radius:12px;">
                        
                        <!-- Akti Progress -->
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; font-weight:600; color:#334155;">
                                <span>Akti: ${normaSumA} / ${ciljNormaA} <span style="color:#64748b; font-weight:400;">(${dosezenoNormaA_num.toFixed(1)}%)</span></span>
                                <span>Pričakovano: ${pricakovanoA} ${renderBadge(razlikaA)}</span>
                            </div>
                            <div style="width:100%; background:#f1f5f9; height:8px; border-radius:4px; overflow:hidden;">
                                <div style="width:${Math.min(dosezenoNormaA_num, 100)}%; background:${dosezenoNormaA_num >= odstotekLeta_num ? '#10b981' : '#f59e0b'}; height:100%; border-radius:4px; transition:width 1s ease-in-out;"></div>
                            </div>
                        </div>

                        <!-- Pregledi Progress -->
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

    // Gumb za zapiranje in zapiranje s klikom na ozadje
    document.getElementById("zapri-stat-btn").addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
        if(e.target === overlay) overlay.remove();
    });
})();
