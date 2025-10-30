import { Routes } from '@angular/router';
import { ExplorerPage } from './pages/explorer-page/explorer-page';
import { WelcomePage } from './pages/welcome-page/welcome-page';
import { SignInPage } from './pages/AuthPages/sign-in-page/sign-in-page';
import { SignUpPage } from './pages/AuthPages/sign-up-page/sign-up-page';
import { ErrorPage } from './pages/error-page/error-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { AreaDetailsPage } from './pages/AreaManagement/area-details-page/area-details-page';
import { AreaCreationPage } from './pages/AreaManagement/area-creation-page/area-creation-page';
import { ServiceManagementPage } from './pages/service-management-page/service-management-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { authGuard } from './guards/auth.guard';
import { AreaHistory } from './pages/area-history/area-history';
import { AreaHistoryGlobal } from './pages/area-history-global/area-history-global';

export const routes: Routes = [
    { path: '', component: WelcomePage },
    { path: 'welcome', redirectTo: '', pathMatch: 'full' },
    { path: 'explorer', component: ExplorerPage },
    { path: 'sign-in', component: SignInPage },
    { path: 'sign-up', component: SignUpPage },
    { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
    { path: 'area/details/:id', component: AreaDetailsPage, canActivate: [authGuard] },
    { path: 'area/creation', component: AreaCreationPage, canActivate: [authGuard] },
    { path: 'services-manager', component: ServiceManagementPage, canActivate: [authGuard] },
    { path: 'settings', component: SettingsPage, canActivate: [authGuard] },
    { path: 'area/history/:id', component: AreaHistory, canActivate: [authGuard] },
    { path: 'area/history', component: AreaHistoryGlobal, canActivate: [authGuard] },
    { path: '**', component: ErrorPage },
];
