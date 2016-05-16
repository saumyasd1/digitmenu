
Ext.define('AOC.view.orderqueue.OrderLineExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderlineexpandablegrid',
    itemId: 'orderlineexpandablegrid',
    requires: ['Ext.grid.Panel', 'AOC.view.ux.RowExpanderGrid', 'AOC.view.ux.CustomRowEditing', 'AOC.util.Helper','Ext.grid.RowEditor','Ext.grid.plugin.Clipboard'],
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
    invalidComboValid:false,
    showInvalidCombo:false,
    columnLines: false,
    viewConfig    : {
        stripeRows    : true
    },
    columns: [{
        text: 'ATO Mandatory',
        dataIndex: 'mandatoryVariableDataFieldFlag',
        width: 65,
    	renderer:function(value, metadata,rec){
    		var mandatoryVariableDataFieldFlag=rec.data.mandatoryVariableDataFieldFlag;
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+mandatoryVariableDataFieldFlag+'" src="' + AOC.config.Settings.buttonIcons.tick + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus)
					this.mandatoryValidationFieldMissing=true;
				return '<div><img data-qtip=" '+mandatoryVariableDataFieldFlag+'" src="' + AOC.config.Settings.buttonIcons.warning + '" /></div>';
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
				return '<div><img data-qtip=" '+bulkSampleValidationFlag+'" src="' + AOC.config.Settings.buttonIcons.tick + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus)
					this.mandatoryValidationFieldMissing=true;
				return '<div><img data-qtip=" '+bulkSampleValidationFlag+'" src="' + AOC.config.Settings.buttonIcons.warning + '" /></div>';
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
				return '<div><img data-qtip=" '+customerPOFlag+'" src="' + AOC.config.Settings.buttonIcons.tick + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus)
					this.validationFieldMissing=true;
				return '<div><img data-qtip=" '+customerPOFlag+'" src="' + AOC.config.Settings.buttonIcons.warning + '" /></div>';
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
				return '<div><img data-qtip=" '+duplicatePOFlag+'" src="' + AOC.config.Settings.buttonIcons.tick + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus)
					this.validationFieldMissing=true;
				return '<div><img data-qtip=" '+duplicatePOFlag+'" src="' + AOC.config.Settings.buttonIcons.warning + '" /></div>';
			}
    }
    }, {
        text: 'Size Page',
        dataIndex: 'htlSizePageValidationFlag',
        width: 40,
    	renderer:function(value, metadata,rec){
    		var htlSizePageValidationFlag=rec.get('htlSizePageValidationFlag');
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+htlSizePageValidationFlag+'" src="' + AOC.config.Settings.buttonIcons.tick + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus)
					this.mandatoryValidationFieldMissing=true;
				return '<div><img data-qtip=" '+htlSizePageValidationFlag+'" src="' + AOC.config.Settings.buttonIcons.warning + '" /></div>';
			}
    }
    }, {
        text: 'MOQ',
        dataIndex: 'moqValidationFlag',
        width: 50,
    	renderer:function(value, metadata,rec){
    		var moqValidationFlag=rec.data.moqValidationFlag;
    		var checkvalue=value.trim();
			if(checkvalue.substr(0,1)=='S'){
				return '<div><img data-qtip=" '+moqValidationFlag+'" src="' + AOC.config.Settings.buttonIcons.tick + '" /></div>';
			}
			else{
				if(rec.get('status')==waitingForCSRStatus && (rec.get('waiveMOQ')=='false' || rec.get('waiveMOQ')==false))
					this.mandatoryValidationFieldMissing=true;
				return '<div><img data-qtip=" '+moqValidationFlag+'" src="' + AOC.config.Settings.buttonIcons.warning + '" /></div>';
			}
    }
    },
    {
        text: 'Round Qty',
        dataIndex: 'roundQty',
        width: 50,
        editor: 'numberfield'
    },
    {
        text: 'MOQDiff Qty',
        dataIndex: 'moqDiffQty',
        width: 55,
        editor: 'numberfield'
    },
    {
        text: 'Customer Ordered Qty.<font color=red>*</font>',
        dataIndex: 'customerOrderedQty',
        width: 106,
        editor: 'numberfield',
        renderer : function(value, meta,record) {
            if(parseInt(value) > -1) {
            	if(this.showMandatoryValidationField){
	            	if(record.get('status')==waitingForCSRStatus && (record.get('waiveMOQ')=='false' || record.get('waiveMOQ')==false)){
		            	var moqValidationFlag=record.data.moqValidationFlag;
		        		var moqValidationFlag=moqValidationFlag.trim();
		    			if(moqValidationFlag.substr(0,1)=='F'){
		                    meta.style = mandatoryValidationCellColor;
		            	}
	            	}
            	}
               return value;
            } else {	
            	if(record.get('status')==waitingForCSRStatus){
	            	this.mandatoryFieldMissing=true;
	                   meta.style = cellColor;
            }
	                    return value;
            }
        } 
    },
    {
        text: 'Update Qty',
        dataIndex: 'updateMOQ',
        width: 50,
        renderer:function(value, metadata,rec){
        	var checkMOQ=rec.data.moqValidationFlag.trim();
        	var orderQueueStatus=AOC.config.Runtime.getOrderQueueStatus();
        	var allowOrderLineEdit=AOC.config.Runtime.getAllowOrderLineEdit();
       	 if(orderQueueStatus==waitingForCSRStatus && allowOrderLineEdit==true && rec.data.waiveMOQ==false && checkMOQ.substr(0,1)=='F')
       		return '<div><img class="EnableUpdateMoq" src="' + AOC.config.Settings.buttonIcons.EnableUpdateMoqFlag + '" /></div>';
       	 else
       		return '<div><img src="' + AOC.config.Settings.buttonIcons.DisableUpdateMoqFlag + '" /></div>';
       }

    },
    {
        text: 'Waive MOQ',
        dataIndex: 'waiveMOQ',
        width: 59,
        editor:{
        	xtype:'combo',
        	editable:false,
        	store:[[true,'Y'],[false,'N']]
        },
        renderer:function(value, metadata,rec){
        	var v='N';
        	if(value)
        		v='Y';
				return '<div>'+v+'</div>';
    }
    },
    {
        text: 'Status',
        dataIndex: 'status',
        width: 180,
        editor: {
        	xtype:'combo',
        	editable:false,
        	displayField:'value',
			valueField:'code',
			queryMode :'local',
        	store:Ext.data.StoreManager.lookup('orderlineid') == null ? AOC.util.Helper.getCodeStore('orderline') : Ext.data.StoreManager.lookup('orderlineid')
        },
		renderer:function(v){
			return AOC.util.Helper.getSatus(v);
		}
    },{
        text: 'PO #<font color=red>*</font>',
        dataIndex: 'poNumber',
        width: 120,
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
            	if(value==averyItemNotFoundText || value==duplicateMappingLabel)
            		meta.style = cellColor;
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
        	editable:false,
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
            editable:false,
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId')
        },
        renderer:function(v,h,l,k){
        	if(v!=''){
        		var store=h.column.config.editor.store;
            	if(store){
            		var index=store.find("variableFieldName",v);
                	if(index==-1){
                		this.invalidComboValid=true;
                		if(this.showInvalidCombo)
                			h.style = cellColor;
                	}
            	}else{
            		this.invalidComboValid=true;
            		if(this.showInvalidCombo)
            			h.style = cellColor;
            	}
        	}
        	return '<div>'+v+'</div>';
        }
    }, {
        text: 'Retailer PO/Customer Job',
        dataIndex: 'retailerPO_CustomerJob',
        width: 115,
        editor: 'textfield'
    }, {
        text: 'ITEM Desc/Size Page',
        dataIndex: 'itemDescription',
        width: 102,
        editor: 'textfield',
        renderer:function(value, metadata,rec){
    		var htlSizePageValidationFlag=rec.get('htlSizePageValidationFlag').trim();
			if(htlSizePageValidationFlag.substr(0,1)=='S'){
				return '<div>'+value+'</div>';
			}
			else{
					if(this.showMandatoryValidationField)
						metadata.style = mandatoryValidationCellColor;
					return '<div>'+value+'</div>';
			}
    }
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
        width: 72,
        editor: 'textfield',
        renderer:function(value, metadata,rec){
    		var htlSizePageValidationFlag=rec.get('htlSizePageValidationFlag').trim();
			if(htlSizePageValidationFlag.substr(0,1)=='S'){
				return '<div>'+value+'</div>';
			}
			else{
					if(this.showMandatoryValidationField)
						metadata.style = mandatoryValidationCellColor;
					return '<div>'+value+'</div>';
			}
    }
    }, {
        text: 'Contract #<font color="red">*</font>',
        dataIndex: 'contractNumber',
        width: 130,
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
        text: 'Requested Delivery Date',
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
                editable:false,
                queryMode :'local',
                store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId')
            },
            renderer:function(v,h,l,k){
            	if(v!=''){
            		var store=h.column.config.editor.store;
                	if(store){
                		var index=store.find("variableFieldName",v);
                    	if(index==-1){
                    		this.invalidComboValid=true;
                    		if(this.showInvalidCombo)
                    			h.style = cellColor;
                    	}
                	}else{
                		this.invalidComboValid=true;
                		if(this.showInvalidCombo)
                			h.style = cellColor;
                	}
            	}
            	return '<div>'+v+'</div>';
            }
    }, {
        text: 'CSR',
        dataIndex: 'csr',
        width: 160,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            editable:false,
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('CSRId') == null ? AOC.util.Helper.getVariableComboStore('CSR') : Ext.data.StoreManager.lookup('CSRId')
        },
        renderer:function(v,h,l,k){
        	if(v!=''){
        		var store=h.column.config.editor.store;
            	if(store){
            		var index=store.find("variableFieldName",v);
                	if(index==-1){
                		this.invalidComboValid=true;
                		if(this.showInvalidCombo)
                			h.style = cellColor;
                	}
            	}else{
            		this.invalidComboValid=true;
            		if(this.showInvalidCombo)
            			h.style = cellColor;
            	}
        	}
        	return '<div>'+v+'</div>';
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
        editor:{
        	xtype:'combo',
        	editable:false,
        	store:[[true,'Y'],[false,'N']]
        },
        renderer:function(value, metadata,rec){
        	var v='N';
        	if(value)
        		v='Y';
				return '<div>'+v+'</div>';
    }
    }, {
        text: 'Artwork For Reference',//'Artwork Work Attachment',
        dataIndex: 'artworkworkattachment',
        width: 110,
        editor:{
        	xtype:'combo',
        	editable:false,
        	store:[[true,'Y'],[false,'N']]
        },
        renderer:function(value, metadata,rec){
        	var v='N';
        	if(value)
        		v='Y';
				return '<div>'+v+'</div>';
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
            editable:false,
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId')
        },
        renderer:function(v,h,l,k){
        	if(v!=''){
        		var store=h.column.config.editor.store;
            	if(store){
            		var index=store.find("variableFieldName",v);
                	if(index==-1){
                		this.invalidComboValid=true;
                		if(this.showInvalidCombo)
                			h.style = cellColor;
                	}
            	}else{
            		this.invalidComboValid=true;
            		if(this.showInvalidCombo)
            			h.style = cellColor;
            	}
        	}
        	return '<div>'+v+'</div>';
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
            editable:false,
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId')
        },
        renderer:function(v,h,l,k){
        	if(v!=''){
        		var store=h.column.config.editor.store;
            	if(store){
            		var index=store.find("variableFieldName",v);
                	if(index==-1){
                		this.invalidComboValid=true;
                		if(this.showInvalidCombo)
                			h.style = cellColor;
                	}
            	}else{
            		this.invalidComboValid=true;
            		if(this.showInvalidCombo)
            			h.style = cellColor;
            	}
        	}
        	return '<div>'+v+'</div>';
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
        editor:{
        	xtype:'combo',
        	editable:false,
        	store:[[true,'Y'],[false,'N']]
        },
        renderer:function(value, metadata,rec){
        	var v='N';
        	if(value)
        		v='Y';
				return '<div>'+v+'</div>';
    }
    }, {
        text: 'Production Hold',
        dataIndex: 'productionhold',
        width: 77,
        editor:{
        	xtype:'combo',
        	editable:false,
        	store:[[true,'Y'],[false,'N']]
        },
        renderer:function(value, metadata,rec){
        	var v='N';
        	if(value)
        		v='Y';
				return '<div>'+v+'</div>';
    }
    }, {
        text: 'Split Shipset',
        dataIndex: 'splitshipset',
        width: 81,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            editable:false,
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId')
        },
        renderer:function(v,h,l,k){
        	if(v!=''){
        		var store=h.column.config.editor.store;
            	if(store){
            		var index=store.find("variableFieldName",v);
                	if(index==-1){
                		this.invalidComboValid=true;
                		if(this.showInvalidCombo)
                			h.style = cellColor;
                	}
            	}else{
            		this.invalidComboValid=true;
            		if(this.showInvalidCombo)
            			h.style = cellColor;
            	}
        	}
        	return '<div>'+v+'</div>';
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
        text: 'APO Type',
        dataIndex: 'apoType',
        width: 47,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            editable:false,
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('APOTypeId') == null ? AOC.util.Helper.getVariableComboStore('APOType') : Ext.data.StoreManager.lookup('APOTypeId')
        },
        renderer:function(v,h,l,k){
        	if(v!=''){
        		var store=h.column.config.editor.store;
            	if(store){
            		var index=store.find("variableFieldName",v);
                	if(index==-1){
                		this.invalidComboValid=true;
                		if(this.showInvalidCombo)
                			h.style = cellColor;
                	}
            	}else{
            		this.invalidComboValid=true;
            		if(this.showInvalidCombo)
            			h.style = cellColor;
            	}
        	}
        	return '<div>'+v+'</div>';
        }
    }, {
        text: 'Sent To Oracle Date',
        dataIndex: 'sentToOracleDate',
        width: 100,
        hidden:true,
        editor: 'textfield'
    }, 
    {
        text: 'Comment',
        dataIndex: 'comment',
        width: 100,
        editor: 'textfield'
    }
  ],
  editGrid:false,
