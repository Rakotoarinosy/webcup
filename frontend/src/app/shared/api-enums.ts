// FICHIER GÉNÉRÉ — ne pas modifier à la main.
// Source : les Enum du backend (backend/src/domain). Pour le régénérer :
//   cd backend && uv run python scripts/generate_frontend_enums.py
// tests/unit/test_frontend_enums.py échoue si ce fichier n'est plus à jour.

export const ROLE_VALUES = ['admin', 'manager', 'agent', 'citizen'] as const;
export type Role = (typeof ROLE_VALUES)[number];

export const REQUEST_CATEGORY_VALUES = ['Éclairage public', 'Voirie', 'Eau', 'Déchets', 'Sécurité', 'Espaces verts', 'Autre'] as const;
export type RequestCategory = (typeof REQUEST_CATEGORY_VALUES)[number];

export const REQUEST_PRIORITY_VALUES = ['Basse', 'Normale', 'Haute', 'Urgente'] as const;
export type RequestPriority = (typeof REQUEST_PRIORITY_VALUES)[number];

export const REQUEST_STATUS_VALUES = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Rejeté'] as const;
export type RequestStatus = (typeof REQUEST_STATUS_VALUES)[number];

export const REQUEST_EVENT_TYPE_VALUES = ['created', 'updated', 'priority_changed', 'status_changed', 'assigned', 'resolved', 'rejected', 'intervention_started', 'intervention_finished'] as const;
export type RequestEventType = (typeof REQUEST_EVENT_TYPE_VALUES)[number];

export const REQUEST_SORT_BY_VALUES = ['created_at', 'title', 'category', 'priority', 'status'] as const;
export type RequestSortBy = (typeof REQUEST_SORT_BY_VALUES)[number];

export const SORT_ORDER_VALUES = ['asc', 'desc'] as const;
export type SortOrder = (typeof SORT_ORDER_VALUES)[number];

export const AGENT_STATUS_VALUES = ['available', 'in_intervention', 'unavailable', 'offline'] as const;
export type AgentStatus = (typeof AGENT_STATUS_VALUES)[number];

export const NOTIFICATION_KIND_VALUES = ['created', 'status_changed', 'rejected', 'assigned', 'resolved', 'late', 'alert'] as const;
export type NotificationKind = (typeof NOTIFICATION_KIND_VALUES)[number];

export const CONCERN_TOPIC_VALUES = ['Collecte', 'Utilisation', 'Partage', 'Conservation', 'Accès, rectification ou suppression', 'Autre'] as const;
export type ConcernTopic = (typeof CONCERN_TOPIC_VALUES)[number];

export const CONCERN_STATUS_VALUES = ['Reçu', "En cours d'examen", 'Répondu'] as const;
export type ConcernStatus = (typeof CONCERN_STATUS_VALUES)[number];

export const AUDIT_ACTION_VALUES = ['account_created', 'account_updated', 'account_role_changed', 'account_password_reset', 'account_deactivated', 'account_reactivated', 'account_deleted', 'institut_created', 'institut_updated', 'institut_manager_changed', 'agent_created', 'agent_moved', 'agent_activated', 'agent_deactivated', 'agent_status_changed', 'data_concern_reviewed', 'data_concern_answered', 'alert_published', 'alert_updated', 'alert_ended', 'alert_deleted'] as const;
export type AuditAction = (typeof AUDIT_ACTION_VALUES)[number];

export const AUDIT_TARGET_VALUES = ['account', 'institut', 'agent', 'data_concern', 'alert'] as const;
export type AuditTarget = (typeof AUDIT_TARGET_VALUES)[number];

export const THEME_VALUES = ['light', 'dark', 'system'] as const;
export type Theme = (typeof THEME_VALUES)[number];

export const FONT_SIZE_VALUES = ['small', 'medium', 'large'] as const;
export type FontSize = (typeof FONT_SIZE_VALUES)[number];

export const FONT_FAMILY_VALUES = ['system', 'inter', 'poppins', 'manrope', 'source', 'serif', 'mono'] as const;
export type FontFamily = (typeof FONT_FAMILY_VALUES)[number];

export const EXPORT_FORMAT_VALUES = ['pdf', 'csv', 'excel', 'word'] as const;
export type ExportFormat = (typeof EXPORT_FORMAT_VALUES)[number];

export const SEARCH_KIND_VALUES = ['demande', 'citoyen', 'agent', 'intervention'] as const;
export type SearchKind = (typeof SEARCH_KIND_VALUES)[number];

export const PIPELINE_STATUS_VALUES = ['todo', 'in_progress', 'validation', 'done'] as const;
export type PipelineStatus = (typeof PIPELINE_STATUS_VALUES)[number];

export const TERRA_NOTIFICATION_KIND_VALUES = ['new_request', 'new_wave'] as const;
export type TerraNotificationKind = (typeof TERRA_NOTIFICATION_KIND_VALUES)[number];

export const ALERT_LEVEL_VALUES = ['Information', 'Attention', 'Urgence'] as const;
export type AlertLevel = (typeof ALERT_LEVEL_VALUES)[number];

export const ALERT_AUDIENCE_VALUES = ['Tous les habitants', 'Personnes vulnérables', 'Habitants du quartier concerné'] as const;
export type AlertAudience = (typeof ALERT_AUDIENCE_VALUES)[number];

export const ALERT_STATUS_VALUES = ['Programmée', 'En cours', 'Terminée'] as const;
export type AlertStatus = (typeof ALERT_STATUS_VALUES)[number];
