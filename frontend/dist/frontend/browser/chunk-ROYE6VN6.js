// src/app/requests/request.model.ts
var REQUEST_CATEGORIES = [
  "\xC9clairage public",
  "Voirie",
  "Eau",
  "D\xE9chets",
  "S\xE9curit\xE9",
  "Espaces verts",
  "Autre"
];
var REQUEST_PRIORITIES = ["Basse", "Normale", "Haute", "Urgente"];
var REQUEST_STATUSES = ["Nouveau", "En cours", "En attente", "R\xE9solu", "Rejet\xE9"];
var STATUS_TRANSITIONS = {
  Nouveau: ["En cours", "Rejet\xE9"],
  "En cours": ["En attente", "R\xE9solu", "Rejet\xE9"],
  "En attente": ["En cours", "Rejet\xE9"],
  R\u00E9solu: [],
  Rejet\u00E9: []
};
function isOpen(status) {
  return STATUS_TRANSITIONS[status].length > 0;
}
function requestStatusSeverity(status) {
  switch (status) {
    case "Nouveau":
      return "info";
    case "En cours":
      return "warn";
    case "En attente":
      return "secondary";
    case "R\xE9solu":
      return "success";
    case "Rejet\xE9":
      return "danger";
  }
}
function requestPrioritySeverity(priority) {
  switch (priority) {
    case "Basse":
      return "secondary";
    case "Normale":
      return "info";
    case "Haute":
      return "warn";
    case "Urgente":
      return "danger";
  }
}
function eventLabel(event) {
  const payload = event.payload;
  switch (event.type) {
    case "created":
      return "Demande enregistr\xE9e";
    case "status_changed":
      return `Statut : ${payload["from"] ?? "?"} \u2192 ${payload["to"] ?? "?"}`;
    case "assigned":
      return payload["agent_name"] ? `Prise en charge par ${payload["agent_name"]}` : "Agent attribu\xE9";
    case "resolved":
      return "Demande r\xE9solue";
    case "rejected":
      return "Demande rejet\xE9e";
    case "priority_changed":
      return `Priorit\xE9 : ${payload["from"] ?? "?"} \u2192 ${payload["to"] ?? "?"}`;
    case "updated":
      return "Demande modifi\xE9e";
    case "intervention_started":
      return "Intervention commenc\xE9e";
    case "intervention_finished":
      return "Intervention termin\xE9e";
  }
}

export {
  REQUEST_CATEGORIES,
  REQUEST_PRIORITIES,
  REQUEST_STATUSES,
  STATUS_TRANSITIONS,
  isOpen,
  requestStatusSeverity,
  requestPrioritySeverity,
  eventLabel
};
//# sourceMappingURL=chunk-ROYE6VN6.js.map
