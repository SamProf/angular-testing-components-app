import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstService {

  constructor() {
  }

  init() {
    console.log('First real service init');
  }


}
