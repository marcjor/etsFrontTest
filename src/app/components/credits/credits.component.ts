import {Component, Input, OnInit} from '@angular/core';
import {Credits} from './models/credits';
import creditsEJS from '../../../data/creditsEJS.json';
import {TypeCredits} from './models/type-credits';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  @Input() credits: Credits;
  private _listCredit: TypeCredits[];

  get listCredit(): TypeCredits[] {
    return this._listCredit;
  }

  constructor() {
    this._listCredit = Object.keys(creditsEJS).map(function(i) {
      return creditsEJS[i];
    });
  }

  ngOnInit() {
  }
}
