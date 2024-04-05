import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ScrollToTopButtonComponent } from '../../components/scroll-to-top-button/scroll-to-top-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToTopButtonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  countries: any[] = [];
  countries$ = new Observable<any[]>();
  searchFilter: FormGroup;
  filterValue: string;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCountries();
    this.createFormFilter();
    this.createFilter();
  }

  loadCountries() {
    this.countries$ = this.apiService.getCountries();
  }

  createFormFilter() {
    this.searchFilter = new FormGroup({
      filterInput: new FormControl(''),
    });
  }

  createFilter() {
    this.searchFilter?.controls['filterInput']?.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value: string) => {
        if (value.trim() === '') {
          this.loadCountries();
        } else {
          this.filterValue = value;
          this.filterCountries();
        }
      });
  }

  filterCountries() {
    this.countries$ = this.apiService.filterCountry(this.filterValue);
  }
}
