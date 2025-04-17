import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    ButtonModule,
    RippleModule,
    MenubarModule,
    CardModule,
    DividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  mobileMenuOpen = false;

  navItems = [
    { label: 'Home', link: '/', active: true },
    { label: 'Features', link: '/features', active: false },
    { label: 'Pricing', link: '/pricing', active: false },
    { label: 'About', link: '/about', active: false },
    { label: 'Contact', link: '/contact', active: false },
  ];

  features = [
    {
      title: 'Intuitive Dashboard',
      description: 'Get a clear overview of your projects and tasks with our customizable dashboard.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />'
    },
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates and communication tools.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />'
    },
    {
      title: 'Advanced Analytics',
      description: 'Gain insights into your performance with detailed reports and visualizations.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />'
    },
    {
      title: 'Secure Storage',
      description: 'Keep your data safe with enterprise-grade security and encryption.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />'
    },
    {
      title: 'Task Automation',
      description: 'Save time by automating routine tasks and workflows.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
    },
    {
      title: 'Mobile Access',
      description: 'Stay productive on the go with our mobile apps for iOS and Android.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager, TechCorp',
      quote: 'This platform has completely transformed how our team collaborates. The intuitive interface and powerful features have boosted our productivity by 40%.'
    },
    {
      name: 'Michael Chen',
      role: 'CEO, StartupX',
      quote: 'We\'ve tried numerous project management tools, but this one stands out. The customization options and analytics have given us insights we never had before.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, GrowthCo',
      quote: 'The ease of use combined with the robust feature set makes this platform indispensable. Our campaigns are now more organized and effective than ever.'
    }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // // Close mobile menu when clicking outside or resizing window
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent): void {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest('nav')) {
  //     this.mobileMenuOpen = false;
  //   }
  // }

  // @HostListener('window:resize')
  // onResize(): void {
  //   if (window.innerWidth >= 768) {
  //     this.mobileMenuOpen = false;
  //   }
  // }
}
