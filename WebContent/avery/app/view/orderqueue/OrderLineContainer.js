Ext.define('AOC.view.orderqueue.OrderLineContainer', {
	extend : 'Ext.panel.Panel',
	requires : [],
	alias : 'widget.orderlinecontainer',
	controller:'orderlinecontainer',
	layout: {
		type: 'border'
	},
	border:'4 4 4 4',
	initComponent : function() {
		var me = this;
		me.items = me.buildItems();
		me.buttons = me.buildButtons();
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
			},'->',
			{
				xtype:'form',
				reference:'orderLineForm',
				margin:'0 0 0 20',
				width:'100%',
				height:40,
				border:false,
				items:[
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						margin:'0 0 0 0',
						style:'padding-top:4px;',
						flex:1,
						defaults:{
							labelAlign:AOC.config.Settings.form.defaultLabelAlign,
							labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
							labelSeparator:'',
							labelWidth:80,
							xtype:'displayfield'
						},
						items:[
							{
								fieldLabel:'Partner',
								name:'PartnerName',
								flex:1
							},
							{
								fieldLabel : 'RBO',
								name:'RBOName',
								margin:'0 0 0 10',
								flex:.6
							},
							{
								fieldLabel : 'Subject',
								name:'Subject',
								margin:'0 5 0 10',
								flex:2
							}
						]
					}
				]
			}
		];
	},
	buildButtons:function(){
		return [
			{
				text:'Back',
				//tooltip:'<font color="blue">Go Back</font>',
//				scale:'medium',
//				cls:'aoc-btn',
//				iconCls:'fa fa-arrow-left aoc-icon',
				handler:'backButton'
			},
			'->',
			{
	  	    	 text:'Expand Column',
	  	    	 //xtype:'button',
	  	    	 //ui:'blue-plain',
	  	    	 enableToggle:true,
	  	    	 handler:'onShowColumnBtnClick'
			},
			{
				//xtype:'button',
				reference:'validateButton',
				//ui:'white',
				text: 'Validate',
				margin:'0 10 0 10',
				handler: 'validateOrderLine'
			},
			{
				//xtype: 'button',
				//ui:'white', 
				reference:'cancelOrderButton',
				margin:'0 10 0 0',
				text: AOCLit.cancelSalesOrderText,
				handler: 'cancelOrder'
			},
			{
				//xtype: 'button',
				reference: 'salesOrderbutton',
				//ui:'white',
				text: AOCLit.salesOrdersumbitText,
				margin:'0 10 0 0',
				handler: 'submitSalesOrder'
			},
			{
				//xtype: 'button',
				reference: 'salesViewOrderbutton',
				//ui:'white',
				//autoWidth: true, 
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
	        	xtype:'container',
	        	layout:'hbox',
	        	region:'north',
	        	padding:'10 5 5 5',
	        	style:'background:#fff;border-top:solid 1px #cecece;',
				height:50,
	        	items:[
					{
						xtype: 'form',
						reference:'form',
						layout: 'hbox',
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
				xtype:'orderlineexpandablegrid',
				region:'center',
				itemId: 'orderlineexpandablegridrowmodel',
				reference:'orderLineExpandableGrid',
				editGrid:true,
				selModel: {
					type: 'rowmodel'
				}
			}
		];
	}
});
