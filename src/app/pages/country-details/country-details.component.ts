import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent {
  country$!: Observable<any>; // Remova o tipo de array


  constructor( public apiService :ApiService, private activeRoute: ActivatedRoute ) {}

  ngOnInit(): void {
   this.loadCountrieByID();
  }

  loadCountrieByID(){
    const countryID = this.activeRoute.snapshot.params.id;
    this.country$ = this.apiService.getCountryById(countryID);
  }
}
