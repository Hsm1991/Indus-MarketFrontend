import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModsTableComponent } from './mods-table.component';

describe('ModsTableComponent', () => {
  let component: ModsTableComponent;
  let fixture: ComponentFixture<ModsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
