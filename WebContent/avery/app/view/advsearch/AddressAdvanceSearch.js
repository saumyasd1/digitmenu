Ext.define('AOC.view.advsearch.AddressAdvanceSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.addressadvancesearch',
			requires : ['Ext.window.MessageBox'],
			border : false,
			buttonAlign : 'right',
			controller:'addressMain',
			style: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
			items : [   
					       {
								xtype:'displayfield',
								itemId:'tittleItemId',
								value:'<b><font size=3>'+advancedSearchWindowTitle+'</font></b>',
								margin:'5 0 0 80'
				            },
							{
								xtype:'tbspacer',
								height:2
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
							height:2
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Address',
							name:'address',
							width:250,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							margin:'5 0 0 10'
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Partner Name',
							name:'partnerName',
							width:250,
							labelSeparator : '',
							labelAlign : 'top',
							margin:'5 0 0 10'
						},
						{
							xtype : 'tbspacer',
							height:2
						},
						{
							xtype : 'radiogroup',
							name: 'datecriteriavalue',
							fieldLabel : '',
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							margin:'5 0 0 10',
							items:[
						            { boxLabel: 'Creation Date', name: 'datecriteriavalue', inputValue: 'createdDate', checked: true },
						            { boxLabel: 'Modified Date', name: 'datecriteriavalue', inputValue: 'lastModifiedDate' }
						            ]
						},
						{
							xtype : 'datefield',
							name:'fromDate',
							fieldLabel : 'From Date ',
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							margin:'5 0 0 10',
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							    }
							}
						},
						{
							xtype:'tbspacer',
							height:2
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
							margin:'5 0 0 10',
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							                },
							                'focus': 'notifyByMessage'
							        }
						}
			],
			buttons : [ {
						text : 'Search',
						disabled : false,
						formBind : true,
						success : true,
						listeners : {
							click  : 'getAddressBasedOnSearchParameters'
						}
				}],
				initComponent : function() {
				this.callParent(arguments);
				}

});
