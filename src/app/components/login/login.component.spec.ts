import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {By} from "@angular/platform-browser";
import {FirstService} from "../../services/first.service";
import createSpyObj = jasmine.createSpyObj;
import {initializeAutocomplete} from "@angular/cli/src/utilities/completion";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fakeFirstService = createSpyObj('FirstService', ['init']);
  fakeFirstService.init.and.callFake(()=>{console.log('Fake init call')});

  beforeEach(async () => {

    TestBed.overrideComponent(LoginComponent, {
      set: {
        providers: []
      }
    });

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: FirstService, useValue: fakeFirstService}
      ]
    })
      .compileComponents();

    fakeFirstService.init.calls.reset();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.user = {
      name: "John",
      family: "Doe"
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getFullName() should return full name of user', () => {
    let result = component.getFullName();
    expect(result).toBe("John Doe");
    component.user = {
      name: 'Vladimir',
      family: 'Samoilenko'
    };
    result = component.getFullName();
    expect(result).toBe("Vladimir Samoilenko");
  });

  it('logoutEvent should me emitted when Logout button clicked', () => {
    let event = spyOn(component.logoutEvent, 'emit').and.callThrough();
    component.logoutClickButton();
    expect(event).toHaveBeenCalledWith("John");
  });

  it('logoutEvent should me emitted when Logout button clicked from template', () => {
    let event = spyOn(component.logoutEvent, 'emit').and.callThrough();

    let button = fixture.debugElement.query(By.css('button.login-button'));
    button.nativeElement.click();

    expect(event).toHaveBeenCalledWith("John");
  });

  it('user element should be rendered if user is defined', () => {
    let userElement = fixture.debugElement.query(By.css('.user'));
    expect(userElement).toBeTruthy();
  });

  it('user element should not be rendered if user is not defined', () => {
    component.user = undefined;
    fixture.detectChanges();
    let userElement = fixture.debugElement.query(By.css('.user'));
    expect(userElement).toBeFalsy();
  });

  it('user element should contain hello text', () => {
    component.user = {
      name: 'Vladimir',
      family: 'Samoilenko'
    };
    fixture.detectChanges();
    let userElement = fixture.debugElement.query(By.css('.user'));
    expect(userElement.nativeElement.querySelector('.hello').textContent).toContain('Hello, Vladimir Samoilenko');
  });

  it('user should have error class if user name or family name is not defined', () => {
    let helloElement = fixture.debugElement.query(By.css('.user .hello'));

    component.user = {
      name: "Vladimir"
    };
    fixture.detectChanges();

    expect(helloElement.nativeElement).toHaveClass('error');

    component.user = {
      family: "Samoilenko"
    };
    fixture.detectChanges();
    expect(helloElement.nativeElement).toHaveClass('error');

    component.user = {
      name: "Vladimir",
      family: "Samoilenko"
    };
    fixture.detectChanges();
    expect(helloElement.nativeElement).not.toHaveClass('error');
  });


  it('first dependency servies should be called at start', ()=>{
    expect(fakeFirstService.init).toHaveBeenCalledTimes(1);
  });
});
