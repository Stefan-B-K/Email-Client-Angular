import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent {
    @Input() label = ''
    @Input() control!: FormControl
    @Input() type = ''
    @Input() rows = ''

   get showErrors () {
        const { touched, dirty, errors } = this.control
        return touched && dirty && errors
    }

}
