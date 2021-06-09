import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {
    }

    validate = (control: AbstractControl):
        Promise<ValidationErrors> | Observable<ValidationErrors> => {
        const value = control.value
        return this.authService.usernameAvailable(value).pipe(
            map((value) => {
                if (value.available) {
                    return null;
                }
            }),
            catchError((err) => {
                console.log(err)
                return of({
                    nonUniqueUsername: true
                })
            })
        )
    }
}
