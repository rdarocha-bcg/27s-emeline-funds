/**
 * ===== CAGNOTTE D'ÉMELINE - SCRIPT PRINCIPAL =====
 * Gestion de la récupération et affichage des données Google Sheets
 */

// Configuration
const SHEET_ID = "12G_EmM7B28ZPl0zK27bXlEIDM-bo-6sCNZQw1e_BqGg";
const GID = "0"; // Change if different sheet tab

/**
 * Génère l'URL CSV avec cache busting pour éviter les problèmes de cache
 * @returns {string} URL complète du CSV
 */
function getCSVUrl() {
  const cacheBust = Date.now();
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}&cacheBust=${cacheBust}`;
}

/**
 * Parse une date en format DD/MM/YYYY ou autres formats standards
 * @param {string} str - La chaîne de date à parser
 * @returns {Date|null} Date parsée ou null si invalide
 */
function parseDate(str) {
  if (!str) return null;
  
  // Try direct parsing first
  let d = new Date(str);
  if (!isNaN(d)) return d;
  
  // Try DD/MM/YYYY format with optional time "DD/MM/YYYY HH:MM"
  const parts = str.trim().split(/[\/\s:]/);
  if (parts.length >= 3) {
    let [jj, mm, aaaa, h = 0, min = 0] = parts;
    if (aaaa.length === 2) aaaa = '20' + aaaa;
    const d2 = new Date(+aaaa, +mm - 1, +jj, +h, +min);
    if (!isNaN(d2)) return d2;
  }
  
  return null;
}

/**
 * Met à jour le statut affiché à l'utilisateur
 * @param {string} message - Message à afficher
 * @param {string} className - Classe CSS pour le style (loading, error, success)
 */
function updateStatus(message, className = '') {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message;
  statusEl.className = `status ${className}`;
}

/**
 * Récupère et traite les données depuis Google Sheets
 */
function fetchData() {
  updateStatus("Chargement des données...", "loading");
  
  Papa.parse(getCSVUrl(), {
    download: true,
    header: true,
    complete: (res) => {
      try {
        // Validation des données reçues
        if (!res.data || res.data.length === 0) {
          updateStatus("Aucune donnée trouvée dans la feuille.", "error");
          return;
        }

        // Filtrer les lignes vides (qui ont un nom et un montant)
        const rows = res.data.filter(r => r.Nom && r.Montant);
        
        if (rows.length === 0) {
          updateStatus("Aucun participant trouvé. Vérifiez que les colonnes 'Nom' et 'Montant' existent.", "error");
          return;
        }

        // Traitement des données
        let total = 0;
        let lastDate = null;
        const ul = document.getElementById("list");
        ul.innerHTML = "";
        
        rows.forEach((r, index) => {
          // Calcul du montant (remplace les virgules par des points)
          const amount = parseFloat(String(r.Montant).replace(",", "."));
          if (!isNaN(amount)) total += amount;
          
          // Parsing de la date pour trouver la plus récente
          const d = parseDate(r.Date);
          if (d && (!lastDate || d > lastDate)) lastDate = d;

          // Création de l'élément participant avec animation séquentielle
          const li = document.createElement("li");
          li.className = "participant-item";
          li.style.animationDelay = `${index * 0.1}s`;
          li.innerHTML = `
            <span class="participant-name">${r.Nom}</span>
            <span class="participant-check">✅</span>
          `;
          ul.appendChild(li);
        });
        
        // Mise à jour de l'interface
        document.getElementById("total").textContent = Math.round(total) + " €";
        document.getElementById("participantCount").textContent = rows.length;
        document.getElementById("lastUpdate").textContent = lastDate
          ? lastDate.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })
          : "—";
        
        // Message de succès
        const participantText = rows.length > 1 ? 's' : '';
        updateStatus(`✨ ${rows.length} participant${participantText} • Total : ${Math.round(total)} €`, "success");
        
        // Masquer le statut après 3 secondes de succès
        setTimeout(() => {
          document.getElementById("status").style.display = 'none';
        }, 3000);
        
      } catch (error) {
        console.error('Error processing data:', error);
        updateStatus("Erreur lors du traitement des données. Vérifiez la console pour plus de détails.", "error");
      }
    },
    error: (err) => {
      console.error('CSV fetch error:', err);
      updateStatus(
        "Erreur lors du chargement des données. Vérifiez que la feuille Google Sheets est accessible publiquement.",
        "error"
      );
    }
  });
}

/**
 * Initialisation de l'application
 */
function initApp() {
  // Chargement initial des données
  fetchData();

  // Actualisation automatique toutes les minutes
  setInterval(fetchData, 60000);

  // Permettre un refresh manuel en cliquant sur le statut
  document.getElementById("status").addEventListener('click', () => {
    if (!document.getElementById("status").classList.contains('loading')) {
      fetchData();
    }
  });

  // Effet de scintillement au chargement de la page
  setTimeout(() => {
    document.body.style.animation = 'none';
  }, 1000);
}

// Démarrage de l'application quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
} 