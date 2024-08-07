/* eslint-disable @angular-eslint/no-output-native */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.css'
})
export class AddTestComponent {
  title = '';
  lat = 0;
  @Output() add = new EventEmitter<{
    title : string;
    lat : number;
  }>();
  @Output() close = new EventEmitter<void>();
  onCancel() {
    this.close.emit();
  }
  onSubmit() {
    this.add.emit({
      title: this.title,
      lat: this.lat
    });
    console.log(this.title);
  }
}
