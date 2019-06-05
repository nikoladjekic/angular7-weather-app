import { WeatherService } from './weather.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { optsRouter } from './options-routing.module';
import { SecondComponent } from './second/second.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    SecondComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    optsRouter,
    FormsModule
    
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})

export class AppModule { }
