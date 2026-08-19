/*
  ÉPREUVE 2 — Suivi des dépenses fournitures, Studio Lumière (60 min)

  Le HTML et le CSS sont déjà faits, tu n'y touches pas (sauf si tu ajoutes
  des éléments dans la list via JS, évidemment).
  Tout se passe dans ce fichier, en JavaScript pur (pas de bibliothèque).

  CONTEXTE : Studio Lumière est un salon de beauté. La gérante veut suivre
  ses achats de fournitures (vernis, crèmes, gants, cire...) et surveiller
  son budget mensuel.

  FONCTIONNALITÉS À IMPLÉMENTER :

  1. AJOUT — Quand le formulaire est soumis :
     - créer une ligne dans la list (#list) affichant le libellé,
       le amount formaté (ex : "42.50 €") et un bouton "✕" de suppression
     - vider les champs après l'ajout

  2. VALIDATION — Refuser l'ajout et afficher un message dans #error si :
     - le libellé est vide (ou ne contient que des espaces)
     - le amount est vide, négatif ou nul
     Le message d'error disparaît dès qu'un ajout est valide.

  3. SUPPRESSION — Le bouton "✕" de chaque ligne supprime cette dépense
     (et le total se met à jour).

  4. TOTAL — #total affiche en permanence la somme de toutes les dépenses.

  5. BUDGET — Si le total dépasse 500 €, le total passe en rouge
     (la classe CSS "depasse" existe déjà pour ça).

  BONUS (si tu as le temps) :
  6. Un double-clic sur le libellé d'une dépense permet de la modifier
     (comme tu veux : prompt(), champ inline...) — le total suit.

  Conseils : teste au fur et à mesure dans le navigateur,
  et utilise la console (F12) sans modération.
*/

// Ton code ici :
document.addEventListener("DOMContentLoaded", function()  {
    let list = document.querySelector("#liste");
    let label = document.querySelector("#libelle");
    let amount = document.querySelector("#montant");
    let error = document.querySelector("#erreur");
    let total = document.querySelector("#total");
    let form = document.querySelector("form");

    function updateTotal() {
        let totalExpense = 0;
        for (let i = 0; i < list.children.length; i++) {
          let item = list.children[i];
          let amountText = item.getAttribute('data-amount');
          let amount1 = parseFloat(amountText);
          if (!isNaN(amount1)) {
            totalExpense += amount1;
          }
        }
    
        total.textContent = totalExpense.toFixed(2) + " €";
    
        if (totalExpense > 500) {
          total.classList.add('depasse');
        } else {
          total.classList.remove('depasse');
        }
  }

    function addExpense(labelValue, amountValue) {
        let li = document.createElement("li");
        li.setAttribute('data-amount', amountValue);
        let btn = document.createElement("button");
        btn.textContent = "X";
        btn.addEventListener("click", function() {
            li.remove();
            updateTotal();
        });
        li.textContent = labelValue + " " + parseFloat(amountValue).toFixed(2) + " €";
        li.appendChild(btn);
        list.appendChild(li);
        return li;
    }
    form.addEventListener("submit" , function(event) {
        event.preventDefault();
        let labelValue = label.value.trim();
        let amountValue = amount.value.trim();
        if (labelValue === "" || amountValue === "" || amountValue <= 0) {
            error.textContent = "Veuillez remplir correctement les champs.";
            return;
        }
        error.textContent = " ";
        addExpense(labelValue, amountValue);
        label.value = "";
        amount.value = "";
        updateTotal();
        label.focus();
    });
});
