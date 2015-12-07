Ext.define('AOC.view.orderqueue.OrderLineExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderlineexpandablegrid',
    itemId: 'orderlineexpandablegrid',
    requires: ['Ext.grid.Panel', 'AOC.ux.RowExpanderGrid', 'AOC.view.ux.CustomRowEditing', 'AOC.util.Helper'],
    controller: 'orderline',
    emptyText: '<div align=center>No data to display</div>',
    dataPresent:false,
    autoHeight: true,
    columnLines: true,
    columns: [{
        text: 'Customer PO #',
        dataIndex: 'customerPONumber',
        width: 250,
        editor: 'textfield'
    }, {
        text: 'Partner Customer Name',
        dataIndex: 'partnerCustomerName',
        width: 126,
        editor: 'textfield'
    }, {
        text: 'Partner Vendor Name',
        dataIndex: 'partnerVendorName',
        width: 111,
        editor: 'textfield'
    }, {
        text: 'Bulk',
        dataIndex: 'bulk',
        width: 50,
        editor: 'textfield'
    }, {
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
        dataIndex: 'shiplToFax',
        width: 130,
        editor: 'textfield'
    }, {
        text: 'Ship To Telephone',
        dataIndex: 'shipToTelephone',
        width: 130,
        editor: 'textfield'
    }, {
        text: 'Bill To Customer',
        dataIndex: 'billToCustomer',
        width: 170,
        editor: 'textfield'
    }, {
        text: 'Bill To Contact',
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
        editor: 'textfield'
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
        text: 'Sold To RBO#',
        dataIndex: 'soldTORBONumber',
        width: 100,
        editor: 'textfield'
    }, {
        text: 'Bill to Site #',
        dataIndex: 'oracleBilltoSiteNumber',
        width: 100,
        editor: 'textfield'
    }, {
        text: 'Ship to Site #',
        dataIndex: 'oracleShiptoSiteNumber',
        width: 100,
        editor: 'textfield'
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
        text: 'Avery Item #',
        dataIndex: 'averyItemNumber',
        width: 88,
        editor: 'textfield'
    }, {
        text: 'Customer Item #',
        dataIndex: 'customerItemNumber',
        width: 88,
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
        text: 'Customer Ordered Qty.',
        dataIndex: 'customerOrderedQty',
        width: 106,
        editor: 'textfield'
    }, {
        text: 'Ordered Date ',
        dataIndex: 'orderedDate',
        width: 90,
        xtype:'datecolumn',
        format:dateFormat,
        editor: 'datefield'
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
        editor: 'textfield'
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
        text: 'Division for Interface ERPORG',
        dataIndex: 'divisionforInterfaceERPORG',
        width: 120,
        editor: 'textfield'
    }, {
        text: 'Artwork hold',
        dataIndex: 'artworkhold',
        width: 84,
        editor: 'checkbox'
    }, {
        text: 'Artwork work attachment',
        dataIndex: 'artworkworkattachment',
        width: 110,
        editor: 'checkbox'
    }, {
        text: 'Variable Data Breakdown',
        dataIndex: 'variableDataBreakdown',
        width: 110,
        editor: 'textfield'
    }, {
        text: 'Manufacturing notes',
        dataIndex: 'manufacturingnotes',
        width: 107,
        editor: 'textfield'
    }, {
        text: 'Order type',
        dataIndex: 'ordertype',
        width: 115,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId')
        }
    }, {
        text: 'Order by',
        dataIndex: 'orderby',
        width: 115,
        editor: 'textfield'
    }, {
        text: 'End customer',
        dataIndex: 'endcustomer',
        width: 115,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId')
        }
    }, {
        text: 'Shipping only notes',
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
        text: 'Shipping hold',
        dataIndex: 'shippinghold',
        width: 83,
        editor: 'checkbox'
    }, {
        text: 'Production hold',
        dataIndex: 'productionhold',
        width: 77,
        editor: 'checkbox'
    }, {
        text: 'Split shipset',
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
        editor: 'checkbox'
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
    }, {
        text: 'ATO Required(Y/N)',
        dataIndex: 'atoValidationFlag',
        width: 79,
        editor: 'textfield'
    }, {
        text: 'ATO Mandatory(S/F)',
        dataIndex: 'mandatoryVariableDataFieldFlag',
        width: 120,
        editor: 'textfield'
    }, {
        text: 'Bulk Sample(S/F)',
        dataIndex: 'bulkSampleValidationFlag',
        width: 89,
        editor: 'textfield'
    }, {
        text: 'Cust.PO#',
        dataIndex: 'customerPOFlag',
        width: 60,
        editor: 'textfield'
    }, {
        text: 'Dup.PO(S/F)',
        dataIndex: 'duplicatePOFlag',
        width: 60,
        editor: 'textfield'
    }, {
        text: 'Size Page(S/F)',
        dataIndex: 'htlSizePageValidationFlag',
        width: 100,
        editor: 'textfield'
    }, {
        text: 'MOQ(S/F)',
        dataIndex: 'moqValidationFlag',
        width: 100,
        editor: 'textfield'
    }],
    plugins: [{
        ptype: 'rowexpandergrid',
        gridConfig: {
            nestedGridRefrence: 'orderLineDetail',
            modal: 'AOC.model.VariableHeaderModel',
            cls: 'nestedGrid',
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
                width: 140
            }, {
                text: "Fiber Content Percentage",
                dataIndex: 'fiberPercent',
                width: 155
            }],
            columnLines: false,
            border: true,
            plugins: ['rowediting'],
            width: 793,
            autoHeight: true,
            frame: false,
            header: false
        }
    }, {
        ptype: 'rowediting',
        clicksToEdit: 1,
        saveAndNextBtn: true,
        controller: 'orderline',
        listeners: {
            'edit': 'updateOrderLine'
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
            var isAddressModified = false;
            var runTime = AOC.config.Runtime;
            if (idx == 0) {
                if (currentRecord.isModified('billToAddress1') || currentRecord.isModified('billToAddress2') || currentRecord.isModified('billToAddress3') ||
                    currentRecord.isModified('billToCity') || currentRecord.isModified('billToState') || currentRecord.isModified('billToZip') ||
                    currentRecord.isModified('billToCountry') || currentRecord.isModified('billToTelephone') || currentRecord.isModified('billToFax') ||
                    currentRecord.isModified('oracleBilltoSiteNumber') || currentRecord.isModified('oracleBilltoSiteNumber'))
                    isAddressModified = true;
            }
            var obj = '{"isAddressModified":' + isAddressModified + ',"data":' + Ext.encode(Ext.encode(obj)) + ',"updateAll":true,"orderQueueId":"' + runTime.getOrderQueueId() + '"}';
            Ext.Ajax.request({
                method: 'PUT',
                jsonData: obj,
                url: applicationContext + '/rest/orderLines/bulkupdate',
                success: function(response, opts) {
                    Ext.Msg.alert('', 'Order line successfully updated');
                    Ext.getBody().unmask();
                    ctx.store.load();
                },
                failure: function(response, opts) {
                    Ext.getBody().unmask();
                }
            });

        }
    }],
    initComponent: function() {
        var me = this;
        this.fieldArray = [];
        Ext.apply(this, {
            tbar: {
                height: 50,
                items: me.buildtbar()
            }
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
        }, {
            xtype: 'form',
            reference: 'form',
            layout: 'hbox',
            items: [{
                xtype: 'radiogroup',
                reference: 'radioGroup',
                items: [{
                    boxLabel: 'Order Line Update',
                    name: 'rb',
                    inputValue: '1',
                    checked: true
                }, {
                    xtype: 'tbspacer',
                    width: 15
                }, {
                    boxLabel: 'Variable Order Update',
                    name: 'rb',
                    inputValue: '2'
                }],
                listeners: {
                    change: 'radioButtonClick'
                }
            }, {
                xtype: 'combo',
                hidden: true,
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                reference: 'variableFieldCombo'
            }, {
                xtype: 'tbspacer',
                width: 30
            }, {
                xtype: 'button',
                text: '<b>Submit</b>',
                handler: 'getUpdateScreen'
            }, {
                xtype: 'tbspacer',
                width: 40
            }, {
                xtype: 'button',
                text: '<b>Validate</b>',
                handler: 'validateOrderLine'
            }, {
                xtype: 'tbspacer',
                width: 40
            }, {
                xtype: 'button',
                reference: 'salesOrderbutton',
                hidden:!me.dataPresent,
                text: AOC.config.Runtime.getSalesOrderCount() == 0 ? createSalesOrderBtnText : viewSalesOrderBtnText,
                handler: 'viewSalesOrder'
            }]
        }];
    }
});