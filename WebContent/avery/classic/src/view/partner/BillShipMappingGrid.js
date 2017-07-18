Ext.define('AOC.view.partner.BillShipMappingGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.billshipmappinggrid',
    referenceHolder:true,
//    cls:'wi-grid aoc-panel',
	emptyText: AOCLit.emptyDataMsg,
	initComponent : function(){
		var me = this;
		
		Ext.apply(this,{
			columns : this.buildColumns(),
			store:Ext.create('AOC.store.BillShipMappingStore',{storeId:'billShipMappingStoreId'}),
			viewConfig : {
				stripeRows: true,
				enableTextSelection: true,
				forceFit:true
			},
//			tools:[
//		       {
//			        type: 'plus',
//			        tooltip:'Add Row',
//			        listeners:{
//			        	click:'onBillShipAddRowBtnClick'
//			        }
//		       }
//	        ],
//			plugins: [{
//				ptype: 'cellediting',
//				clicksToEdit:1,
//				listeners:{
//		    		 beforeedit:function(e, editor){
//		    		 }
//				}
//			}],
			listeners:{
				//cellclick:'onBillShipGridCellClick'
			}
		});
		this.callParent(arguments);
	},
	buildColumns : function(){
        return [
            {
            	text:'Address/Email subject/PO#/Shipping Mark/Others(Please specify)',
            	dataIndex:'addressEmailSubject',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	sortable:false,
            	width:400
            },
            {
            	text:'Begin with/ends with/contain/equal to',
            	dataIndex:'beginendwith',
				align:'left',
            	cellWrap:true,
            	sortable:false,
            	width:150,
            	editor:{
            		xtype:'combo',
            		displayField:'name',
            		valueField:'name',
            		queryMode:'local',
            		store:new Ext.data.JsonStore({
            			data:[
            			  {name:'None'},{name:'Begin With'},{name:'End With'},{name:'Contain'},{name:'Equal To'}    
            			],
            			fields:['name']
            		}),
            		listeners:{
            			blur:'onWIComboBlur',
            			select:'onComboSelect'
            		}
            	}
            },
            {
            	text:'Keywording',
            	dataIndex:'keywording',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Org Code',
            	dataIndex:'orgCode',
				align:'left',
            	width:150,
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength50
				}
            },
            {
            	text:'Bill to Site#',
            	dataIndex:'billToCode',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength100
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Bill to Address',
            	dataIndex:'billToAddress',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	width:400
            },
            {
            	text:'Bill to Contact',
            	dataIndex:'billToContact',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength250
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Bill to Email',
            	dataIndex:'billToEmail',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength250
				},
            	cellWrap:true,
            	width:200
            },
            {
            	text:'Bill to Telephone',
            	dataIndex:'billToTelephone',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength250
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Ship to Site#',
            	dataIndex:'shipToCode',
				align:'left',
            	editor:'textfield',
            	width:150,
            	cellWrap:true
            },
            {
            	text:'Ship to Address',
            	dataIndex:'shipToAddress',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	width:400
            },
            {
            	text:'Ship to Contact',
            	dataIndex:'shipToContact',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength250
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Ship to Email',
            	dataIndex:'shipToEmail',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength250
				},
            	cellWrap:true,
            	width:200
            },
            {
            	text:'Ship to Telephone',
            	dataIndex:'shipToTelephone',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength250
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Shipping Method',
            	dataIndex:'shippingMethod',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Freight Term',
            	dataIndex:'freightTerm',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Packing Instruction',
            	dataIndex:'packingInstruction',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	width:400
            },
            {
            	text:'Shipping Instruction',
            	dataIndex:'shippingInstruction',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	width:400
            },
            {
            	text:'End Customer',
            	dataIndex:'endCustomer',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.maxLength250
				},
            	cellWrap:true,
            	width:150
            },
            {
            	text:'Manufacturing Note',
            	dataIndex:'manufacturingNote',
				align:'left',
            	editor:{
					xtype:'textfield',
					maxLength:Settings.wiConfig.textAreaMaxLength
				},
            	cellWrap:true,
            	width:400
            },
            {
				text:'File',
				width:80,
				dataIndex:'file',
				align:'left',
				sortable:false,
                menuDisabled:true,
				renderer:function(value, metadata, rec){
					return Helper.getFilePath(value, metadata, rec);
				}
			}
//			{
//                text: '',
//                width:40,
//                sortable:false,
//                menuDisabled:true,
//                renderer:function(v, metedata, record){
//                	return '<i class="upload-image-btn x-fa fa-upload" style="font-size:18px;cursor:pointer;" gridType="billShipMappingGrid" ><i>'
//                }
//            }
        ];
    }
});

  