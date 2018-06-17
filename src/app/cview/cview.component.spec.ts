import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CviewComponent } from './cview.component';

describe('CviewComponent', () => {
  let component: CviewComponent;
  let fixture: ComponentFixture<CviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
