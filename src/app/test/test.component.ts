import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/breadcrumb/breadcrumb.component";
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import {AddTestComponent} from "./add-test/add-test.component"
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [BreadcrumbComponent, AddTestComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  private httpClient = inject(HttpClient);
  places = signal<Place[] | undefined>(undefined);
  // places = Place[];
  // places: Array<Place> = [];
  private destroyRef = inject(DestroyRef);
  isAddingTask = false;

  onStartAddTask() {
    this.isAddingTask = true;
  }
  onCloseAddTask() {
    this.isAddingTask = false;
  }
  ngOnInit() {
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(
        map((resData) => resData.places)
      )
      .subscribe({
        next: (places) => {
          // this.places.set(places);
          this.places.set(places);
          console.log(this.places);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
