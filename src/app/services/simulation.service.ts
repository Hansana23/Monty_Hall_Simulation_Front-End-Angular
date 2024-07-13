import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimulationRequest } from '../simulation-request.model';
import { SimulationResult } from '../simulation-result.model';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class SimulationService {
  private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    simulate(request: SimulationRequest): Observable<SimulationResult> {
        return this.http.post<SimulationResult>(this.apiUrl, request);
    }

    clearSimulations(): Observable<void> {
        return this.http.delete<void>(this.apiUrl);
    }
}