//    selModel: {
//      type: 'spreadsheet',
//      rowNumbererHeaderWidth:0
//    },
    initComponent: function() {
        var me = this;
        this.fieldArray = [];
        Ext.apply(this, {
//            tbar: {
//                height: 50,
//                margin:'0 0 10 0',
//                items: me.buildtbar()
//            },
	    plugins: me.getOuterGridPlugin(),
            listeners:{
            	scope:this,
            	cellclick:'onCellClickToView',
            	'beforecelldblclick':function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
            	if(cellIndex==0){
            		return false;
            	}
            }
            }
        });
        me.store.on('beforeload',function(){
        	me.mandatoryFieldMissing=false;
        	me.mandatoryValidationFieldMissing=false;
        	me.validationFieldMissing=false;
        	me.invalidComboValid=false;
        });
        this.callParent(arguments);
    },
    getRowExpander:function(){
    	var me=this,rowExpander=new AOC.view.ux.RowExpanderGrid({
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
    		      var sel=(me.editGrid)?'rowmodel':'spreadsheet';
    		      return Ext.create('Ext.grid.Panel',{
    		    	  nestedGridRefrence: 'orderLineDetail',
    		          modal: 'AOC.model.VariableHeaderModel',
    		          cls: 'nestedGrid',
    		          store:store,
			    selModel: {
		        	      type:sel,
		        	      rowNumbererHeaderWidth:0
		        	    },
    		          columns: [{
    		              xtype: 'rownumberer',
    		              text:'#'
    		          }, {
    		              text: 'Level',
    		              dataIndex: 'level',
    		              menuDisabled:true,
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
    		              width: 140,
    		              renderer:function(v, metadata,rec){
      		          		var mandatory=rec.get('mandatory');
      		      			if(mandatory=='Y'){
      		      				return '<div>'+v+'<font size=2 color=red>*</font></div>';
      		      			}
      		      			else{
      		      					return '<div>'+v+'</div>';
      		      			}
      		          }
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
    		          width: 793,
    		          //border: true,
    		          plugins: me.getInnerGridPlugin(),
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
    	if(orderQueueStatus==waitingForCSRStatus && this.editGrid){
    		var rowEditor=Ext.create('AOC.view.ux.CustomRowEditing',{
    			clicksToEdit: 1,
                saveAndNextBtn: true,
                listeners:{
                edit:function(editor, context, eOpts){
                	
                	Ext.getBody().mask('Saving....');
                	var ctx = context,me=this,
                    idx = ctx.rowIdx,
                    currentRecord = ctx.store.getAt(idx);
                	var obj=currentRecord.getChanges( ) ;
                	var luv5=AOC.config.Runtime.setGame(obj);
                	obj.id=currentRecord.id;
                	var luv2 = AOC.config.Runtime.setLuv(obj.id);
                	var fetchArray=AOC.config.Runtime.getFetch();
                fetchArray.push(obj.id);
                	var runTime = AOC.config.Runtime;
                	// var closeRow=AOC.config.Runtime.setCloseRow(currentRecord);
                	 
            		var obj='{"data":'+Ext.encode(Ext.encode(obj))+',"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
                	Ext.Ajax.request({
                		method:'PUT',
            	        jsonData:obj,
                		   url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
            		        success : function(response, opts) {
            		        	AOC.util.Helper.fadeoutMessage('Success','Order line Detail successfully updated');
            			  		//Ext.Msg.alert('','Order line Detail successfully updated');
            			  		Ext.getBody().unmask();
            			  		
            			  		grid.store.load();
            			  		var data = grid.store.getData();
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
                	
                	Ext.getBody().mask('Saving....');
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
                        	AOC.util.Helper.fadeoutMessage('Success','Order line Detail successfully updated');
                            //Ext.Msg.alert('', 'Order line Detail successfully updated');
                            Ext.getBody().unmask();
                            
                         grid.store.load();
                        },
                        failure: function(response, opts) {
                            Ext.getBody().unmask();
                        }
                    });
                     this;
                }
    		});
    		
    		return [rowEditor];
    		
    	}else
    		return [{ptype: 'clipboard'}];
    	getRowExpander();
    },
    getOuterGridPlugin:function(){
    	var me=this,orderQueueStatus=AOC.config.Runtime.getOrderQueueStatus();
    	if(me.editGrid){
    	if(orderQueueStatus==waitingForCSRStatus){
    		return [me.getRowExpander(),me.getOuterGridRowEditor()];
    	}else
    		return [me.getRowExpander(),{ptype: 'clipboard'}];
    	}else{
        		return [me.getRowExpander(),{ptype: 'clipboard'}];
    	}
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
    	},
    	  onCellClickToView:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
    	  var grid=obj;
    	    	 if(e.target.className=='EnableUpdateMoq'){
    	    		 var Id=record.get('id');
    	    		 var runTime = AOC.config.Runtime;
    	    		 var MoqDiffQty=record.get('moqDiffQty');
    	    		 var roundQty=record.get('roundQty');
    	    		 var customerOrderedQty=record.get('customerOrderedQty');
    	    		 customerOrderedQty=parseInt(MoqDiffQty,10)+parseInt(roundQty,10)+parseInt(customerOrderedQty);
    	    		 var value={"customerOrderedQty":customerOrderedQty,"id":Id};
    	    	     var insertBillAddress=false,insertShipAddress=false;
    	    		 var obj='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(Ext.encode(value))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
 	     			   Ext.MessageBox.confirm('Confirm Action', '<b>Are you sure,you want to update the MOQ Customer Qty</b>', function(response) {
 	     				  if (response == 'yes') {
 	     				 	Ext.getBody().mask('Updating....');
 	     						Ext.Ajax.request({
 	     							method:'PUT',
 	     							jsonData:obj,
 	     			    		   url : applicationContext+'/rest/orderLines/bulkupdate',
          				        success : function(response, opts) {
          				        	Ext.getBody().unmask();
          				        	AOC.util.Helper.fadeoutMessage('Success','Customer Qty. Updated Succesfully');
          							//Ext.Msg.alert('Alert Message','<b>Customer Qty. Updated Succesfully</b>');
          						    grid.store.load();
          				        },
          				        failure: function(response, opts) {
          				        	 Ext.getBody().unmask();
          		                }
          		        	});
 	     				  }else if(response == 'no'){
 	     				  return true;
 	     				  }
 	     				  });
    		}
    	    }
});