import { AfterViewInit, Component  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';

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
private data: any[] = [
  { Stars: 5, Framework: 'Eat out' },
  { Stars: 4, Framework: 'Rent' },
  { Stars: 3, Framework: 'Groceries' }
];

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors : any;

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map((d:any) => d.Stars.toString()))
    .range(["#ffcd56", "#ff6384","#36a2eb","#fd6b19"]);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text((d: any)=> d.data.Framework)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }
  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res:any) => {
    for(var i=0;i<res.myBudget.length;i++){
        this.dataSource.datasets[0].data[i]=res.myBudget[i].budget;
        this.dataSource.labels[i]=res.myBudget[i].title;
    }
    this.createChart();
    this.createSvg();
    this.createColors();
    this.drawChart()
  });
}
  createChart(){
      var ctx = document.getElementById('myChart') as HTMLCanvasElement;
     //var ctx = document.getElementById('myChart');
     // var ctx = canvas.getContext('2d');
      var myPieChart = new Chart(ctx,{
          type:'pie',
          data:this.dataSource,
      });
    }

}
