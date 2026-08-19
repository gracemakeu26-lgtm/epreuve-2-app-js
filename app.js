/*
  ÉPREUVE 2 — Suivi des dépenses fournitures, Studio Lumière (60 min)

  Le HTML et le CSS sont déjà faits, tu n'y touches pas (sauf si tu ajoutes
  des éléments dans la liste via JS, évidemment).
  Tout se passe dans ce fichier, en JavaScript pur (pas de bibliothèque).

  CONTEXTE : Studio Lumière est un salon de beauté. La gérante veut suivre
  ses achats de fournitures (vernis, crèmes, gants, cire...) et surveiller
  son budget mensuel.

  FONCTIONNALITÉS À IMPLÉMENTER :

  1. AJOUT — Quand le formulaire est soumis :
     - créer une ligne dans la liste (#liste) affichant le libellé,
       le montant formaté (ex : "42.50 €") et un bouton "✕" de suppression
     - vider les champs après l'ajout

  2. VALIDATION — Refuser l'ajout et afficher un message dans #erreur si :
     - le libellé est vide (ou ne contient que des espaces)
     - le montant est vide, négatif ou nul
     Le message d'erreur disparaît dès qu'un ajout est valide.

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
    const liste = document.querySelector("#liste");
    const boutton = document.querySelector("button");
    const libelle = document.querySelector("#libelle");
    const montant = document.querySelector("#montant");
    const erreur = document.querySelector("#erreur");
    const total = document.querySelector("#total");
    const form = document.querySelector("form");

    function formatMoney(value) {
        parseFloat(value);
        return value.toFixed(2) + ' €';
    }

    function totalAjour() {
        var totalDepense = 0;
        for (var i = 0; i < liste.children.length; i++) {
          var item = liste.children[i];
          const amountText = item.getAttribute('data-amount');
          var amount = parseFloat(amountText);
          if (!isNaN(amount)) {
            totalDepense += amount;
          }
        }
    
        total.textContent = formatMoney(totalDepense);
    
        if (totalDepense > 500) {
          total.classList.add('depasse');
        } else {
          total.classList.remove('depasse');
        }
  }

    function ajouterDepense(libelleValue, montantValue) {
        const li = document.createElement("li");
        li.setAttribute('data-amount', montantValue);
        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.addEventListener("click", function() {
            li.remove();
            totalAjour();
        });
        li.textContent = libelleValue + " " + parseFloat(montantValue).toFixed(2) + " €";
        li.appendChild(btn);
        liste.appendChild(li);
        return li;
    }

    function supprimerDepense(li) {
        li.remove();
        total = totalAjour();
    }

    form.addEventListener("submit" , function(event) {
        event.preventDefault();
        const libelleValue = libelle.value.trim();
        const montantValue = montant.value.trim();
        if (libelleValue === "" || montantValue === "" || montantValue <= 0) {
            erreur.textContent = "Veuillez remplir correctement les champs.";
            return;
        }
        erreur.textContent = " ";
        ajouterDepense(libelleValue, montantValue);
        libelle.value = "";
        montant.value = "";
        totalAjour();
        libelle.focus();
    });
});
