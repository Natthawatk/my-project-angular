import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedOtherComponent } from './ranked-other.component';

describe('RankedOtherComponent', () => {
  let component: RankedOtherComponent;
  let fixture: ComponentFixture<RankedOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankedOtherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankedOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
