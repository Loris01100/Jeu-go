import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelulleComponent } from './celulle.component';

describe('CelulleComponent', () => {
  let component: CelulleComponent;
  let fixture: ComponentFixture<CelulleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelulleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelulleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
