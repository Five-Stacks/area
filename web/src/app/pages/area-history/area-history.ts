import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderDashBoardComponent } from '../../components/Headers/header-component-dashboard/header-component-dashboard';
import { ApiService } from '../../services/api.service';

interface ApiResponse<T = unknown> { data: T }

interface AreaHistoryItem {
  id: number;
  area_id: number;
  executed_at: string;
  status: 'success' | 'failure';
  log: string;
}

@Component({
  selector: 'app-area-history',
  imports: [HeaderDashBoardComponent, CommonModule],
  templateUrl: './area-history.html',
  styleUrls: ['./area-history.css']
})
export class AreaHistory implements OnInit {
  historyItems: AreaHistoryItem[] = [];
  private apiService = inject(ApiService);

  ngOnInit(): void {
    const areaId = window.location.pathname.split('/').pop();
    this.apiService.get<ApiResponse<AreaHistoryItem[]>>(`areaExecution/${areaId}`).subscribe((data) => {
      this.historyItems = data.data;
    });
  }
}
