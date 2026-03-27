import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSoft } from './restaurant-soft';

describe('RestaurantSoft', () => {
  let component: RestaurantSoft;
  let fixture: ComponentFixture<RestaurantSoft>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantSoft]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantSoft);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
