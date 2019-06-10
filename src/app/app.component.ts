import { Component, Inject, OnInit } from '@angular/core'
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
export class AppComponent implements OnInit {
    public readonly title = 'SPU'
    public readonly versions = [14, 13, 12, 11, 9, 8]
    public availableTargets = this.versions.slice(0, 1)
    public disabledTargets = this.versions.slice(1, -1)

    private readonly languages = {
        en: {
            clearCache: 'Clear Cahce',
            about: 'About',
            update: 'Update',
            inputTitle: 'Input command(s)',
            inputDescription: 'Command(s) need to be updated.',
            outputTitle: 'Output command(s)',
            cacheCleared: 'Cleared cache.',
            switchLanguage: 'Switch Language'
        },
        'zh-CN': {
            clearCache: '清除缓存',
            about: '关于',
            update: '升级',
            inputTitle: '输入命令',
            inputDescription: '将被升级的命令。',
            outputTitle: '输出命令',
            cacheCleared: '已清除缓存。',
            switchLanguage: '切换语言'
        },
        'zh-TW': {
            clearCache: '清除緩存',
            about: '關於',
            update: '升級',
            inputTitle: '輸入命令',
            inputDescription: '欲升級的命令。',
            outputTitle: '輸出命令',
            cacheCleared: '已清除緩存。',
            switchLanguage: '切換語言'
        }
    }

    public language = this.languages['zh-CN']

    public source = 13
    public target = 14

    public input = ''
    public output = ''

    public constructor(private snackBar: MatSnackBar, private aboutDialog: MatDialog) { }

    public ngOnInit() {
        // Load localStorage
        // lang
        let lang = window.localStorage.getItem('lang') || navigator.language
        if (['en', 'zh-CN', 'zh-TW'].indexOf(lang) === -1) {
            lang = 'en'
        }
        this.changeLang(lang)
        // input
        this.input = window.localStorage.getItem('input') || ''
        // source
        const source = window.localStorage.getItem('source') || '13'
        this.changeSource(parseInt(source, 10))
        // target
        const target = window.localStorage.getItem('target') || '13'
        this.changeTarget(parseInt(target, 10))
    }

    private changeLang(lang: string) {
        window.localStorage.setItem('lang', lang)
        this.language = this.languages[lang]
    }

    public changeSource(version: number) {
        this.source = version
        this.availableTargets = this.versions.filter(v => v > version)
        this.disabledTargets = this.versions.slice(0, -1).filter(v => v <= version)

        window.localStorage.setItem('source', this.source.toString())

        if (this.target <= this.source) {
            this.changeTarget(this.availableTargets.slice(-1)[0])
            window.localStorage.setItem('target', this.target.toString())
        }
    }

    public changeTarget(version: number) {
        this.target = version
        window.localStorage.setItem('target', this.target.toString())
    }

    public update() {
        window.localStorage.setItem('input', this.input)
        const result = spu.update(this.input.split(/\n/g), this.source, this.target)
        this.output = result.commands.join('\n')

        this.snackBar.openFromComponent(LogsSnackBarComponent,
            { data: result.logs, duration: result.logs.join(' ').length * 50 })
    }

    public clearCache() {
        window.localStorage.clear()
        this.snackBar.open(this.language.cacheCleared, undefined, { duration: this.language.cacheCleared.length * 50 })
    }

    public switchLanguage() {
        let lang: string
        if (this.language === this.languages.en) {
            lang = 'zh-CN'
        } else if (this.language === this.languages['zh-CN']) {
            lang = 'zh-TW'
        } else {
            lang = 'en'
        }
        this.changeLang(lang)
    }

    public openAboutDialog() {
        this.aboutDialog.open(AboutDialogComponent, {
            height: '480px',
            width: '720px',
        })
    }
}
