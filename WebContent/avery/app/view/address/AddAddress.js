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
            	text : AOCLit.Save,
                handler : 'saveAddressDetails'
            },
            {
            	text : AOCLit.Cancel,
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
                    items:[
                           {
                       xtype:'combo',
                       name: 'site',
                       fieldLabel:'Site',
                       displayField: 'name',
                       valueField: 'id',
                       store:Ext.create('AOC.store.SiteStore'),
                        listeners : {
		                    select : 'onSiteSelect',
  	                        'focus' : 'HideMandatoryMessage'
		                    }
                           },
                          {
                           		xtype:'combobox',
                           		name: 'system',
                           		fieldLabel:'System',
                           		//queryMode :'local',
                                   displayField: 'name',
                                   reference:'systemName',
                                   disabled:true,
                                   valueField: 'id',
                                 //  store: 'SiteStore',
                                   store:Ext.create('AOC.store.SystemStore'),
                                   listeners : {
           		                    select : 'onSystemSelect',
           		                //     blur : this.notifyByImage,
           	                        'focus' : 'HideMandatoryMessage'
           		          //          'focus' : 'HideMandatoryMessage'
           	   	                     }
                        	   
                        	
                        	   },
                        	   {
                        			xtype:'combo',
                        			name: 'shippingMethod',
                        			fieldLabel:AOCLit.shippingMethod,
                        			queryMode :'local',
                                    displayField: 'variableFieldName',
                                    reference: 'shippingMethod',
                                    valueField: 'variableFieldName',
                                    disabled:true,
                                    store: new Ext.data.JsonStore({
                                    	//storeId:'ShippingMethodId',
                                    	data:[],
                                    	fields:['variableFieldName']
                                    }),
                                   
                                    //valueField: 'id',
//                                    store: Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId')
//                	        		
                                    listeners : {
                                  //  	  blur : this.notifyByImage,
              	                        'focus' : 'HideMandatoryMessage'
                                    //select : 'onOrgSelect'
//                	          //          'focus' : 'HideMandatoryMessage'
//                   	                     }
                    	        	},
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'description',
	        			fieldLabel:AOCLit.Description,
	      		        listeners : {
		                    blur : this.notifyByImage,
		                    'focus' : 'HideMandatoryMessage'
	   	                     }
	        		},
	        		{
	        			xtype:'combobox',
	        			name: 'siteType',
	        			fieldLabel:AOCLit.siteType,
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
	        			fieldLabel:AOCLit.Contact
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'phone2',
	        			fieldLabel:AOCLit.phone2
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'address2',
	        			fieldLabel:AOCLit.address2
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'address4',
	        			fieldLabel:AOCLit.address4
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'city',
	        			fieldLabel:AOCLit.City
	        		
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'country',
	        			fieldLabel:AOCLit.Country
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'email',
	        			fieldLabel:AOCLit.Email,
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
	        			xtype:'combobox',
	        			name: 'partner_id',
	        			fieldLabel:AOCLit.partnerName,
	        			displayField:'partnerName',
						valueField:'id',
						reference:'partnerName',
					    store :'PartnerManagementStore',
					    disabled:true,
					    allowBlank: false,
      		            listeners : {
      		            //	 blur : this.notifyByImage,
   	                   
	                        'focus' : 'HideMandatoryMessage'
   	                     }
    	        		},
    	        	{
    	        			xtype:'combobox',
                  			name: 'orgCode',
                  			fieldLabel:AOCLit.orgCode,
                  			 displayField: 'name',
                  			 reference:'orgName',
                               valueField: 'id',
                               disabled:true,
                             store:Ext.create('AOC.store.OrgStore'),
              		        listeners : {
          	                    select : 'onOrgSelect',
          	                 'focus' : 'HideMandatoryMessage'
          	                 
              		        }
                    },
	        		{
	        			xtype:'combo',
	        			name: 'freightTerms',
	        			fieldLabel:'Freight Terms',
	        			queryMode :'local',
	                    displayField: 'variableFieldName',
	                    reference:'freightTerms',
	                    valueField: 'variableFieldName',
	                    disabled:true,
	                    store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId'),
	                    		listeners : {
	         		            //	 blur : this.notifyByImage,
	      	                   
	   	                        'focus' : 'HideMandatoryMessage'
	      	                     }
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'shippingInstructions',
	        			fieldLabel:AOCLit.shippingInstructions
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'siteNumber',
	        			fieldLabel:AOCLit.siteNumber,
	        		    allowBlank: false,
	      		        listeners : {
		                    blur : this.notifyByImage,
		                    'focus' : 'HideMandatoryMessage'
	   	                     }
	        			
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'phone1',
	        			fieldLabel:AOCLit.Phone1
	        			
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'address1',
	        			fieldLabel:AOCLit.address1
	        			
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'address3',
	        			fieldLabel:AOCLit.address3
	        			
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'fax',
	        			fieldLabel:AOCLit.fax
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'state',
	        			fieldLabel:AOCLit.state
	        		},
	        		{
	        			xtype:'textfield',
	        			name: 'zip',
	        			fieldLabel:AOCLit.Zip
	        		
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
		    		   config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.successImageSrc+');background-repeat:no-repeat;background-position:right;');
					else
					   config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.errorIcon+');background-repeat:no-repeat;background-position:right;');
		     }
                 });
