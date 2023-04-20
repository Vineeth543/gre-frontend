import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  page!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(
      () => (this.page = this.router.url.split('/')[1])
    );
  }
}
