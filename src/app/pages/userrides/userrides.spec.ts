import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userrides } from './userrides';

describe('Userrides', () => {
  let component: Userrides;
  let fixture: ComponentFixture<Userrides>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userrides]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userrides);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
