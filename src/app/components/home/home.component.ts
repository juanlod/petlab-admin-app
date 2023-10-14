import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  NzI18nService,
  NzI18nInterface,
  en_GB,
  es_ES,
  gl_ES,
} from 'ng-zorro-antd/i18n';

interface MenuItem {
  title: string;
  link?: string;
  icon?: string;
  children?: MenuItem[];
  open?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  locale: string = '';

  languages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Galego', value: 'gl' },
  ];

  menus: MenuItem[] = [
    {
      title: 'SIDEBAR.INIT.TITLE',
      icon: 'bi bi-house',
      link: '/dashboard/home',
    },
    {
      title: 'SIDEBAR.CLINIC.TITLE',
      icon: 'bi bi-h-square',
      children: [
        {
          title: 'SIDEBAR.CLINIC.CLIENTS.TITLE',
          link: '/dashboard/clients',
          icon: 'fa-solid fa-paw',
        },
      ],
    },
    {
      title: 'SIDEBAR.INVENTORY.TITLE',
      icon: 'bi bi-box2-heart',
      children: [
        {
          title: 'SIDEBAR.INVENTORY.PRODUCTS.TITLE',
          link: '/dashboard/inventory/products',
          icon: 'fa-solid fa-boxes-packing',
        },
      ],
    },
    {
      title: 'SIDEBAR.CONFIGURATION.TITLE',
      icon: 'bi bi-gear',
      children: [
        {
          title: 'SIDEBAR.CLINIC.TITLE',
          link: '/dashboard/configuration/clinic',
          icon: 'bi bi-h-square',
        },
        {
          title: 'SIDEBAR.INVENTORY.TITLE',
          link: '/dashboard/configuration/store',
          icon: 'bi bi-box2-heart',
        },
      ],
    },
  ];

  constructor(
    public translationService: NzI18nService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.locale = localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : 'es';
    this.switchLanguage();
  }

  switchLanguage() {
    const localeDictionary = {
      es: es_ES,
      gl: gl_ES,
      en: en_GB,
    };

    if (!this.locale) {
      this.locale = 'es';
    }

    this.translationService.setLocale(localeDictionary[this.locale]);
    this.translateService.setDefaultLang(this.locale);
    localStorage.setItem('lang', this.locale);
  }
}
