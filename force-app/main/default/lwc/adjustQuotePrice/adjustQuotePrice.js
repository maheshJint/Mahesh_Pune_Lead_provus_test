/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";

export default class AdjustQuotePrice extends LightningElement {
  adjustedAmountLabel = "Adjusted Amount";
  @api adjustedAmount = 0;

  /* Adjust Quote Price */
  setAmount(event) {
    this.adjustedAmount = event.currentTarget.value;
  }

}
