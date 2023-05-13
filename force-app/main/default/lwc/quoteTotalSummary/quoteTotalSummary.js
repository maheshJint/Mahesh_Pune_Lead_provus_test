/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, track } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
    @track isShowModal = false;
    @track amount;

    showAdjustedAmount() {
        this.isShowModal = true;
    }
    hideModalBox() {
        this.isShowModal =false;
        
    }
    /* Create Event to send amount from Child to Parent */
    saveAmount() {
        const adjustedAmount = this.template.querySelector('c-adjust-quote-price').adjustedAmount;
        console.log("event.detail11: ", adjustedAmount);
        const selectEvent = new CustomEvent('amountcustomevent', {
        bubbles: true , 
        composed : true,
        detail: adjustedAmount
        });
        this.dispatchEvent(selectEvent);
        this.isShowModal =false;
    }

}
