import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePanal } from './message-panal';

describe('MessagePanal', () => {
  let component: MessagePanal;
  let fixture: ComponentFixture<MessagePanal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagePanal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagePanal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
