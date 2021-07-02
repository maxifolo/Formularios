import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private validatorsService: ValidatorsService) {
    this.createForm();
    this.loadDataInForm();
    this.createListeners();
  }

  ngOnInit(): void {
  }

  public get getHobbies() {
    return this.form.get('hobbies') as FormArray;
  }
  public get nameNoValid(): boolean {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  public get lastnameNoValid(): boolean {
    return this.form.get('lastname').invalid && this.form.get('lastname').touched;
  }
  public get emailNoValid(): boolean {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  public get userNoValid(): boolean {
    return this.form.get('username').invalid && this.form.get('username').touched;
  }
  public get districtNoValid(): boolean {
    return this.form.get('address.district').invalid && this.form.get('address.district').touched;
  }
  public get cityNoValid(): boolean {
    return this.form.get('address.city').invalid && this.form.get('address.city').touched;
  }
  public get pass1NoValid(): boolean {
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }
  public get pass2NoValid(): boolean {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }


  addHobby() {
    this.getHobbies.push(this.formBuilder.control(''));
  }

  deleteHobby(i: number) {
    this.getHobbies.removeAt(i);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, this.validatorsService.noFollonier]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      username: ['', , this.validatorsService.existUsername],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      address: this.formBuilder.group({
        district: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.formBuilder.array([])
    }, {
      validators: this.validatorsService.samePassword('pass1', 'pass2')
    });
  }

  createListeners() {
    /* this.form.valueChanges.subscribe(data => {
      console.log(data);
    });
    this.form.statusChanges.subscribe(status => {
      console.log({ status });
    }); */
    this.form.get('name').valueChanges.subscribe(console.log);
  }

  loadDataInForm() {
    //this.form.setValue need to set all the parameters
    this.form.reset({
      name: 'maximiliano',
      lastname: 'follonier2',
      email: 'maxi@gmail.com',
      pass1: '123',
      pass2: '123',
      address: {
        district: 'corrientes',
        city: 'monte caseros'
      }
    });
  }

  save() {
    console.log(this.form);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched())
        } else {
          control.markAsTouched();
        }
      });
    }
    this.form.reset();
  }

}
