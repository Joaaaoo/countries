import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  countries: any[] = [];
  searchTerm: string = '';
  countries$ = new Observable<any[]>();

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countries$ = this.apiService.getCountries();
  }
}
