import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAdd } from './restaurant-add';

describe('RestaurantAdd', () => {
  let component: RestaurantAdd;
  let fixture: ComponentFixture<RestaurantAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
