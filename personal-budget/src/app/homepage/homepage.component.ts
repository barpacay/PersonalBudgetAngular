import { AfterViewInit, Component  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public dataSource={
    datasets:[
        {
            data:[30,350,90],
            backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19'
                ],
        }
    ],
    labels:[
        'Eat out',
        'Rent',
        'Groceries',
    ]
};

  constructor(private http: HttpClient) {}


  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res:any) => {
    for(var i=0;i<res.myBudget.length;i++){
        this.dataSource.datasets[0].data[i]=res.myBudget[i].budget;
        this.dataSource.labels[i]=res.myBudget[i].title;
    }
    this.createChart();
  });
}
  createChart(){
      var ctx = document.getElementById('myChart');
      .getContext('2d');
      var myPieChart = new Chart(ctx,{
          type:'pie',
          data:this.dataSource,
      });
    }
}
