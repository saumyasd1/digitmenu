Ext.define('AOC.view.orderqueue.OrderLineExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderlineexpandablegrid',
    itemId: 'orderlineexpandablegrid',
    requires: ['Ext.grid.Panel', 'AOC.ux.RowExpanderGrid', 'AOC.view.ux.CustomRowEditing', 'AOC.util.Helper'],
    controller: 'orderline',
    emptyText: '<div align=center>No data to display</div>',
    dataPresent:false,
    autoHeight: true,
    nestedGridRefrence:'orderLineDetail',
    columnLines: true,
    reserveScrollbar:true,
    mandatoryFieldMissing:false,
    mandatoryValidationFieldMissing:false,
    showMandatoryValidationField:false,
    validationFieldMissing:false,
    columns: [{
        text: 'ATO Mandatory',
        dataIndex: 'mandatoryVariableDataFieldFlag',
        width: 65,
    	renderer:function(value, metadata,rec){
    		var mandatoryVariableDataFieldFlag=rec.data.mandatoryVariableDataFieldFlag;
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+mandatoryVariableDataFieldFlag+'" src="' + successImageSrc + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus)
					this.mandatoryValidationFieldMissing=true;
				return '<div><img data-qtip=" '+mandatoryVariableDataFieldFlag+'" src="' + warningImageSrc + '" /></div>';
			}
    }
    }, {
        text: 'Bulk Sample',
        dataIndex: 'bulkSampleValidationFlag',
        width: 65,
    	renderer:function(value, metadata,rec){
    		var bulkSampleValidationFlag=rec.data.bulkSampleValidationFlag;
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+bulkSampleValidationFlag+'" src="' + successImageSrc + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus)
					this.mandatoryValidationFieldMissing=true;
				return '<div><img data-qtip=" '+bulkSampleValidationFlag+'" src="' + warningImageSrc + '" /></div>';
			}
    }
    }, {
        text: 'Cust. PO#',
        dataIndex: 'customerPOFlag',
        width: 40,
        renderer:function(value, metadata,rec){
    		var customerPOFlag=rec.data.customerPOFlag;
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+customerPOFlag+'" src="' + successImageSrc + '" /></div>';
			}
			else{
					this.validationFieldMissing=true;
				return '<div><img data-qtip=" '+customerPOFlag+'" src="' + warningImageSrc + '" /></div>';
			}
    }
    }, {
        text: 'Dup. PO',
        dataIndex: 'duplicatePOFlag',
        width: 40,
    	renderer:function(value, metadata,rec){
    		var duplicatePOFlag=rec.data.duplicatePOFlag;
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+duplicatePOFlag+'" src="' + successImageSrc + '" /></div>';
			}
			else{
					this.validationFieldMissing=true;
				return '<div><img data-qtip=" '+duplicatePOFlag+'" src="' + warningImageSrc + '" /></div>';
			}
    }
    }, {
        text: 'Size Page',
        dataIndex: 'htlSizePageValidationFlag',
        width: 40,
    	renderer:function(value, metadata,rec){
    		var htlSizePageValidationFlag=rec.data.htlSizePageValidationFlag;
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+htlSizePageValidationFlag+'" src="' + successImageSrc + '" /></div>';
			}
			else{
					this.validationFieldMissing=true;
				return '<div><img data-qtip=" '+htlSizePageValidationFlag+'" src="' + warningImageSrc + '" /></div>';
			}
    }
    }, {
        text: 'MOQ',
        dataIndex: 'moqValidationFlag',
        width: 50,
        editor: 'textfield',
    	renderer:function(value, metadata,rec){
    		var moqValidationFlag=rec.data.moqValidationFlag;
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+moqValidationFlag+'" src="' + successImageSrc + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus && rec.get('waiveMOQ')=='false')
					this.mandatoryValidationFieldMissing=true;
				return '<div><img data-qtip=" '+moqValidationFlag+'" src="' + warningImageSrc + '" /></div>';
			}
    }
    },{
        text: 'PO #<font color=red>*</font>',
        dataIndex: 'poNumber',
        width: 120,
        editor: 'textfield',
        renderer : function(value, meta,record) {
            if(value=='') {
            	meta.style = cellColor;
            	if(record.get('status')==waitingForCSRStatus){
            		this.mandatoryFieldMissing=true;
            	}
            } else {
            	 return value;
            }
        }
    },
    {
        text: 'Avery Item #<font color=red>*</font>',
        dataIndex: 'averyItemNumber',
        width: 88,
        renderer : function(value, meta,record) {
            if(value=='') {
            	if(record.get('status')==waitingForCSRStatus){
            		this.mandatoryFieldMissing=true;
            		meta.style = cellColor;
            	}
            } else {
            	 return value;
            }
        }
    }, {
        text: 'Customer Item #',
        dataIndex: 'customerItemNumber',
        width: 88
        
    },{
        text: 'Customer Name',
        dataIndex: 'partnerCustomerName',
        width: 126,
        editor: 'textfield'
    }, {
        text: 'Vendor Name',
        dataIndex: 'partnerVendorName',
        width: 111,
        editor: 'textfield'
    }, 
    {
        text: 'ATO Required',
        dataIndex: 'atoValidationFlag',
        width: 65,
       	renderer:function(v){
			if(v=='Y'){
				return '<div><span data-qtip="YES" />'+v+'</span></div>';
			}else 
				return '<div><span data-qtip="No" />'+v+'</span></div>';;
    }
    },
    {
        text: 'Bulk',
        dataIndex: 'bulk',
        width: 60,
        editor:{
        	xtype:'combo',
        	store:[[true,'Y'],[false,'N']]
        },
        renderer:function(value, metadata,rec){
        	var v='N';
        	if(value)
        		v='Y';
    		var bulkSampleValidationFlag=rec.data.bulkSampleValidationFlag;
    		var checkvalue=bulkSampleValidationFlag.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div>'+v+'</div>';
			}
			else{
					if(this.showMandatoryValidationField)
						metadata.style = mandatoryValidationCellColor;
					return '<div>'+v+'</div>';
			}
    }
    },{
        text: 'Ship To Customer',
        dataIndex: 'shipToCustomer',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Ship To Contact',
        dataIndex: 'shipToContact',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Ship To Address 1',
        dataIndex: 'shipToAddress1',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Ship To Address 2',
        dataIndex: 'shipToAddress2',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Ship To Address 3',
        dataIndex: 'shipToAddress3',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Ship To City',
        dataIndex: 'shipToCity',
        width: 112,
        editor: 'textfield'
    }, {
        text: 'Ship To Country',
        dataIndex: 'shipToCountry',
        width: 112,
        editor: 'textfield'
    }, {
        text: 'Ship To State',
        dataIndex: 'shipToState',
        width: 112,
        editor: 'textfield'
    }, {
        text: 'Ship To Zip',
        dataIndex: 'shipToZip',
        width: 85,
        editor: 'textfield'
    }, {
        text: 'Ship To Email',
        dataIndex: 'shipToEmail',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Ship To Fax',
        dataIndex: 'shipToFax',
        width: 130,
        editor: 'textfield'
    }, {
        text: 'Ship To Telephone',
        dataIndex: 'shipToTelephone',
        width: 130,
        editor: 'textfield'
    },{
        text: 'Bill to Site #<font color=red>*</font>',
        dataIndex: 'oracleBilltoSiteNumber',
        width: 100,
        editor: 'textfield',
        renderer : function(value, meta,record) {
            if(value=='') {
            	if(record.get('status')==waitingForCSRStatus){
            		this.mandatoryFieldMissing=true;
            		meta.style = cellColor;
            	}
            } else {
            	 return value;
            }
        }
    }, {
        text: 'Bill To Customer',
        dataIndex: 'billToCustomer',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Bill To Contact',
        xtype:'gridcolumn',
        dataIndex: 'billToContact',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Bill To Address 1',
        dataIndex: 'billToAddress1',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Bill To Address 2',
        dataIndex: 'billToAddress2',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Bill To Address 3',
        dataIndex: 'billToAddress3',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Bill To City',
        dataIndex: 'billToCity',
        width: 112,
        editor: 'textfield'
    }, {
        text: 'Bill To Country',
        dataIndex: 'billToCountry',
        width: 112,
        editor: 'textfield'
    }, {
        text: 'Bill To State',
        dataIndex: 'billToState',
        width: 112,
        editor: 'textfield'
    }, {
        text: 'Bill To Zip',
        dataIndex: 'billToZip',
        width: 85,
        editor: 'textfield'
    }, {
        text: 'Bill To Email',
        dataIndex: 'billToEmail',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Bill To Fax',
        dataIndex: 'billToFax',
        width: 130,
        editor: 'textfield'
    }, {
        text: 'Bill To Telephone',
        dataIndex: 'billToTelephone',
        width: 130,
        editor: {
        	xtype:'textfield',
        	readOnly:true
        },
        setEditor:function(record){
        }
    }, {
        text: 'Special Instruction',
        dataIndex: 'specialInstruction',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Order Received Date',
        dataIndex: 'orderReceivedDate',
        width: 93,
        hidden:true
    }, {
        text: 'Sold To RBO#<font color=red>*</font>',
        dataIndex: 'soldTORBONumber',
        width: 100,
        editor: 'textfield',
        renderer : function(value, meta,record) {
            if(value=='') {
            	if(record.get('status')==waitingForCSRStatus){
            		this.mandatoryFieldMissing=true;
            		meta.style = cellColor;
            	}
            } else {
            	 return value;
            }
        }
    },  {
        text: 'Ship to Site #<font color=red>*</font>',
        dataIndex: 'oracleShiptoSiteNumber',
        width: 100,
        editor: 'textfield',
        renderer : function(value, meta,record) {
            if(value=='') {
            	if(record.get('status')==waitingForCSRStatus){
            		this.mandatoryFieldMissing=true;
            		meta.style = cellColor;
            	}
            } else {
            	 return value;
            }
        }
    }, {
        text: 'Shipping Method',
        dataIndex: 'shippingMethod',
        width: 170,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId')
        }
    }, {
        text: 'Retailer PO/Customer Job',
        dataIndex: 'retailerPO_CustomerJob',
        width: 115,
        editor: 'textfield'
    }, {
        text: 'Item Description',
        dataIndex: 'itemDescription',
        width: 102,
        editor: 'textfield'
    }, {
        text: 'Customer Color Code',
        dataIndex: 'customerColorCode',
        width: 102,
        editor: 'textfield'
    }, {
        text: 'Customer Color Description',
        dataIndex: 'customerColorDescription',
        width: 102,
        editor: 'textfield'
    }, {
        text: 'Customer Size',
        dataIndex: 'customerSize',
        width: 102,
        editor: 'textfield'
    }, {
        text: 'Contract #',
        dataIndex: 'contractNumber',
        width: 130,
        editor: 'textfield'
    }, {
        text: 'Style No',
        dataIndex: 'styleNo',
        width: 111,
        editor: 'textfield'
    }, {
        text: 'Customer Season',
        dataIndex: 'customerSeason',
        width: 93,
        editor: 'textfield'
    }, {
        text: 'Customer Ordered Qty.<font color=red>*</font>',
        dataIndex: 'customerOrderedQty',
        width: 106,
        editor: 'textfield',
        renderer : function(value, meta,record) {
            if(parseInt(value) > 0) {
            	if(this.showMandatoryValidationField){
	            	if(record.get('status')==waitingForCSRStatus && record.get('waiveMOQ')=='false'){
		            	var moqValidationFlag=record.data.moqValidationFlag;
		        		var moqValidationFlag=moqValidationFlag.trim();
		    			if(moqValidationFlag.substr(0,1)=='F'){
		                    meta.style = mandatoryValidationCellColor;
		            	}
	            	}
            	}
               return value;
            } else {
	            		this.mandatoryFieldMissing=true;
	                    meta.style = cellColor;
	                    return value;
            }
        } 
    }, {
        text: 'Ordered Date<font color=red>*</font>',
        dataIndex: 'orderedDate',
        width: 90,
        xtype:'datecolumn',
        format:dateFormat,
        editor: 'datefield',
        renderer : function(value, meta,record) {
            if(value=='' || value == null) {
            	if(record.get('status')==waitingForCSRStatus){
            		this.mandatoryFieldMissing=true;
                    meta.style = cellColor;
            	}
            }
                else
                	return Ext.Date.format(value,'Y-m-d');
        } 
    }, {
        text: 'Requested Devlivery Date',
        dataIndex: 'requestedDevliveryDate',
        width: 102,
        format:dateFormat,
        xtype:'datecolumn',
        editor: 'datefield'
    }, {
        text: 'Promise Date',
        dataIndex: 'promiseDate',
        xtype: 'datecolumn',   
        format:dateFormat,
        width: 88,
        editor:{
            	  xtype:'datefield'
        }
    }, {
        text: 'Freight Terms',
        dataIndex: 'freightTerms',
        width: 130,
        editor: {
                xtype: 'combo',
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId')
            }
    }, {
        text: 'CSR',
        dataIndex: 'csr',
        width: 160,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('CSRId') == null ? AOC.util.Helper.getVariableComboStore('CSR') : Ext.data.StoreManager.lookup('CSRId')
        }
    }, {
        text: 'Packing Instruction',
        dataIndex: 'packingInstruction',
        width: 180,
        editor: 'textfield'
    }, {
        text: 'Shipping Instructions',
        dataIndex: 'shippingInstructions',
        width: 180,
        editor: 'textfield'
    }, {
        text: 'Invoice line Instruction',
        dataIndex: 'invoicelineInstruction',
        width: 119,
        editor: 'textfield'
    }, {
        text: 'Division For Interface ERPORG',
        dataIndex: 'divisionforInterfaceERPORG',
        width: 120,
        editor: 'textfield'
    }, {
        text: 'Artwork Hold',
        dataIndex: 'artworkhold',
        width: 84,
        editor: {
        	xtype:'checkbox',
        	listeners:{
        		'change':function(obj,newValue,oldValue){
        			var record=obj.ownerCt.context.record;
        		  	if(newValue==true)
        		  		record.set('artworkhold',true);
        		  	else
        		  		record.set('artworkhold',false);
        		}
        	}
        },
        renderer: function(value,row) {
        	var record=row.record;
        	var value=record.get('artworkhold');
        	if(value==true)
        		return "<input type='checkbox' checked>";
        	else
        		return "<input type='checkbox'>";
        }
    }, {
        text: 'Artwork Work Attachment',
        dataIndex: 'artworkworkattachment',
        width: 110,
        editor: {
        	xtype:'checkbox',
        	listeners:{
        		'change':function(obj,newValue,oldValue){
        			var record=obj.ownerCt.context.record;
        		  	if(newValue==true)
        		  		record.set('artworkworkattachment',true);
        		  	else
        		  		record.set('artworkworkattachment',false);
        		}
        	}
        },
        renderer: function(value,row) {
        	var record=row.record;
        	var value=record.get('artworkworkattachment');
        	if(value=='true')
        		return "<input type='checkbox' checked>";
        	else
        		return "<input type='checkbox'>";
        }
    }, {
        text: 'Variable Data Breakdown',
        dataIndex: 'variableDataBreakdown',
        width: 110,
        editor: 'textfield'
    }, {
        text: 'Manufacturing Notes',
        dataIndex: 'manufacturingnotes',
        width: 107,
        editor: 'textfield'
    }, {
        text: 'Order Type',
        dataIndex: 'ordertype',
        width: 115,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId')
        }
    }, {
        text: 'Order By',
        dataIndex: 'orderby',
        width: 115,
        editor: 'textfield'
    }, {
        text: 'End Customer',
        dataIndex: 'endcustomer',
        width: 115,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId')
        }
    }, {
        text: 'Shipping Only Notes',
        dataIndex: 'shippingonlynotes',
        width: 150,
        editor: 'textfield'
    }, {
        text: 'Bank Charge',
        dataIndex: 'bankCharge',
        width: 90,
        editor: {
            xtype: 'numberfield',
            maxLength: 8,
            minValue: 0
        }
    }, {
        text: 'Freight Charge',
        dataIndex: 'freightCharge',
        width: 90,
        editor: {
            xtype: 'numberfield',
            maxLength: 8,
            minValue: 0
        }
    }, {
        text: 'Shipping Hold',
        dataIndex: 'shippinghold',
        width: 83,
        editor: {
        	xtype:'checkbox',
        	listeners:{
        		'change':function(obj,newValue,oldValue){
        			var record=obj.ownerCt.context.record;
        		  	if(newValue==true)
        		  		record.set('shippinghold',true);
        		  	else
        		  		record.set('shippinghold',false);
        		}
        	}
        },
        renderer: function(value,row) {
        	var record=row.record;
        	var value=record.get('shippinghold');
        	if(value==true)
        		return "<input type='checkbox' checked>";
        	else
        		return "<input type='checkbox'>";
        }
    }, {
        text: 'Production Hold',
        dataIndex: 'productionhold',
        width: 77,
        editor: {
        	xtype:'checkbox',
        	listeners:{
        		'change':function(obj,newValue,oldValue){
        			var record=obj.ownerCt.context.record;
        		  	if(newValue==true)
        		  		record.set('productionhold',true);
        		  	else
        		  		record.set('productionhold',false);
        		}
        	}
        },
        renderer: function(value,row) {
        	var record=row.record;
        	var value=record.get('productionhold');
        	if(value==true)
        		return "<input type='checkbox' checked>";
        	else
        		return "<input type='checkbox'>";
        }
    }, {
        text: 'Split Shipset',
        dataIndex: 'splitshipset',
        width: 81,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId')
        }
    }, {
        text: 'Agreement',
        dataIndex: 'agreement',
        width: 102,
        editor: 'textfield'
    }, {
        text: 'Model Serial #',
        dataIndex: 'modelSerialNumber',
        width: 180,
        editor: 'textfield'
    }, {
        text: 'Waive MOQ',
        dataIndex: 'waiveMOQ',
        width: 59,
        editor: {
        	xtype:'checkbox',
        	listeners:{
        		'change':function(obj,newValue,oldValue){
        			var record=obj.ownerCt.context.record;
        		  	if(newValue==true)
        		  		record.set('waiveMOQ',true);
        		  	else
        		  		record.set('waiveMOQ',false);
        		}
        	}
        },
        renderer: function(value,row) {
        	var record=row.record;
        	var value=record.get('waiveMOQ');
        	if(value=='true')
        		return "<input type='checkbox' checked>";
        	else{
        		return "<input type='checkbox'>";	
        	}
        }
    }, {
        text: 'APO Type',
        dataIndex: 'apoType',
        width: 47,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('APOTypeId') == null ? AOC.util.Helper.getVariableComboStore('APOType') : Ext.data.StoreManager.lookup('APOTypeId')
        }
    }, {
        text: 'Sent To Oracle Date',
        dataIndex: 'sentToOracleDate',
        width: 100,
        hidden:true,
        editor: 'textfield'
    }, {
        text: 'Status',
        dataIndex: 'status',
        width: 180,
        editor: {
        	xtype:'combo',
        	editable:false,
        	displayField:'value',
			valueField:'code',
        	store:Ext.data.StoreManager.lookup('orderfilequeueid')
        },
		renderer:function(v){
			var store=Ext.data.StoreManager.lookup('orderfilequeueid');
			var statusRecord=store.findRecord( 'code', v);
			if(statusRecord.get('value')!='')
				return statusRecord.get('value');
			else
				return '';
		}
    },
    {
        text: 'Comment',
        dataIndex: 'comment',
        width: 100,
        editor: 'textfield'
    }],
    initComponent: function() {
        var me = this;
        this.fieldArray = [];
        Ext.apply(this, {
            tbar: {
                height: 50,
                items: me.buildtbar()
            },
            plugins: me.getOuterGridPlugin()
        });
        me.store.on('beforeload',function(){
        	me.mandatoryFieldMissing=false;
        	me.mandatoryValidationFieldMissing=false;
        });
        this.callParent(arguments);
    },
    buildtbar: function() {
        var me = this;
        return [{
            icon: BackIcon, //back button functionality added
            text: backText,
            handler: 'backButton'
        }, {
            xtype: 'tbspacer',
            width: 30
        },
        {
        	 xtype:'fieldset',
             columnWidth: 1,
             title: '',
             collapsible: true,
             defaultType: 'textfield',
             defaults: {anchor: '100%'},
             layout: 'anchor',
             items :[{
            	 layout: 'hbox',
                 xtype:"container",
                 items: [ {
	            xtype: 'form',
	            reference: 'form',
	            layout: 'hbox',
	            items: [{
	                xtype: 'radiogroup',
	                reference: 'radioGroup',
	                items: [{
	                    boxLabel: 'Order Line Update',
	                    labelWidth:100,
	                    name: 'rb',
	                    inputValue: '1',
	                    checked: true
                        }, 
                        {
		                    xtype: 'tbspacer',
		                    width: 15
		                },
		                {
		                    boxLabel: 'Variable Order Update',
		                    labelWidth:120,
		                    name: 'rb',
		                    inputValue: '2'
                         }],
			                listeners: {
			                    change: 'radioButtonClick'
			                }
                        },
                            {
				                xtype: 'tbspacer',
				                width: 20
                           },{
			                xtype: 'combo',
			                hidden: true,
			                displayField: 'variableFieldName',
			                valueField: 'variableFieldName',
			                reference: 'variableFieldCombo'
                       }]
			              },{
			                  xtype: 'tbspacer',
			                  width: 20
			              },
			              {
				            xtype: 'button',
				            text: bulkUpdateButtonText,
				            reference:'bulkUpdateButton',
				            handler: 'getUpdateScreen'
	                 }]
                 }]
        },'->',
	        {
            xtype: 'button',
            reference:'validateButton',
            text: '<b>Validate</b>',
            handler: 'validateOrderLine'
        },{
            xtype: 'button',
            reference:'cancelOrderButton',
            text: '<b>Cancel Order</b>',
            handler: 'cancelOrder'
        },{
            xtype: 'button',
            reference: 'salesOrderbutton',
            text: salesOrdersumbitText,
            handler: 'submitSalesOrder'
        },{
            xtype: 'button',
            reference: 'salesViewOrderbutton',
            text: viewSalesOrderBtnText,
            handler: 'viewSalesOrder',
            disabled:true
        }];
    },
    getRowExpander:function(){
    	var me=this,rowExpander=new AOC.ux.RowExpanderGrid({
    		 createComponent: function(view,record,htmlnode,index) {
    			 var data=record.get('orderLineDetail');
    			 var store = Ext.create('AOC.store.VariableHeaderStore', {
    	    		    autoLoad: true,
    	    		    modal: 'AOC.model.VariableHeaderModel',
    	    		    data : data,
    	    		    proxy: {
    	    		        type: 'memory'
    	    		    }
    	    		});
    		      return Ext.create('Ext.grid.Panel',{
    		    	  nestedGridRefrence: 'orderLineDetail',
    		          modal: 'AOC.model.VariableHeaderModel',
    		          cls: 'nestedGrid',
    		          store:store,
    		          columns: [{
    		              xtype: 'rownumberer'
    		          }, {
    		              text: 'Level',
    		              dataIndex: 'level',
    		              width: 100
    		          }, {
    		              text: "SKU #",
    		              dataIndex: 'skuno',
    		              width: 100
    		          }, {
    		              text: "TypeSetterCode",
    		              dataIndex: 'typesetter',
    		              width: 130
    		          }, {
    		              text: "Variable Field Name",
    		              dataIndex: 'variablefieldname',
    		              width: 140
    		          }, {
    		              text: "Variable Field Value",
    		              dataIndex: 'variabledatavalue',
    		              width: 140,
    		              editor: 'textfield',
    		              renderer:function(v, metadata,rec){
    		          		var mandatory=rec.get('mandatory');
    		      			if(mandatory=='Y'){
    		      				if(v==''){
    		      					if(me.showMandatoryValidationField)
    		      						metadata.style = mandatoryValidationCellColor;
    		      				}
    		      				return '<div>'+v+'</div>';
    		      			}
    		      			else{
    		      					return '<div>'+v+'</div>';
    		      			}
    		          }
    		          }, {
    		              text: "Fiber Content Percentage",
    		              dataIndex: 'fiberPercent',
    		              xtype:'gridcolumn',
    		              width: 155,
    		              editor: {
    		            	  xtype:'textfield',
    		            	  disabled:true
    		              }
    		          }],
    		          columnLines: false,
    		          border: true,
    		          plugins: me.getInnerGridPlugin(),
    		          width: 793,
    		          autoHeight: true,
    		          frame: false,
    		          header: false
    		      }) ;
    		    }
    	});
    	
    	return rowExpander;
    },
    getInnerGridPlugin:function(){
    	var grid=this;
    	var orderQueueStatus=AOC.config.Runtime.getOrderQueueStatus();
    	if(orderQueueStatus==waitingForCSRStatus){
    		var rowEditor=Ext.create('AOC.view.ux.CustomRowEditing',{
    			clicksToEdit: 1,
                saveAndNextBtn: true,
                listeners:{
                edit:function(editor, context, eOpts){
                	var ctx = context,me=this,
                    idx = ctx.rowIdx,
                    currentRecord = ctx.store.getAt(idx);
                	var obj=currentRecord.getChanges( ) ;
                	obj.id=currentRecord.id;
                	var runTime = AOC.config.Runtime;
            		var obj='{"data":'+Ext.encode(Ext.encode(obj))+',"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
                	Ext.Ajax.request({
                		method:'PUT',
            	        jsonData:obj,
                		   url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
            		        success : function(response, opts) {
            			  		Ext.Msg.alert('','Order line Detail successfully updated');
            			  		Ext.getBody().unmask();
            			  		grid.store.load();
            		        },
            		        failure: function(response, opts) {
            		        	Ext.getBody().unmask();
            	          }
                		  });
                }
                },
                'beforeEdit':function(editor,context){
            		var flag=grid.getController().innerGridBeforeEditEvent(editor,context);
            		return flag;
            	},
                bulKUpdate: function(editor, context) {
                    this.suspendEvent('edit');
                    this.completeEdit();
                    this.resumeEvent('edit');
                    var me = this;
                    var ctx = this.context,
                        idx = ctx.rowIdx,
                        currentRecord = ctx.store.getAt(idx);
                    var obj = currentRecord.getChanges();
                    var runTime = AOC.config.Runtime;
                    var obj = '{"data":' + Ext.encode(Ext.encode(obj)) + ',"orderQueueId":"' + runTime.getOrderQueueId() + '"}';
                    Ext.Ajax.request({
                        method: 'PUT',
                        jsonData: obj,
                        url: applicationContext + '/rest/orderlinedetails/variablebulkupdate/'+currentRecord.get('variablefieldname'),
                        success: function(response, opts) {
                            Ext.Msg.alert('', 'Order line Detail successfully updated');
                            Ext.getBody().unmask();
                            grid.store.load();
                        },
                        failure: function(response, opts) {
                            Ext.getBody().unmask();
                        }
                    });

                }
    		});
    		return [rowEditor];
    	}else
    		return [];
    },
    getOuterGridPlugin:function(){
    	var me=this,orderQueueStatus=AOC.config.Runtime.getOrderQueueStatus();
    	if(orderQueueStatus==waitingForCSRStatus){
    		return [me.getRowExpander(),me.getOuterGridRowEditor()];
    	}else
    		return [me.getRowExpander()];
    },
    getOuterGridRowEditor:function(){
    		var rowEditor=Ext.create('AOC.view.ux.CustomRowEditing',{
    			clicksToEdit: 2,
                autoCancel:false,
                controller: 'orderline',
                saveAndNextBtn: true,
                controller: 'orderline',
                listeners: {
                    'edit': 'updateOrderLine',
                    'beforeEdit':'outerGridBeforeEditEvent'
                },
                bulKUpdate: function(editor,context){
                	this.getCmp().getController().outerGridBulkUpdate(this,editor,context);
                }
    		});
    		return rowEditor;
    	}
});