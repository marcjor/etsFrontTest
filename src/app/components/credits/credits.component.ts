import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Credits} from './models/credits';
import creditsEJS from '../../../data/creditsEJS.json';
import {TypeCredits} from './models/type-credits';
import {Range} from './models/range';
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
  // -------------------------------------
  private _typeCredits: TypeCredits;
  get typeCredits(): TypeCredits {
    return this._typeCredits;
  }
  set typeCredits(value: TypeCredits) {
    this._typeCredits = value;
  }
  // -------------------------------------
  private _userDataAmount: number;
  get userDataAmount(): number {
    return this._userDataAmount;
  }
  set userDataAmount(value: number) {
    this._userDataAmount = value;
  }
  // -------------------------------------
  private _userDataAmountMin: number;
  get userDataAmountMin(): number {
    return this._userDataAmountMin;
  }
  set userDataAmountMin(value: number) {
    this._userDataAmountMin = value;
  }
  // -------------------------------------
  private _userDataAmountMax: number;
  get userDataAmountMax(): number {
    return this._userDataAmountMax;
  }
  set userDataAmountMax(value: number) {
    this._userDataAmountMax = value;
  }
  // -------------------------------------
  private _rangeDurationDefault: number;
  get rangeDurationDefault(): number {
    return this._rangeDurationDefault;
  }
  set rangeDurationDefault(value: number) {
    this._rangeDurationDefault = value;
  }
  // -------------------------------------
  private _rangeDurationType: string;
  get rangeDurationType(): string {
    return this._rangeDurationType;
  }
  set rangeDurationType(value: string) {
    this._rangeDurationType = value;
  }
  // -------------------------------------
  private _rangeDurationFromGoodInputNumber: number[];
  get rangeDurationFromGoodInputNumber(): number[] {
    return this._rangeDurationFromGoodInputNumber;
  }
  set rangeDurationFromGoodInputNumber(value: number[]) {
    this._rangeDurationFromGoodInputNumber = value;
  }
// -------------------------------------
  private _ranges: Range;
  get ranges(): Range {
    return this._ranges;
  }
  set ranges(value: Range) {
    this._ranges = value;
  }
  // -------------------------------------
  private _myForm: FormGroup;
  get myForm(): FormGroup {
    return this._myForm;
  }
  set myForm(value: FormGroup) {
    this._myForm = value;
  }
  // -------------------------------------

  constructor(private builder: FormBuilder) {
    this._listCredit = Object.keys(creditsEJS).map(function (i) {
      return creditsEJS[i];
    });
  }

  ngOnInit() {
    console.log(this.listCredits);
    this.typeCredits = this.listCredits[0];
    this.userDataAmount = this.typeCredits.credit.amount_default;
    this.userDataAmountMin = this.typeCredits.credit.amount_min;
    this.userDataAmountMax = this.typeCredits.credit.amount_max;
    console.log('MIN amount: ' + this.userDataAmountMin + ' for ' + this.typeCredits.description.title);
    console.log('MAX amount: ' + this.userDataAmountMax + ' for ' + this.typeCredits.description.title);
    this.rangeDurationDefault = this.typeCredits.credit.range_duration_default;
    this.rangeDurationType = this.typeCredits.credit.range_duration_type;
    console.log('Range duration: ' + this.rangeDurationDefault + ' ' + this.rangeDurationType);
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
    // this.myForm.get('creditAmount').valueChanges.subscribe(this.changeAmount);
    this.myForm.get('creditAmount').setValue(this.userDataAmount);
    if (this.myForm.controls['creditAmount'].valid === true) {
      let i = 0;
      while (this.myForm.controls['creditAmount'].value > this.typeCredits.ranges[i].range_max) {
        i++;
      }
      console.log(this.typeCredits.ranges[i].range_duration);
      this.rangeDurationFromGoodInputNumber = this.typeCredits.ranges[i].range_duration;
    }
  }

  changeAction(select) {
    const i: number = select.selectedIndex;
    this.typeCredits = this.listCredits[i];
    this.userDataAmount = this.typeCredits.credit.amount_default;
    this.userDataAmountMin = this.typeCredits.credit.amount_min;
    this.userDataAmountMax = this.typeCredits.credit.amount_max;
    console.clear();
    console.log(this.listCredits);
    console.log('MIN amount: ' + this.userDataAmountMin + ' for ' + this.typeCredits.description.title);
    console.log('MAX amount: ' + this.userDataAmountMax + ' for ' + this.typeCredits.description.title);
    this.rangeDurationDefault = this.typeCredits.credit.range_duration_default;
    this.rangeDurationType = this.typeCredits.credit.range_duration_type;
    console.log('Range duration: ' + this.rangeDurationDefault + ' ' + this.rangeDurationType);
    this.myForm.get('creditAmount').setValue(this.userDataAmount);
  }

  changeAmount() {
    if (this.myForm.controls['creditAmount'].valid === true) {
      let i = 0;
      while (this.myForm.controls['creditAmount'].value > this.typeCredits.ranges[i].range_max) {
        i++;
      }
      console.log(this.typeCredits.ranges[i].range_duration);
      this.rangeDurationFromGoodInputNumber = this.typeCredits.ranges[i].range_duration;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('toto');
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




