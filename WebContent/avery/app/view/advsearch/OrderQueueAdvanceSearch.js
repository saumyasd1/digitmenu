Ext.define('AOC.view.advsearch.OrderQueueAdvanceSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.orderqueueadvancesearch',
			itemId : 'orderqueueadvancesearchID',
			controller : 'orderqueue',
			requires : ['Ext.window.MessageBox'],
			border : false,
			buttonAlign : 'right',
			controller:'addressMain',
			style: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
			items : [ {
			            xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    margin : '5 0 0 5',
	                    items:[{
						
							xtype : 'textfield',
							fieldLabel : 'RBO',
							name:'RBO',
							width:280,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							selectOnTab : true
					 	     },
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Partner Name',
							name:'PartnerName',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						}]
			       },
						{
				           xtype: 'fieldcontainer',
                           layout: 'hbox',
                           margin : '5 0 0 5',
                           items:[{
							xtype : 'textfield',
							fieldLabel : 'Subject',
							name:'Subject',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						     },
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Email Body',
							name:'EmailBody',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						}]
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 5',
	                        items:[{
							xtype : 'textfield',
							fieldLabel : ' Order Status',
							name:'Status',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						    },
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'combo',
							fieldLabel : 'Product Line',
							name:'ProductLineType',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						}]
						},
						{
							xtype : 'tbspacer',
							height:5
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 5',
	                        items:[{
							xtype : 'textfield',
							fieldLabel : 'PO',
							name:'PO',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						    },
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'combo',
							fieldLabel : 'Submission Type',
							name:'Submission Type',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						}]
						},
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'radiogroup',
							name: 'datecriteriavalue',
							fieldLabel : 'Date Criteria',
							width:700,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							items:[
						            { boxLabel: 'Creation Date', name: 'date', inputValue: 'CreatedDate', checked: true },
						            { boxLabel: 'Modified Date', name: 'date', inputValue: 'LastModifiedDate' }
						            ]
						},
						{

							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 5',
	                        items:[{
							xtype : 'datefield',
							name:'fromDate',
							fieldLabel : 'From Date ',
							width:280,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
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
							height:5
						},
						{
							xtype : 'datefield',
							fieldLabel : 'To Date ',
							name:'toDate',
							width:280,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							                }
							        }
						}]
						},
						{
							xtype:'tbspacer',
							height:5
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
