
import { NgModule, RootRenderer } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SecondComponent } from './second/second.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

const routes = []

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, HttpClientModule]
})
export class AppRoutingModule {}
