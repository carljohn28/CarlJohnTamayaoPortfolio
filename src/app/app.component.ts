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

  const docDefinition: any = {

    pageSize: 'LETTER',
    pageMargins: [0, 0, 0, 0],

    content: [

      // ================= MAIN LAYOUT =================
      {
        columns: [

          // ==================================================
          // LEFT SIDEBAR
          // ==================================================
          {
            width: 200,

            stack: [

              // Background Color
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 200,
                    h: 792,
                    color: '#1F2937'
                  }
                ],
                absolutePosition: { x: 0, y: 0 }
              },

              {
                stack: [

                  // NAME
                  {
                    text: 'CARL JOHN',
                    style: 'sidebarName',
                    margin: [0, 40, 0, 0]
                  },

                  {
                    text: 'TAMAYAO',
                    style: 'sidebarName2'
                  },

                  {
                    text: 'WEB DEVELOPER | Programmer',
                    style: 'sidebarRole',
                    margin: [0, 0, 0, 30]
                  },

                  // CONTACT
                  {
                    text: 'CONTACT',
                    style: 'sidebarHeader'
                  },

                  {
                    text:
                      '✉ carljohntamayao@email.com',
                    style: 'sidebarText'
                  },

                  {
                    text:
                      '📱 +63 9976649549',
                    style: 'sidebarText'
                  },

                  {
                    text:
                      '📍 Atulayan Norte, Tuguegarao City',
                    style: 'sidebarText',
                    margin: [0, 0, 0, 25]
                  },

                  // ABOUT
                  {
                    text: 'ABOUT ME',
                    style: 'sidebarHeader'
                  },

                  {
                    text:
                      'Creative and detail-oriented software developer with experience building modern web applications using Angular and Wordpress.',
                    style: 'sidebarText',
                    margin: [0, 0, 0, 25]
                  },

                  // SKILLS
                  {
                    text: 'SKILLS',
                    style: 'sidebarHeader'
                  },

                  {
                    columns: [
                      {
                        ul: [
                          'Angular',
                          'TypeScript',
                          'HTML / CSS'
                        ],
                        style: 'skillList'
                      },

                      {
                        ul: [
                          'Laravel',
                          'PHP',
                          'WordPress'
                        ],
                        style: 'skillList'
                      }
                    ],
                    columnGap: 10
                  },

                  // EXTRA CONTENT
                  {
                    text: 'LANGUAGES',
                    style: 'sidebarHeader',
                    margin: [0, 25, 0, 8]
                  },

                  {
                    text:
                      '• English\n• Filipino',
                    style: 'sidebarText'
                  },

                  // CERTIFICATIONS
                  {
                    text: 'CERTIFICATIONS',
                    style: 'sidebarHeader',
                    margin: [0, 25, 0, 8]
                  },

                  {
                    text:
                      '• NC II – Computer System Servicing\n\n• MOS Excel 2019 Passer',
                    style: 'sidebarText'
                  }

                ],

                margin: [18, 0, 18, 20]
              }

            ]
          },

          // ==================================================
          // RIGHT CONTENT
          // ==================================================
          {
            width: '*',

            stack: [

              // HEADER CARD
              {
                stack: [

                  {
                    text: 'PROFESSIONAL EXPERIENCE',
                    style: 'mainTitle'
                  },

                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 5,
                        x2: 340,
                        y2: 5,
                        lineWidth: 1.5,
                        lineColor: '#2563EB'
                      }
                    ],
                    margin: [0, 5, 0, 15]
                  }

                ],

                margin: [25, 40, 25, 10]
              },

              // EXPERIENCE 1
              {
                stack: [

                  {
                    columns: [

                      {
                        width: '*',
                        text: 'Junior Programmer',
                        style: 'jobTitle'
                      },

                      {
                        width: 'auto',
                        text: 'Sept 2024 – Present',
                        style: 'dateStyle'
                      }

                    ]
                  },

                  {
                    text:
                      'University of Saint Louis Tuguegarao',
                    style: 'companyText'
                  },

                  {
                    ul: [
                      'Managing and maintaining the university website using Wordpress',
                      'Codind and Developement using Angular Framework',
                      'Code review and system documentation',
                      'System maintenance and troubleshooting'
                    ],
                    style: 'bodyText'
                  }

                ],

                style: 'contentCard'
              },

              // EXPERIENCE 2
              {
                stack: [

                  {
                    columns: [

                      {
                        width: '*',
                        text: 'Internet Library and AVR In-charge',
                        style: 'jobTitle'
                      },

                      {
                        width: 'auto',
                        text: 'Aug 2023 – Sept 2024',
                        style: 'dateStyle'
                      }

                    ]
                  },

                  {
                    text:
                      'University of Saint Louis Tuguegarao',
                    style: 'companyText'
                  },

                  {
                    ul: [
                      'Managed High School Internet and Multimedia Office',
                      'Maintained computer hardware and software',
                      'Provided technical support and troubleshooting',
                      'Handled software installations and updates',
                      'Managed equipment inventory'
                    ],
                    style: 'bodyText'
                  }

                ],

                style: 'contentCard'
              },

              // EDUCATION
              {
                text: 'EDUCATION',
                style: 'mainTitle',
                margin: [25, 15, 25, 0]
              },

              {
                canvas: [
                  {
                    type: 'line',
                    x1: 25,
                    y1: 5,
                    x2: 365,
                    y2: 5,
                    lineWidth: 1.5,
                    lineColor: '#2563EB'
                  }
                ],
                margin: [0, 5, 0, 15]
              },

              {
                stack: [

           { text: 'Tertiary:', style: 'jobTitle' },
            { text: 'Bachelor of Science in Information Technology', style: 'bodyText' },
            { text: 'University of Saint Louis Tuguegarao | 2019 – 2023', style: 'bodyText' },
            
            { text: 'Secondary:', style: 'jobTitle' },
            { text: 'Cagayan National High School | 2017 – 2019', style: 'bodyText' },
            { text: 'Cagayan National High School | 2012 – 2017', style: 'bodyText' },

                ],

                style: 'contentCard'
              },

              // EXTRA SECTION
              // {
              //   text: 'PROJECTS',
              //   style: 'mainTitle',
              //   margin: [25, 15, 25, 0]
              // },

              // {
              //   canvas: [
              //     {
              //       type: 'line',
              //       x1: 25,
              //       y1: 5,
              //       x2: 365,
              //       y2: 5,
              //       lineWidth: 1.5,
              //       lineColor: '#2563EB'
              //     }
              //   ],
              //   margin: [0, 5, 0, 15]
              // },

              // {
              //   stack: [

              //     {
              //       text:
              //         'University Website Management System',
              //       style: 'jobTitle'
              //     },

              //     {
              //       text:
              //         'Developed and maintained web-based systems using Angular Framework and Wordpress.',
              //       style: 'bodyText'
              //     }

              //   ],

              //   style: 'contentCard'
              // }

            ]
          }

        ]
      }

    ],

    // ==================================================
    // STYLES
    // ==================================================
    styles: {

      sidebarName: {
        fontSize: 24,
        bold: true,
        color: '#FFFFFF',
        alignment: 'center'
      },

      sidebarName2: {
        fontSize: 24,
        bold: true,
        color: '#60A5FA',
        alignment: 'center'
      },

      sidebarRole: {
        fontSize: 11,
        color: '#D1D5DB',
        alignment: 'center',
        letterSpacing: 1
      },

      sidebarHeader: {
        fontSize: 11,
        bold: true,
        color: '#60A5FA',
        margin: [0, 10, 0, 10]
      },

      sidebarText: {
        fontSize: 9,
        color: '#E5E7EB',
        lineHeight: 1.5
      },

      skillList: {
        fontSize: 9,
        color: '#E5E7EB',
        lineHeight: 1.4
      },

      mainTitle: {
        fontSize: 15,
        bold: true,
        color: '#111827'
      },

      contentCard: {
        margin: [25, 0, 25, 12],
        fillColor: '#F9FAFB'
      },

      jobTitle: {
        fontSize: 11,
        bold: true,
        color: '#111827'
      },

      dateStyle: {
        fontSize: 8,
        color: '#2563EB',
        bold: true
      },

      companyText: {
        fontSize: 9,
        italics: true,
        color: '#6B7280',
        margin: [0, 2, 0, 5]
      },

      bodyText: {
        fontSize: 9,
        color: '#374151',
        lineHeight: 1.4
      }

    }

  };

  pdfMake.createPdf(docDefinition).open();
}

}
