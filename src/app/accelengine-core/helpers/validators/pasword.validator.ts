import { FormGroup } from '@angular/forms';

export function PaswordValidator(passwordControlName: string) {
    return (formGroup: FormGroup) => {
        const password = formGroup.controls[passwordControlName].value;
        if (password === '') {
            password.setErrors({ required: true });
        }
    }
}
