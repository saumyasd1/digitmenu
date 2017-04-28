Ext.define('AOC.view.workinstruction.BillShipMappingGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.billshipmappinggrid',
    referenceHolder:true,
    cls:'wi-grid',
    title:'Bill/Ship Mapping',
    titleAlign:'center',
	emptyText: AOCLit.emptyDataMsg,
	initComponent : function(){
		var me = this;
		
		Ext.apply(this,{
			columns : this.buildColumns(),
			columnLines:true,
			store: Ext.data.StoreManager.lookup('wiBillShipMappingStore') == null ? Ext.create('AOC.store.WIBillShipMappingStore',{storeId:'wiBillShipMappingStore'}) : Ext.data.StoreManager.lookup('wiBillShipMappingStore'),
			viewConfig : {
				stripeRows: true,
				enableTextSelection: true
			},
			plugins: [{
				ptype: 'cellediting',
				clicksToEdit:1,
				listeners:{
		    		 beforeedit:function(e, editor){
		    			 if(AOCRuntime.getCurrentWiMode() == 'view'){
		    				 return false;
		    			 }
		    			 return true;
		    		 }
				}
			}],
			listeners:{
			}
		});
		this.callParent(arguments);
	},
	
	buildColumns : function(){
    	var me = this;
        return [
            {
            	text:'Address/Email subject/PO#/Shipping Mark/Others(Please specify)',
            	dataIndex:'addressEmailSubject',
            	editor:'textfield',
            	cellWrap:true,
            	sortable:false,
            	flex:1.5
            },
            {
            	text:'Begin with/ends with/contain/equal to',
            	dataIndex:'beginendwith',
            	cellWrap:true,
            	sortable:false,
            	flex:1.5,
            	editor:{
            		xtype:'combo',
            		displayField:'name',
            		valueField:'name',
            		queryMode:'local',
            		store:new Ext.data.JsonStore({
            			data:[
            			  {name:'Begin With'},{name:'End With'},{name:'Contain'},{name:'Equal To'}    
            			],
            			fields:['name']
            		})
            	}
            },
            {
            	text:'Keywording',
            	dataIndex:'keywording',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
            	text:'Org Code',
            	dataIndex:'orgCode',
            	flex:1.5,
            	editor:{
            		xtype:'combo',
            		editable:false,
            		store:[['Yes','Yes'],['No','No']]
            	}	
            },
            {
            	text:'Bill to Site#',
            	dataIndex:'billToCode',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
            	text:'Ship to Site#',
            	dataIndex:'shipToCode',
            	editor:'textfield',
            	flex:1.5,
            	cellWrap:true
            },
            {
            	text:'Shipping Method',
            	dataIndex:'shippingMethod',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
            	text:'Freight Term',
            	dataIndex:'freightTerm',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
            	text:'Packing Instruction',
            	dataIndex:'packingInstruction',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
            	text:'Shipping Instruction',
            	dataIndex:'shippingInstruction',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
            	text:'End Customer',
            	dataIndex:'endCustomer',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
            	text:'Manufacturing Note',
            	dataIndex:'manufacturingNote',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
            	text:'CSR',
            	dataIndex:'csr',
            	editor:'textfield',
            	cellWrap:true,
            	flex:1.5
            },
            {
				text:'File',
				flex:.8,
				dataIndex:'file',
				sortable:false,
                menuDisabled:true,
				renderer:function(value, metadata, rec){
					if(rec.get('fileName')){
						var str = rec.get('filePath') ? rec.get('filePath') :'',
							fPath = str ? (str.indexOf('AveryDennison') > -1 ? str.substr(str.indexOf('FileStore')) : ''):'';
							
						var filePath = fPath ? fPath+'/'+rec.get('fileName') : rec.get('fileContent');
						return '<img filePath="'+filePath+'" class="view-image-preview" src="'+filePath+'" style="width:30px;height:30px;border:solid 1px #ccc;border-radius:50%;"></img>'
					}
				}
			},
			{
                text: '',
                xtype: 'widgetcolumn',
                width:40,
                sortable:false,
                menuDisabled:true,
                widget: {
                    xtype: 'filefield',
                    name: 'file',
                    width:30,
                    buttonOnly:true,
                    buttonConfig:{
                    	iconCls:'fa fa-upload aoc-icon',
                    	cls:'aoc-btn', 
                    	text:''
                    },
                    regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
                    regexText: 'Only PNG and JPEG image formats are accepted',
                    gridType:'billShipMapping',
                    listeners:{
                    	change:'onFilesChanged',
                    	afterrender:function(cmp){
                            cmp.fileInputEl.set({
                                accept:'image/*'
                            });
                        }
                    }
                }
            }
        ];
    }
});

  