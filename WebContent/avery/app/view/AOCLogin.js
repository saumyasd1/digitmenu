Ext.define('AOC.view.AOCLogin',{
	extend:'Ext.form.Panel',
	alias:'widget.aocLogin',
	itemId:'aocLoginItemId',
	bodyPadding: 5,
	width: 600,
	border:true,
    modal:true,
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                layout: {
                	type: 'vbox',
                	align: 'center',
                	pack: 'center'
                	},
                title: '<B><font size=4><center>Welcome to Accelerated Order Capture</center></font></B>'
            });
            this.callParent(arguments);

        },
        buildItem:function(){
        	var me=this;
        	return [{
        		items: [
							{
								xtype:'displayfield',
								itemId:'messageFieldItemId',
								vale:'',
								hidden:false
							},
					      {
        		            xtype: 'form',        
        		            frame: true,         
        		            bodyPadding:30,
        		            border:true,
        		            title:'<B>LOGIN</B>',
        		            defaults: {             
        		                xtype: 'textfield', 
        		                labelWidth : 65,
        			            width : 350,
        			            height:10,
        			            allowBlank:false
        		            },
        		            items: [
        		                {
        		                    name: 'userName',    
        		                    fieldLabel: "<B>UserName</B>",
        		                    blankText : 'UserName Field is required',
        		                    emptyText:'USERNAME'
        		                },
        		            	{
        		                	xtype :'tbspacer',
        		                	width :20
        		        		},
        		                {   
        		                    name: 'password',
        		                    fieldLabel: "<B>Password</B>",
        		                    inputType: 'password',
        		                    blankText : 'Password Field is required',
        		                    emptyText:'PASSWORD'
        		                },
        		                {
        		                	xtype :'tbspacer',
        		                	width :20,
        		                	height:10
        		        		},
        		                {
        		                	xtype :'button',
        		                	text : 'LOGIN',
        		                	labelWidth : 65,
             			            width : 350,
             			            height:30,
        		                	handler: function() 
        		                	{
        		                		valueObj=me.form.getValues(false,true,false,true);
        		                		var UserName=valueObj.userName;
        		                		var password=valueObj.password;
        		                		if(UserName=="aoc_user" && password=="indigo1")
        		                		{
        		                			var activeCard=Ext.ComponentQuery.query("#viewportitemid")[0];
        		                			activeCard.getLayout().setActiveItem(1);
        		                			var menuStore=Ext.create('AOC.store.MenuStore');
        		                        	var menuController=myAppGlobal.getController('MenuController');
        		                        	menuStore.on({
        		                        		load : menuController.onLoadMenuBar
        		                        	});
        		                		}else{
        		                			var Msg=me.down('#messageFieldItemId');
        		                			Msg.setValue('Either UserName or Password is not correct');
        		                		}
        		                	}
        		                }
        		            ]
        		        }
        		    ],
        	}]
        },
        notifyByMessage : function(config){
			   var me = this;
			   if(config.up('#listPanel').ownerCt){
				   if(config.up('#listPanel').ownerCt.editMode)
					       config.up('#listPanel').ownerCt.setTitle('Edit Partner');
				   else
					       config.up('#listPanel').ownerCt.setTitle('Add Partner');
			   }
		   }
		 
                 });
