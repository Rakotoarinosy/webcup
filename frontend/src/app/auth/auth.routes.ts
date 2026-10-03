import { Routes } from '@angular/router';
import { guestGuard } from '@/app/auth/auth.guard';
import { Access } from './access/access';
import { Error } from './error/error';
import { Login } from './login/login';
import { Register } from './register/register';
import { VerifyCode } from './verify-code/verify-code';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'register', component: Register, canActivate: [guestGuard] },
    // Le challenge est déjà protégé en mémoire par VerifyCode. Éviter guestGuard ici
    // empêche une tentative de refresh de session d'interrompre la redirection après /login.
    { path: 'verify-code', component: VerifyCode }
] as Routes;
