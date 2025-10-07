import { Component, inject, OnInit } from '@angular/core';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { ButtonWithIconComponent } from '../../components/Buttons/button-with-icon-component/button-with-icon-component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';
import { OptionsFieldComponent } from '../../components/Forms/options-field-component/options-field-component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    ButtonFullComponent,
    ButtonWithIconComponent,
    CommonModule,
    TextFieldComponent,
    OptionsFieldComponent,
    RouterLink
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPage implements OnInit {
  searchTerm = '';
  appsFilter = 'All Apps';
  statusFilter = 'All Status'

  listApps: string[] = ['All Apps'];
  listStatus: string[] = ['All Status', 'Active', 'Inactive'];

  private router = inject(Router);
  private apiService = inject(ApiService);

  listAreas : {
    id: number
    name: string
    AppsIcons: {
      name: string
      url: string
    }[]
    active: boolean
    selected?: boolean
    isToggling?: boolean
  }[] = [
    { id: 1, name: 'Work', AppsIcons: [
      { name: 'Gmail', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png' },
      { name: 'Facebook', url: 'https://images.icon-icons.com/1043/PNG/512/social_media_icons_flat_shadow_set_512x512_0000_facebook_icon-icons.com_76449.png' },
      { name: 'Discord', url: 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDaK1XdUso6cUMpI9hAdPUU_FNs11cY1X284vsHrnWtRw7oqRpN1m9YAg21d_aNKnIo-&format=source&h=210' },
      { name: 'GitHub', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg' }
    ], active: true
    },
    { id: 2, name: 'Social', AppsIcons: [
      { name: 'Facebook', url: 'https://images.icon-icons.com/1043/PNG/512/social_media_icons_flat_shadow_set_512x512_0000_facebook_icon-icons.com_76449.png' },
      { name: 'Twitter', url: 'https://static.vecteezy.com/system/resources/previews/031/737/206/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png' },
      { name: 'Instagram', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' }
    ], active: false
    },
    { id: 3, name: 'Delete Email each Monday 9pm', AppsIcons: [
      { name: 'Gmail', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png' },
      { name: 'Calendar', url: 'https://icons.veryicon.com/png/o/miscellaneous/face-monochrome-icon/calendar-249.png' }
    ], active: true
    },
    { id: 4, name: 'Send tweet on discord message received', AppsIcons: [
      { name: 'Discord', url: 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDaK1XdUso6cUMpI9hAdPUU_FNs11cY1X284vsHrnWtRw7oqRpN1m9YAg21d_aNKnIo-&format=source&h=210' },
      { name: 'Twitter', url: 'https://static.vecteezy.com/system/resources/previews/031/737/206/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png' }
    ], active: false
    },
    { id: 5, name: 'GitHub to Discord', AppsIcons: [
      { name: 'GitHub', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg' },
      { name: 'Discord', url: 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDaK1XdUso6cUMpI9hAdPUU_FNs11cY1X284vsHrnWtRw7oqRpN1m9YAg21d_aNKnIo-&format=source&h=210' }
    ], active: true
    },
    { id: 6, name: 'AREA 1', AppsIcons: [
      { name: 'Gmail', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png' },
      { name: 'Facebook', url: 'https://images.icon-icons.com/1043/PNG/512/social_media_icons_flat_shadow_set_512x512_0000_facebook_icon-icons.com_76449.png' },
      { name: 'Discord', url: 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDaK1XdUso6cUMpI9hAdPUU_FNs11cY1X284vsHrnWtRw7oqRpN1m9YAg21d_aNKnIo-&format=source&h=210' },
      { name: 'GitHub', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg' }
    ], active: true
    },
    { id: 7, name: 'AREA 2', AppsIcons: [
      { name: 'Facebook', url: 'https://images.icon-icons.com/1043/PNG/512/social_media_icons_flat_shadow_set_512x512_0000_facebook_icon-icons.com_76449.png' },
      { name: 'Twitter', url: 'https://static.vecteezy.com/system/resources/previews/031/737/206/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png' },
      { name: 'Instagram', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' }
    ], active: false
    },
    { id: 8, name: 'AREA 3', AppsIcons: [
      { name: 'Gmail', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png' },
      { name: 'Calendar', url: 'https://icons.veryicon.com/png/o/miscellaneous/face-monochrome-icon/calendar-249.png' }
    ], active: true
    }
  ];

  onDetailsArea(areaId: number) {
    this.router.navigate(['/area/details', areaId]);
  }

  onEditionArea(areaId: number) {
    this.router.navigate(['/area/edition', areaId]);
  }

  getIconsArea(areaId: number): {
    name: string
    url: string
  }[] {
    const area = this.listAreas.find(a => a.id === areaId);
    if (!area) return [];
    if (area.AppsIcons.length > 3) {
      let newIcons = [];
      newIcons = area.AppsIcons.slice(0, 2);
      newIcons.push({ name: 'More', url: 'https://static.thenounproject.com/png/683450-200.png' });
      return newIcons;
    }
    return area.AppsIcons;
  }

  selectArea(areaId: number) {
    this.listAreas = this.listAreas.map(area => ({
      ...area,
      selected: area.id === areaId ? !area.selected : area.selected
    }));
  }

  getFilteredAreas() : {
    id: number
    name: string
    AppsIcons: {
      name: string
      url: string
    }[]
    active: boolean
    selected?: boolean
    isToggling?: boolean
  }[] {
    let filtered = this.listAreas;
    if (this.searchTerm)
      filtered = filtered.filter(area => area.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    if (this.appsFilter && this.appsFilter !== 'All Apps')
      filtered = filtered.filter(area => area.AppsIcons.some(app => app.name === this.appsFilter));
    if (this.statusFilter && this.statusFilter !== 'All Status') {
      const isActive = this.statusFilter === 'Active';
      filtered = filtered.filter(area => area.active === isActive);
    }
    return filtered;
  }

  changeStatus(areaId: number) {
    const area = this.listAreas.find(a => a.id === areaId);
    if (area && !area.isToggling) {
      area.isToggling = true;

      setTimeout(() => {
        area.active = !area.active;
        area.isToggling = false;
      }, 150);
    }
  }

  ngOnInit() {
    // this.apiService.get('area/').subscribe(data => {
    //   if (data) {
    //     this.listAreas = data.data;

    //     // Initialize listApps based on the unique app names from listAreas
    //     const appSet = new Set<string>();
    //     this.listAreas.forEach(area => {
    //       area.AppsIcons.forEach(app => {
    //         appSet.add(app.name);
    //       });
    //     });
    //     this.listApps = ['All Apps', ...Array.from(appSet)];
    //   }
    // });

    // Initialize listApps based on the unique app names from listAreas
    const appSet = new Set<string>();
    this.listAreas.forEach(area => {
      area.AppsIcons.forEach(app => {
        appSet.add(app.name);
      });
    });
    this.listApps = ['All Apps', ...Array.from(appSet)];
  }
}
