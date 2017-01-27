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
	initComponent : function(){
		var me=this;
		Ext.apply(this,{
			columns : this.buildColumns(),
			columnLines:true,
			viewConfig : {
				stripeRows : true,
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
			},
			listeners:{
				'afterrender':function(){
					var store=me.getStore(),
						index = store.find('isDefault',true);
					if(index!=-1){
						me.getSelectionModel().select(index);
					}
					me.getView().on('beforerefresh',function(){
						me.isOrgGridNotValid=false;
					});
				}
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
				sortable : true,
				dataIndex:'orgCodeId',
				editor:{
					xtype:'combo',
					store:me.orgStore,
					//reference:'orgCodeCombo',
					displayField:'name',
					valueField:'id',
					listeners:{
						'render':'onOrgeCodeComboRender',
						'change':'onOrgeCodeComboChange'
					}
				},
				renderer:'onOrgCodeCellRender'
			},
			{
				text : 'Legacy Bill to Code',
				width:100,
				sortable : true,
				dataIndex:'billToCode',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Legacy Ship to Code',
				width:100,
				sortable : true,
				dataIndex:'shipToCode',
				editor:{
					xtype:'textfield'
				}
			},
			{
				text : 'Freight Terms',
				width:120,
				sortable : true,
				dataIndex:'freightTerm',
				editor: {
					xtype: 'combo',
					displayField: 'variableFieldName',
					valueField: 'variableFieldName',
					editable:false,
					queryMode :'local'
				},
				renderer:'validationRendered'
			},
			{
				text : 'Shipping method',
				width:150,
				dataIndex:'shippingMethod',
				editor: {
					xtype: 'combo',
					displayField: 'variableFieldName',
					valueField: 'variableFieldName',
					editable:false,
					queryMode :'local'
				},
				'renderer':'validationRendered'
			},
			{
				text : 'Shipping Instructions',
				flex:1,
				dataIndex:'shippingInstruction',
				editor:{
					xtype:'textfield'
				}
			}
        ];
    }
});

  