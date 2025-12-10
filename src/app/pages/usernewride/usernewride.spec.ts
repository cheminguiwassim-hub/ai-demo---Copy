import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usernewride } from './usernewride';

describe('Usernewride', () => {
  let component: Usernewride;
  let fixture: ComponentFixture<Usernewride>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Usernewride]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usernewride);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
