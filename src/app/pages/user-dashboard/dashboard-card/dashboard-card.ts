import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import lottie from 'lottie-web'
@Component({
  selector: 'app-dashboard-card',
  imports: [RouterLink],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.scss',
  standalone: true
})
export class DashboardCard implements AfterViewInit{
  @Input() title!:string;
  @Input() description!:string;
  @Input() animationPath!:string;
  @Input() routerLink!:string;

  @ViewChild('animationBox',{static:true}) animationBox!:ElementRef;
  animation:any;
  ngAfterViewInit() {
    this.animation = lottie.loadAnimation({
      container: this.animationBox.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: this.animationPath,
    });
    
    this.animationBox.nativeElement.addEventListener('mouseenter', () => this.animation.play());
    this.animationBox.nativeElement.addEventListener('mouseleave', () => this.animation.stop());

}

}
