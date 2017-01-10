Ext.define('AOC.lang.lit',{
    alternateClassName : ['AOCLit'],
    singleton : true,
   "hideImage":"background-image:url();background-repeat:no-repeat;background-position:right",
    //User
    "iam":'I am',
    "emailAddress": 'Email Address',
    "jobTitle": 'Job Title',
    "role": 'Role',
    "male":'Male',
    "female": 'Female',
    "pleaseWait": 'Please wait...',
    "personalInformation":'Personal Information',
    "firstName": 'First Name',
    "lastName": 'Last Name',
    "maximumNChar": 'Maximum $$$$ characters allowed.',
    "splCharNotAllowed": 'Special characters are not allowed',
    "profileInfo": 'My Profile',
    "updateUserMsg": "User updated successfully",
    "addUserMsg": "User Added Successfully",
    "productLine":'Product Line',
    "deleteUserMsg": "User Deleted Successfully",
    "delUserMsg":'<b>Are you sure you want to delete the User?</b>',
    "noFieldModifiedMsg": "No field has been modified.",
    "userNameExistsMsg": "A user with the given Email already exists. Please choose another Email.",
    "userGridSearchEmptyText": "Search Email",
    //Address
    "Description": 'Description',
    "siteNumber":'Site Number',
    "address": 'Address',
    "address1": 'Address 1',
    "address3": 'Address 3',
    "City": 'City',
    "Country": 'Country',
    "Zip": 'Zip',
    "Email": 'Email',
    "shippingMethod":'Shipping Method',
    "siteType": 'Site Type',
    "Contact": 'Contact',
    "Phone1": 'Phone 1',
    "shippingInstructions": 'Shipping Instructions',
    "billToSiteNumber": 'Bill To Site Number',
    "siteToSiteNumber": 'Site To Site Number',
    "billToEmail":'Bill To Email',
    "billToFax": 'Bill To Fax',
    "billContact": 'Bill To Contact',
    "shipContact": 'Ship To Contact',
    "billToPhone1": 'Bill To Phone 1',
    "shipToPhone1": 'Ship To Phone 1',
    "billToPhone2": 'Bill To Phone 2',
    "shipToPhone2": 'Ship To Phone 2',
    "phone2": 'Phone 2',
    "address2":'Address 2',
    "address4": 'Address 4',
    "state": 'State',
    "fax":'Fax',
    "orgCode":'ORG Code',
    "site":'Site',
    "emaildomaintype":'Email Domain Type',
    "emailId":'Email IDs',
    "csrPrimary":'CSR Primary Email',
    "csrSecondary":'CSR Secondary Mail',
    "billToCode":'Bill To Code',
    "shipToCode":'Ship To Code',
    "invoiceInstruction":'Invoice Instruction',
    "packaging": 'Packing Instruction',
    "splitShipSetBy":'Split Ship Set By',
    "miscCSRInstruction":'Misc. CSR Instructions',
    "freightTerm":'Freight Terms',
    "deleteAddressMsg":'<b>Are you sure you want to delete the Address?</b>',
    "updateAddressMsg":"Address Updated Successfully",
    "addAddressMsg": "Address Added Successfully",
    "deleteAddMsg": "<b>Address Deleted Succesfully</b>",
    //Advance Search
    "instruction":'Instruction',
    "fileType":'File Type',
    "fileNamePattern":'File Name Pattern',
    "schema":'Schema',
    "mapping":'Mapping',
    "additionalData":'Additional Data',
    "schemaId":'Schema ID',
    "mappingId":'Mapping ID',
    "matchType":'Match Type',
    "emailSubjectMatch":'Email Subject Match',
    "emailMatch":'Email Match',
    "fileMatch":'File Match - Order File',
    "sheet":'Sheet',
    "cell":'Cell',
    "page":'Page',
    "orderMatch":'Order Match',
    "fileMatchAdditional":'File Match - Additional Data File',
    "additionalDataMatch":'Additional Data Match',
    "advancedSearchWindowTitle":'Advanced Search',
    "advSearchText":'Adv. Search',
    "fromDate": 'From Date',
    "toDate": 'To Date',
    "dateFormat":'Y-m-d',
    "undoChangesText":'Undo',
    "fillMandatoryFieldMsg": 'Please fill valid entry in the field marked as <img src="' + errorIcon + '" width="15" height="15">',
    "setDateMsg": '<center><font color=red>From Date must be less than or equal to To Date</font></center>',
    "advSearchTitle": '<font color=#3300FF><b>Advanced Search</b></font>',
    "editFieldEntryMsg": '<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No field is edited,Please edit field</font>',
    "Subject": 'Subject',
    "emailBody": 'Email Body',
    "orderStatus": 'Order Status',
    "partnerDataStructure":'Partner Data Structure',
    "senderEmailID": 'Sender Email ID',
    "orderTrackNo": 'Order track#',
    "orderSource": 'Order Source',
    "submittedBy": 'Submitted By',
    "submittedDate": 'Submitted Date',
    "poNumber": 'PO#',
    "CSRName":'CSR Name',
    "processInstanceID":  'Process Instance ID',
    "RBO": 'RBO',
    "Partner":'Partner',
    "Status": 'Status',
    "Error": 'Error',
    //order line and order line detail
    "fiberPercent": 'Fiber Percent',
    "TrackingNo":'Tracking #',
    "sentToOracleDate":'Sent To Oracle Date',
    "lastModifiedBy": 'Last Modified By',
    "lastModifiedDate":'Last Modified Date',
    "variableDataValue": 'Variable Data Value',
    "variableFieldName": 'Variable Field Name',
    "typeSetter": 'Typesetter',
    "SKUNo": 'SKUno',
    "productLineType":'Product Line Type',
    "custPONumber":'Customer PO Number',
    "PONumber": 'PO#',
    "processedDate":'Processed Date',
    "orderTrackNo":'Order track#',
    "prvOrderTrackNo": 'Prv Order track#',
    "orderedDate": 'OrderedDate',
    "partnerCustName":'Partner Customer Name',
    "soldToRboNumber": 'SOLD TO RBO Number',
    "oracleItemNo": 'Oracle Item Number',
    "custItemNo": 'Customer Item Number',
    "contractNo": 'Contract Number',
    "styleNo": 'Style No',
    "Level": 'Level',
    "custSeason": 'Customer Season',
    "systemStatus":'System Status',
    "acknowledgeDate":'Acknowledgement Date',
    "custOrderedQty": 'Customer Ordered Qty',
    "qtyVariableLabel": 'qty',
    "sizeVariableLabel": 'size',
    "duplicateMappingLabel": 'DUPLICATE MAPPING',
    "weFacedError": 'We faced an error while trying to ',
    "savedSuccessfully":' saved successfully.',
    "fixAndResubmitWebOredr" :'Fix & Resubmit Web Order',
    "newWebOrder":'New Web Order',
    "Save":'Save',
    "Cancel": 'Cancel',
    "updateOrdLineMsg": 'Order line successfully updated',
    "updateOrdLineDetailMsg": 'Order line Detail successfully updated',
    "validateErrorMsg":'An error occured during validation process. Please contact your system Administartor for further information.',
    "updateSalesOrderMsg": 'Sales Order successfully updated',
    "submitOrderMsg": 'Order submission successful',
    "selectValueDrpMsg": 'Please select a value from the drop down before drop down.',
    "nameFieldReqd": 'Name field is required',
    "orderValidation":'Order was successfully validated',
    "orderProcessMsg":'Order processed successfully',
    "orderLineMandatoryValidationFieldMissingAlt":'One of the mandatory validation has failed. Please resolve it before proceeding.',
    "validateFieldFailedConfirmatonMsg":'Some of the validations has failed. Are you sure you want to continue?',
    "changeOrderLineStatusAlert":'One/some of the lines is/are not allow to proceed, please cancel or fix the error before submitting',
    "InvalidComboValueAlert":'One or more value are not valid.Please correct the values before proceeding',
    //Archive Manage
    "archiveManage": '<div style="color:"><b>Archive-Manage</b></div>',
    "chooseTable": 'Choose Table',
    "selectTableMsg": '<center><font size=2>No data to display,Please Select Table</font></center>',
    "emptyDataMsg":'<div align=center> No data to display.</div>',
    "noContentTypeDispMsg": '<div align=center> No content type(s) to display.</div>',
    //Bulk Update
    "roundQty": 'Round Qty',
    "MOQDiffQty":'MOQDiff Qty',
    "updateQty": 'Update Qty',
    "waiveMOQ":'Waive MOQ',
    "custItemNo":'Customer Item#',
    "custName":'Customer Name',
    "vendorName":'Vendor Name',
    "Bulk": 'Bulk',
    "shipToCustomer": 'Ship To Customer',
    "shipToAddress1":'Ship To Address 1',
    "shipToAddress2":'Ship To Address 2',
    "shipToAddress3":'Ship To Address 3',
    "shipToCity":'Ship To City',
    "shipToCountry":'Ship To Country',
    "shipToState":'Ship To State',
    "shipToZip":'Ship To Zip',
    "shipToEmail": 'Ship To Email',
    "shipToFax":'Ship To Fax',
    "shipToTelephone":'Ship To Telephone',
    "billToCustomer":'Bill To Customer',
    "billToAddress1": 'Bill To Address 1',
    "billToAddress2": 'Bill To Address 2',
    "billToAddress3":'Bill To Address 3',
    "billToCity":'Bill To City',
    "billToCountry":'Bill To Country',
    "billToState":'Bill To State',
    "billToZip":'Bill To Zip',
    "billToTelephone":'Bill To Telephone',
    "specialInstruction":'Special Instruction',
    "orderReceivedDate": 'Order Received Date',
    "retailerPO_CustomerJob": 'Retailer PO/Customer Job',
    "itemDescription": 'ITEM Desc\Size Page',
    "customerColorCode": 'Customer Color Code',
    "customerColorDescription": 'Customer Color Description',
    "customerSize":'Customer Size',
    "requestedDeliveryDate": 'Requested Delivery Date',
    "promiseDate":'Promise Date',
    "packingInstruction":'Packing Instruction',
    "invoiceLineInstruction": 'Invoice line Instruction',
    "divisionforInterfaceERPORG":'Division For Interface ERPORG',
    "artworkHold": 'Artwork Hold',
    "artworkForReference":'Artwork For Reference',
    "variableDataBreakdown":'Variable Data Breakdown',
    "manufacturingNotes": 'Manufacturing Notes',
    "orderType":'Order Type',
    "orderBy":'Order By',
    "endCust":'End Customer',
    "shippingOnlyNotes":'Shipping Only Notes',
    "bankCharge": 'Bank Charge',
    "freightCharge": 'Freight Charge',
    "shippingHold":'Shipping Hold',
    "productionHold":'Production Hold',
    "splitShipset":'Split Shipset',
    "agreement": 'Agreement',
    "modelSerialNumber":'Model Serial #',
    "apoType":'APO Type',
    "sentToOracleDate":'Sent To Oracle Date',
    "comment":'Comment',
    "bulkUpdateButtonText":'<b>Bulk Update</b>',
    "oracleBilltoSiteNumber": 'Oracle Bill To Site #',
    "oracleShiptoSiteNumber":'Oracle Ship To Site #',
    "itemDesc":'Item Description',
    "backText": 'Back',
    "orderdedQty": 'Orderded Qty',
    "dateOrdered":'Date Ordered',
    "requestDate":'Request Date',
    "CSR":'CSR',
    "billToTEL":'Bill To Tel',
    "shipTOTEL": 'Ship To Tel',
    "artworkWorkAttachment":'Artwork Work Attachment',
    "shippingOnlyNotes":'Shipping Only Note',
    "fiberContentPercent":'Fiber Content Percentage',
    "confirmBulkUpdateSave":'Are you Sure you want to make/save these changes?',
    "noRecordsToUpdateMessage":'There are no record(s) to update',
    //Orderqueue
    "lastmodifiedby":'Last Modified By',
    "lastmodifieddate":'Last Modified Date',
    
    //Sales Order
    "oracleExportID": 'OracleExportID',
    "Division":'Division',
    "orderSource":'OrderSource',
    "systemUniqueID":'SystemUniqueID',
    "systemUniqueIDLineNo":'SystemUniqueIDLineNo',
    "SOLDTORBONumber":'SOLDTORBONumber',
    "contractNumber":'ContractNumber',
    "Style":'Style',
    "orderedQty":'OrderdedQty',
    "dateOrdered":'DateOrdered',
    "custRequestDate":'Customer Request Date',
    "createSalesOrderBtnText":'<b>Create Sales Order</b>',
    "qtyVariableLabel":'QTY',
    "cancelText":'<b>cancel</b>',
    "ResetText":'Reset',
    "averyItemNotFoundText":'NOT FOUND',
    "cellColor":'background-color:#FFC7B0;',
    "updatedCustomerQtyMsg": 'Customer Qty. Updated Succesfully',
    "updateCustQtyMsg": '<b>Are you sure,you want to update the MOQ Customer Qty</b>',
    "cancelChangesMsg": 'Are you sure you want to cancel the changes?',
    "viewSalesOrderBtnText": '<b>View Sales Order</b>',
    "cancelSalesOrderText":'<b>Cancel Sales Order</b>',
    "salesOrdersumbitText": '<b>Submit Sales Order</b>',
    "cancelOrderText" :'<b>Are you sure you want to cancel the Order? If yes, please enter the reason for futher reference:</b> ',
    "cancelEmailText" :'<b>Are you sure you want to cancel the Email? If yes, please enter the reason for futher reference:</b> ',
    "disregardEmailText":'<b>Are you sure you want to disregard the Email? If yes, please enter the reason for futher reference:</b> ',
    "salesOrderCreationMsg":'Sales Order was successfully created',
    "orderCancelSuccessAlert":'Order cancelled successfully',
    "emailMovedToTaskManagerSuccessAlert":'Email moved to Task Manager successfully',
    "success":"Success",
    "emailDisregardSuccessAlert":'Email disregarded successfully',
    "orderLineMandatoryFieldMissingAlt":'One of the mandatory fields is empty. Please ensure that all mandatory fields are filled before proceeding.',
    //Partner
    "partnerARID":'Partner ARID',
    "partnerID": 'Partner ID',
    "partnerName": 'Partner Name',
    "contactPerson":'Contact Person',
    "contPersonReq": 'Contact Person is required',
    "phoneReqMsg": 'Phone is required(should contains - and digits)',
    "Phone":'Phone',
    "isActive":'isActive',
    "partnerNameExistsMsg": "Confirm",
    "partnerNameReq":'Partner Name is required',
    "addReq": 'Address is required',
    "prodLineReq":'Product Line is required',
    "CSRReq":'CSR is required',
    "emailSubReq":'Email Subject is required',
    "orderSchemaType":'Order Schema Type',
    "orderSchemaId":'Order SchemaID',
    "orderMappingID":'Order MappingID',
    "preProcessPID":'Pre Process PID',
    "addDataReq": 'Additional Data Required',
    "updatePartnerMsg":'Partner Updated Successfully',
    "viewmailSaveMsg":'Changes saved Successfully',
    "addPartnerMsg":'Partner Added Successfully',
    "addPartner":'<font size=3><b>Add Partner</b></font>',
    "editPartner":'<font size=3><b>Edit Partner</b></font>',
    "deletePartnerMsg": '<b>Are you sure,you want to delete this partner</b>',
    "delPartnerMsg":'Partner Deleted Succesfully',
    "partExistMsg":'An entry already exists for given Partner Name.',
    "editPartnerMsg": '<b>This partner is Active. To edit a partner , it must be InActive.</b>',
    "deletePartner":'This Partner has a reference in productline or orderqueue or address so it can not be deleted',
    //Product Line
    "partner_RBOProductLineID":'Partner_RBOProductLineID',
    "RBOID": 'RBOID',
    'RBOName': 'RBOName',
    "productLineType": 'ProductLineType',
    "CSREmail": 'CSREmail',
    "orderEmailDomain": 'OrderEmailDomain',
    "packagingInstruction": 'PackingInstruction',
    "invoiceLineInstruction": 'InvoiceLineInstruction',
    "variableDataBreakDown": 'VariableDataBreakdown',
    "manufacturingNotes": 'ManufacturingNotes',
    "shippingOnlyNotes": 'ShippingOnlyNotes',
    "updateProdLineMsg":'Product Line Updated Successfully',
    "addProdLineMsg":'Product Line Added Successfully',
    "entryExistMsg":'<font size=2 color=red> An entry already exists for given Product Line and RBO Name.</font>',
    "addPartProdLine":'<font size=3><b>Add Partner Product Line</b></font>',
    "editPartProdLine":'<font size=3><b>Edit Partner Product Line</b></font>',
    "delPartProdLine":'<b>Are you sure,you want to delete this product line</b>',
    "deleteProdLineMsg":'Product Line Deleted Succesfully',
     //Password
    "loginUserName":'aoc_devuser',
    "loginPassword":'p@ssw0rd',
    "newPasswordFailureMsg":'New Password should be different from Current Password',
    "passwordsNotMatch": 'New Password and Confirm Password do not match',
    "currentPassword": 'Current Password',
    "newPassword": 'New Password',
    "confirmPassword": 'Confirm Password',
    "incorrectPasswordMsg": 'Current password is incorrect',
    "changedPassword": 'Change Password',
    "password" : 'Password',
    "confirmPassword":'Confirm Password',
    //Web Form
    "webSubmissionSuccesFulMsg":'The form was successfully submitted. Please go to Order Queue to see your order.',	
    "uploadOnlyExcelFileAlert":'Please attach only xls or xlxs type of files',
    "uploadOnlyPdfFileAlert":'Please attach only pdf type of files',
    "onProductLineChangeAlert":'Please delete the attachment before changing the productline',
    "noRBOconfigMsg":'No RBO configured for the selected Parter. Please select a differet partner to proceed further',
    
    //Status Code
    //EmailQueue
    "emailMailReceived":'1',
    "identifyingMail":'2',
    "emailUnidentifiedStatus":'3',
    "unrecognizedEmailStatus":'4',
    "emailIdentifiedStatus":"5",
    "emailAttachmentInfoGridUnIdentifiedStatus":"6",
    "emailAttachmentInfoGridDisregardStatus":"7",
    "emailAttachmentInfoGridIdentifiedStatus":"8",
    "orderEmailProcessing":'9',
    "orderEmailProcessed":'10',
    //Adding codes according to new StatusCode so commenting older codes
    //"orderReceivedStatus":'1',
    //"orderError":'2',
    //"orderPreProcessedStatus":'3',
    "SO_GeneratedStatusOrderLine":'21',
    //"salesOrderCreatedStatus":'5',
    "submitToOracleStatus=salesOrderGeneratedStatus":'6',
    //"salesOrderSubmittedStatus":'7',
    //"noAdditionDataStatus":'10',
    "submissionProcessRunningStatus":'11',
    "exportingProcessRunningStatus":'12',
    "errorInPreProcessing":'13',
    "processingOrder":'14',
    "AveryItemNumMis":'15',
    "orderRead":'16',
    "emailRead":'17',
    "disregardStatus":'18',
    "booked":'99',
    "oracleError":'98',
    "waitingForCSRStatusOrderQueue":'19',
    "waitingForCSRStatusOrderLine":'20',
    
    
    "fiberLevel":'FIBRE',
    "identifiedStatus":'5',
    "centerStyleDiv":'<div align="center"><b><font color=#006FDD>',
    "mandatoryValidationCellColor":'background-color:yellow',

    
    //added alert messages(AK)
    'selectAttachmentFileMsg':'Please select atleast one file to proceed.',
    'warningTitle':'Warning',
    'pleaseWaitTitle':'Please wait...',
    'taskMangerContextType':'task_manager'
});
