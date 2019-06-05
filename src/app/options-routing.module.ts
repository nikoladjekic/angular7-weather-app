import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { NgModule, RootRenderer } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondComponent } from './second/second.component';

const opts: Routes = [{
  path: '',
  component: SecondComponent,
  children: [{
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'search',
      component: SearchComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(opts)],
  exports: [RouterModule]
})
export class optsRouter {}
