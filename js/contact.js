/* contact.js - validation du formulaire et pré-remplissage via URL */
try {
  const form = document.getElementById("contact-form");
  if (form) {
    const msg = form.elements.message;
    const counter = document.getElementById("msg-count");

    /* Pré-remplissage automatique via les paramètres d'URL (?sujet=...&info=...) */
    const params = new URLSearchParams(window.location.search);
    const sujetParam = params.get("sujet");
    const infoParam = params.get("info");

    if (sujetParam) {
      Array.from(form.elements.sujet.options).forEach((opt) => {
        if (opt.text.toLowerCase().includes(sujetParam.toLowerCase())) {
          form.elements.sujet.value = opt.value;
        }
      });
    }
    if (infoParam) {
      form.elements.message.value = "Bonjour, je suis intéressé(e) par : " + infoParam + ".\n";
      counter.textContent = form.elements.message.value.length + " / 500";
    }

    const regles = {
      nom: (v) => v.trim().length >= 2 || "Saisis ton nom (2 caractères minimum).",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Saisis une adresse e-mail valide, par exemple nom@exemple.fr.",
      telephone: (v) => v === "" || /^(?:0|\+33\s?)[1-9](?:[\s.-]?\d{2}){4}$/.test(v.trim()) || "Numéro invalide. Exemple : 06 12 34 56 78.",
      sujet: (v) => v !== "" || "Choisis un sujet.",
      message: (v) => v.trim().length >= 10 || "Ton message doit contenir au moins 10 caractères."
    };

    function verifier(champ) {
      const bloc = champ.closest(".field");
      const zone = bloc.querySelector(".error");
      const res = regles[champ.name](champ.value);
      const valide = res === true;
      bloc.classList.toggle("invalid", !valide);
      champ.setAttribute("aria-invalid", String(!valide));
      zone.textContent = valide ? "" : res;
      return valide;
    }

    Object.keys(regles).forEach((nom) => {
      const champ = form.elements[nom];
      champ.addEventListener("blur", () => verifier(champ));
      champ.addEventListener("input", () => { if (champ.closest(".field").classList.contains("invalid")) verifier(champ); });
    });
    msg.addEventListener("input", () => { counter.textContent = msg.value.length + " / 500"; });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      Object.keys(regles).forEach((nom) => { if (!verifier(form.elements[nom])) ok = false; });
      const rgpd = form.elements.rgpd;
      const rgpdErr = document.getElementById("rgpd-error");
      rgpdErr.textContent = rgpd.checked ? "" : "Tu dois accepter pour envoyer le message.";
      if (!rgpd.checked) ok = false;

      if (ok) {
        const retour = document.getElementById("form-result");
        retour.hidden = false;
        retour.textContent = "Merci " + form.elements.nom.value.trim() + ", ton message est bien parti. Nous répondons sous 48 h.";
        form.reset();
        counter.textContent = "0 / 500";
      } else {
        const premier = form.querySelector(".invalid input, .invalid select, .invalid textarea");
        if (premier) premier.focus();
      }
    });
  }
} catch (err) { console.error("Formulaire :", err); }