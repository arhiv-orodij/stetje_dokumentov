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
        delovna: { totalA: 0, totalIP: 0, currentA: 0, currentIP: 0, months: {} },
        norma: { totalA: 0, totalIP: 0, months: {} }
    };
    
    // Inicializacija mesecev (1-12)
    for (let i = 1; i <= 12; i++) {
        stats.delovna.months[i] = { a: 0, ip: 0 };
        stats.norma.months[i] = { a: 0, ip: 0 };
    }

    let targetDocument = document; 
    let validRows = []; // Vmesni rezervoar za najdene dokumente
    const dateRegex = /(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/; // Podpira datume s presledki

    function clean(str) {
        return (str || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    }

    function checkDocMatch(docString, list) {
        let searchDoc = docString.toLowerCase();
        return list.some(item => searchDoc.startsWith(item.toLowerCase()));
    }

    // --- 4. ZBIRANJE IN ANALIZA TABEL ---
    function collectRows(doc) {
        if (!doc) return;
        const rows = doc.querySelectorAll('tr');

        rows.forEach(tr => {
            const cells = tr.querySelectorAll('td');
            if (cells.length < 5) return; 

            const smer = clean(cells[0].textContent).toUpperCase();
            if (!['I', 'L'].includes(smer)) return;
            
            let dateText = clean(cells[1].textContent);
            let match = dateText.match(dateRegex);
            let day = match ? parseInt(match[1], 10) : null;
            let month = match ? parseInt(match[2], 10) : null;
            let year = match ? parseInt(match[3], 10) : null;
            if(!month || month < 1 || month > 12) month = 1; 

            let docName = "";
            for (let i = 2; i < cells.length; i++) {
                let cellText = clean(cells[i].textContent);
                if (cellText.includes(':') && (cellText.includes('Sklep') || cellText.includes('Odločba') || cellText.includes('Zapisnik') || cellText.includes('x(IPS)'))) {
                     docName = cellText.split(';')[0].trim(); 
                     break;
                }
            }

            // Če vrstica ustreza, jo shranimo za kasnejšo obdelavo
            if (docName && day && month && year) {
                validRows.push({ tr, day, month, year, docName });
            }
        });
        
        if (validRows.length > 0 && doc.body) {
            targetDocument = doc;
        }
    }

    function processWindow(win) {
        try {
            collectRows(win.document);
            for (let i = 0; i < win.frames.length; i++) {
                processWindow(win.frames[i]);
            }
        } catch(e) {}
    }

    processWindow(window);

    if (validRows.length === 0) {
        alert("Ni ustreznih podatkov.\n\nProsimo, odprite stran:\nPoročila -> Tekoče delo -> Realizacija dela\nin izberite pravi datum.");
        return; // Prekine izvajanje kode
    }

    // --- DOLOČITEV TEKOČEGA OBDOBJA NA PODLAGI ZAJETIH PODATKOV ---
    let maxTimeVal = 0;
    let trenutniMesec = 1;
    let trenutnoLeto = new Date().getFullYear();

    // Poiščemo najvišji mesec in leto izključno znotraj najdenih dokumentov
    validRows.forEach(r => {
        let tVal = r.year * 12 + r.month;
        if (tVal > maxTimeVal) {
            maxTimeVal = tVal;
            trenutniMesec = r.month;
            trenutnoLeto = r.year;
        }
    });

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function isCurrentPeriod(d, m, y) {
        let prejsnjiMesec = trenutniMesec === 1 ? 12 : trenutniMesec - 1;
        let letoPrejsnjega = trenutniMesec === 1 ? trenutnoLeto - 1 : trenutnoLeto;

        let zacetniDan = Math.min(30, getDaysInMonth(prejsnjiMesec, letoPrejsnjega));

        if (y === letoPrejsnjega && m === prejsnjiMesec && d >= zacetniDan) return true;
        if (y === trenutnoLeto && m === trenutniMesec && d <= 29) return true; 
        
        return false;
    }

// --- OBDELAVA IN ŠTETJE ---
    validRows.forEach(r => {
        let isCurr = isCurrentPeriod(r.day, r.month, r.year);

        // NOVO: Dokumenti od 30. dalje se štejejo v naslednji obračunski mesec
        let obracunskiM = r.day >= 30 ? (r.month === 12 ? 1 : r.month + 1) : r.month;

        // Štetje: DELOVNA USPEŠNOST
        if (checkDocMatch(r.docName, docsA)) {
            stats.delovna.totalA++;
            stats.delovna.months[obracunskiM].a++; // vpis v obračunski mesec
            if (isCurr) stats.delovna.currentA++;
            
            r.tr.style.backgroundColor = '#fff3cd'; 
        } else if (checkDocMatch(r.docName, docsIP)) {
            stats.delovna.totalIP++;
            stats.delovna.months[obracunskiM].ip++; // vpis v obračunski mesec
            if (isCurr) stats.delovna.currentIP++;
            
            r.tr.style.backgroundColor = '#d4edda'; 
        }

        // Štetje: LETNA NORMA
        if (checkDocMatch(r.docName, normaDocsA)) {
            stats.norma.totalA++;
            stats.norma.months[obracunskiM].a++;
        } else if (checkDocMatch(r.docName, normaDocsIP)) {
            stats.norma.totalIP++;
            stats.norma.months[obracunskiM].ip++;
        }
    });
    const zdaj = new Date(); // Ohranjeno za odstotek poteka tekočega leta v UI

// --- 5. LOGIKA ZA UI IN IZRAČUNE ---
    function renderUI(isHalfNorm) {
        let container = targetDocument.getElementById('moj-top-stat-vsebina');
        if (!container) return;

        const meja4 = isHalfNorm ? 1.5 : 3;
        const meja3 = isHalfNorm ? 1.25 : 2.5;
        const meja2 = isHalfNorm ? 1 : 2;
        const meja1 = isHalfNorm ? 0.75 : 1.5;

        // Izračuni za Delovno Uspešnost
        const sumA_top = stats.delovna.currentA;
        const sumIP_top = stats.delovna.currentIP;
        const tocke_top = (sumIP_top / 16) + (sumA_top / 4);
        
        let faktor_top = "0%";
        if (tocke_top >= meja4) faktor_top = "4%";
        else if (tocke_top >= meja3) faktor_top = "3%";
        else if (tocke_top >= meja2) faktor_top = "2%";
        else if (tocke_top >= meja1) faktor_top = "1%";

        let skupnoDelovno_top = sumA_top + sumIP_top;
        let odstotekDelovnoA_top = skupnoDelovno_top > 0 ? ((sumA_top / skupnoDelovno_top) * 100).toFixed(1) : "0";
        let odstotekDelovnoIP_top = skupnoDelovno_top > 0 ? ((sumIP_top / skupnoDelovno_top) * 100).toFixed(1) : "0";

        // Izračuni za Letno Normo
        const ciljNormaA = isHalfNorm ? 27 : 54;
        const ciljNormaIP = isHalfNorm ? 59.5 : 119;
        
        let dosezenoNormaA_num = ((stats.norma.totalA / ciljNormaA) * 100);
        let dosezenoNormaIP_num = ((stats.norma.totalIP / ciljNormaIP) * 100);
        let prikazDosezenoNormaA = dosezenoNormaA_num.toFixed(1) + "%";
        let prikazDosezenoNormaIP = dosezenoNormaIP_num.toFixed(1) + "%";
        
        const msVDnevu = 1000 * 60 * 60 * 24;
        const zacetekLeta = new Date(zdaj.getFullYear(), 0, 1);
        const konecLeta = new Date(zdaj.getFullYear(), 11, 31);
        
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

        // --- TABELA: DELOVNA USPEŠNOST (Z VSOTO) ---
        let htmlDelovnaMeseci = `<div style="display:grid; grid-template-columns: 85px repeat(12, 1fr) 50px; gap:4px; text-align:center; font-size:13px; margin-top:16px;">`;
        htmlDelovnaMeseci += `<div style="font-weight:700; color:#64748b; text-align:left;">MESEC</div>`;
        for(let i=1; i<=12; i++) htmlDelovnaMeseci += `<div style="font-weight:800; color:#64748b;">${i}</div>`;
        htmlDelovnaMeseci += `<div style="font-weight:900; color:#0f172a; background:#e2e8f0; border-radius:4px; display:flex; align-items:center; justify-content:center;">∑</div>`;
        
        let sumA_meseci = 0, sumIP_meseci = 0, sumTocke_meseci = 0;

        htmlDelovnaMeseci += `<div style="font-weight:600; color:#a16207; text-align:left;">Akti (A)</div>`;
        for(let i=1; i<=12; i++) {
            let val = stats.delovna.months[i].a || 0;
            sumA_meseci += val;
            htmlDelovnaMeseci += `<div style="background:#fef9c3; border-radius:4px; padding:3px 0;">${val || '-'}</div>`;
        }
        htmlDelovnaMeseci += `<div style="background:#fde047; border-radius:4px; padding:3px 0; font-weight:800; color:#854d0e;">${sumA_meseci || '-'}</div>`;
        
        htmlDelovnaMeseci += `<div style="font-weight:600; color:#166534; text-align:left;">Pregledi (IP)</div>`;
        for(let i=1; i<=12; i++) {
            let val = stats.delovna.months[i].ip || 0;
            sumIP_meseci += val;
            htmlDelovnaMeseci += `<div style="background:#dcfce7; border-radius:4px; padding:3px 0;">${val || '-'}</div>`;
        }
        htmlDelovnaMeseci += `<div style="background:#86efac; border-radius:4px; padding:3px 0; font-weight:800; color:#166534;">${sumIP_meseci || '-'}</div>`;
        
        let mesecTocke = [];
        htmlDelovnaMeseci += `<div style="font-weight:600; color:#0f172a; text-align:left;">Točke</div>`;
        for(let i=1; i<=12; i++) {
            let mt = (stats.delovna.months[i].ip / 16) + (stats.delovna.months[i].a / 4);
            mesecTocke[i] = mt;
            sumTocke_meseci += mt;
            htmlDelovnaMeseci += `<div style="background:#f1f5f9; border-radius:4px; padding:3px 0;">${mt>0 ? mt.toFixed(1) : '-'}</div>`;
        }
        htmlDelovnaMeseci += `<div style="background:#cbd5e1; border-radius:4px; padding:3px 0; font-weight:800; color:#0f172a;">-</div>`;
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
        htmlDelovnaMeseci += `<div style="background:#bae6fd; border-radius:4px; padding:3px 0; font-weight:800; color:#0369a1;">-</div>`;
        htmlDelovnaMeseci += `</div>`;

        // --- TABELA: LETNA NORMA (Z VSOTO) ---
        let htmlNormaMeseci = `<div style="display:grid; grid-template-columns: 85px repeat(12, 1fr) 50px; gap:4px; text-align:center; font-size:13px; margin-bottom:20px;">`;
        htmlNormaMeseci += `<div style="font-weight:700; color:#64748b; text-align:left;">MESEC</div>`;
        for(let i=1; i<=12; i++) htmlNormaMeseci += `<div style="font-weight:800; color:#64748b;">${i}</div>`;
        htmlNormaMeseci += `<div style="font-weight:900; color:#0f172a; background:#e2e8f0; border-radius:4px; display:flex; align-items:center; justify-content:center;">∑</div>`;
        
        let sumNormaA_meseci = 0, sumNormaIP_meseci = 0;

        htmlNormaMeseci += `<div style="font-weight:600; color:#b45309; text-align:left;">Akti (A)</div>`;
        for(let i=1; i<=12; i++) {
            let val = stats.norma.months[i].a || 0;
            sumNormaA_meseci += val;
            htmlNormaMeseci += `<div style="background:#ffedd5; border-radius:4px; padding:3px 0;">${val || '-'}</div>`;
        }
        htmlNormaMeseci += `<div style="background:#fdba74; border-radius:4px; padding:3px 0; font-weight:800; color:#9a3412;">${sumNormaA_meseci || '-'}</div>`;
        
        htmlNormaMeseci += `<div style="font-weight:600; color:#047857; text-align:left;">Pregledi (IP)</div>`;
        for(let i=1; i<=12; i++) {
            let val = stats.norma.months[i].ip || 0;
            sumNormaIP_meseci += val;
            htmlNormaMeseci += `<div style="background:#d1fae5; border-radius:4px; padding:3px 0;">${val || '-'}</div>`;
        }
        htmlNormaMeseci += `<div style="background:#6ee7b7; border-radius:4px; padding:3px 0; font-weight:800; color:#047857;">${sumNormaIP_meseci || '-'}</div>`;
        htmlNormaMeseci += `</div>`;

        // Stil za vprašaje
        const qStyle = `position:absolute; top:8px; right:8px; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; cursor:pointer; opacity:0.75; transition:all 0.2s;`;

        container.innerHTML = `
            <!-- DELOVNA USPEŠNOST SEKCIJA -->
            <div style="margin-bottom: 32px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:2px solid #cbd5e1; padding-bottom:8px; margin-bottom:16px;">
                    <h3 style="margin:0; font-size:18px; text-transform:uppercase; color:#334155; font-weight:800; letter-spacing:0.5px;">Delovna uspešnost za ${trenutniMesec}. mesec</h3>
                    <div style="font-size:13px; color:#475569; font-weight:500;">Obdobje: <b style="color:#0f172a;">30. prejšnji — 29. tekoči mesec</b></div>
                </div>
                
                <div style="display:flex; gap:16px; flex-wrap:wrap;">
                    <div style="flex:1; min-width:120px; background:#fffbea; border:1px solid #fef08a; padding:14px; border-radius:12px; position:relative;">
                        <div id="q-delovna-a" style="${qStyle} background:#fef08a; color:#854d0e;" title="Prikaži kateri akti se štejejo">?</div>
                        <div style="font-size:14px; color:#a16207; font-weight:700; margin-bottom:6px;">AKTI (A)</div>
                        <div style="font-size:28px; font-weight:800; color:#854d0e;">${sumA_top} <span style="font-size:15px; font-weight:600; color:#ca8a04;">(${odstotekDelovnoA_top}%)</span></div>
                    </div>
                    <div style="flex:1; min-width:120px; background:#f0fdf4; border:1px solid #bbf7d0; padding:14px; border-radius:12px; position:relative;">
                        <div id="q-delovna-ip" style="${qStyle} background:#bbf7d0; color:#166534;" title="Prikaži kateri pregledi se štejejo">?</div>
                        <div style="font-size:14px; color:#166534; font-weight:700; margin-bottom:6px;">PREGLEDI (IP)</div>
                        <div style="font-size:28px; font-weight:800; color:#15803d;">${sumIP_top} <span style="font-size:15px; font-weight:600; color:#22c55e;">(${odstotekDelovnoIP_top}%)</span></div>
                    </div>
                    <div style="flex:1; min-width:150px; background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:12px; text-align:center; position:relative;">
                        <div id="q-delovna-tocke" style="${qStyle} background:#e2e8f0; color:#475569;" title="Prikaži formulo">?</div>
                        <div style="font-size:14px; color:#475569; font-weight:700; margin-bottom:6px;">TOČKE / FAKTOR</div>
                        <div style="font-size:28px; font-weight:800; color:#0f172a;">${tocke_top.toFixed(2)} <span style="color:#0ea5e9;">/ ${faktor_top}</span></div>
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
                    <div style="flex:1; min-width:120px; background:#fffbea; border:1px solid #fef08a; padding:14px; border-radius:12px; position:relative;">
                        <div id="q-norma-a" style="${qStyle} background:#fef08a; color:#854d0e;" title="Prikaži kateri akti se štejejo">?</div>
                        <div style="font-size:14px; color:#a16207; font-weight:700; margin-bottom:6px;">AKTI (A)</div>
                        <div style="font-size:28px; font-weight:800; color:#854d0e;">${stats.norma.totalA} <span style="color:#ca8a04;">(${prikazDosezenoNormaA})</span></div>
                    </div>
                    <div style="flex:1; min-width:120px; background:#f0fdf4; border:1px solid #bbf7d0; padding:14px; border-radius:12px; position:relative;">
                        <div id="q-norma-ip" style="${qStyle} background:#bbf7d0; color:#166534;" title="Prikaži kateri pregledi se štejejo">?</div>
                        <div style="font-size:14px; color:#166534; font-weight:700; margin-bottom:6px;">PREGLEDI (IP)</div>
                        <div style="font-size:28px; font-weight:800; color:#15803d;">${stats.norma.totalIP} <span style="color:#22c55e;">(${prikazDosezenoNormaIP})</span></div>
                    </div>
                </div>

                <div style="background:#ffffff; border:1px solid #e2e8f0; padding:20px; border-radius:12px;">
                    <div style="font-size:14px; color:#64748b; margin-bottom:16px; font-style:italic;">
                        *Ciljna letna norma: ${ciljNormaA} aktov in ${ciljNormaIP} pregledov.
                    </div>
                    
                    ${htmlNormaMeseci}

                    <div style="display:flex; flex-direction:column; gap:20px;">
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:15px; margin-bottom:8px; font-weight:700; color:#334155;">
                                <span>Akti: ${stats.norma.totalA} / ${ciljNormaA} <span style="color:#64748b; font-weight:500;">(${dosezenoNormaA_num.toFixed(1)}%)</span></span>
                                <span>Pričakovano do danes: ${pricakovanoA} ${renderBadge(razlikaA)}</span>
                            </div>
                            <div style="width:100%; background:#f1f5f9; height:10px; border-radius:5px; overflow:hidden;">
                                <div style="width:${Math.min(dosezenoNormaA_num, 100)}%; background:${dosezenoNormaA_num >= odstotekLeta_num ? '#f59e0b' : '#ef4444'}; height:100%; border-radius:5px; transition:width 0.5s ease-in-out;"></div>
                            </div>
                        </div>

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

        // Povezava gumbov "?" z izpisi podatkov
// --- LASTNO POJAVNO OKENCE ZA IZPIS (namesto sistemskega alert-a) ---
        const showInfo = (title, list) => {
            let stari = targetDocument.getElementById('moj-info-popup');
            if (stari) stari.remove();
            
            let popup = targetDocument.createElement('div');
            popup.id = 'moj-info-popup';
            popup.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; padding:20px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.2); z-index:999999; max-height:85%; overflow-y:auto; width:90%; max-width:450px;';
            
            // Če je list array (seznam), ga pretvorimo v html vrstice, sicer obdržimo besedilo (za formulo)
            let vsebina = Array.isArray(list) ? "• " + list.join("<br>• ") : list.replace(/\n/g, '<br>');
            
            popup.innerHTML = `
                <h4 style="margin:0 0 12px 0; color:#0f172a; font-size:15px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">${title}</h4>
                <div style="font-size:13px; color:#334155; line-height:1.5;">${vsebina}</div>
                <div style="text-align:right; margin-top:16px; border-top:1px solid #e2e8f0; padding-top:12px;">
                    <button id="zapri-info-btn" style="background:#0f172a; color:#fff; border:none; padding:6px 16px; border-radius:6px; font-weight:600; cursor:pointer;">Zapri</button>
                </div>
            `;
            
            container.style.position = 'relative';
            container.appendChild(popup);
            
            targetDocument.getElementById('zapri-info-btn').onclick = () => popup.remove();
        };

        // Povezava gumbov "?" z novim oknom
        const setupBtn = (id, title, list) => {
            let btn = targetDocument.getElementById(id);
            if(btn) {
                btn.onmouseover = function(){ this.style.opacity = '1'; };
                btn.onmouseout = function(){ this.style.opacity = '0.75'; };
                btn.onclick = () => showInfo(title, list);
            }
        };

        setupBtn('q-delovna-a', 'DELOVNA USPEŠNOST - Seznam aktov (A)', docsA);
        setupBtn('q-delovna-ip', 'DELOVNA USPEŠNOST - Seznam pregledov (IP)', docsIP);
        setupBtn('q-norma-a', 'LETNA NORMA - Seznam aktov (A)', normaDocsA);
        setupBtn('q-norma-ip', 'LETNA NORMA - Seznam pregledov (IP)', normaDocsIP);
        
        let tockeBtn = targetDocument.getElementById('q-delovna-tocke');
        if(tockeBtn) {
            tockeBtn.onmouseover = function(){ this.style.opacity = '1'; };
            tockeBtn.onmouseout = function(){ this.style.opacity = '0.75'; };
            tockeBtn.onclick = () => showInfo("FORMULA ZA TOČKE IN FAKTOR", "Točke = (Pregledi / 16) + (Akti / 4)\n\nMeje za faktor (polna norma):\n3.0 točk ➔ 4%\n2.5 točk ➔ 3%\n2.0 točk ➔ 2%\n1.5 točk ➔ 1%\n\n(Pri obkljukani polovični normi so meje točk prepolovljene.)");        
        }
    }
// --- 6. USTVARJANJE OKNA (MODAL) ---
    const stariModal = targetDocument.getElementById("moj-top-stat-modal");
    if (stariModal) stariModal.remove();

    const overlay = targetDocument.createElement("div");
    overlay.id = "moj-top-stat-modal";
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15, 23, 42, 0.6); z-index:999999; display:flex; align-items:center; justify-content:center; font-family:system-ui, -apple-system, sans-serif; overflow:auto; margin:0; padding:20px; box-sizing:border-box;";

    const modalHTML = `
        <div style="background:#ffffff; width:100%; max-width:700px; border-radius:16px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); display:flex; flex-direction:column; position:relative; margin:auto;">
            
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

            <div id="moj-top-stat-vsebina" style="padding:24px; display:flex; flex-direction:column;"></div>
            
        </div>
    `;

    overlay.innerHTML = modalHTML;
    
    try {
        targetDocument.body.appendChild(overlay);
        renderUI(false);
        
        const checkbox = targetDocument.getElementById("polovicna-norma-checkbox");
        checkbox.addEventListener('change', function() {
            renderUI(this.checked);
        });

        targetDocument.getElementById("zapri-stat-btn").addEventListener("click", () => overlay.remove());
        overlay.addEventListener("click", (e) => {
            if(e.target === overlay) overlay.remove();
        });
        
    } catch(err) {
        console.error("Ne morem dodati okna v body", err);
        alert("Sistem preprečuje izris grafičnega okna. Preverite konzolo.");
    }
})();
