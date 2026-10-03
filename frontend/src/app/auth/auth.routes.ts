import { Routes } from '@angular/router';
import { guestGuard } from '@/app/auth/auth.guard';
import { Access } from './access/access';
import { Error } from './error/error';
import { Login } from './login/login';
import { Register } from './register/register';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'register', component: Register, canActivate: [guestGuard] }
] as Routes;
