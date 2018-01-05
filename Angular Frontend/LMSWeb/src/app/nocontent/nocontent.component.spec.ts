import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocontentComponent } from './nocontent.component';

describe('NocontentComponent', () => {
  let component: NocontentComponent;
  let fixture: ComponentFixture<NocontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
