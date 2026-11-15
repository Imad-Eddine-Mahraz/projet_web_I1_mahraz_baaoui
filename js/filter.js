/* filter.js - filtre générique + réservation interactive des cours (localStorage) */
try {
  const items = document.querySelectorAll(".filterable");
  const controls = document.querySelectorAll("[data-filter]");
  const search = document.querySelector("[data-search]");
  const count = document.getElementById("result-count");
  const empty = document.getElementById("empty");

  function apply() {
    const q = search ? search.value.trim().toLowerCase() : "";
    let visible = 0;
    items.forEach((item) => {
      let ok = item.textContent.toLowerCase().includes(q);
      controls.forEach((c) => {
        if (c.value && item.dataset[c.dataset.filter] !== c.value) ok = false;
      });
      item.hidden = !ok;
      if (ok) visible++;
    });
    if (count) count.textContent = visible + " résultat" + (visible > 1 ? "s" : "");
    if (empty) empty.hidden = visible !== 0;
  }
  if (search) search.addEventListener("input", apply);
  controls.forEach((c) => c.addEventListener("change", apply));
  apply();
} catch (err) { console.error("Filtre :", err); }

/* Réservation interactive dans le tableau des cours (localStorage) */
try {
  const tableBody = document.querySelector("table tbody");
  if (tableBody) {
    const theadRow = document.querySelector("table thead tr");
    const thAction = document.createElement("th");
    thAction.scope = "col";
    thAction.textContent = "Action";
    theadRow.appendChild(thAction);

    const saved = JSON.parse(localStorage.getItem("fitzone_resa") || "[]");

    tableBody.querySelectorAll("tr").forEach((row, idx) => {
      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.type = "button";
      const coursId = "cours-" + idx;
      const isReserved = saved.includes(coursId);

      btn.className = "btn btn--sm " + (isReserved ? "btn--reserved" : "btn--blue");
      btn.textContent = isReserved ? "Réservé ✓" : "Réserver";

      btn.addEventListener("click", () => {
        const list = JSON.parse(localStorage.getItem("fitzone_resa") || "[]");
        const pos = list.indexOf(coursId);
        if (pos === -1) {
          list.push(coursId);
          btn.className = "btn btn--sm btn--reserved";
          btn.textContent = "Réservé ✓";
        } else {
          list.splice(pos, 1);
          btn.className = "btn btn--sm btn--blue";
          btn.textContent = "Réserver";
        }
        localStorage.setItem("fitzone_resa", JSON.stringify(list));
      });

      td.appendChild(btn);
      row.appendChild(td);
    });
  }
} catch (err) { console.error("Réservation :", err); }