import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Meta, TableSheet} from "@antv/s2";

@Component({
    selector: 'erupt-chart-table',
    templateUrl: './chart-table.component.html',
    styleUrls: ['./chart-table.component.less'],
    styles: [],
})
export class ChartTableComponent implements OnInit, AfterViewInit {

    constructor() {
    }

    s2: TableSheet;

    @ViewChild('s2t') chartTable: ElementRef;

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.s2 = new TableSheet(this.chartTable.nativeElement, {
            data: [],
            fields: {},
        }, null);
        this.s2.render();
    }

    render(data: any[]) {
        let metas: Meta[] = [];
        let columns: string[] = [];
        if (data && data.length > 0) {
            for (let key in data[0]) {
                metas.push({field: key, name: key});
                columns.push(key);
            }
        }
        this.s2.setDataCfg({
            data: data,
            fields: {
                columns: columns
            },
            meta: metas,
            showDefaultHeaderActionIcon: true
        })
        this.onResize();
        const s2Palette = {
            basicColors: [
                '#FFFFFF',
                '#F8F5FE',
                '#EDE1FD',
                '#873BF4',
                '#7232CF',
                '#7232CF',
                '#7232CF',
                '#AB76F7',
                '#FFFFFF',
                '#DDC7FC',
                '#9858F5',
                '#B98EF8',
                '#873BF4',
                '#282B33',
                '#121826',
            ],
            semanticColors: {
                red: '#FF4D4F',
                green: '#29A294',
            },
        };
        this.s2.setThemeCfg({
            name: 'gray',
            // palette: s2Palette
        });
        this.s2.render(true);
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (this.s2) {
            let ele = this.chartTable.nativeElement;
            this.s2.changeSheetSize(ele.offsetWidth, ele.offsetHeight)
            this.s2.render(false) // 不重新加载数据
        }
    }


}
