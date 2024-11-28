import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.renderBarChart();
    this.renderPieChart();
  }

  // Render Bar Chart
  private renderBarChart() {
    const ctx: any = document.getElementById('barChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Monthly Revenue ($)',
            data: [500, 700, 1200, 1500, 900, 1800],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true }
        }
      }
    });
  }

  // Render Pie Chart
  private renderPieChart() {
    const ctx: any = document.getElementById('pieChart');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Music Concert', 'Art Workshop', 'Tech Meetup'],
        datasets: [
          {
            label: 'Event Bookings',
            data: [50, 20, 14],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { enabled: true }
        }
      }
    });
  }
}
