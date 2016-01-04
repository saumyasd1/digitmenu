Ext.define('AOC.view.users.manage.UserGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.view.ux.CustomSearchField'],
	itemId : 'usersgriditemId',
    alias : 'widget.usersgrid',
    controller:'userMain',
	emptyText:'<div align=center> No data to display.</div>',
	recordBeingEdit:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
        columns : this.buildColumns(),
		columnLines:false,
        tbar: { height: 40,
    		    items : me.buildtbar()
              },
        dockedItems : this.buildDockedItems(),
        listeners:{
      	  activate:function(obj){
       		 var store= Ext.data.StoreManager.lookup('UserStoreId');
       		 if(store==null){
       			 store=Ext.create('AOC.store.UserStore', {
       					extend : 'Ext.data.Store',
       					model:'AOC.model.UserModel',
       					autoLoad : true,
       					pageSize:pageSize,
       					storeId:'UserStoreId',
       					proxy : {
       						type : 'rest',
       						url : applicationContext+'/rest/users',
       						reader:{
       					        type:'json', 
       					        rootProperty: 'users',
       					        totalProperty: 'totalCount'
       					    }
       				}
       				});
       			 obj.bindStore(store);
       		 }
       		 store.load();
       	  }
        },
        viewConfig : {
	            stripeRows : true,
	            enableTextSelection : true
        }
    });
       this.callParent(arguments);
  },
  buildColumns : function(){
    	var me=this;
		        return [     {
		            xtype:'actioncolumn',
		            width:25,
		            baseCls:'custom-action',
			  	        items:[
			  	      {
					  	    	  icon:menuIcon,
					  	    	  handler: 'onClickMenu',
					  	    	
			  	      }]
			        },  
	        			{  
            	            text : 'First Name',
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'firstName',
            	            flex:0.5
            	            
               			},
			            {
				        	text : 'Last Name',
				          	width:120,
				            sortable : true,
				            dataIndex:'lastName',
				            flex:1
			            },
			            {
				        	text : 'Role',
				          	width:120,
				            sortable : true,
				            dataIndex:'role',
				            flex:0.5
			            },
			            {
				        	text : 'Email',
				          	width:120,
				            sortable : true,
				            dataIndex:'email',
				            flex:0.5
			            }
        ];
    },
	 buildtbar:function(){
		var me=this;
			return [
			        {
						xtype : 'tbtext',
						itemId : 'UsertextItemId',
						text : '<div style="color:"><b>Users</b></div>'
		               },
		               {
		                	xtype :'tbspacer',
		                	width :10
		        		},
				  {
		              icon: addImage,
		              text:'New',
		              itemId : 'newUser',
		              handler:'createuser',
		              hidden:false
		              },
		          '->',
		      	     {
		            	xtype: 'customsearchfield',
		            	searchCriteria:'',
		    			store : Ext.data.StoreManager.lookup(me.store),
		    			width: 200,
		    			emptyText: "Search Partner Name "
					 }
		          ];
	},
	 buildDockedItems : function(){
    	var me=this;
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            ui : 'darktoolbar',
            itemId:'pagingtoolbar',
            store:me.store,
            displayInfo:true,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});