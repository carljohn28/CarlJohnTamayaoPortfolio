import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var FinisherHeader: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements AfterViewInit {


  @ViewChild('header', { static: true }) header!: ElementRef;
  @ViewChild('aboutSection', { static: true }) about!: ElementRef;
  @ViewChild('skills', { static: true }) skills!: ElementRef;
  @ViewChild('project', { static: true }) project!: ElementRef;
  @ViewChild('footer', { static: true }) footer!: ElementRef;

  title = 'cjportfolio';

  stack = 1;
  tools: number;

  selectedTab: string = 'stack'; // Default active is Tech Stack
  clickStack() {
    this.selectedTab = 'stack';
    this.stack = 1;
    this.tools = 0;
  }
  clickTools() {

    this.selectedTab = 'tools';
    this.stack = 0;
    this.tools = 1;
  }


  ngAfterViewInit() {
    this.loadFinisherScript().then(() => {

      setTimeout(() => {

        new FinisherHeader({
          element: this.header.nativeElement,
          count: 100,
          size: { min: 1, max: 2, pulse: 0 },
          speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.2 } },
          colors: { background: '#020202ff', particles: ['#ffffff', '#ff926b'] },
          blending: 'overlay',
          opacity: { center: 1, edge: 1 },
          skew: 0,
          shapes: ['c']
        });

        new FinisherHeader({
          element: this.about.nativeElement,
          count: 100,
          size: { min: 1, max: 2, pulse: 0 },
          speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.2 } },
          colors: { background: '#0D0D0D', particles: ['#ffffff', '#ff926b'] },
          blending: 'overlay',
          opacity: { center: 1, edge: 1 },
          skew: 0,
          shapes: ['c']
        });

        new FinisherHeader({
          element: this.skills.nativeElement,
          count: 100,
          size: { min: 1, max: 2, pulse: 0 },
          speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.2 } },
          colors: { background: '#111111', particles: ['#ffffff', '#ff926b'] },
          blending: 'overlay',
          opacity: { center: 1, edge: 1 },
          skew: 0,
          shapes: ['c']
        });

        new FinisherHeader({
          element: this.project.nativeElement,
          count: 100,
          size: { min: 1, max: 2, pulse: 0 },
          speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.2 } },
          colors: { background: '#0D0D0D', particles: ['#ffffff', '#ff926b'] },
          blending: 'overlay',
          opacity: { center: 1, edge: 1 },
          skew: 0,
          shapes: ['c']
        });


        new FinisherHeader({
          element: this.footer.nativeElement,
          count: 100,
          size: { min: 1, max: 2, pulse: 0 },
          speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.2 } },
          colors: { background: '#0A0A0A', particles: ['#ffffff', '#ff926b'] },
          blending: 'overlay',
          opacity: { center: 1, edge: 1 },
          skew: 0,
          shapes: ['c']
        });

      }, 50); // small delay to allow DOM layout
    }).catch(err => console.error(err));
  }


  loadFinisherScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Already loaded
      if ((window as any).FinisherHeader) {
        resolve();
        return;
      }

      const existing = document.querySelector(
        'script[src="assets/js/finisher-header.es5.min.js"]'
      );

      if (existing) {
        existing.addEventListener('load', () => resolve());
        return;
      }

      const script = document.createElement('script');
      script.src = 'assets/js/finisher-header.es5.min.js';
      script.type = 'text/javascript';
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject('FinisherHeader script load error');

      document.body.appendChild(script);
    });
  }





}
