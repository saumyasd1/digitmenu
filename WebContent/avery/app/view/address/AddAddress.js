Ext.define('AOC.view.address.AddAddress',{
	extend:'AOC.view.base.BaseWindow',
	alias:'widget.addaddress',
	itemId:'addAddressItemId',
    controller:'addressMain',
	bodyPadding: 5,
	width: 900,
	border:false,
    modal:true,
    draggable:false,
    editMode:false,
    rec:null,
    ID:null,
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                listeners:{
            	'afterrender':function(obj){
            	if(me.rec!=null){
            		me.down('form').loadRecord(me.rec);
            	}
            }
            }
            });
            this.callParent(arguments);
        },
        buildButtons : function(){
            return [{
            	text : 'Save',
                handler : 'saveAddressDetails'
            },
            {
            	text : 'Cancel',
                handler : 'closeWindow'
            }];
        },
   
        buildItem:function(){
        	var me=this;
        	return [
				{
					xtype:'displayfield',
					itemId:'titleItemId',
					vale:'',
					hidden:false,
					margin : '5 0 0 400'
				   },
				   {
				   	xtype :'tbspacer',
				   	height:1
					},  
        	   {
        		xtype:'displayfield',
        		itemId:'messageFieldItemId',
        		hidden:true
        	},{
        		xtype:'form',
        		itemId:'listPanel',
        		border:false,
        		layout:'hbox',
        		height:400,
        		scrollable : true,
        		items:[{
        			xtype: 'fieldcontainer',
                    layout: 'vbox',
                    margin : '5 0 0 5',
                    defaults:{
            			labelAlign:'top',
            			labelWidth : 150,
      		            width : 420,
      		            labelSeparator : ''
            		},
                    items:[{
        			xtype:'textfield',
        			name: 'orgCode',
        			fieldLabel:'ORG Code<font color=red>*</font>',
        			allowBlank: false,
    		        listeners : {
	                    blur : this.notifyByImage,
	                    'focus' : 'HideMandatoryMessage'
 	                     }
	        		},
	        		{
	        			xtype:'combobox',
	        			name: 'partner_id',
	        			fieldLabel:'Partner Name<font color=red>*</font>',
	        			displayField:'partnerName',
						valueField:'id',
					    store :'PartnerManagementStore',
					    allowBlank: false,
      		            listeners : {
	                        blur : this.notifyByImage,
	                        'focus' : 'HideMandatoryMessage'
   	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'description',
	        			fieldLabel:'Description<font color=red>*</font>',
	        			allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
		                    'focus' : 'HideMandatoryMessage'
	   	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'siteNumber',
	        			fieldLabel:'Site Number<font color=red>*</font>',
	        		    allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
		                    'focus' : 'HideMandatoryMessage'
	   	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'phone1',
	        			fieldLabel:'Phone 1'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'address1',
	        			fieldLabel:'Address 1'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'address3',
	        			fieldLabel:'Address 3'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'city',
	        			fieldLabel:'City'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'country',
	        			fieldLabel:'Country'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'zip',
	        			fieldLabel:'Zip'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'email',
	        			fieldLabel:'Email',
	        			regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/
	        		}
	        		]
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'vbox',
                    margin : '5 0 0 10',
                    defaults:{
            			labelAlign:'top',
            			labelWidth : 150,
      		            width : 420,
      		            labelSeparator : ''
      		           
            		},
                    items:[{
        			xtype:'combo',
        			name: 'shippingMethod',
        			fieldLabel:'Shipping Method',
                    displayField: 'variableFieldName',
                    valueField: 'variableFieldName',
                    store: Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId')
	        		},
	        		{
	        			xtype:'combo',
	        			name: 'freightTerms',
	        			fieldLabel:'Freight Terms',
	                    displayField: 'variableFieldName',
	                    valueField: 'variableFieldName',
	                    store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId')
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'shippingInstructions',
	        			fieldLabel:'Shipping Instructions'
	        		},
	        		{
	        			xtype:'combobox',
	        			name: 'siteType',
	        			fieldLabel:'Site Type<font color=red>*</font>',
					    store :[['B','billToSiteNumber'],['S','shipToSiteNumber']],
					    allowBlank: false,
      		            listeners : {
	                        blur : this.notifyByImage,
	                        'focus' : 'HideMandatoryMessage'
   	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'contact',
	        			fieldLabel:'Contact'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'phone2',
	        			fieldLabel:'Phone 2'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'address2',
	        			fieldLabel:'Address 2'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'address4',
	        			fieldLabel:'Address 4'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'state',
	        			fieldLabel:'State'
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'fax',
	        			fieldLabel:'Fax'
	        		}
	        		 ]
        		}
               ]
        		
        	},
            {
            	xtype :'tbspacer',
            	width :100,
            	height:20
    		},
    	{ buttons:this.buildButtons()}
        	]
        },
		   notifyByImage : function(config){
		    	 if(config.isValid())
		    		   config.setFieldStyle('background-image:url('+successImageSrc+');background-repeat:no-repeat;background-position:right;');
					else
					   config.setFieldStyle('background-image:url('+errorIcon+');background-repeat:no-repeat;background-position:right;');
		     }
                 });
