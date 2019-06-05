import { Weather } from './weather.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  urlBase = "http://api.openweathermap.org/data/2.5/weather?q=";
  apiKey = "64d5ee41a1e85d5675063373d1116913";
  city;

  constructor(private _http: HttpClient) { }

  getWeather(inputCity:string){
    return this._http.get(this.urlBase + inputCity + '&APPID=' + this.apiKey);
  }

  setCity(val) {
    this.city = val;
  }

  getCity() {
    return this.city;
  }

}
