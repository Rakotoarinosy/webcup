/**
 * Lexique de la plateforme (D13) : les mots administratifs ou techniques, expliqués simplement.
 *
 * Contenu côté frontend, volontairement : ce sont les mots de l'interface elle-même. Ils évoluent
 * avec les écrans (même revue, même version), s'affichent sans appel réseau (infobulles instantanées,
 * lexique consultable même si l'API est indisponible) et n'ont pas besoin d'être modifiés par
 * la mairie au quotidien. Si la ville veut un jour les éditer elle-même, la même structure
 * pourra être servie par l'API.
 */
export interface GlossaryEntry {
    /** Identifiant stable, utilisé par les infobulles et comme ancre (#terme-…) dans le lexique. */
    id: string;
    term: string;
    definition: string;
    example?: string;
    /** Autres mots qui doivent retrouver cette définition dans la recherche. */
    aliases?: string[];
    theme: GlossaryTheme;
}

export type GlossaryTheme = 'Demandes' | 'Organisation de la mairie' | 'Services municipaux' | 'Transports' | 'Santé et urgences' | 'Compte et données';

export const GLOSSARY_THEMES: GlossaryTheme[] = ['Demandes', 'Organisation de la mairie', 'Services municipaux', 'Transports', 'Santé et urgences', 'Compte et données'];

