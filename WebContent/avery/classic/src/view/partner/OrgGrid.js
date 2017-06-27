Ext.define('AOC.view.partner.OrgGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.orggrid',
    controller:'orgcontroller',
    referenceHolder:true,
    requires:['AOC.view.ux.RadioModel'],
	emptyText: AOCLit.emptyDataMsg,
	showValidationError:false,
	isOrgGridNotValid:false,
	store:null,
	systemId:0,
	
	listeners:{
		'afterrender':function(grid){
			var store= grid.getStore(),
				index = store.find('isDefault',true);
			
			if(index!=-1){
				grid.getSelectionModel().select(index);
			}
			grid.getView().on('beforerefresh',function(){
				grid.isOrgGridNotValid=false;
			});
		}
	},
	initComponent : function(){
		var me=this;
		Ext.apply(me,{
			columns: me.buildColumns(),
			columnLines:true,
			viewConfig: {
				stripeRows: true,
				enableTextSelection : true
			},
			plugins: [{
				ptype: 'cellediting',
				clicksToEdit: 1,
				listeners:{
					beforeedit:'OnBeforeEdit'
				}
			}],
			selModel: {
				selType: 'radiomodel'
			}
		});
		this.callParent(arguments);
	},
	buildColumns : function(){
    	var me = this;
        return [    
			{
				text : 'Org',
				width:120,
				align:'left',
				dataIndex:'orgCodeId',
				editor:{
					xtype:'combo',
					store:me.orgStore,
					//reference:'orgCodeCombo',
					displayField:'name',
					valueField:'id',
					listeners:{
						//'render':'onOrgeCodeComboRender',
						'change':'onOrgeCodeComboChange'
					}
				},
				renderer:'onOrgCodeCellRender'
			},
			{
				text : 'Legacy Bill to Code',
				width:100,
				align:'left',
				dataIndex:'billToCode',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Legacy Ship to Code',
				width:100,
				align:'left',
				dataIndex:'shipToCode',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Freight Terms',
				width:120,
				align:'left',
				dataIndex:'freightTerm',
				editor: {
					xtype: 'combo',
					displayField: 'variableFieldName',
					valueField: 'variableFieldName',
					editable:false,
					queryMode :'local',
					listeners:{
						select:function(field){
							if(field.getValue() == 'None'){
								field.setValue('');
							}
						}
					}
				}
			},
			{
				text : 'Shipping method',
				width:150,
				align:'left',
				dataIndex:'shippingMethod',
				editor: {
					xtype: 'combo',
					displayField: 'variableFieldName',
					valueField: 'variableFieldName',
					editable:false,
					queryMode :'local',
					listeners:{
						select:function(field){
							if(field.getValue() == 'None'){
								field.setValue('');
							}
						}
					}
				}
			},
			{
				text : 'Shipping Instructions',
				flex:1,
				align:'left',
				dataIndex:'shippingInstruction',
				editor:{
					xtype:'textfield'
				}
			},{
				xtype:'actioncolumn',
				text:'',
				width:30,
				glyphColor:'red',
				glyph:'xf056@FontAwesome',
				menuDisabled  :true,
				baseCls:'custom-action',
				handler: function(grid, rowIndex, colIndex) {
					if(AOCRuntime.getUser().role != 3){
						 Ext.Msg.confirm('','Are you sure you want to delete this Org?',function(btn){
							if(btn=='yes'){
								grid.getStore().removeAt(rowIndex);
							} 
						 });
					}
			    }
			}
        ];
    }
});

  