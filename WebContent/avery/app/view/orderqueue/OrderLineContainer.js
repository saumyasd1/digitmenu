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
		return [
			{
				xtype:'tbtext',
				style:AOC.config.Settings.config.tabHeaderTitleStyle,
				reference:'orderLineTitle'
			}
		]
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
		var me = this;
		return [
	        {
	        	xtype:'form',
	        	reference:'orderLineForm',
	        	border:false,
	        	items:[
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin:'0 10 0 10',
						style:'border-top:solid 1px #cecece;padding:5px;',
						defaults:{
							labelAlign:AOC.config.Settings.form.defaultLabelAlign,
							labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
							labelSeparator:'',
							xtype:'displayfield'
						},
						items:[
							{
								fieldLabel:'Partner',
								name:'PartnerName',
								flex:1.3
							},
							{
								fieldLabel : 'RBO',
								name:'RBOName',
								flex:1.3
							},
							{
								fieldLabel : 'Subject',
								name:'Subject',
								flex:2
							},
							{
					            xtype:'checkboxfield',
					            boxLabel  : 'Copy Data',
								margin:'0 0 5 0',
					            flex:0.5,
					            hidden:true,
								checked: false
					        }
						]
					}
	        	]
	        },
			{
				xtype:'fieldcontainer',
				layout:'hbox',
				margin:'0 10 0 10',
				style:'border-top:solid 1px #cecece;padding:5px;',
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
				layout:'border',
				flex:1,
				itemId:'orderlineexpandablegridcard',
				style:AOC.config.Settings.config.defaultBorderStyle,
				items:[
					{
						xtype:'orderlineexpandablegrid',
						region:'center',
						itemId: 'orderlineexpandablegridrowmodel',
						reference:'orderLineExpandableGrid',
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
