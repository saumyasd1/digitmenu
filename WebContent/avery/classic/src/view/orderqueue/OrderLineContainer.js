Ext.define('AOC.view.orderqueue.OrderLineContainer', {
	extend : 'Ext.panel.Panel',
	requires : [],
	alias : 'widget.orderlinecontainer',
	controller:'orderlinecontainer',
	layout: {
		type: 'border'
	},
	initComponent : function() {
		var me = this;
		me.items = me.buildItems();
		me.buttons = me.buildButtons();
	 	me.callParent(arguments);
	},
	dockedItems:[
	    {
	    	 xtype: 'toolbar',
	         dock: 'top',
	         items:[
				{
					xtype:'tbtext',
					style:AOC.config.Settings.config.tabHeaderTitleStyle,
					reference:'orderLineTitle'
				},
				{
					xtype:'form',
					reference:'orderLineForm',
					margin:'0 0 0 20',
					width:'85%',
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
								labelWidth:50,
								xtype:'displayfield'
							},
							items:[
								{
									fieldLabel:'Partner',
									name:'PartnerName',
									flex:.8
								},
								{
									fieldLabel : 'RBO',
									name:'RBOName',
									margin:'0 0 0 10',
									flex:.5
								},
								{
									fieldLabel : 'Subject',
									name:'Subject',
									margin:'0 5 0 10',
									flex:1
								},
								{
									fieldLabel: 'Site Name',
									name:'SiteName',
									labelWidth:70,
									margin:'0 5 0 10',
									flex:.5
								}
							]
						}
					]
				}
			]
	    }
	],
	buildButtons:function(){
		return [
			{
				text:'Back',
				iconCls:'x-fa fa-arrow-left',
				handler:'backButton'
			},
			'->',
			{
	  	    	 text:'Expand Column',
	  	    	 iconCls:'x-fa fa-arrows-alt',
	  	    	 enableToggle:true,
	  	    	 handler:'onShowColumnBtnClick'
			},
			{
				reference:'validateButton',
				text: 'Validate',
	  	    	iconCls:'x-fa fa-check',
				margin:'0 10 0 10',
				handler: 'validateOrderLine'
			},
			{
				reference:'cancelOrderButton',
				iconCls:'x-fa fa-times',
				margin:'0 10 0 0',
				text: AOCLit.cancelSalesOrderText,
				handler: 'cancelOrder'
			},
			{
				reference: 'salesOrderbutton',
				text: AOCLit.salesOrdersumbitText,
				iconCls:'x-fa fa-save',
				margin:'0 10 0 0',
				handler: 'submitSalesOrder'
			},
			{
				reference: 'salesViewOrderbutton',
				iconCls:'x-fa fa-eye',
				text: AOCLit.viewSalesOrderBtnText,
				handler: 'viewSalesOrder',
				disabled:true
			}
		];
	},
	buildItems:function(){
		return [
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
