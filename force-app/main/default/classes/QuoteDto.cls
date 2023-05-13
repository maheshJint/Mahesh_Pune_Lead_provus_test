public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Id id { get; set; }
  @AuraEnabled
  public Date endDate { get; set; }
  @AuraEnabled
  public Date startDate { get; set; }
  @AuraEnabled
  public String Name { get; set; }
  @AuraEnabled
  public Double totalQuotedAmount{ get; set; }
  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.Name = quote.Name;
    this.id = quote.Id;
    this.endDate = quote.EndDate__c;
    this.startDate = quote.StartDate__c;
    this.totalQuotedAmount = quote.TotalQuotedAmount__c;
  }

  public override SObject refreshSo() {
    return null;
  }
}