export const GLOSSARY: readonly GlossaryEntry[] = [
    // Demandes
    { id: 'demande', theme: 'Demandes', term: 'Demande citoyenne', definition: 'Un problème ou un besoin que vous signalez à la mairie (trou dans la route, lampadaire éteint…). Elle est suivie jusqu’à sa résolution.', aliases: ['signalement', 'requête'] },
    { id: 'statut', theme: 'Demandes', term: 'Statut', definition: 'L’étape où en est votre demande : Nouveau, En cours, En attente, Résolu ou Rejeté.', aliases: ['état'] },
    { id: 'statut-nouveau', theme: 'Demandes', term: 'Nouveau', definition: 'La mairie a bien reçu votre demande, mais personne ne s’en occupe encore.' },
    { id: 'statut-en-cours', theme: 'Demandes', term: 'En cours', definition: 'Un agent de la mairie traite votre demande.' },
    { id: 'statut-en-attente', theme: 'Demandes', term: 'En attente', definition: 'Le traitement est suspendu : il manque une information, un matériel ou l’intervention d’un autre service.' },
    { id: 'statut-resolu', theme: 'Demandes', term: 'Résolu', definition: 'Le problème a été réglé. Si ce n’est pas le cas, vous pouvez faire une nouvelle demande.' },
    { id: 'statut-rejete', theme: 'Demandes', term: 'Rejeté', definition: 'La mairie ne donnera pas suite (doublon, demande hors de ses compétences…). La raison vous est indiquée.' },
    { id: 'categorie', theme: 'Demandes', term: 'Catégorie', definition: 'Le thème de votre demande (Voirie, Eau, Éclairage public…). Elle permet de l’envoyer directement à la bonne équipe.', aliases: ['thème'] },
    { id: 'priorite', theme: 'Demandes', term: 'Priorité', definition: 'L’urgence d’une demande pour la mairie. Une demande dangereuse (fil électrique au sol, fuite importante) passe avant les autres.', aliases: ['urgence de la demande'] },
    { id: 'reference', theme: 'Demandes', term: 'Référence', definition: 'Le numéro unique donné à votre demande ou à votre message. Notez-le : il permet de retrouver votre dossier.', example: 'MC-20261004-1A2B3C4D', aliases: ['numéro de dossier', 'accusé de réception'] },
    { id: 'voirie', theme: 'Demandes', term: 'Voirie', definition: 'Tout ce qui concerne les rues : chaussée, trottoirs, panneaux, nids-de-poule.' },
    { id: 'assainissement', theme: 'Demandes', term: 'Assainissement', definition: 'L’évacuation et le traitement des eaux usées et des eaux de pluie (égouts, caniveaux).' },
    // Organisation
    { id: 'institut', theme: 'Organisation de la mairie', term: 'Institut', definition: 'Une équipe de la mairie chargée de certains thèmes (par exemple l’institut Voirie s’occupe des routes et de l’éclairage). Votre demande est confiée à l’institut du thème choisi.', aliases: ['service technique', 'équipe'] },
    { id: 'agent', theme: 'Organisation de la mairie', term: 'Agent', definition: 'Une personne de la mairie qui intervient sur le terrain ou traite les dossiers d’un institut.' },
    { id: 'manager', theme: 'Organisation de la mairie', term: 'Manager', definition: 'Le responsable d’un institut : il répartit les demandes entre les agents et suit leur avancement.', aliases: ['responsable'] },
    { id: 'administrateur', theme: 'Organisation de la mairie', term: 'Administrateur', definition: 'La personne qui gère la plateforme : comptes, instituts, et sécurité des données.' },
    { id: 'journal', theme: 'Organisation de la mairie', term: 'Journal', definition: 'La liste des actions faites par la mairie sur la plateforme (qui, quoi, quand). Elle ne peut pas être modifiée.', aliases: ['audit', 'traçabilité'] },
    // Services municipaux
    { id: 'service-municipal', theme: 'Services municipaux', term: 'Service municipal', definition: 'Un guichet ou une équipe de la mairie qui vous accueille pour une démarche (état civil, eau…).' },
    { id: 'demarche', theme: 'Services municipaux', term: 'Démarche', definition: 'Ce que vous faites pour obtenir quelque chose de la mairie : demander un document, poser une question, signaler un problème.', aliases: ['procédure', 'formalité'] },
    { id: 'etat-civil', theme: 'Services municipaux', term: 'État civil', definition: 'Le service qui délivre les actes de naissance, de mariage et de décès.' },
    { id: 'service-disponible', theme: 'Services municipaux', term: 'Disponible', definition: 'Le service fonctionne normalement : vous pouvez commencer votre démarche.' },
    { id: 'service-perturbe', theme: 'Services municipaux', term: 'Perturbé', definition: 'Le service fonctionne, mais plus lentement ou avec un accueil réduit. L’explication est affichée sur sa fiche.' },
    { id: 'maintenance', theme: 'Services municipaux', term: 'En maintenance', definition: 'Le service est arrêté volontairement, pour des travaux ou une mise à jour. L’heure de retour prévue est indiquée quand elle est connue.' },
    { id: 'hors-service', theme: 'Services municipaux', term: 'Hors service', definition: 'Le service est arrêté à cause d’un incident imprévu (panne, coupure). La mairie indique quoi faire à la place.', aliases: ['indisponible', 'panne'] },
    { id: 'alternative', theme: 'Services municipaux', term: 'Que faire à la place', definition: 'La solution proposée par la mairie quand un service est arrêté : un autre guichet, un autre service ou un autre moment.', aliases: ['alternative', 'service de remplacement'] },
    { id: 'publication', theme: 'Services municipaux', term: 'Publication', definition: 'Une information officielle de la mairie : actualité, avis de travaux, événement.', aliases: ['actualité'] },
    { id: 'itineraire', theme: 'Services municipaux', term: 'Itinéraire', definition: 'Le chemin pour vous rendre à un lieu. Le bouton ouvre votre application de cartes.' },
    { id: 'geolocalisation', theme: 'Services municipaux', term: 'Géolocalisation', definition: 'Votre position, donnée par votre téléphone ou votre navigateur avec votre accord. Elle sert uniquement à trier les lieux du plus proche au plus éloigné et n’est pas envoyée à la mairie.', aliases: ['près de moi', 'position'] },
    // Transports
    { id: 'ligne', theme: 'Transports', term: 'Ligne', definition: 'Un trajet fixe parcouru par un bus, un taxi-be ou une navette, avec un numéro (par exemple D1).' },
    { id: 'arret', theme: 'Transports', term: 'Arrêt', definition: 'Un endroit où le véhicule s’arrête pour prendre et déposer les voyageurs.' },
    { id: 'terminus', theme: 'Transports', term: 'Terminus', definition: 'Le premier ou le dernier arrêt d’une ligne.' },
    { id: 'frequence', theme: 'Transports', term: 'Fréquence', definition: 'Le temps entre deux passages. « Toutes les 15 min » veut dire qu’un véhicule passe environ tous les quarts d’heure.' },
    { id: 'prochain-passage', theme: 'Transports', term: 'Prochain passage', definition: 'L’heure prévue du prochain véhicule à un arrêt, calculée à partir des horaires. Le trafic peut la décaler de quelques minutes.' },
    { id: 'taxi-be', theme: 'Transports', term: 'Taxi-be', definition: 'Un minibus de transport collectif, qui suit une ligne fixe.', aliases: ['minibus'] },
    { id: 'ligne-interrompue', theme: 'Transports', term: 'Ligne interrompue', definition: 'Plus aucun véhicule ne circule sur la ligne pour le moment. Aucun horaire n’est alors annoncé.' },
    // Santé
    { id: 'urgence', theme: 'Santé et urgences', term: 'Urgence', definition: 'Une situation où la vie ou la santé d’une personne est en danger. Appelez immédiatement un numéro d’urgence.' },
    { id: '24h-24', theme: 'Santé et urgences', term: '24h/24', definition: 'Ouvert jour et nuit, tous les jours, y compris les week-ends et jours fériés.', aliases: ['7j/7', 'jour et nuit'] },
    { id: 'pharmacie-de-garde', theme: 'Santé et urgences', term: 'Pharmacie de garde', definition: 'La pharmacie qui reste ouverte quand les autres sont fermées (nuit, dimanche, jours fériés).' },
    // Compte et données
    { id: 'donnees-personnelles', theme: 'Compte et données', term: 'Données personnelles', definition: 'Les informations qui vous concernent : nom, e-mail, téléphone, demandes. Vous pouvez les consulter et les télécharger.' },
    { id: 'code-verification', theme: 'Compte et données', term: 'Code de vérification', definition: 'Un code à usage unique envoyé par e-mail ou SMS pour confirmer que c’est bien vous qui vous connectez.', aliases: ['double authentification', 'OTP'] },
    { id: 'signalement-donnees', theme: 'Compte et données', term: 'Signalement sur les données', definition: 'Une inquiétude que vous signalez sur l’utilisation de vos données personnelles. L’administrateur vous répond.' }
];

export function glossaryEntry(id: string): GlossaryEntry | undefined {
    return GLOSSARY.find((entry) => entry.id === id);
}

/** Identifiant du lexique pour un statut de demande (« En cours » → statut-en-cours). */
export function requestStatusTerm(status: string): string {
    return 'statut-' + normalizeTerm(status).replace(/\s+/g, '-');
}

export function normalizeTerm(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLocaleLowerCase('fr')
        .trim();
}

export function searchGlossary(query: string, entries: readonly GlossaryEntry[] = GLOSSARY): GlossaryEntry[] {
    const wanted = normalizeTerm(query);
    if (!wanted) return [...entries];
    const byTerm = (entry: GlossaryEntry) => [entry.term, ...(entry.aliases ?? [])].some((word) => normalizeTerm(word).includes(wanted));
    // Les termes qui correspondent par leur nom d'abord, puis ceux trouvés dans une définition.
    return [...entries.filter(byTerm), ...entries.filter((entry) => !byTerm(entry) && normalizeTerm(entry.definition).includes(wanted))];
}
