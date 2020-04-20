import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './guards/auth.guard';

/* eslint-disable promise/prefer-await-to-then */

const routes: Routes = [
    {
        path: 'signin',
        component: SigninComponent,
    },
    {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
        canActivate: [AuthGuard],
    },
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

/* eslint-enable promise/prefer-await-to-then */
