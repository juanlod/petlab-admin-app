import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;


  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;

  constructor(private readonly nzConfigService: NzConfigService) {}

  ngOnInit(): void {
    this.nzConfigService.set('message', { nzTop:  '36'});
  }

}
