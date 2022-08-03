import { AbstractControl, AsyncValidator } from "@angular/forms";
import { Injectable } from "@angular/core";
import { catchError, map, of } from 'rxjs'
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor (private authService: AuthService) {}

  validate = (control: AbstractControl) => {
    const { value } = control
    return this.authService.usernameInUse(value)
      .pipe(
        map(value => value.available ? null : value),
        catchError(err => {
          if (err.error.username) return of({ usernameInUse: true })
          else return of({ connectionError: true })
        })
      )
  }
}
