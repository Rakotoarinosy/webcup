import { HttpErrorResponse } from '@angular/common/http';

import { apiErrorMessage } from '@/app/users/user.service';

/** Message par nom d'exception métier de l'API (champ `error` du JSON d'erreur). */
const MESSAGES: Record<string, string> = {
    InvalidCredentialsError: 'Identifiant ou mot de passe incorrect.',
    AccountLockedError: 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
    UserAlreadyExistsError: 'Cet email ou ce numéro est déjà utilisé par un autre compte.',
    UserConflictError: 'Cet email ou ce numéro est déjà utilisé par un autre compte.',
    InvalidVerificationCodeError: 'Code incorrect ou expiré. Vérifiez-le ou demandez-en un nouveau.',
    VerificationCodeLockedError: 'Trop de codes incorrects. Demandez un nouveau code.',
    CodeResendLockedError: 'Un code vient d’être envoyé. Patientez un instant avant d’en demander un autre.',
    EmailDeliveryUnavailableError: 'L’email n’a pas pu être envoyé. Réessayez dans quelques instants.',
    SmsDeliveryUnavailableError: 'Le SMS n’a pas pu être envoyé. Réessayez dans quelques instants.',
    MissingContactError: 'Ce compte n’a pas ce moyen de contact. Utilisez l’autre méthode de connexion.',
    InvalidGoogleTokenError: 'La connexion Google a échoué. Réessayez.',
    GoogleSignInUnavailableError: 'La connexion Google est momentanément indisponible.',
    GoogleEmailNotVerifiedError: 'L’adresse email de ce compte Google n’est pas vérifiée.'
};

export function authErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
        const known = MESSAGES[error.error?.error];
        if (known) return known;
    }
    return apiErrorMessage(error);
}