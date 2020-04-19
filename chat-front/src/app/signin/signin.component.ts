import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
    public signinForm: FormGroup;

    public get email(): AbstractControl {
        return this.signinForm.get('email');
    }

    public get password(): AbstractControl {
        return this.signinForm.get('password');
    }

    constructor(private readonly fb: FormBuilder, private readonly router: Router) {}

    public ngOnInit(): void {
        this.signinForm = this.setupFrom();
    }

    public onFormSubimit(): void {
        this.router.navigate(['/chat']);
    }

    private setupFrom(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
        });
    }
}
