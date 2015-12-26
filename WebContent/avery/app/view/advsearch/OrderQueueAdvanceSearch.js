Ext.define('AOC.view.advsearch.OrderQueueAdvanceSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.orderqueueadvancesearch',
			itemId : 'orderqueueadvancesearchID',
			controller : 'orderqueue',
			requires : ['Ext.window.MessageBox'],
			border : false,
			buttonAlign : 'right',
			controller:'orderqueue',
			style: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
			items : [  
			           {
							xtype:'displayfield',
							itemId:'tittleItemId',
							value:'<b><font size=3>'+advancedSearchWindowTitle+'</font></b>',
							margin:'5 0 0 200'
                        },
						{
							xtype:'tbspacer',
							height:2,
							width:10
						},
			         {
							xtype:'displayfield',
							itemId:'messageFieldItemId',
							value:'',
							hidden:true,
							margin:'5 0 0 10'
                     },
						{
							xtype:'tbspacer',
							height:5,
							width:30
						},
			          {
			            xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    margin : '5 0 0 10',
	                    items:[{
						
							xtype : 'textfield',
							fieldLabel : 'RBO',
							name:'RBOName',
							width:250,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true
					 	     },
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Partner Name',
							name:'PartnerName',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
			       },
						{
				           xtype: 'fieldcontainer',
                           layout: 'hbox',
                           margin : '5 0 0 10',
                           items:[{
							xtype : 'textfield',
							fieldLabel : 'Subject',
							name:'Subject',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						     },
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Email Body',
							name:'EmailBody',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 10',
	                        items:[{
							xtype : 'combo',
							fieldLabel : ' Order Status',
							name:'Status',
							width:250,
							labelSeparator : '',
							labelAlign : 'top',
							displayField:'value',
							valueField:'code',
							store: Ext.data.StoreManager.lookup('orderfilequeueid') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid')
						    },
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'combo',
							fieldLabel : 'Product Line',
							name:'ProductLineType',
							itemId:'productLineComboItemId',
							displayField:'productLineType',
							valueField:'productLineType',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 10',
	                        items:[{
							xtype : 'textfield',
							fieldLabel : 'Sender EmailID',
							name:'SenderEmailID',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						    },
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Order track#',
							name:'id',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 10',
	                        items:[
						   {
							xtype : 'textfield',
							fieldLabel : 'PO#',
							name:'ponumber',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
						},
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'radiogroup',
							name: 'datecriteriavalue',
							fieldLabel : '',
							width:700,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							items:[
						            { boxLabel: 'Process Date', name: 'datecriteriavalue', inputValue: 'receivedDate', checked: true },
						            { boxLabel: 'Submitted Date', name: 'datecriteriavalue', inputValue: 'submittedDate' }
						            ]
						},
						{

							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 10',
	                        items:[{
							xtype : 'datefield',
							name:'fromDate',
							fieldLabel : 'From Date ',
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							    }
							}
						},
						{
							xtype:'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'datefield',
							fieldLabel : 'To Date ',
							name:'toDate',
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							                },
							     'focus': 'notifyByMessage'
							        }
						}]
						}
			],
			buttons : [ {
						text : 'Search',
						disabled : false,
						formBind : true,
						success : true,
						listeners : {
							click  : 'getOrderBasedOnSearchParameters'
						}
				}],
				initComponent : function() {
				this.callParent(arguments);
				}

});
