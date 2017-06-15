Ext.define('AOC.view.address.CreateAddressManage',{
	extend:'Ext.window.Window',
	alias:'widget.createaddressmanage',
	itemId:'createaddressmanageItemId',
	bodyPadding: 5,
	width: 1000,
	border:false,
    modal:true,
    draggable:false,
    editMode:false,
    rec:null,
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                listeners:{
            	'afterrender':function(obj){
            	if(me.rec!=null){
            		var form=me.down('form').loadRecord(me.rec);
            	}
            }
            }
            });
            this.callParent(arguments);

        },
        buildButtons : function(){
            return [{
            	text : AOCLit.Save,
                scope : this,
                action : 'SaveDetails'
            },
            {
            	text : AOCLit.Cancel,
                scope : this,
                action : 'CancelDetails'
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
        		items:[{
        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'right',
        			name: 'orgCode',
        			fieldLabel:AOCLit.orgCode,
        			value:'',
        		    labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
		            width : 400,
		            labelSeparator : '',
		            labelAlign:'right',
		            maxLength : '50',
		            blankText : AOCLit.nameFieldReqd,
		            enforceMaxLength: true,
		            value:me.rec==null?'':me.rec.orgCode
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'combobox',
        			itemId:'SMItemId',
        			labelAlign:'right',
        			name: 'shippingmethod',
        			fieldLabel:AOCLit.shippingMethod,
        			emptyText:AOCLit.shippingMethod,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            blankText :  AOCLit.nameFieldReqd,
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.shippingmethod,
  		            listeners : {
        	                	focus : this.notifyByMessage
        	                     }
        		
        		}]
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'right',
        			name: 'partnerName',
        			fieldLabel:AOCLit.partnerName,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            blankText :  AOCLit.nameFieldReqd,
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.partnerName,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'combobox',
        			itemId:'FTItemId',
        			labelAlign:'right',
        			name: 'freightTerm',
        			fieldLabel:AOCLit.freightTerm,
        			emptyText:AOCLit.freightTerm,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
   		            blankText : ' is required',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.freightTerm,
   		            listeners : {
     	                	focus : this.notifyByMessage
     	                     }
        		
        		}]
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'DItemId',
        			labelAlign:'right',
        			name: 'description',
        			fieldLabel:AOCLit.Description,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.description
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'SItemId',
        			labelAlign:'right',
        			name: 'shippingInstruction',
        			fieldLabel:AOCLit.shippingInstructions,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.shippingInstruction,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'BTSNItemId',
        			labelAlign:'right',
        			name: 'billToSiteNumber',
        			fieldLabel:AOCLit.billToSiteNumber,
        			Wrap:false,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth :120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.billToSiteNumber
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'STSNItemId',
        			labelAlign:'right',
        			name: 'siteToSiteNumber',
        			fieldLabel:AOCLit.siteToSiteNumber,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            //minLength:'6',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.siteToSiteNumber,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'BTCItemId',
        			labelAlign:'right',
        			name: 'billContact',
        			fieldLabel:AOCLit.billContact,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.billContact
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'STCItemId',
        			labelAlign:'right',
        			name: 'shipContact',
        			fieldLabel:AOCLit.shipContact,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            //minLength:'6',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.shipContact,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'BTPItemId',
        			labelAlign:'right',
        			name: 'billToPhone1',
        			fieldLabel:AOCLit.billToPhone1,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.billToPhone1
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'STPItemId',
        			labelAlign:'right',
        			name: 'shipToPhone1',
        			fieldLabel:AOCLit.shipToPhone1,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            //minLength:'6',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.shipToPhone1,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'BTP2ItemId',
        			labelAlign:'right',
        			name: 'billToPhone2',
        			fieldLabel:AOCLit.billToPhone2,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.billToPhone2
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'STP2ItemId',
        			labelAlign:'right',
        			name: 'shipToPhone2',
        			fieldLabel:AOCLit.shipToPhone2,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            //minLength:'6',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.shipToPhone2,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'A1ItemId',
        			labelAlign:'right',
        			name: 'address1',
        			fieldLabel:AOCLit.address1,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.address1
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'A2ItemId',
        			labelAlign:'right',
        			name: 'address2',
        			fieldLabel:AOCLit.address2,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.address2,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'A3ItemId',
        			labelAlign:'right',
        			name: 'address3',
        			fieldLabel:AOCLit.address3,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.address3
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		//me.line(),
        		{
        			xtype:'textfield',
        			itemId:'A4ItemId',
        			labelAlign:'right',
        			name: 'address4',
        			fieldLabel:AOCLit.address4,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.address4,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'CityItemId',
        			labelAlign:'right',
        			name: 'city',
        			fieldLabel:AOCLit.City,
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.city
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'StateItemId',
        			labelAlign:'right',
        			name: 'state',
        			fieldLabel: AOCLit.state,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.state,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'ZipItemId',
        			labelAlign:'right',
        			name: 'zip',
        			fieldLabel:AOCLit.Zip,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.zip,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'CountryItemId',
        			labelAlign:'right',
        			name: 'country',
        			fieldLabel:AOCLit.Country,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            //minLength:'6',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.country,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 10',
                    items:[{
        			xtype:'textfield',
        			itemId:'BTEmailItemId',
        			labelAlign:'right',
        			name: 'billToEmail',
        			fieldLabel:AOCLit.billToEmail,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 120,
  		            width : 400,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		           // maxLength : '50',
  		            //minLength:'6',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.billToEmail,
  		            listeners : {
         	                	focus : this.notifyByMessage
         	                     }
        		
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'BTFaxItemId',
        			labelAlign:'right',
        			name: 'billToFax',
        			fieldLabel:AOCLit.billToFax,
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            //minLength:'6',
  		            enforceMaxLength: true,
  		            value:me.rec==null?'':me.rec.billToFax,
  		            listeners : {
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
        SaveDetails:function(){
        	var me=this;
        	if(me.editMode){
        		this.SaveDetails();
        	}else{
        		this.SaveDetails();
        	}
        },
        line:function(){
        	var line=Ext.create({
        		   xtype: 'draw', 
        		   renderTo: document.body,
        		   width: 600,
        		   height: 400,
        		   sprites: [{
        		       type: 'line',
        		       fromX: 0,
        		       fromY: 0,
        		       toX: 180,
        		       toY: 0,
        		       strokeStyle: '#1F6D91',
        		       lineWidth: 3
        		   }]
        		});
        	return line
        }
        
                 });