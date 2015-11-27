Ext.define('AOC.view.partner.PartnerManagementGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.view.partner.PartnerProductLineGrid','AOC.view.ux.CustomSearchField','AOC.util.Helper'],
	controller:'partnerMain',
	itemId : 'PartnerMangementitemId',
    alias : 'widget.partnermanagementgrid',
	emptyText:'<div align=center> No data to display.</div>',
	recordBeingEdit:null,
	initComponent : function(){
	var me=this;
    Ext.apply(this,{
    	actionTpl   : me.buildActionTpl(),
        columns : this.buildColumns(),
		columnLines:true,
        tbar: { height: 40,
    		    items : me.buildtbar()
              },
        dockedItems : this.buildDockedItems(),
        viewConfig : {
	            stripeRows : false,
	            enableTextSelection : true
        }
    });
    this.on({
        scope:this,
        cellclick :this.onCellClickToView
    });
       this.callParent(arguments);
  },
  buildColumns : function(){
    	var me=this;
        return [
        			    {  
            	            text : 'Partner Name',
            	          	width:120,
            	            sortable : true,
            	            dataIndex:'partnerName',
            	            flex:0.5
            	            
               			},
			            {
				        	text : 'Address',
				          	width:120,
				            sortable : true,
				            dataIndex:'address',
				            flex:1
			            },
			            {
				        	text : 'Contact Person',
				          	width:120,
				            sortable : true,
				            dataIndex:'contactPerson',
				            flex:0.5
			            },
			            {
				        	text : 'Phone',
				          	width:120,
				            sortable : true,
				            dataIndex:'phone',
				            flex:0.5
			            },
			            {
				            text : '',
				            xtype:'actioncolumn',
				            width:25,
				            baseCls:'custom-action',
				  	        items:[
				  	      {
				  	    	  icon:editIcon,
				  	    	  handler:'editpartnermanagement'
				  	      }]
                        },
                        {
				            text : 'Action',
				            width:140,
				            baseCls:'custom-action',
				  	    renderer: function(v,cell,rec){
			                return me.actionTpl.apply(rec.data);
			            }
                        },
                        {
				            text : '',
				            xtype:'actioncolumn',
				            width:25,
				            baseCls:'custom-action',
				  	        items:[
				  	      {
				  	    	  icon:menuIcon,
				  	    	  handler: 'showmenu'
				  	      }]
                        }
        ];
    },
    buildActionTpl : function(){
        var me = this;
        helper = AOC.util.Helper;
        return Ext.create('Ext.XTemplate',
        		  '{[this.getHtmlForSwitch(values)]}',
                 {
        	getHtmlForSwitch : function(v){
            		var event = '',
            		status='';
            		if(v.active ==true){
            			event = 'pause';
            		    status ='on';
            		}
            		else{
            			event = 'start';
            			status = 'off';
            		}
               return helper.getSwitchButtonHtml(event, status, '');
        	}
            }
        );
    },
	 onCellClickToView:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		 var me=this;
	            if(e.target.className.indexOf("onoffswitch">1))
	            {
	            	var status =record.get('active');
	            	Ext.MessageBox.confirm('Confirm Action', '<b>Are you sure,you want to change the status of this partner</b>', function(response) {
	     				  if (response == 'yes') {
	     					  var parameters='{\"active\":'+!status+'}';
	     						Ext.Ajax.request( {
	     							method:'PUT',
	     							url:applicationContext+'/rest/partners/'+record.get('id'),
	     							jsonData : parameters,
       				            success : function(response, opts) {
       								Ext.Msg.alert('Alert Message','<b>Partner status changed Succesfully</b>');
       							me.store.load();
       				        },
       				        failure: function(response, opts) { 
       				        	
       				        }
       		        	});
	     				  }else if(response == 'no'){
	     				  return true;
             }
	            });
	 }
	 },
	 buildtbar:function(){
		var me=this;
			return [
				  {
		              icon: addImage,
		              text:'New',
		              itemId : 'newPartner',
		              handler:'createpartner',
		              hidden:false
		              },
		          '->',
		      	     {
		            	xtype: 'customsearchfield',
		            	searchCriteria:'',
		    			store : Ext.data.StoreManager.lookup(me.store),
		    			width: 200,
		    			emptyText: "Quick Search:Partner Name "
					 },
				       {
							xtype:'button',
							itemId:'advancesearchbutton',
							text:advSearchText,
							icon: advSearchIcon,
							iconAlign: "right",
					    	handler:'openAdvancedSearchWindow'
					       
						 },
					{
						itemId: 'clearadvanedsearch',
						hidden:true, 
						handler : 'clearAdvancedSerach',
						icon: clearSearchIcon
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