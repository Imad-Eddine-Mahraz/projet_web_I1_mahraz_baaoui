/* tarifs.js - simulateur de prix */
try {
  const form = document.getElementById("simulateur");
  const out = document.getElementById("total");
  const detail = document.getElementById("detail");
  if (form && out) {
    const PRIX = { essentiel: 19.99, premium: 29.99, ultimate: 39.99 };
    const REMISE = { 0: 0, 12: 0.10 };

    function calculer() {
      const formule = form.elements.formule.value;
      const duree = Number(form.elements.duree.value);
      let mensuel = PRIX[formule];
      form.querySelectorAll('input[name="option"]:checked').forEach((o) => {
        mensuel += Number(o.value);
      });
      mensuel = mensuel * (1 - REMISE[duree]);
      out.textContent = mensuel.toFixed(2).replace(".", ",") + " €/mois";
      detail.textContent = duree === 12
        ? "Soit " + (mensuel * 12).toFixed(2).replace(".", ",") + " € sur 12 mois (remise de 10 % incluse)."
        : "Sans engagement, résiliable à tout moment.";
    }
    form.addEventListener("change", calculer);
    calculer();
  }
} catch (err) { console.error("Simulateur :", err); }