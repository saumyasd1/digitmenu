Ext.define('AOC.view.partner.CreatePartner',{
	extend:'AOC.view.base.BaseWindow',
	alias:'widget.createpartner',
	itemId:'createpartnerItemId',
	controller:'partnerMain',
	bodyPadding: 5,
	width: 350,
	border:false,
    modal:true,
    draggable:false,
    editMode:false,
    rec:null,
    partnerId:null,
    partnerName:null,
    buttonAlign:'center',
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
            	text : 'Save',
                handler : 'SaveDetails'
            },
            {
            	text : 'Cancel',
                handler : 'CancelDetails'
            }];
        },
        buildItem:function(){
        	var me=this;
        	return [{
        		xtype:'displayfield',
        		itemId:'titleItemId',
        		value:'',
        		hidden:false,
        		margin : '5 0 0 120'
        	   },
        	  {
        		xtype:'displayfield',
        		itemId:'messageFieldItemId',
        		value:'',
        		hidden:true
        	},{
        		xtype:'form',
        		itemId:'listPanel',
        		border:false,
        		items:[{
        	
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'top',
        			name: 'partnerName',
        			fieldLabel:'Partner Name',
        			value:'',
        		    labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
		            width : 300,
		            maxLength : '250',
		            margin : '5 0 0 15',
		            blankText : 'Partner Name is required',
		            enforceMaxLength: true,
		            listeners : {
		            	blur : this.notifyByImage,
	                	'focus' : 'HideMandatoryMessage'
   	          }
        		},
        		{
                	xtype :'tbspacer',
                	width :20
        		},
        		{
        			xtype:'textfield',
        			itemId:'AItemId',
        			labelAlign:'top',
        			name: 'address',
        			fieldLabel:'Address',
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 300,
  		            margin : '5 0 0 15',
  		            blankText : 'Address is required',
  		            maxLength : '500',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	        blur : this.notifyByImage,
  		            	      'focus' : 'HideMandatoryMessage'
         	                     }
        		},
        		{
                	xtype :'tbspacer',
                	width :10
        		},
        		{
        			xtype:'textfield',
        			itemId:'CPItemId',
        			labelAlign:'top',
        			name: 'contactPerson',
        			fieldLabel:'Contact Person',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 300,
  		            margin : '5 0 0 15',
  		            blankText : 'Contact Person is required',
  		            maxLength : '100',
  		            enforceMaxLength: true,
   		            listeners : {
   		            	    blur : this.notifyByImage,
   		            	 'focus' : 'HideMandatoryMessage'
     	              
     	                        }
        		},
        		{
        		
        			xtype:'textfield',
        			itemId:'phone',
        			labelAlign:'top',
        			name: 'phone',
        			fieldLabel:'Phone',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 300,
  		            margin : '5 0 0 15',
  		            blankText : 'Phone is required(should contains - and digits)',
  		            maxLength : '100',
  		            regex:/^(\d+-?)+\d+$/,
  		            enforceMaxLength: true,
  		            listeners : {
  		            	        blur : this.notifyByImage,
  		            	      'focus' : 'HideMandatoryMessage'
  	     	                    }
  		         
        		},
        		  {
                	xtype :'tbspacer',
                	width :100
        		},
        	{ buttons:this.buildButtons()}
               ]
        	}]
        },
		   notifyByImage : function(config){
		    	 if(config.isValid())
		    		   config.setFieldStyle('background-image:url('+successImageSrc+');background-repeat:no-repeat;background-position:right;');
					else
					   config.setFieldStyle('background-image:url('+errorIcon+');background-repeat:no-repeat;background-position:right;');
		     },
		     
        SaveDetails:function(){
        	var me=this;
        	if(me.editMode){
        		this.SaveDetails();
        	}else{
        		this.SaveDetails();
        	}
        }
                 });
