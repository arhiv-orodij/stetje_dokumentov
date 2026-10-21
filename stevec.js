(function(){
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

    let sumA = 0;
    let sumIP = 0;

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

            if (docsA[docName] && docsA[docName].includes(smer)) {
                sumA += count;
                tr.style.backgroundColor = '#fff3cd';
            } else if (docsIP[docName] && docsIP[docName].includes(smer)) {
                sumIP += count;
                tr.style.backgroundColor = '#d4edda';
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

    const tocke = (sumIP / 20) + (sumA / 6);
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

    alert(
        "STATISTIKA:\n\n" +
        "Skupno število aktov (A_Gradb): " + sumA + "\n" +
        "Skupno število pregledov (IP_Gradb): " + sumIP + "\n\n" +
        "Vsota točk: " + tocke.toFixed(2) + "\n" +
        "Faktor realizacije: " + faktor
    );
})();
