Ext.define('AOC.view.orderqueue.OrderLineContainer', {
	extend : 'Ext.container.Container',
	requires : [],
	alias : 'widget.orderlinecontainer',
	controller:'orderlinecontainer',
	requires:['Ext.draw.sprite.Line'],
	initComponent : function() {
		var me=this;
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',
			 layout: {
		        type: 'vbox',
		        align: 'stretch'
		    },
			items :me.buildItems()
	 	});
		me.updateLayout();
	 	this.callParent(arguments);
	},
	buildItems:function(){
		var me=this;
		debugger;
		 var record=AOC.config.Runtime.getOrderQueueActiveRecord();
		return  [{
				xtype:'container',
				items:[{
				xtype:'container',
				height:30,
				
				margin:'10 10 5 10',
				layout: {
				    type: 'hbox',
				    align: 'left'
				},
				items:[{
					xtype:'image',
					width:40,
					src:AOC.config.Settings.buttonIcons.backIcon,
					autoEl: 'div',
					cls:'orderline-back-button',
					listeners:{
						el:{
							'click':'backButton'
						}
					}
				},
				{
			    	xtype : 'displayfield',
			    	style :{
			    		font:'10px'
			    	},
			    	encodeHtml:true,
			    	value : 'Order Line'
				}]
				},
				{
					xtype:'toolbar',
					height:75,
					buttonAlign:'right',
					margin:'0 10 0 10',
					border:'0 0 1 0',
					style: {
					    borderColor: '#cecece',
					    borderStyle: 'solid'
					},
					layout: {
					    type: 'hbox',
					    align: 'left'
					},
					items:[{
						xtype:'displayfield',
						fieldLabel:'<b>Partner</b>',
						cls:'orderline-displayfield-label-cls',
						labelAlign :'top',
						value : record.get('PartnerName'),
						width:120
					},
					{
						xtype:'displayfield',
						fieldLabel : '<b>RBO</b>',
						labelAlign :'top',
						value:record.get('RBOName'),
						width:120
					},
					{
						xtype:'displayfield',
						fieldLabel : '<b>Product Line</b>',
						width:120,
						labelAlign:'top',
						value:record.get('productLineType')
					},
					{
						xtype:'displayfield',
						fieldLabel : '<b>Subject</b>',
						labelAlign :'top',
						value:record.get('Subject'),
						width:250
					},{
			            xtype: 'button',
			            reference:'validateButton',
			            cls:'orderline-control-button-cls',
			            text: '<b>Validate</b>',
			            margin:'0 10 0 10',
			            handler: 'validateOrderLine'
			        },{
			            xtype: 'button',
			            cls:'orderline-control-button-cls',
			            reference:'cancelOrderButton',
			            margin:'0 10 0 0',
			            text: '<b>Cancel Order</b>',
			            handler: 'cancelOrder',
			            
			        },{
			            xtype: 'button',
			            reference: 'salesOrderbutton',
			            cls:'orderline-control-button-cls',
			            text: salesOrdersumbitText,
			            margin:'0 10 0 0',
			            handler: 'submitSalesOrder'
			        },{
			            xtype: 'button',
			            reference: 'salesViewOrderbutton',
			            cls:'orderline-control-button-cls',
			            text: viewSalesOrderBtnText,
			            margin:'0 10 0 0',
			            handler: 'viewSalesOrder',
			            disabled:true,
			            align:'right'
			        }]
					}
				]
			},{
				xtype: 'draw',
		        sprites: [{
		            type: 'line'
		        }]
			},{
				xtype:'orderlineexpandablegrid',
				store:me.store,
				flex:1
			}];
	}
});
