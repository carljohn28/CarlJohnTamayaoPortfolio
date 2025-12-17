import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = (pdfFonts as any).vfs;

declare var FinisherHeader: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class AppComponent implements AfterViewInit {


  @ViewChild('header', { static: true }) header!: ElementRef;
  @ViewChild('aboutSection', { static: true }) about!: ElementRef;
  @ViewChild('skills', { static: true }) skills!: ElementRef;
  @ViewChild('project', { static: true }) project!: ElementRef;
  @ViewChild('footer', { static: true }) footer!: ElementRef;

  title = 'cjportfolio';

  stack = 1;
tools = 0;

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

  menuOpen = false; // mobile menu toggle

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false; // closes menu when a link is clicked
  }

  generateResumePDF() {
    const profileImage = 'data:image/png;base64,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'


    const docDefinition: any = {
      content: [
        {
          columns: [
            {
              width: 'auto',
              stack: [
                { image: profileImage, width: 100, height: 100, alignment: 'center', margin: [0, 0, 0, 10] },
                { text: 'John Doe', style: 'name' },
                { text: 'Software Developer', style: 'title' },
                { text: 'Email: john.doe@example.com', style: 'contact' },
                { text: 'Phone: +1234567890', style: 'contact' },
                { text: 'City, Country', style: 'contact' }
              ]
            },
            {
              width: '*',
              stack: [
                { text: 'Professional Summary', style: 'sectionHeader' },
                { text: 'Passionate software developer with 5+ years of experience in Angular, Node.js, and modern web technologies.', margin: [0, 0, 0, 10] },

                { text: 'Skills', style: 'sectionHeader' },
                {
                  columns: [
                    { ul: ['Angular', 'React', 'Vue'] },
                    { ul: ['Node.js', 'Express', 'REST APIs'] },
                    { ul: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] }
                  ],
                  margin: [0, 0, 0, 10]
                },

                { text: 'Work Experience', style: 'sectionHeader' },
                {
                  stack: [
                    { text: 'Frontend Developer | ABC Corp', style: 'jobTitle' },
                    { text: 'Jan 2020 - Present', italics: true },
                    { text: 'Developed web applications with Angular and TypeScript. Improved performance and UX.' }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  stack: [
                    { text: 'Junior Developer | XYZ Ltd', style: 'jobTitle' },
                    { text: 'Jun 2017 - Dec 2019', italics: true },
                    { text: 'Assisted in building client-side apps, wrote unit tests, and collaborated with backend teams.' }
                  ],
                  margin: [0, 0, 0, 5]
                },

                { text: 'Education', style: 'sectionHeader' },
                {
                  stack: [
                    { text: 'B.Sc. in Computer Science | University of Technology', style: 'jobTitle' },
                    { text: '2013 - 2017', italics: true }
                  ]
                }
              ]
            }
          ]
        }
      ],

      styles: {
        name: { fontSize: 20, bold: true, alignment: 'center', color: '#1f497d' },
        title: { fontSize: 14, italics: true, alignment: 'center', margin: [0, 5, 0, 10], color: '#4f81bd' },
        contact: { fontSize: 10, alignment: 'center', color: 'gray' },
        sectionHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5], color: '#1f497d' },
        jobTitle: { bold: true, fontSize: 12, color: '#4f81bd' }
      },

      defaultStyle: { font: 'Roboto' }
    };

    pdfMake.createPdf(docDefinition).open();
  }

}
