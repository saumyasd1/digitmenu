Ext.define('AOC.view.orderqueue.OrderLineContainer', {
	extend : 'Ext.panel.Panel',
	requires : [],
	alias : 'widget.orderlinecontainer',
	controller:'orderlinecontainer',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	border:'4 4 4 4',
	initComponent : function() {
		var me = this;
		me.items = me.buildItems();
		me.bbar = me.buildBbar();
		Ext.apply(this, {
			tbar:{
				height:AOC.config.Settings.config.defaultTbarHeight,
				items:me.buildTbar()
			}
	 	});
	 	me.callParent(arguments);
	},
	buildTbar:function(){
		var record = AOC.config.Runtime.getOrderQueueActiveRecord();
		return [
			{
				xtype:'tbtext',
				style:AOC.config.Settings.config.tabHeaderTitleStyle,
				text:'Order Line   (Order Track#:'+ record.get('id') + ')'
			}
		]
	},
	afterRender:function(){
		this.callParent(arguments);
		var grid = this.down('orderlineexpandablegrid');
		grid.store.load();
		
	},
	buildBbar:function(){
		return [
			{
				xtype:'whitebutton',
				text:'Back',
				handler:'backButton'
			},
			'->',
			{
				xtype:'button',
				reference:'validateButton',
				ui:'white',
				text: '<b>Validate</b>',
				margin:'0 10 0 10',
				handler: 'validateOrderLine'
			},
			{
				xtype: 'button',
				ui:'white', 
				reference:'cancelOrderButton',
				margin:'0 10 0 0',
				text: '<b>Cancel Order</b>',
				handler: 'cancelOrder'
			},
			{
				xtype: 'button',
				reference: 'salesOrderbutton',
				ui:'white',
				text: AOCLit.salesOrdersumbitText,
				margin:'0 10 0 0',
				handler: 'submitSalesOrder'
			},
			{
				xtype: 'button',
				reference: 'salesViewOrderbutton',
				ui:'white',
				autoWidth: true, 
				text: AOCLit.viewSalesOrderBtnText,
				handler: 'viewSalesOrder',
				disabled:true
			}
		]
	},
	buildItems:function(){
		var me = this,
			record = AOC.config.Runtime.getOrderQueueActiveRecord();
			
		return [
			{
				xtype:'fieldcontainer',
				layout:'hbox',
				margin:'0 10 0 10',
				style:'border-top:solid 1px #cecece;padding:10px;',
				defaults:{
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelSeparator:'',
					xtype:'displayfield'
				},
				items:[
					{
						fieldLabel:'Partner',
						value : record.get('PartnerName'),
						flex:1.3
					},
					{
						fieldLabel : 'RBO',
						value:record.get('RBOName'),
						flex:1.3
					},
					{
						fieldLabel : 'Subject',
						value:record.get('Subject'),
						flex:2
					},
					{
			            xtype:'checkboxfield',
			            boxLabel  : 'Copy Data',
						margin:'0 0 5 0',
			            flex:0.5,
						checked: false,
						handler:function(cmp, checked){
		                	var activeitme =(checked) ? 0 : 1;
		                	cmp.up('orderlinecontainer').down('#orderlineexpandablegridcard').getLayout().setActiveItem(activeitme);
		                	if(record.get('Status') == 4 && AOC.config.Runtime.getAllowOrderLineEdit()){
									if(!checked){
									   me.lookupReference('form').enable();
									}
									else{ 
									   me.lookupReference('form').disable();
									}
								}
						}
			        }
				]
			},
			{
				xtype:'fieldcontainer',
				layout:'hbox',
				margin:'0 10 0 10',
				style:'border-top:solid 1px #cecece;padding:10px;',
				items:[
					{
						xtype: 'form',
						reference: 'form',
						padding:'10 0 10 0',
						layout: 'hbox',
						maxWidth:620,
						minWidth:400,
						defaults:{
							labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
							labelSeparator:''
						},
						items: [
							{
								xtype: 'radiogroup',
								reference: 'radioGroup',
								flex:1,
								layout:'hbox',
								items: [
									{
										boxLabel: 'Order Line Update',
										name: 'rb',
										inputValue: '1',
										checked: true,
										width:150
									}, 
									{
										boxLabel: 'Variable Order Update',
										name: 'rb',
										inputValue: '2',
										width:150
									}
								],
								listeners: {
									change: 'radioButtonClick'
								}
							},
							{
								xtype: 'combo',
								hidden: true,
								editable:false,
								hideLabel:true,
								margin:'0 0 0 20',
								displayField: 'variableFieldName',
								valueField: 'variableFieldName',
								reference: 'variableFieldCombo',
								width:180
							}, 
							{
								xtype: 'button',
								text: AOCLit.bulkUpdateButtonText,
								margin:'0 0 0 10',
								ui:'blue-plain',
								reference:'bulkUpdateButton',
								handler: 'getUpdateScreen'
							}
						]
					}
				]
			},
			{
				xtype:'container',
				layout:'card',
				flex:1,
				itemId:'orderlineexpandablegridcard',
				style:AOC.config.Settings.config.defaultBorderStyle,
				activeItem:1,
				items:[
					{
						xtype:'orderlineexpandablegrid',
						itemId: 'orderlineexpandablegridvv',
						store:me.store,
						selModel: {
							type:'spreadsheet',
							rowNumbererHeaderWidth:0
						}
					},
					{
						xtype:'orderlineexpandablegrid',
						itemId: 'orderlineexpandablegridrowmodel',
						store:me.store,
						editGrid:true,
						selModel: {
							type: 'rowmodel'
						}
					}
				]
			}
		]
	}
});
