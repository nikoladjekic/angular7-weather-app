import {
  WeatherService
} from './../weather.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Weather
} from '../weather.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public searchCity = "";
  searchCityValue;
  weather = new Weather();
  city: Weather[] = [];
  cityNamePlaceholder: string = "";

  // @Output() searchCityOutput = new EventEmitter();

  constructor(private service: WeatherService, public router: Router) {}

  ngOnInit() {}

  search() {
    // this.searchCityOutput.emit(this.searchCity)
    if (this.searchCity === "") {
      return this.cityNamePlaceholder = " ** Please enter city name **";
    } else {
      this.cityNamePlaceholder = "";
      this.service.setCity(this.searchCity);
      this.router.navigate(['/home'])
    }
  }

  saveCity(val: string) {
    if (val === "") {
      return this.cityNamePlaceholder = " ** Please enter city name **";
    } else {
      this.service.setCity(this.searchCity);
      this.cityNamePlaceholder = "";
      return this.service.getWeather(val).subscribe(data => {

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


          // set temporary values to store to city array
          let x = new Weather();
          x.city = city;
          x.description = weatherType;
          x.icon = iconSrc;
          x.temp = cTemp;
          x.country = country;

          this.city.push(x);

        } else {
          this.cityNamePlaceholder = 'City not found';
        }

      })
    }
  }

  //enable search on enter
  onKeydown(e) {
    if (e.key === "Enter") {
      this.service.setCity(this.searchCity);
      this.router.navigate(['/home'])
    }
  }

  //delete selected input
  del(val) {
    this.city.splice(val, 1);
  }

}
