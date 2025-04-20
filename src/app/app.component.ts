import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'roomflow-front-end';
}
