import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Credits} from './models/credits';
import creditsEJS from '../../../data/creditsEJS.json';
import {TypeCredits} from './models/type-credits';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit, OnChanges {

  @Input() credits: Credits;
  private _listCredit: TypeCredits[];
  get listCredits(): TypeCredits[] {
    return this._listCredit;
  }

  private _userDataAmount: number;
  get userDataAmount(): number {
    return this._userDataAmount;
  }
  set userDataAmount(value: number) {
    this._userDataAmount = value;
  }

  private _userDataAmountMin: number;
  get userDataAmountMin(): number {
    return this._userDataAmountMin;
  }
  set userDataAmountMin(value: number) {
    this._userDataAmountMin = value;
  }

  private _userDataAmountMax: number;
  get userDataAmountMax(): number {
    return this._userDataAmountMax;
  }
  set userDataAmountMax(value: number) {
    this._userDataAmountMax = value;
  }

  private _myForm: FormGroup;
  get myForm(): FormGroup {
    return this._myForm;
  }
  set myForm(value: FormGroup) {
    this._myForm = value;
  }

  constructor(private builder: FormBuilder) {
    this._listCredit = Object.keys(creditsEJS).map(function(i) {
      return creditsEJS[i];
    });
  }

  ngOnInit() {
    console.log(this.listCredits);
    const typeCredits: TypeCredits = this.listCredits[0];
    this.userDataAmount = typeCredits.credit.amount_default;
    this.userDataAmountMin = typeCredits.credit.amount_min;
    this.userDataAmountMax = typeCredits.credit.amount_max;
    console.log('MIN amount: ' + this.userDataAmountMin + ' for ' + typeCredits.description.title);
    console.log('MAX amount: ' + this.userDataAmountMax + ' for ' + typeCredits.description.title);
    this.myForm = this.builder.group({
      'typeCredits': [''],
      'creditAmount':
        ['',
          [
            Validate(this),
            Validators.required
          ]
        ],
    });
  }

  changeAction(select) {
    const i: number = select.selectedIndex;
    const typeCredits: TypeCredits = this.listCredits[i];
    this.userDataAmount = typeCredits.credit.amount_default;
    this.userDataAmountMin = typeCredits.credit.amount_min;
    this.userDataAmountMax = typeCredits.credit.amount_max;
    console.clear();
    console.log(this.listCredits);
    console.log('MIN amount: ' + this.userDataAmountMin + ' for ' + typeCredits.description.title);
    console.log('MAX amount: ' + this.userDataAmountMax + ' for ' + typeCredits.description.title);

    this.myForm.get('creditAmount').setValue(this.userDataAmount);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}

export function Validate(obj: CreditsComponent): ValidatorFn {
  return function ValidateUserAmount(control: AbstractControl) {
  if (control.value < obj.userDataAmountMin || control.value > obj.userDataAmountMax) {
    return {validAmount: true};
  }
  return null;
 };
}




