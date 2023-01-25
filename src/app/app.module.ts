import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './modules/components/main/main.component';

import { MaterialModule } from '../app/modules/components/main/AngularMaterials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './modules/components/shared/top-bar/top-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPrototypePageComponent } from './modules/components/shared/dialog-prototype-page/dialog-prototype-page.component';
import { DialogVideoComponent } from './modules/components/shared/dialog-video/dialog-video.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopBarComponent,
    DialogPrototypePageComponent,
    DialogVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [DialogPrototypePageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
