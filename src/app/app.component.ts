import { Component, Inject } from '@angular/core'
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatDialog } from '@angular/material'
import * as spu from 'spu'
import { AboutDialogComponent } from './about-dialog/about-dialog.component'

@Component({
    selector: 'app-logs-snack-bar',
    template: '{{ data.join(" ") }}'
})
export class LogsSnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string[]) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public readonly title = 'SPU'
    public readonly versions = [14, 13, 12, 11, 9, 8]
    public availableTargets = this.versions.slice(0, 1)
    public disabledTargets = this.versions.slice(1, -1)

    public source = 13
    public target = 14

    public input = ''
    public output = ''

    public constructor(private snackBar: MatSnackBar, private aboutDialog: MatDialog) { }

    public changeSource(version: number) {
        this.source = version
        this.availableTargets = this.versions.filter(v => v > version)
        this.disabledTargets = this.versions.slice(0, -1).filter(v => v <= version)

        if (this.target <= this.source) {
            this.target = this.availableTargets.slice(-1)[0]
        }
    }

    public changeTarget(version: number) {
        this.target = version
    }

    public update() {
        const result = spu.update(this.input.split(/\n/g), this.source, this.target)
        this.output = result.commands.join('\n')

        this.snackBar.openFromComponent(LogsSnackBarComponent,
            { data: result.logs, duration: result.logs.join(' ').length * 50 })
    }

    public openAboutDialog() {
        this.aboutDialog.open(AboutDialogComponent, {
            height: '480px',
            width: '720px',
        })
    }
}
