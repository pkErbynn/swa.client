import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ItemService } from './services/item.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
