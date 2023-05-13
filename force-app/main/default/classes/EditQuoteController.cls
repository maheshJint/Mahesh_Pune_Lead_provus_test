/**************************************************************************************
*  @Name        : EditQuoteController
*  @Date        : 09/20/2017
*  @Description : This Class is used as Controller for Edit Quote
*  @Author      : Mahesh J		
**************************************************************************************/ 
public with sharing class EditQuoteController {
    public EditQuoteController() {

    }

    /*************************************************************************************
    * @Description  This method gets Quote Record
    * @Param		DTOs - QuoteDto
    * @Return       DTOs - QuoteDto
    **************************************************************************************/
    @AuraEnabled
    public static QuoteDto getQuoteRecord(QuoteDto quoteDto) {
        try {
            Quote__c quoteRec = [select Id,StartDate__c, EndDate__c,Name,TotalQuotedAmount__c from Quote__c where Id =: quoteDto.id WITH SECURITY_ENFORCED];
            QuoteDto quoteDto1 = new QuoteDto(quoteRec);
            return quoteDto1;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /*************************************************************************************
    * @Description  This method Save Quote Record
    * @Param		DTOs - QuoteDto
    * @Return       DTOs - QuoteDto
    **************************************************************************************/
    @AuraEnabled
    public static QuoteDto saveQuoteRecord(QuoteDto quoteDto) {
        try {
            Quote__c quote = getQuoteToUpdate(quoteDto);
            //SObjectAccessDecision decision = Security.stripInaccessible(AccessType.UPDATABLE, Quote__c);
            update quote;
            return quoteDto;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /*************************************************************************************
    * @Description  This method Converts DTOs to SObject
    * @Param		DTOs - QuoteDto
    * @Return       Quote__c
    **************************************************************************************/
    public static Quote__c getQuoteToUpdate(QuoteDto quoteDto) {
        try {
            Quote__c quote = new Quote__c();
            if(quoteDto.id != null) {
                quote.Id = quoteDto.id;
            }
            if(quoteDto.startDate != null) {
                quote.StartDate__c = quoteDto.startDate;
            }
            if(quoteDto.endDate != null) {
                quote.EndDate__c = quoteDto.endDate;
            }
            if(quoteDto.totalQuotedAmount != null) {
                quote.TotalQuotedAmount__c = quoteDto.totalQuotedAmount;
            }
          return  quote;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}