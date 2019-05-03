import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppComponent, LogsSnackBarComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule,
    MatMenuModule, MatSnackBarModule, MatToolbarModule
} from '@angular/material';
import { AboutDialogComponent } from './about-dialog/about-dialog.component'

@NgModule({
    declarations: [
        AppComponent,
        LogsSnackBarComponent,
        AboutDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSnackBarModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        LogsSnackBarComponent,
        AboutDialogComponent
    ]
})
export class AppModule { }
