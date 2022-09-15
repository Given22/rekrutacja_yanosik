import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {
        path: 'logowanie',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'logowanie',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            relativeLinkResolution: 'legacy',
            initialNavigation: 'enabled',
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
