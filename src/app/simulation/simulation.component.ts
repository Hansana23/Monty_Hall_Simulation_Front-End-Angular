import { Component } from '@angular/core';
import { SimulationService } from '../services/simulation.service';
import { SimulationRequest } from '../simulation-request.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent {
  numberOfGames = 1;
  changeDoor = false;
  result: any

  constructor(private montyHallService: SimulationService) {}

  simulate() {
    if (this.numberOfGames < 1) {
        console.error('Number of games must be at least 1.');
        return; // Exit early if validation fails
    }

    const request: SimulationRequest = {
        numberOfGames: this.numberOfGames,
        changeDoor: this.changeDoor
    };
    // console.log("Number of Games", this.numberOfGames);
    // console.log("Change Door", this.changeDoor);
    // console.log("Full Request", request);

    this.montyHallService.simulate(request).pipe(
        catchError(error => {
            console.error('Error occurred during simulation:', error);
            this.result = null; 
            return of(null); 
        })
    ).subscribe(result => {
        console.log("Simulate Request Result", result);
        this.result = result;
    });
}

  clearSimulations() {
    this.montyHallService.clearSimulations().subscribe(() => {
      this.result = null;
      this.numberOfGames = 1; 
      this.changeDoor = false; 
    });
  }
}
