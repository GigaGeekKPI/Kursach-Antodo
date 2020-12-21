import { FormGroup, ValidationErrors } from '@angular/forms';

export function passwordValidator(group: FormGroup): ValidationErrors {
    let password = group.get('password');
    let confirmPassword = group.get('confirm');

    if(password.value !== confirmPassword.value) {
        return {notEqual: true}
    }

    return null;
}