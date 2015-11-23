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
							xtype:'tbspacer',
							height:20
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Address',
							name:'address',
							width:355,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							selectOnTab : true
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Partner Name',
							name:'partnerName',
							width:355,
							labelSeparator : '',
							labelAlign : 'right'
						},
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'radiogroup',
							name: 'datecriteriavalue',
							fieldLabel : 'Date Criteria',
							width:355,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							items:[
						            { boxLabel: 'Creation Date', name: 'datecriteriavalue', inputValue: 'createdDate', checked: true },
						            { boxLabel: 'Modified Date', name: 'datecriteriavalue', inputValue: 'lastModifiedDate' }
						            ]
						},
						{
							xtype : 'datefield',
							name:'fromDate',
							fieldLabel : 'From Date ',
							width:355,
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
							width:355,
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
