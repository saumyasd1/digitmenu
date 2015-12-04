Ext.define('AOC.view.orderqueue.BulkUpdateSalesOrderGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkupdatesalesordergrid',
    itemId:'BulkUpdateSalesOrderGrid',
    controller:'salesorder',
    requires:['AOC.util.Helper'],
	emptyText:'<div align=center> No content type(s) to display.</div>',
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
{ text: 'Division',  dataIndex: 'division',editor:'textfield' },
{ text: 'OrderSource', dataIndex: 'orderSource', editor:'textfield' },
{ text: 'SOLD TO RBO #', dataIndex: 'soldTORBONumber',editor:'textfield' },
{ text: 'Oracle Bill To Site #', dataIndex: 'oracleBilltoSiteNumber',editor:'textfield' },
{ text: 'Oracle Ship To Site #', dataIndex: 'oracleShiptoSiteNumber',editor:'textfield' },
{ text: 'Shipping Method', dataIndex: 'shippingMethod',width:170,editor:{
	xtype:'combo',
	 displayField :'variableFieldName',
     valueField :'variableFieldName',
	 store:Ext.data.StoreManager.lookup('ShippingMethodId')==null?helper.getVariableComboStore('ShippingMethod'):Ext.data.StoreManager.lookup('ShippingMethodId')
}
},
{ text: 'Customer PO #', dataIndex: 'customerPONumber',editor:'textfield' },
{ text: 'Retailer PoCustomer job', dataIndex: 'retailerPO_CustomerJob',editor:'textfield' },
{ text: 'Oracle Item #', dataIndex: 'oracleItemNumber',editor:'textfield' },
{ text: 'Customer Item #', dataIndex: 'customerItemNumber',editor:'textfield' },
{ text: 'Item Description', dataIndex: 'itemDescription',editor:'textfield' },
{ text: 'Orderded Qty', dataIndex: 'orderdedQty',editor:'textfield' },
{ text: 'Date Ordered', dataIndex: 'dateOrdered',editor:'textfield' },
{ text: 'Request Date', dataIndex: 'ustomerRequestDate',editor:'textfield' },
{ text: 'promise Date', dataIndex: 'promiseDate',editor:'textfield' },
{ text: 'Freight Term', dataIndex: 'freightTerms',editor:'textfield' },
{ text: 'CSR', dataIndex: 'csr',width:160,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    store:Ext.data.StoreManager.lookup('CSRId')==null?helper.getVariableComboStore('CSR'):Ext.data.StoreManager.lookup('CSRId')	
	} },
{ text: 'Packing Instruction', dataIndex: 'packinginstruction',editor:'textfield' },
{ text: 'Shipping Instruction', dataIndex: 'shippingInstructions',editor:'textfield' },
{ text: 'Invoice Line Instruction', dataIndex: 'invoicelineInstruction',editor:'textfield' },
{ text: 'Division For Interface ERP ORG', dataIndex: 'divisionforInterfaceERPORG',editor:'textfield' },
{ text: 'Bill To Contact', dataIndex: 'billToContact',editor:'textfield' },
{ text: 'Bill To Tel', dataIndex: 'billToTEL',editor:'textfield' },
{ text: 'Bill To EMAIL', dataIndex: 'billToEMAIL',editor:'textfield' },
{ text: 'Ship To Contact', dataIndex: 'shipTOContact',editor:'textfield' },
{ text: 'Ship To Tel', dataIndex: 'shipTOTEL',editor:'textfield' },
{ text: 'Ship To FAX', dataIndex: 'shipTOFAX',editor:'textfield' },
{ text: 'Ship To EMAIL', dataIndex: 'shipTOEMAIL',editor:'textfield' },
{ text: 'Artwork Hold', dataIndex: 'artworkhold',editor:'checkbox' },
{ text: 'Artwork Work Attachment', dataIndex: 'artworkworkattachment',editor:'checkbox' },
{ text: 'Variable Data Breakdown', dataIndex: 'variableDataBreakdown',editor:'textfield' },
{ text: 'Manu. Note', dataIndex: 'manufacturingnotes',editor:'textfield' },
{ text: 'Order Type', dataIndex: 'ordertype' ,width:180,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    store:Ext.data.StoreManager.lookup('OrderTypeId')==null?helper.getVariableComboStore('OrderType'):Ext.data.StoreManager.lookup('OrderTypeId')	
	}  
},
{ text: 'Order By', dataIndex: 'orderby',editor:'textfield' },
{ text: 'End Customer', dataIndex: 'endcustomer' ,width:180 ,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    store:Ext.data.StoreManager.lookup('EndCustomerId')==null?helper.getVariableComboStore('EndCustomer'):Ext.data.StoreManager.lookup('EndCustomerId')	
	}},
{ text: 'Shipping Only Note', dataIndex: 'shippingonlynotes',editor:'textfield' },
{ text: 'Bank Charge', dataIndex: 'bankCharge',editor:'textfield' },
{ text: 'Freight Terms', dataIndex: 'freightTerms',width:160,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    store:Ext.data.StoreManager.lookup('FreightTermsId')==null?helper.getVariableComboStore('FreightTerms'):Ext.data.StoreManager.lookup('FreightTermsId')	
	}  },
{ text: 'Shipping Hold', dataIndex: 'shippinghold',editor:'checkbox' },
{ text: 'Production Hold', dataIndex: 'productionhold',editor:'checkbox' },
{ text: 'Split Shipset', dataIndex: 'splitshipset' ,width:180,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
    store:Ext.data.StoreManager.lookup('SplitShipsetId')==null?helper.getVariableComboStore('SplitShipset'):Ext.data.StoreManager.lookup('SplitShipsetId')	
	} },
{ text: 'Agreement', dataIndex: 'agreement',editor:'textfield' },
{ text: 'Model serial #', dataIndex: 'modelSerialNumber',editor:'textfield' },
{ text: 'Waive MOQ', dataIndex: 'waiveMOQ',editor:'checkbox' },
{ text: 'APO Type', dataIndex: 'apoType' ,width:180,editor:{
	xtype:'combo',
	 	displayField :'variableFieldName',
    valueField :'variableFieldName',
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
				  text:'Save',
				  handler:'saveSalesOrder'
	         },
	         {
	              xtype:'button',
				  text:'Cancel',
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