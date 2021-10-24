import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Models

// Services
// Helper

@Injectable({ providedIn: 'root' })
export class LoadingService {

    public isLoading: Subject<any> = new Subject();

    constructor() {
    }

}
