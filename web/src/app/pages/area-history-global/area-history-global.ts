import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HeaderDashBoardComponent } from '../../components/Headers/header-component-dashboard/header-component-dashboard';
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

interface BackendArea {
  id: number;
  is_active?: boolean;
  config?: {
    name?: string;
    description?: string;
    trigger?: {
      service_name?: string;
      name?: string;
      datas_form?: { fieldId: number; fieldName: string; response: string }[];
    };
    action?: {
      service_name?: string;
      name?: string;
      type?: string;
      datas_form?: { fieldId: number; fieldName: string; response: string }[];
    };
  };
}

@Component({
  selector: 'app-area-history-global',
  imports: [CommonModule, HeaderDashBoardComponent],
  templateUrl: './area-history-global.html',
  styleUrls: ['./area-history-global.css']
})
export class AreaHistoryGlobal implements OnInit {
  private router = inject(Router);

  historyItems: AreaHistoryItem[] = [];
  historyItemsWithNames: GlobalAreaHistoryItem[] = [];
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.get<ApiResponse<AreaHistoryItem[]>>(`areaExecution`).subscribe((data) => {
      this.historyItems = data.data;
      for (const item of this.historyItems) {
        this.apiService.get<ApiResponse<BackendArea>>(`area/${item.area_id}`).subscribe((data) => {
          if (data.data.config === undefined || data.data.config.name === undefined)
            return;
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
