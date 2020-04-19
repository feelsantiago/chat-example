import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
    {
        path: 'signin',
        component: SigninComponent,
    },
    { path: 'chat', loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule) },
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
