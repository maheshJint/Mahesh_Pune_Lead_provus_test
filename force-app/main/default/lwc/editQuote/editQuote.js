/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, track, wire } from "lwc";
/* getQuoteRecord Retrieves Quote Details using Record ID */
import getQuoteRecord  from '@salesforce/apex/EditQuoteController.getQuoteRecord';
/* saveQuoteRecord Saves Quote Details using Record ID */
import saveQuoteRecord  from '@salesforce/apex/EditQuoteController.saveQuoteRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditQuote extends LightningElement {

  @api recordId;
  @track isQuoteLoaded = false;
  @track error;
  @track quoteReq ;
  @track quoteData;
  @track isLoaded=true;

  connectedCallback() {
    this.quoteReq={id:this.recordId};
    this.handleQuoteRecord();
  }
  
  /* handleQuoteRecord - To retireve Quote Details */
  handleQuoteRecord() {
    this.isLoaded=false;
    getQuoteRecord( { quoteDto : this.quoteReq})
        .then(result => {
            this.isQuoteLoaded = true;
            this.isLoaded=true;
            this.quoteData = result;
        })
        .catch(error => {
            this.isLoaded=true;
            this.error = error;
        });
  }

  /* setQuoteData - To Set New Dates from UI */
  setQuoteData(event) {
    let dataSetId = event.currentTarget.dataset.id;
    if(dataSetId == 'startDate') {
        this.quoteData.startDate = event.currentTarget.value;
    } else if(dataSetId == 'endDate') {
        this.quoteData.endDate = event.currentTarget.value;
    }
  }

  /* handelSaveQuote - To Save New Dates into Quote Records */
  handelSaveQuote() {
    this.saveQuote(this.quoteData);
  }

  /* saveQuote - Call Apex Method to Save updated details into Quote Records */
  saveQuote(quoteDataToSave) {
    this.isLoaded=false;
    console.log('Response :: '+JSON.stringify(quoteDataToSave));
    saveQuoteRecord( { quoteDto : quoteDataToSave})
    .then(result => {
        this.isLoaded=true;
        this.showToast('success','Saved Quote Details');
        console.log('Response :: '+JSON.stringify(result));
    })
    .catch(error => {
        let errorMessage = error;
        if ( error.body.message) {
            errorMessage =error.body.message;
        }
        this.showToast('error',errorMessage);
        this.isLoaded=true;
        this.error = error;
    });
  }

  /* saveAmountChange - To Save New Amount into Quote Records  */
  @api saveAmountChange(amountVal) {

    let quoteData ={id:this.quoteData.id};
    quoteData.totalQuotedAmount = amountVal;
    this.saveQuote(quoteData);
  }

  /* showToast - To Show Euccess or Error Message  */
  showToast(varient,message) {
    const event = new ShowToastEvent({
        title: 'Message',
        message: message,
        variant: varient,
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
}
  
}
