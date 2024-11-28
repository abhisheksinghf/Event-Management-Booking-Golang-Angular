import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {

  constructor() {
    Chart.register(...registerables); // Register Chart.js modules
  }

  ngOnInit(): void {
    this.initializeRevenueChart();
    this.initializeBookingsChart();
    this.initializeBookingsOverviewChart();
  }

  initializeRevenueChart(): void {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis labels
        datasets: [{
          label: 'Revenue ($)',
          data: [500, 1000, 1500, 2000, 2500, 3000, 3500], // Dummy data
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white'
            }
          },
          y: {
            ticks: {
              color: 'white'
            }
          }
        }
      }
    });
  }

  initializeBookingsChart(): void {
    const ctx = document.getElementById('bookingsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis labels
        datasets: [{
          label: 'Bookings',
          data: [12, 19, 3, 5, 2, 3, 7], // Dummy data
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white'
            }
          },
          y: {
            ticks: {
              color: 'white'
            }
          }
        }
      }
    });
  }

  initializeBookingsOverviewChart(): void {
    const ctx = document.getElementById('bookingsOverviewChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Event 1', 'Event 2', 'Event 3', 'Event 4'], // Event names
        datasets: [{
          label: 'Bookings Overview',
          data: [45, 30, 25, 50], // Dummy data
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  }
}
