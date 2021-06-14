import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/userName.validator';
import { RegistrationService } from './registration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  registrationForm: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  // get alternateEmails() {
  //   return this.registrationForm.get('email');
  // }

  // addAlternateEmail() {
  //   (this.alternateEmails as FormArray).push(this.fb.control(''));
  // }

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {}

  ngOnInit() {
    
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      // alternateEmails: this.fb.array([])

    }, {validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
       .subscribe(checkedValue => {
         const email = this.registrationForm.get('email');
         if(checkedValue) {
           email.setValidators(Validators.required);
         }else {
           email.clearValidators();
         }
         email.updateValueAndValidity(); //to ensure the correct status is reflected
       });
  }

    

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Diana'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  loadApiData() { 

    // this.registrationForm.patchValue({
    //   userName: 'Saswat',
    //   password: 'test',
    //   confirmPassword: 'test',                    //few details in patch value can go missing
    //   address: {
    //     city: 'City',
    //     state: 'State',
    //     postalCode: '123456'
    //   }

    this.registrationForm.setValue({
      userName: 'Saswat',
      password: 'test',
      confirmPassword: 'test',
      address: {                                    //setValue is very particular about the input. all details mentioned must be present
        city: 'City',
        state: 'State',
        postalCode: '123456'
      }
    })
  }


  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
       .subscribe(
         response => console.log('Success!', response),
         error => console.log('Error!', error)
       ) 
  }
}
