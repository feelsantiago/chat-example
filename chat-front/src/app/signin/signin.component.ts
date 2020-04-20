import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

import { AuthClientService } from '../clients/auth-client.service';
import { AuthService } from '../services/auth.service';
import { SignInResponse } from '../clients/client-types';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
    private subscriptions: SubSink;

    public signinForm: FormGroup;

    public isLoading: boolean;

    public get email(): AbstractControl {
        return this.signinForm.get('email');
    }

    public get password(): AbstractControl {
        return this.signinForm.get('password');
    }

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly authClient: AuthClientService,
        private readonly authService: AuthService,
    ) {
        this.subscriptions = new SubSink();
    }

    public ngOnInit(): void {
        this.isLoading = false;
        this.signinForm = this.setupFrom();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onFormSubimit(): void {
        this.isLoading = true;

        this.subscriptions.sink = this.authClient.signin(this.signinForm.value).subscribe(
            (response: SignInResponse) => {
                this.authService.setUserAndToken(response.user, response.token);
                this.router.navigate(['/chat']);
            },
            () => {
                this.isLoading = false;
            },
        );
    }

    private setupFrom(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
        });
    }
}
