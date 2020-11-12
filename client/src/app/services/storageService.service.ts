import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  getJwtToken() {
    return localStorage.getItem('token');
  }
}
