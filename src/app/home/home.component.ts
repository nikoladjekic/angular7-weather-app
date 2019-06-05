import {
  Weather
} from './../weather.model';
import {
  WeatherService
} from './../weather.service';
import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  weather = new Weather();

  searchCityValue;

  // @Input('searchVrednost') searchVrednost;

  constructor(private ws: WeatherService) {
    let temp = this.ws.getCity();
    temp === undefined ? this.searchCityValue = "Zarkovo" : this.searchCityValue = temp;
    this.loadData(this.searchCityValue)
  }

  ngOnInit() {

  }

  loadData(val: string) {
    return this.ws.getWeather(val).subscribe(data => {

      if (data['cod'] === 200) {

        let city = data['name'];
        let weatherType = data['weather'][0].description;
        let kTemp = data['main'].temp; // by default in kelvin
        let windSpeed = data['wind'].speed; // in meters per second
        let country = data['sys'].country;
        let humidity = data['main'].humidity;
        let weatherIcon = data['weather'][0].icon;

        // choose weather icon based on the current weather
        let iconSrc = "http://openweathermap.org/img/w/" + weatherIcon + ".png"

        //convert to celsius temp
        let cTemp = Number((kTemp - 273).toFixed(1));

        this.weather.city = city;
        this.weather.country = country;
        this.weather.description = weatherType;
        this.weather.humidity = humidity;
        this.weather.icon = iconSrc;
        this.weather.temp = cTemp;
        this.weather.wind = windSpeed;
        this.weather.time = new Date();
      } 
      else {
        let errmsg = data['message'];
        this.weather.city = errmsg;
      }

    })
  }

}
