import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-component',
  imports: [],
  templateUrl: './download-component.html',
  styleUrl: './download-component.css'
})
export class DownloadComponent implements OnInit {
  ngOnInit() {
    // download the APK file when the component is initialized
    const apkUrl = 'assets/client.apk'; // path to the APK file
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'client.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.location.href = '/'; // redirect to home page after download
  }
}
