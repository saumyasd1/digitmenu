Ext.define('AOC.view.orderqueue.BulkUpdateSalesOrderGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkupdatesalesordergrid',
    itemId:'BulkUpdateSalesOrderGrid',
    controller:'salesorder',
    requires:['AOC.util.Helper'],
	emptyText: AOCLit.noContentTypeDispMsg,
	runTime : AOC.config.Runtime,
    initComponent : function(){
	var me=this;
	this.fieldArray = [];
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			dockedItems : this.buildDockedItems(),
			layout:'fit',
			selModel: {
			       type: 'spreadsheet'
			    },
			    plugins: {
			        ptype: 'cellediting',
			        clicksToEdit: 1
			        
			    },
			    listeners:{
			    	 helper:AOC.util.Helper,
			    	 'selectionchange':function( grid, selection, eOpts ){
			    		 helper.BulkUpdate( grid, selection, eOpts);
			    	 }
		        }
        });
        this.callParent(arguments);

    },
    buildColumns : function(){
    	var me=this;
        return [
{ text: AOCLit.Division,  dataIndex: 'division',editor:'textfield' },
{ text: AOCLit.orderSource, dataIndex: 'orderSource', editor:'textfield' },
{ text: AOCLit.SOLDTORBONumber, dataIndex: 'soldTORBONumber',editor:'textfield' },
{ text: AOCLit.oracleBilltoSiteNumber, dataIndex: 'oracleBilltoSiteNumber',editor:'textfield' },
{ text: AOCLit.oracleShiptoSiteNumber, dataIndex: 'oracleShiptoSiteNumber',editor:'textfield' },
{ text: AOCLit.shippingMethod, dataIndex: 'shippingMethod',width:170,editor:{
	xtype:'combo',
	 displayField :'variableFieldName',
     valueField :'variableFieldName',
         queryMode :'local',
	 store:Ext.data.StoreManager.lookup('ShippingMethodId')==null?helper.getVariableComboStore('ShippingMethod'):Ext.data.StoreManager.lookup('ShippingMethodId')
}
},
{ text: AOCLit.custPONumber, dataIndex: 'customerPONumber',editor:'textfield' },
{ text: AOCLit.retailerPO_CustomerJob, dataIndex: 'retailerPO_CustomerJob',editor:'textfield' },
{ text: AOCLit.oracleItemNo, dataIndex: 'oracleItemNumber',editor:'textfield' },
{ text: AOCLit.custItemNo, dataIndex: 'customerItemNumber',editor:'textfield' },
{ text: AOCLit.itemDesc, dataIndex: 'itemDescription',editor:'textfield' },
{ text: AOCLit.orderdedQty, dataIndex: 'orderdedQty',editor:'textfield' },
{ text: AOCLit.dateOrdered, dataIndex: 'dateOrdered',editor:'textfield' },
{ text: AOCLit.requestDate, dataIndex: 'ustomerRequestDate',editor:'textfield' },
{ text: AOCLit.promiseDate, dataIndex: 'promiseDate',editor:'textfield' },
{ text: AOCLit.freightTerm, dataIndex: 'freightTerms',editor:'textfield' },
{ text: AOCLit.CSR, dataIndex: 'csr',width:160,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    queryMode :'local',
    store:Ext.data.StoreManager.lookup('CSRId')==null?helper.getVariableComboStore('CSR'):Ext.data.StoreManager.lookup('CSRId')	
	} },
{ text: AOCLit.packingInstruction, dataIndex: 'packinginstruction',editor:'textfield' },
{ text: AOCLit.shippingInstructions, dataIndex: 'shippingInstructions',editor:'textfield' },
{ text: AOCLit.invoiceLineInstruction, dataIndex: 'invoicelineInstruction',editor:'textfield' },
{ text: AOCLit.divisionforInterfaceERPORG, dataIndex: 'divisionforInterfaceERPORG',editor:'textfield' },
{ text: AOCLit.billContact, dataIndex: 'billToContact',editor:'textfield' },
{ text: AOCLit.billToTEL, dataIndex: 'billToTEL',editor:'textfield' },
{ text: AOCLit.billToEmail, dataIndex: 'billToEMAIL',editor:'textfield' },
{ text: AOCLit.shipContact, dataIndex: 'shipTOContact',editor:'textfield' },
{ text: AOCLit.shipTOTEL, dataIndex: 'shipTOTEL',editor:'textfield' },
{ text: AOCLit.shipToFax, dataIndex: 'shipTOFAX',editor:'textfield' },
{ text: AOCLit.shipToEmail, dataIndex: 'shipTOEMAIL',editor:'textfield' },
{ text: AOCLit.artworkHold, dataIndex: 'artworkhold',editor:'checkbox' },
{ text: AOCLit.artworkWorkAttachment, dataIndex: 'artworkworkattachment',editor:'checkbox' },
{ text: AOCLit.variableDataBreakdown, dataIndex: 'variableDataBreakdown',editor:'textfield' },
{ text: AOCLit.manufacturingNotes, dataIndex: 'manufacturingnotes',editor:'textfield' },
{ text: AOCLit.orderType, dataIndex: 'ordertype' ,width:180,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    queryMode :'local',
    store:Ext.data.StoreManager.lookup('OrderTypeId')==null?helper.getVariableComboStore('OrderType'):Ext.data.StoreManager.lookup('OrderTypeId')	
	}  
},
{ text: AOCLit.orderBy, dataIndex: 'orderby',editor:'textfield' },
{ text: AOCLit.endCust, dataIndex: 'endcustomer' ,width:180 ,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    queryMode :'local',
    store:Ext.data.StoreManager.lookup('EndCustomerId')==null?helper.getVariableComboStore('EndCustomer'):Ext.data.StoreManager.lookup('EndCustomerId')	
	}},
{ text: AOCLit.shippingOnlyNotes, dataIndex: 'shippingonlynotes',editor:'textfield' },
{ text: AOCLit.bankCharge, dataIndex: 'bankCharge',editor:'textfield' },
{ text: AOCLit.freightTerm, dataIndex: 'freightTerms',width:160,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    store:Ext.data.StoreManager.lookup('FreightTermsId')==null?helper.getVariableComboStore('FreightTerms'):Ext.data.StoreManager.lookup('FreightTermsId')	
	}  },
{ text: AOCLit.shippingHold, dataIndex: 'shippinghold',editor:'checkbox' },
{ text:AOCLit.productionHold , dataIndex: 'productionhold',editor:'checkbox' },
{ text: AOCLit.splitShipset, dataIndex: 'splitshipset' ,width:180,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    queryMode :'local',
    store:Ext.data.StoreManager.lookup('SplitShipsetId')==null?helper.getVariableComboStore('SplitShipset'):Ext.data.StoreManager.lookup('SplitShipsetId')	
	} },
{ text: AOCLit.agreement, dataIndex: 'agreement',editor:'textfield' },
{ text: AOCLit.modelSerialNumber, dataIndex: 'modelSerialNumber',editor:'textfield' },
{ text: AOCLit.waiveMOQ, dataIndex: 'waiveMOQ',editor:'checkbox' },
{ text: AOCLit.apoType, dataIndex: 'apoType' ,width:180,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    queryMode :'local',
    store:Ext.data.StoreManager.lookup('APOTypeId')==null?helper.getVariableComboStore('APOType'):Ext.data.StoreManager.lookup('APOTypeId')	
	}}
    ];
    },
    tbar: { 
		height: 50,
	    items : 
	    	[
			 {
	              xtype:'button',
				  text:AOCLit.Save,
				  handler:'saveSalesOrder'
	         },
	         {
	              xtype:'button',
				  text:AOCLit.Cancel,
				  handler:'cancelChanges'
	         }
			 ]
},
    buildDockedItems : function(){
    	var me=this;
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            ui : 'darktoolbar',
            itemId:'pagingtoolbarVisitManage',
           store:me.store,
            displayInfo:true,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});