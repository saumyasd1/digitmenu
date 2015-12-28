Ext.define('AOC.view.AOCLogin',{
	extend:'Ext.Container',
	alias:'widget.aoclogin',
	itemId:'aocLoginItemId',
	initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                layout: {
                	type: 'vbox',
                	align: 'center',
                	pack: 'center'
                	}
            });
            this.callParent(arguments);

        },
        buildItem:function(){
        	var me=this;
        	return [{
        		            xtype: 'form',        
        		            bodyPadding:'30 50 50 50',
        		            border:true,
        		            bodyStyle:{"border-radius":"10px"},
        		            style  : AOC.config.Settings.getBaseBackgroundColor(),
        		            layout: {
        	                	type: 'vbox',
        	                	align: 'center',
        	                	pack: 'center'
        	                	},
        		            defaults: {             
        		                xtype: 'textfield', 
        			            width : 350,
        			            hideLabel:true,
        			            height:40,
        			            allowBlank:false
        		              },
        		               items: [{
				       xtype:'image',
				       border:false,
				       width:100,
				       height:100,
				       src:'avery/resources/images/logo_avery.gif'
				        },
				        {
				         xtype:'component',
				         html:'<div style="width:100%;text-align:center;font-size:18px;font-weight:500;">Accelerated Order Capture</div>'
				        },
        		                {
        		                    name: 'username',
        		                    margin:'30 0 0 0',
        		                    blankText : 'UserName Field is required',
        		                    emptyText:'Username'
        		                },
        		                {   
        		                    name: 'password',
        		                    inputType: 'password',
        		                    margin:'-1 0 0 0',
        		                    itemId:'loginpasswordfield',
        		                    blankText : 'Password Field is required',
        		                    emptyText:'Password',
        		                    listeners: {
        			               	specialkey:function(fld,event,eop){
        			               		 if (event.keyCode == Ext.EventObject.ENTER && !Ext.isEmpty(fld.getValue())){
        			               		 me.fireEvent('login',me);	
        			               		 }
        			               	}
        		                    }
        		                },
        		                {
        		                    xtype:'fieldcontainer',
        		                    margin:'10 0 0 0',
        		                    layout:'hbox',
        		                    items:[{
        		                    	xtype : 'checkbox',
        		                    	width:245,
        		                    	boxLabel : '<div style="padding:0px 0px 0px 0px !important;" >Remember me</div>',
        		                    	oldValue : false,
        		                    	listeners : {
        		                    		scope : this,
        		                    		change :function( cmp, newValue, oldValue){
        		                    		}
        		                    	}
        		                    
        		                    },{
        		                	xtype:'component',
        		                	flex:1,
        		                	html:'<div >Forgot Password?</div>'
        		                    }]
        		                },
        		                {
        		                	xtype :'button',
        		                	margin :'20 0 0 0',
        		                	text : 'LOGIN',
             			                width : 350,
             			                height:40,
        		                	handler: function() 
        		                	{
        		                	    me.fireEvent('login',me);
        		                	}
        		                }
        		            ]
        		        }
        		    ]
        }
		 
                 });
