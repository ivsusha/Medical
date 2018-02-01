import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {Routes, RouterModule} from '@angular/router';
import { MainService } from './main.service';
import { SearchPipe } from './search.pipe';
import { OrderbyPipe } from './orderby.pipe';
import { ByMedicamentPipe } from './by-medicament.pipe';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { DetailsComponent } from './details/details.component';
import { PostDataService } from './post-data.service';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { KeysPipe } from './keys.pipe';

export const appRoutes: Routes =[
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: 'chart', component: ChartComponent},
  { path: 'details', component: DetailsComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchPipe,
    OrderbyPipe,
    ByMedicamentPipe,
    ChartComponent,
    DetailsComponent,   
    KeysPipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MultiselectDropdownModule,
    RouterModule.forRoot(appRoutes,{useHash:true}),
    ChartsModule
  
  ], 
  providers: [MainService, PostDataService],
  entryComponents: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
