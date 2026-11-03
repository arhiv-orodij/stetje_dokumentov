// --- KREIRANJE UI OKNA ---
    
    // Določimo dokument, kjer bomo narisali UI (vedno poskusimo na glavno krovno okno)
    let uiDocument = document;
    try {
        // Preverimo, če imamo dostop do glavnega okna (top) in če ima body (ni zgolj frameset)
        if (window.top.document && window.top.document.body && window.top.document.body.tagName.toLowerCase() !== 'frameset') {
            uiDocument = window.top.document;
        }
    } catch (e) {
        // Cross-origin zaščita nam je preprečila dostop do top okna, nadaljujemo s trenutnim
    }

    // Če trenutni uiDocument nima body-ja (npr. smo v frameset), poskusimo poiskati prvi uporaben frame
    if (!uiDocument.body || uiDocument.body.tagName.toLowerCase() === 'frameset') {
        uiDocument = targetDocument.body ? targetDocument : document;
    }

    const stariModal = uiDocument.getElementById("moj-top-stat-modal");
    if (stariModal) stariModal.remove();

    const overlay = uiDocument.createElement("div");
    overlay.id = "moj-top-stat-modal";
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15, 23, 42, 0.6); z-index:999999; display:flex; align-items:center; justify-content:center; font-family:system-ui, -apple-system, sans-serif; overflow:auto; margin:0; padding:20px; box-sizing:border-box;";

    // Vstavi obstoječi modalHTML zgoraj
    overlay.innerHTML = modalHTML;
    
    let uiPrikazan = false;
    try {
        uiDocument.body.appendChild(overlay);
        uiPrikazan = true;
        
        uiDocument.getElementById("zapri-stat-btn").addEventListener("click", () => overlay.remove());
        overlay.addEventListener("click", (e) => {
            if(e.target === overlay) overlay.remove();
        });
    } catch(err) {
        console.error("Ne morem dodati okna v body", err);
    }

    // Varnostni rezervni plan ostane enak
    setTimeout(() => {
        if (!uiPrikazan || !uiDocument.getElementById("moj-top-stat-modal")) {
            alert(
                "--- DELOVNA USPEŠNOST ---\n" +
                "Akti (A): " + sumA + "\nPregledi (IP): " + sumIP + "\n" +
                "Faktor: " + faktor + "\n\n" +
                "--- LETNA NORMA ---\n" +
                "Akti (A): " + normaSumA + " / " + ciljNormaA + "\n" +
                "Pregledi (IP): " + normaSumIP + " / " + ciljNormaIP + "\n\n" +
                "(Opomba: Sistem preprečuje grafični prikaz, zato je prikazano kot tekst.)"
            );
        }
    }, 500);
