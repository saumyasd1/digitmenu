Ext.define('AOC.view.address.AddAddress',{
	extend:'Ext.window.Window',
	alias:'widget.addaddress',
	itemId:'addAddressItemId',
    controller:'addressMain',
	bodyPadding: 5,
	width: 1000,
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
                handler:'saveAddressDetails'
            },
            {
            	text : 'Cancel',
                handler : 'closeWindow'
            }];
        },
        
        buildItem:function(){
        	var me=this;
        	return [{
        		xtype:'displayfield',
        		itemId:'messageFieldItemId',
        		hidden:true
        	},{
        		xtype:'form',
        		itemId:'listPanel',
        		border:false,
        		layout:'hbox',
        		items:[{
        			xtype: 'fieldcontainer',
                    layout: 'vbox',
                    margin : '5 0 0 10',
                    defaults:{
            			labelAlign:'right',
            			labelWidth : 150,
      		            width : 420,
      		            labelAlign:'right',
      		            labelSeparator : ''
            		},
                    items:[{
        			xtype:'textfield',
        			name: 'orgCode',
        			fieldLabel:'ORG Code<font color=red>*</font>',
        			allowBlank: false,
    		        listeners : {
	                    blur : this.notifyByImage,
 	                	focus : this.notifyByMessage
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
   	                	focus : this.notifyByMessage
   	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'description',
	        			fieldLabel:'Description<font color=red>*</font>',
	        			allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
	   	                	focus : this.notifyByMessage
	   	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'siteNumber',
	        			fieldLabel:'Site Number<font color=red>*</font>',
	        		    allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
	   	                	focus : this.notifyByMessage
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
	        			fieldLabel:'Email<font color=red>*</font>',
	        			regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
	        			allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
	   	                	focus : this.notifyByMessage
	   	                     }
	        		}]
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'vbox',
                    margin : '5 0 0 10',
                    defaults:{
            			labelAlign:'right',
            			labelWidth : 150,
      		            width : 420,
      		            labelAlign:'right',
      		            labelSeparator : ''
      		           
            		},
                    items:[{
        			xtype:'textfield',
        			name: 'shippingMethod',
        			fieldLabel:'Shipping Method<font color=red>*</font>',
        			allowBlank: false,
     		        listeners : {
	                    blur : this.notifyByImage,
  	                	focus : this.notifyByMessage
  	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'freightTerms',
	        			fieldLabel:'Freight Terms<font color=red>*</font>',
	        			allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
	   	                	focus : this.notifyByMessage
	   	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'shippingInstructions',
	        			fieldLabel:'Shipping Instructions<font color=red>*</font>',
	        			allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
	   	                	focus : this.notifyByMessage
	   	                     }
	        		},
	        		{
	        			xtype:'combobox',
	        			name: 'siteType',
	        			fieldLabel:'Site Type<font color=red>*</font>',
					    store :[['B','billToSiteNumber'],['S','shipToSiteNumber']],
					    allowBlank: false,
      		            listeners : {
	                        blur : this.notifyByImage,
   	                	    focus : this.notifyByMessage
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
	        			fieldLabel:'Fax<font color=red>*</font>',
	        			allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
	   	                	focus : this.notifyByMessage
	   	                     }
	        		}]
        		}
               ],
        		buttons:this.buildButtons()
        	}]
        },
        notifyByMessage : function(config){
			   var me = this;
			   if(config.up('#listPanel').ownerCt){
				   if(config.up('#listPanel').ownerCt.editMode)
					       config.up('#listPanel').ownerCt.setTitle('Edit Address');
				   else
					       config.up('#listPanel').ownerCt.setTitle('Add Address');
			   }
		   },
		   notifyByImage : function(config){
		    	 if(config.isValid())
		    		   config.setFieldStyle('background-image:url(avery/resources/images/valid_field.png);background-repeat:no-repeat;background-position:right;');
					else
					   config.setFieldStyle('background-image:url(avery/resources/images/invalid_field.jpg);background-repeat:no-repeat;background-position:right;');
		     }
                 });
