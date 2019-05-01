import { Component } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import * as spu from 'spu'

@Component({
    selector: 'app-update-info',
    templateUrl: './update_info.component.html'
})
export class UpdateInfoComponent {
    
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = 'SPU'
    public sources = [13, 12, 11, 9, 8]
    public readonly targets = [14, 13, 12, 11, 9]
    public availableTargets = this.targets
    public disabledTargets: number[] = []

    public source = 13
    public target = 14

    public input = ''
    public output = ''

    public constructor(private snackBar: MatSnackBar) { }

    public changeSource(version: number) {
        this.source = version
        this.availableTargets = this.targets.filter(v => v > version)
        this.disabledTargets = this.targets.filter(v => v <= version)

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
        this.snackBar.openFromComponent(UpdateInfoComponent, { duration: 3000 })
    }
}
