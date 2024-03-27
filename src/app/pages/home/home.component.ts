import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  countries$ = new Observable<any[]>();

  constructor( public apiService :ApiService ) {}

  ngOnInit(): void {
   this.loadCountries();
  }

  loadCountries(){
    this.countries$ = this.apiService.getCountries();
  }

}
