/** `returnUrl` n'est suivi que s'il reste dans l'application : jamais d'URL absolue, de `//` ni de page /auth. */
export function safeReturnUrl(url: string | null): string | null {
    return url && url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/auth') ? url : null;
}