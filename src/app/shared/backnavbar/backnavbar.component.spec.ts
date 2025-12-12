import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacknavbarComponent } from './backnavbar.component';

describe('BacknavbarComponent', () => {
  let component: BacknavbarComponent;
  let fixture: ComponentFixture<BacknavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacknavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacknavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
