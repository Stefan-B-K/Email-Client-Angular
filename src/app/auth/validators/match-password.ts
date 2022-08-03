import { AbstractControl, Validator } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {

  validate (form: AbstractControl) {
    const { password, passwordConfirmation} = form.value

    if (password === passwordConfirmation) return null
    else return { passwordsDontMatch: true };
  }

}
