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
								value:'<b><font size=3>'+AOCLit.advancedSearchWindowTitle+'</font></b>',
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
							fieldLabel : AOCLit.address,
							name:'address',
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
							fieldLabel : AOCLit.partnerName,
							name:'partnerName',
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
							width:600,
							hidden:false,
							labelSeparator : '',
							margin:'5 0 0 10',
							labelAlign : 'top',
							items:[
						            { boxLabel: 'Creation Date', name: 'datecriteriavalue', inputValue: 'createdDate', checked: true },
						            { boxLabel: 'Modified Date', name: 'datecriteriavalue', inputValue: 'lastModifiedDate' }
						            ]
						},
						{

							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 10',
	                        items:[{
							xtype : 'datefield',
							name:'fromDate',
							reference:'fromDate',
							fieldLabel : AOCLit.fromDate,
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
							fieldLabel : AOCLit.toDate,
							name:'toDate',
							reference:'toDate',
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
							click  : 'getAddressBasedOnSearchParameters'
						}
				}],
				initComponent : function() {
				this.callParent(arguments);
				}

});
