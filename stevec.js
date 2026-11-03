(function(){
    // --- 1. DOKUMENTI ZA DELOVNO USPEŠNOST (Točke in Faktor) ---
    const docsA = [
        "Odločba: odklop od infrastrukture",
        "Odločba: odprava in nadomestna",
        "Odločba: opomin",
        "Odločba: pisni odpravek ustne odločbe",
        "Odločba: plačilni nalog",
        "Odločba: prekrškovna",
        "Odločba: upravna",
        "Sklep: denarna kazen",
        "Sklep: denarna kazen v upravni izvršbi s PRISILITVIJO",
        "Sklep: dovolitev izvršbe (po II.OSEBI)_G",
        "Sklep: dovolitev izvršbe (PRISILITEV)",
        "Sklep: o stroških izvršbe po II. osebi",
        "Sklep: o založitvi stroškov",
        "Sklep: ustavitev izvršbe",
        "Sklep: ustavitev postopka",
        "Sklep: dovolitev izvršbe (po II.osebi)",
        "Sklep: dovolitev izvršbe s prisilitvijo-POSEBNE PREPOVEDI",
        "Zapisnik: izvršba po I.osebi (legalizacija)"
    ];

    const docsIP = [
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

    // --- 2. DOKUMENTI ZA LETNO NORMO ---
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
        "Sklep: stroški postopka"
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
        "Zapisnik: redni pregled z zaslišanjem",
        "Zapisnik: prekrškovni" 
    ];

    // --- 3. SPREMENLJIVKE ZA ZAJEM PODATKOV ---
    let stats = {
        delovna: { totalA: 0, totalIP: 0, months: {} },
        norma: { totalA: 0, totalIP: 0, months: {} }
    };
    
    // Inicializacija mesecev (1-12)
    for (let i = 1; i <= 12; i++) {
        stats.delovna.months[i] = { a: 0, ip: 0 };
        stats.norma.months[i] = { a: 0, ip: 0 };
    }

    let targetDocument = document; 

    function clean(str) {
        return (str || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    }

    function checkDocMatch(docString, list) {
        let searchDoc = docString.toLowerCase();
        return list.some(item => searchDoc.startsWith(item.toLowerCase()));
    }

    // --- 4. ANALIZA TABEL IN ZAJEM ---
    function processDoc(doc) {
        if (!doc) return;
        const rows = doc.querySelectorAll('tr');
        let foundDataInThisDoc = false;

        const dateRegex = /(\d{1,2})\.(\d{1,2})\.(\d{4})/;

        rows.forEach(tr => {
            const cells = tr.querySelectorAll('td');
            if (cells.length < 5) return; 

            const smer = clean(cells[0].textContent).toUpperCase();
            if (!['I', 'L'].includes(smer)) return;
            
            // Izlušči datum in mesec
            let dateText = clean(cells[1].textContent);
            let match = dateText.match(dateRegex);
            let month = match ? parseInt(match[2], 10) : null;
            if(!month || month < 1 || month > 12) month = 1; // Fallback, če datuma ni

            // Izlušči vrsto dokumenta
            let docName = "";
            for (let i = 2; i < cells.length; i++) {
                let cellText = clean(cells[i].textContent);
                if (cellText.includes(':') && (cellText.includes('Sklep') || cellText.includes('Odločba') || cellText.includes('Zapisnik') || cellText.includes('x(IPS)'))) {
                     docName = cellText.split(';')[0].trim(); 
                     break;
                }
            }

            if (!docName) return;
            let counted = false;
            
            // Štetje: DELOVNA USPEŠNOST
            if (checkDocMatch(docName, docsA)) {
                stats.delovna.totalA++;
                stats.delovna.months[month].a++;
                tr.style.backgroundColor = '#fff3cd'; // Obarvamo A (Delovno)
                counted = true;
            } else if (checkDocMatch(docName, docsIP)) {
                stats.delovna.totalIP++;
                stats.delovna.months[month].ip++;
                tr.style.backgroundColor = '#d4edda'; // Obarvamo IP (Delovno)
                counted = true;
            }

            // Štetje: LETNA NORMA
            if (checkDocMatch(docName, normaDocsA)) {
                stats.norma.totalA++;
                stats.norma.months[month].a++;
                counted = true;
            } else if (checkDocMatch(docName, normaDocsIP)) {
                stats.norma.totalIP++;
                stats.norma.months[month].ip++;
                counted = true;
            }
            
            if (counted) foundDataInThisDoc = true;
        });
        
        if (foundDataInThisDoc && doc.body) {
            targetDocument = doc;
        }
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

// --- 5. LOGIKA ZA UI IN IZRAČUNE ---
    function renderUI(isHalfNorm) {
        let container = targetDocument.getElementById('moj-top-stat-vsebina');
        if (!container) return;

        // Izračuni za Delovno Uspešnost
        const sumA = stats.delovna.totalA;
        const sumIP = stats.delovna.totalIP;
        const tocke = (sumIP / 16) + (sumA / 4);
        
        const meja4 = isHalfNorm ? 1.5 : 3;
        const meja3 = isHalfNorm ? 1.25 : 2.5;
        const meja2 = isHalfNorm ? 1 : 2;
        const meja1 = isHalfNorm ? 0.75 : 1.5;

        let faktor = "0%";
        if (tocke >= meja4) faktor = "4%";
        else if (tocke >= meja3) faktor = "3%";
        else if (tocke >= meja2) faktor = "2%";
        else if (tocke >= meja1) faktor = "1%";

        let skupnoDelovno = sumA + sumIP;
        let odstotekDelovnoA = skupnoDelovno > 0 ? ((sumA / skupnoDelovno) * 100).toFixed(1) : "0";
        let odstotekDelovnoIP = skupnoDelovno > 0 ? ((sumIP / skupnoDelovno) * 100).toFixed(1) : "0";

        // Izračuni za Letno Normo
        const ciljNormaA = isHalfNorm ? 27 : 54;
        const ciljNormaIP = isHalfNorm ? 59.5 : 119;
        const ciljSkupaj = ciljNormaA + ciljNormaIP;
        
        let dosezenoNormaA_num = ((stats.norma.totalA / ciljNormaA) * 100);
        let dosezenoNormaIP_num = ((stats.norma.totalIP / ciljNormaIP) * 100);
        
        let skupnoNorma = stats.norma.totalA + stats.norma.totalIP;
        let odstotekNormaA = skupnoNorma > 0 ? ((stats.norma.totalA / skupnoNorma) * 100).toFixed(1) : "0";
        let odstotekNormaIP = skupnoNorma > 0 ? ((stats.norma.totalIP / skupnoNorma) * 100).toFixed(1) : "0";
        let skupnaRealizacijaLeta = ((skupnoNorma / ciljSkupaj) * 100).toFixed(1);
        
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
        
        const razlikaA = stats.norma.totalA - pricakovanoA;
        const razlikaIP = stats.norma.totalIP - pricakovanoIP;
        
        const renderBadge = (razlika) => {
            if (razlika >= 0) return `<span style="background:#dcfce7; color:#166534; padding:3px 10px; border-radius:12px; font-weight:700; font-size:14px; margin-left:8px;">+${razlika}</span>`;
            return `<span style="background:#fee2e2; color:#991b1b; padding:3px 10px; border-radius:12px; font-weight:700; font-size:14px; margin-left:8px;">${razlika}</span>`;
        };

        // Generiranje mesečnih vrstic (HTML) za Delovno uspešnost
        let htmlDelovnaMeseci = `<div style="display:grid; grid-template-columns: 85px repeat(12, 1fr); gap:4px; text-align:center; font-size:13px; margin-top:16px;">`;
        htmlDelovnaMeseci += `<div style="font-weight:700; color:#64748b; text-align:left;">MESEC</div>`;
        for(let i=1; i<=12; i++) htmlDelovnaMeseci += `<div style="font-weight:800; color:#64748b;">${i}</div>`;
        
        htmlDelovnaMeseci += `<div style="font-weight:600; color:#a16207; text-align:left;">Akti (A)</div>`;
        for(let i=1; i<=12; i++) htmlDelovnaMeseci += `<div style="background:#fef9c3; border-radius:4px; padding:3px 0;">${stats.delovna.months[i].a || '-'}</div>`;
        
        htmlDelovnaMeseci += `<div style="font-weight:600; color:#166534; text-align:left;">Pregledi (IP)</div>`;
        for(let i=1; i<=12; i++) htmlDelovnaMeseci += `<div style="background:#dcfce7; border-radius:4px; padding:3px 0;">${stats.delovna.months[i].ip || '-'}</div>`;
        
        // Priprava točk za vsak mesec
        let mesecTocke = [];
        htmlDelovnaMeseci += `<div style="font-weight:600; color:#0f172a; text-align:left;">Točke</div>`;
        for(let i=1; i<=12; i++) {
            let mt = (stats.delovna.months[i].ip / 16) + (stats.delovna.months[i].a / 4);
            mesecTocke[i] = mt;
            htmlDelovnaMeseci += `<div style="background:#f1f5f9; border-radius:4px; padding:3px 0;">${mt>0 ? mt.toFixed(1) : '-'}</div>`;
        }
        
        // NOVA VRSTICA: Faktor za vsak mesec
        htmlDelovnaMeseci += `<div style="font-weight:700; color:#0284c7; text-align:left;">Faktor</div>`;
        for(let i=1; i<=12; i++) {
            let mt = mesecTocke[i];
            let mf = "-";
            if (mt > 0) {
                if (mt >= meja4) mf = "4%";
                else if (mt >= meja3) mf = "3%";
                else if (mt >= meja2) mf = "2%";
                else if (mt >= meja1) mf = "1%";
                else mf = "0%";
            }
            htmlDelovnaMeseci += `<div style="background:#e0f2fe; border-radius:4px; padding:3px 0; font-weight:600; color:#0369a1;">${mf}</div>`;
        }
        htmlDelovnaMeseci += `</div>`;


        // Generiranje mesečnih vrstic (HTML) za Letno normo
        let htmlNormaMeseci = `<div style="display:grid; grid-template-columns: 85px repeat(12, 1fr); gap:4px; text-align:center; font-size:13px; margin-bottom:20px;">`;
        htmlNormaMeseci += `<div style="font-weight:700; color:#64748b; text-align:left;">MESEC</div>`;
        for(let i=1; i<=12; i++) htmlNormaMeseci += `<div style="font-weight:800; color:#64748b;">${i}</div>`;
        
        htmlNormaMeseci += `<div style="font-weight:600; color:#b45309; text-align:left;">Akti (A)</div>`;
        for(let i=1; i<=12; i++) htmlNormaMeseci += `<div style="background:#ffedd5; border-radius:4px; padding:3px 0;">${stats.norma.months[i].a || '-'}</div>`;
        
        htmlNormaMeseci += `<div style="font-weight:600; color:#047857; text-align:left;">Pregledi (IP)</div>`;
        for(let i=1; i<=12; i++) htmlNormaMeseci += `<div style="background:#d1fae5; border-radius:4px; padding:3px 0;">${stats.norma.months[i].ip || '-'}</div>`;
        htmlNormaMeseci += `</div>`;

        // Združevanje vsega v container
        container.innerHTML = `
            <!-- DELOVNA USPEŠNOST SEKCIJA -->
            <div style="margin-bottom: 32px;">
                <h3 style="margin:0 0 16px 0; font-size:18px; text-transform:uppercase; color:#334155; font-weight:800; letter-spacing:0.5px; border-bottom:2px solid #cbd5e1; padding-bottom:8px;">Delovna uspešnost</h3>
                
                <div style="display:flex; gap:16px; flex-wrap:wrap;">
                    <div style="flex:1; min-width:120px; background:#fffbea; border:1px solid #fef08a; padding:14px; border-radius:12px;">
                        <div style="font-size:14px; color:#a16207; font-weight:700; margin-bottom:6px;">AKTI (A)</div>
                        <div style="font-size:28px; font-weight:800; color:#854d0e;">${sumA} <span style="font-size:15px; font-weight:600; color:#ca8a04;">(${odstotekDelovnoA}%)</span></div>
                    </div>
                    <div style="flex:1; min-width:120px; background:#f0fdf4; border:1px solid #bbf7d0; padding:14px; border-radius:12px;">
                        <div style="font-size:14px; color:#166534; font-weight:700; margin-bottom:6px;">PREGLEDI (IP)</div>
                        <div style="font-size:28px; font-weight:800; color:#15803d;">${sumIP} <span style="font-size:15px; font-weight:600; color:#22c55e;">(${odstotekDelovnoIP}%)</span></div>
                    </div>
                    <div style="flex:1; min-width:150px; background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:12px; text-align:center;">
                        <div style="font-size:14px; color:#475569; font-weight:700; margin-bottom:6px;">TOČKE / FAKTOR</div>
                        <div style="font-size:28px; font-weight:800; color:#0f172a;">${tocke.toFixed(2)} <span style="color:#0ea5e9;">/ ${faktor}</span></div>
                    </div>
                </div>
                ${htmlDelovnaMeseci}
            </div>

            <!-- LETNA NORMA SEKCIJA -->
            <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:16px; border-bottom:2px solid #cbd5e1; padding-bottom:8px;">
                    <h3 style="margin:0; font-size:18px; text-transform:uppercase; color:#334155; font-weight:800; letter-spacing:0.5px;">Letna norma</h3>
                    <div style="font-size:14px; color:#475569; font-weight:500;">Mimo je <b>${odstotekLeta_num.toFixed(1)}%</b> leta (${preostaliDni} dni do konca)</div>
                </div>
                
                <div style="display:flex; gap:16px; flex-wrap:wrap; margin-bottom:20px;">
                    <div style="flex:1; min-width:120px; background:#fffbea; border:1px solid #fef08a; padding:14px; border-radius:12px;">
                        <div style="font-size:14px; color:#a16207; font-weight:700; margin-bottom:6px;">AKTI (A)</div>
                        <div style="font-size:28px; font-weight:800; color:#854d0e;">${stats.norma.totalA} <span style="font-size:15px; font-weight:600; color:#ca8a04;">(${odstotekNormaA}%)</span></div>
                    </div>
                    <div style="flex:1; min-width:120px; background:#f0fdf4; border:1px solid #bbf7d0; padding:14px; border-radius:12px;">
                        <div style="font-size:14px; color:#166534; font-weight:700; margin-bottom:6px;">PREGLEDI (IP)</div>
                        <div style="font-size:28px; font-weight:800; color:#15803d;">${stats.norma.totalIP} <span style="font-size:15px; font-weight:600; color:#22c55e;">(${odstotekNormaIP}%)</span></div>
                    </div>
                    <div style="flex:1; min-width:150px; background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:12px; text-align:center;">
                        <div style="font-size:14px; color:#475569; font-weight:700; margin-bottom:6px;">SKUPAJ / REALIZACIJA</div>
                        <div style="font-size:28px; font-weight:800; color:#0f172a;">${skupnoNorma} <span style="color:#0ea5e9; font-size:18px;">/ ${skupnaRealizacijaLeta}%</span></div>
                    </div>
                </div>

                <div style="background:#ffffff; border:1px solid #e2e8f0; padding:20px; border-radius:12px;">
                    <div style="font-size:14px; color:#64748b; margin-bottom:16px; font-style:italic;">
                        *Ciljna letna norma: ${ciljNormaA} aktov in ${ciljNormaIP} pregledov.
                    </div>
                    
                    ${htmlNormaMeseci}

                    <div style="display:flex; flex-direction:column; gap:20px;">
                        <!-- Akti Progress -->
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:15px; margin-bottom:8px; font-weight:700; color:#334155;">
                                <span>Akti: ${stats.norma.totalA} / ${ciljNormaA} <span style="color:#64748b; font-weight:500;">(${dosezenoNormaA_num.toFixed(1)}%)</span></span>
                                <span>Pričakovano do danes: ${pricakovanoA} ${renderBadge(razlikaA)}</span>
                            </div>
                            <div style="width:100%; background:#f1f5f9; height:10px; border-radius:5px; overflow:hidden;">
                                <div style="width:${Math.min(dosezenoNormaA_num, 100)}%; background:${dosezenoNormaA_num >= odstotekLeta_num ? '#f59e0b' : '#ef4444'}; height:100%; border-radius:5px; transition:width 0.5s ease-in-out;"></div>
                            </div>
                        </div>

                        <!-- Pregledi Progress -->
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:15px; margin-bottom:8px; font-weight:700; color:#334155;">
                                <span>Pregledi: ${stats.norma.totalIP} / ${ciljNormaIP} <span style="color:#64748b; font-weight:500;">(${dosezenoNormaIP_num.toFixed(1)}%)</span></span>
                                <span>Pričakovano do danes: ${pricakovanoIP} ${renderBadge(razlikaIP)}</span>
                            </div>
                            <div style="width:100%; background:#f1f5f9; height:10px; border-radius:5px; overflow:hidden;">
                                <div style="width:${Math.min(dosezenoNormaIP_num, 100)}%; background:${dosezenoNormaIP_num >= odstotekLeta_num ? '#10b981' : '#ef4444'}; height:100%; border-radius:5px; transition:width 0.5s ease-in-out;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- 6. USTVARJANJE OKNA (MODAL) ---
    const stariModal = targetDocument.getElementById("moj-top-stat-modal");
    if (stariModal) stariModal.remove();

    const overlay = targetDocument.createElement("div");
    overlay.id = "moj-top-stat-modal";
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15, 23, 42, 0.6); z-index:999999; display:flex; align-items:center; justify-content:center; font-family:system-ui, -apple-system, sans-serif; overflow:auto; margin:0; padding:20px; box-sizing:border-box;";

    const modalHTML = `
        <div style="background:#ffffff; width:100%; max-width:700px; border-radius:16px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); display:flex; flex-direction:column; position:relative; margin:auto;">
            
            <!-- GLAVA -->
            <div style="background:#f8fafc; padding:16px 24px; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center; border-radius: 16px 16px 0 0;">
                <h2 style="margin:0; font-size:18px; color:#0f172a; font-weight:700; letter-spacing:-0.5px;">Statistika Realizacije</h2>
                
                <div style="display:flex; align-items:center; gap:16px;">
                    <label style="display:flex; align-items:center; gap:6px; font-size:13px; font-weight:600; color:#475569; cursor:pointer;">
                        <input type="checkbox" id="polovicna-norma-checkbox" style="width:16px; height:16px; cursor:pointer;">
                        Polovične norme
                    </label>
                    <button id="zapri-stat-btn" style="background:none; border:none; font-size:28px; color:#64748b; cursor:pointer; line-height:1; padding:0 5px;">&times;</button>
                </div>
            </div>

            <!-- VSEBINA (se polni dinamično) -->
            <div id="moj-top-stat-vsebina" style="padding:24px; display:flex; flex-direction:column;"></div>
            
        </div>
    `;

    overlay.innerHTML = modalHTML;
    
    try {
        targetDocument.body.appendChild(overlay);
        
        // Začetni render (polna norma)
        renderUI(false);
        
        // Dogodek za kljukico "Polovične norme"
        const checkbox = targetDocument.getElementById("polovicna-norma-checkbox");
        checkbox.addEventListener('change', function() {
            renderUI(this.checked);
        });

        // Dogodki za zapiranje okna
        targetDocument.getElementById("zapri-stat-btn").addEventListener("click", () => overlay.remove());
        overlay.addEventListener("click", (e) => {
            if(e.target === overlay) overlay.remove();
        });
        
    } catch(err) {
        console.error("Ne morem dodati okna v body", err);
        alert("Sistem preprečuje izris grafičnega okna. Preverite konzolo.");
    }
})();
