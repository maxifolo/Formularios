import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noFollonier(control: FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === 'follonier') {
      return {
        noFollonier: true
      };
    }
    return null;
  }
  samePassword(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1control = formGroup.controls[pass1Name];
      const pass2control = formGroup.controls[pass2Name];
      if (pass1control.value === pass2control.value) {
        pass2control.setErrors(null);
      } else {
        pass2control.setErrors({
          noEqual: true
        });
      }
    };
  }
  existUsername(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'maxif') {
          resolve({
            existUsername: true
          });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }
}
