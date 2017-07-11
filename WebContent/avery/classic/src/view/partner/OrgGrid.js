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
					displayField:'name',
					valueField:'id',
					listeners:{
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
				width:60,
				menuDisabled :true,
				align:'center',
				baseCls:'custom-action',
				items:[
				    {
				    	glyphColor:'red',
				    	tooltip:'Remove',
						glyph:'xf056@FontAwesome',
						handler:'onRemoveOrgRow'
				    },
				    {
				    	glyphColor:'green',
				    	tooltip:'Add More Row',
						glyph:'xf055@FontAwesome',
						handler:'onAddOrgBtnClick'
				    }
				]
			}
        ];
    }
});

  