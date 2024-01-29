import { Routes } from '@angular/router';
import { LoginPageComponent } from './users/page/login-page/login-page.component';
import { isUserLoggedGuard } from './guards/is-user-logged.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'chat',
        loadComponent() {
            const conversationPage = import('./conversations/pages/conversation-page/conversation-page.component');
            return conversationPage;
        },
        canActivate: [isUserLoggedGuard]
    }
];
