import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { Card, CardModule } from 'primeng/card';

@Component({
  selector: 'app-floating-card',
  templateUrl: './floating-card.component.html',
  styleUrls: ['./floating-card.component.scss'],
  imports: [CardModule]
})
export class FloatingCardComponent implements AfterViewInit, OnChanges {
  @Input() ingredient: any;
  @Input() position: { x: number, y: number } = { x: 0, y: 0 };
  
  @ViewChild(Card) 
  floatingCard!: Card;

  constructor() {
    
  }

  ngAfterViewInit(): void {
    this.setCardPosition(this.position);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.floatingCard) {
      this.setCardPosition(this.position);
    }
  }

  setCardPosition(position: { x: number, y: number }) {
    this.floatingCard.el.nativeElement.style.left = `${position.x}px`;
    this.floatingCard.el.nativeElement.style.top = `${position.y}px`;
  }
}

