// services/geminiService.ts
// Service d'intégration avec l'API Google Gemini

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const SYSTEM_CONTEXT = `Tu es un expert technique senior d'IMANI-TECH SOLUTIONS, une entreprise IT basée à Douala, Cameroun.
Tu accompagnes les PME camerounaises dans leurs projets d'infrastructure réseau (LAN/Wi-Fi), 
vidéosurveillance IP, développement web & mobile, cybersécurité, et digitalisation.
Réponds toujours en français, de manière professionnelle, précise et concise.
Propose des solutions adaptées au contexte camerounais (budget, infrastructure locale, etc.).
Si une question dépasse ton domaine, invite l'utilisateur à contacter l'équipe directement via WhatsApp.`;

/**
 * Envoie un message au chatbot IA et retourne la réponse
 */
export async function chatWithAssistant(userMessage: string): Promise<string> {
  try {
    if (!GEMINI_API_KEY) {
      return simulateResponse(userMessage);
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_CONTEXT}\n\nQuestion du client: ${userMessage}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Je n'ai pas pu générer une réponse. Veuillez réessayer."
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return simulateResponse(userMessage);
  }
}

/**
 * Génère un résumé d'audit technique personnalisé
 */
export async function generateAuditSummary(formData: {
  company?: string;
  city?: string;
  needs?: string[];
  employees?: string;
  currentInfra?: string;
}): Promise<string> {
  try {
    if (!GEMINI_API_KEY) {
      return simulateAuditSummary(formData);
    }

    const prompt = `${SYSTEM_CONTEXT}

Génère un résumé d'audit technique professionnel pour:
- Entreprise: ${formData.company || "Non précisé"}
- Ville: ${formData.city || "Cameroun"}
- Besoins identifiés: ${formData.needs?.join(", ") || "À définir"}
- Nombre d'employés: ${formData.employees || "Non précisé"}
- Infrastructure actuelle: ${formData.currentInfra || "Non précisé"}

Inclure: diagnostic rapide, recommandations prioritaires, estimation de délai.
Format: court, professionnel, orienté solutions.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 600,
        },
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      simulateAuditSummary(formData)
    );
  } catch (error) {
    console.error("Gemini audit error:", error);
    return simulateAuditSummary(formData);
  }
}

// ─── Réponses de fallback (sans clé API) ─────────────────────────────────────

function simulateResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("réseau") || msg.includes("wifi") || msg.includes("lan")) {
    return `INFRASTRUCTURE RÉSEAU\n\nNous proposons des solutions complètes :\n- Câblage structuré Cat6/Cat6A certifié\n- Wi-Fi d'entreprise (Cisco, Ubiquiti, Mikrotik)\n- Segmentation VLAN et QoS\n- Supervision réseau 24/7\n\nNos installations couvrent Douala, Yaoundé et 10 autres villes au Cameroun.\n\nSouhaitez-vous un devis personnalisé ?`;
  }

  if (msg.includes("caméra") || msg.includes("surveillance") || msg.includes("cctv")) {
    return `VIDÉOSURVEILLANCE IP\n\nNos solutions de sécurité visuelle :\n- Caméras IP Full HD / 4K (intérieur & extérieur)\n- Enregistreurs NVR avec stockage cloud\n- Accès à distance via mobile\n- Analyse intelligente (détection de mouvement, IA)\n\nInstallation garantie sous 48h à Douala et Yaoundé.`;
  }

  if (msg.includes("web") || msg.includes("site") || msg.includes("application")) {
    return `DÉVELOPPEMENT WEB & MOBILE\n\nNos réalisations digitales :\n- Sites vitrines & e-commerce\n- Applications mobiles Android/iOS\n- Systèmes de gestion sur mesure (ERP, CRM)\n- Intégration Mobile Money (MTN, Orange)\n\nDélais : 2 à 8 semaines selon la complexité.`;
  }

  if (msg.includes("prix") || msg.includes("tarif") || msg.includes("coût") || msg.includes("devis")) {
    return `NOS PACKAGES\n\nNous proposons 3 formules adaptées aux PME :\n- Package Starter : infrastructure de base\n- Package Croissance : réseau + sécurité + web\n- Package Premium : solution complète sur mesure\n\nContactez-nous sur WhatsApp pour un devis gratuit sous 24h.`;
  }

  return `Merci pour votre message.\n\nEn tant qu'expert technique IMANI-TECH SOLUTIONS, je peux vous accompagner sur :\n- Infrastructures réseau LAN/Wi-Fi\n- Vidéosurveillance IP\n- Développement web & mobile\n- Cybersécurité & audit IT\n- Maintenance informatique\n\nPosez-moi votre question spécifique ou contactez notre équipe directement via WhatsApp pour une réponse personnalisée.`;
}

function simulateAuditSummary(formData: {
  company?: string;
  city?: string;
  needs?: string[];
}): string {
  return `RAPPORT D'AUDIT PRÉLIMINAIRE\n\n${formData.company ? `Entreprise : ${formData.company}` : "Votre entreprise"}\n${formData.city ? `Localisation : ${formData.city}` : ""}\n\nDIAGNOSTIC RAPIDE :\nBasé sur vos besoins identifiés${formData.needs?.length ? ` (${formData.needs.join(", ")})` : ""}, nous recommandons une intervention prioritaire sur votre infrastructure IT.\n\nRECOMMANDATIONS :\n- Audit complet sur site (gratuit)\n- Mise à niveau de l'infrastructure réseau\n- Déploiement de solutions de sécurité adaptées\n- Formation de vos équipes\n\nDÉLAI ESTIMÉ : 2 à 4 semaines\n\nUn expert IMANI-TECH vous contactera sous 24h pour planifier votre audit gratuit.`;
}


