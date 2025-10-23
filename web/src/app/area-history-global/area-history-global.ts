import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HeaderDashBoardComponent } from '../components/Headers/header-component-dashboard/header-component-dashboard';
import { Router } from '@angular/router';

interface ApiResponse<T = unknown> { data: T }

interface AreaHistoryItem {
  id: number;
  area_id: number;
  executed_at: string;
  status: 'success' | 'failure';
  log: string;
}

interface GlobalAreaHistoryItem {
  id: number;
  area_id: number;
  area_name: string;
  executed_at: string;
  status: 'success' | 'failure';
  log: string;
}

@Component({
  selector: 'app-area-history-global',
  imports: [CommonModule, HeaderDashBoardComponent],
  templateUrl: './area-history-global.html',
  styleUrl: './area-history-global.css'
})
export class AreaHistoryGlobal {
  private router = inject(Router);

  historyItems: AreaHistoryItem[] = [
    { id: 1, area_id: 3, executed_at: '2024-10-01T10:00:00Z', status: 'success', log: 'Execution completed successfully.' },
    { id: 2, area_id: 2, executed_at: '2024-10-01T11:00:00Z', status: 'failure', log: 'Error: Unable to reach the API endpoint.' },
    { id: 3, area_id: 2, executed_at: '2024-10-01T12:00:00Z', status: 'success', log: 'Execution completed successfully.' },
    { id: 4, area_id: 3, executed_at: '2024-10-01T13:00:00Z', status: 'failure', log: 'Error: Timeout while waiting for response.' }
  ];
  historyItemsWithNames: GlobalAreaHistoryItem[] = [];
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.get<ApiResponse<AreaHistoryItem[]>>(`areaExecution`).subscribe((data) => {
      this.historyItems = data.data;
      for (let item of this.historyItems) {
        this.apiService.get<ApiResponse<any>>(`area/${item.area_id}`).subscribe((data) => {
          (item as GlobalAreaHistoryItem).area_name = data.data.config.name;
          this.historyItemsWithNames.push(item as GlobalAreaHistoryItem);
        });
      }
    });
  }

  goToAreaDetail(areaId: number): void {
    this.router.navigate([`/area/history/${areaId}`]);
  }
}
