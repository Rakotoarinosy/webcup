// src/app/auth/auth.model.ts
var ROLE_LABELS = {
  admin: "Administrateur",
  manager: "Gestionnaire",
  agent: "Agent",
  citizen: "Citoyen"
};
function isChallenge(body) {
  return "challenge_id" in body;
}

export {
  ROLE_LABELS,
  isChallenge
};
//# sourceMappingURL=chunk-RD6WJK3U.js.map
