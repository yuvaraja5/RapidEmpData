import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions } from 'chart.js';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';




export interface PeriodicElement {
  IdNo: number;
  name: string;
  starttime: number;
  endtime: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rapidd';
  private data: any = []

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['working time'], ['non working time']];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  paginationLength = 0;
  pageIndex = 0;
  pageSize = 5;


  public pieChartDatasets = [{
    data: [2, 5]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<any>;
  }

  displayedColumns: string[] = ['EmployeeName', 'totalworkingtime'];
  dataSource: MatTableDataSource<any>;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  async getData(): Promise<any> {
    const url = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
    this.http.get(url).subscribe((res: any) => {

      res.map((x: any) => {
        x.totalworkingtime = ((new Date(x.EndTimeUtc).getTime() / (1000 * 60 * 60)) - (new Date(x.StarTimeUtc).getTime() / (1000 * 60 * 60))).toFixed(2);
      })

      res.sort((a: any, b: any) => {
        return b.totalworkingtime - a.totalworkingtime;
      })

      this.data = res;
      this.dataSource = this.data.slice(this.pageIndex, this.pageSize - 1);
      this.paginationLength = res.length

    })
  }

  pageEventLoad($event: PageEvent) {

    let startCount = ($event.pageSize * $event.pageIndex) - 1;
    let lastIndex = startCount + $event.pageSize;
    if (startCount == -1) {
      startCount = 0;
      lastIndex = $event.pageSize - 1
    }

    this.dataSource = this.data.slice(startCount, lastIndex)
  }
}


