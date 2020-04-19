import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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

    constructor(private readonly fb: FormBuilder) {}

    public ngOnInit(): void {
        this.signinForm = this.setupFrom();
    }

    public onFormSubimit(): void {
        console.log(this.signinForm.value);
    }

    private setupFrom(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
        });
    }
}
