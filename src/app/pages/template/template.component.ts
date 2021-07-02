import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user = {
    name: 'maximiliano',
    lastname: 'follonier',
    email: 'maxi@gmail.com',
    country: 'ARG',
    gender: 'M'
  }
  countries: any[] = [];
  constructor(private countriServices: CountriesService) { }

  ngOnInit(): void {
    this.countriServices.getCountries()
      .subscribe(countries => {
        this.countries = countries;

        this.countries.unshift({
          name: '[Seleccione un pais]',
          code: ''
        });

      });
  }
  save(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
    console.log(form.value);
  }
}
