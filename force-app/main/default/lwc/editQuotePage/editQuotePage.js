/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";

export default class EditQuotePage extends LightningElement {
  @api recordId;
  
  /* Get Amount from Child Component on Save */
  handleSaveAmount(event){
    console.log("event.detail444: ", JSON.stringify(event.detail));
    this.template.querySelector("c-edit-quote").saveAmountChange(event.detail);
  }
}
