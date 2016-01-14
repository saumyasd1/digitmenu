Ext.define('AOC.view.address.AddressController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.addressMain',
    requires : ['AOC.view.orderqueue.SalesOrderExpandableGrid','AOC.view.advsearch.AddressAdvanceSearch','AOC.util.Helper'],
    runTime : AOC.config.Runtime,
    getAddressBasedOnSearchParameters: function() {
		 	var valueObj=this.getView().getForm().getValues(false,true);
		 	var FromDate=this.lookupReference('fromDate').getValue();
		 	var ToDate=this.lookupReference('toDate').getValue();
		 	if(FromDate<=ToDate)
		 		{
	    	if(!valueObj.hasOwnProperty('datecriteriavalue'))
	    		valueObj.datecriteriavalue='createdDate';
			var parameters=Ext.JSON.encode(valueObj);
	    	var grid=this.runTime.getActiveGrid();
	    	var store=grid.store;
	        store.proxy.setFilterParam('query');
	        store.setRemoteFilter(true);
	        if (!store.proxy.hasOwnProperty('filterParam')) {
	            store.proxy.setFilterParam('query');
	        }
	        store.proxy.encodeFilters = function(filters) {
	            return filters[0].getValue();
	        };
	        store.filter({
	        	id: 'query',
	            property:'query',
	            value:parameters
	        });
	        grid.down('#clearadvanedsearch').show();
	        this.getView().up('window').hide();
		 		}
		 	 else
		 		 {
				    var addresssearch=Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
				        addresssearch.down('#messageFieldItemId').setValue('<center><font color=red>From Date must be less than or equal to To Date</font></center>').setVisible(true);
		 		 }
		},
		clearAdvancedSerach:function(widget){
			 var temp=Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
			 temp.destroy();
			 var grid=this.getView();
			   	var store = grid.store;
				store.clearFilter();
				widget.setVisible(false);
				var temp=grid.down('#advancesearchbutton');
			    temp.enable();
		},
		getQuickSearchResults:function(cmp){
			var store=this.getView().store;
			   var value=cmp.getValue();
			   if(value!=null && value!=''){
		       store.proxy.setFilterParam('query');
		       var parameters='{"partnerName":"'+value+'"}';
		       store.setRemoteFilter(true);
		       if (!store.proxy.hasOwnProperty('filterParam')) {
		           store.proxy.setFilterParam('query');
		       }
		       store.proxy.encodeFilters = function(filters) {
		           return filters[0].getValue();
		       };
		       store.filter({
		    	   id: 'query',
		           property:'query',
		           value:parameters
		       });
			   }
			   cmp.orderedTriggers[0].show();
		},
		   getSearchResults:function(cmp,e){
			   var me=this;
			   if (e.getKey() == e.ENTER) {
				   me.getQuickSearchResults(cmp);
			   }
		   },
		   clearSearchResults:function(cmp){
			   var grid=this.getView();
			   	var store = grid.store;
				store.clearFilter();
				store.loadPage(1);
				cmp.setValue('');
				cmp.orderedTriggers[0].hide();
		   },
	openAdvancedSearchWindow:function(e, t, eOpts){
		var temp=Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
		 if(!temp){
				 temp = Ext.create('Ext.window.Window',{
						 	height:330,
							width:560,
							//title:advancedSearchWindowTitle,
							itemId:'addressAdvancedSerachwindow',
							layout: 'fit',
							draggable: false,
							modal:true,
							closeAction:'hide',
						 	items : [{  xtype : 'addressadvancesearch' }]
					 });
		         }
					if (Ext.isIE || Ext.isGecko) {
						browser = "IE";
						 var d = Ext.get(e.getTarget());
						 var width = temp.width;
						 width=width-25; 
						 x=d.getX();
						 y=d.getY();
						//box = this.getBox();
	   	        		temp.showAt(x-width,y+26);
					}
					else if (Ext.isChrome || Ext.isSafari) {
						 browser = "Chrome";
						 var d = Ext.get(e.getTarget());
						 var width = temp.width;
						 width=width-24;
						 x=d.getX();
						 y=d.getY();
	   	        		 temp.show();
					}
					return false;	
	},
	openAddAddressWindow:function(currentRecord,id){
		var mode=this.runTime.getWindowInEditMode();
		var win=Ext.ComponentQuery.query('#createaddressmanageItemId')[0];
		var title=mode ?'Edit Address':'Add Address';
		if(!win){
		    var data={"id":""};
		    win=Ext.create('AOC.view.address.AddAddress',{
			modal:true,
			rec:currentRecord,
			editMode:mode,
			ID:id
		});
	    win.down('#titleItemId').setValue('<font size=3><b>'+title+'</b></font>').setVisible(true);
		win.show();
		}
	},
	saveAddressDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var Msg='';
		var createaddress=this.getView();
		var grid=Ext.ComponentQuery.query('#AddressManageGriditemId')[0];
		var panel=createaddress.down('#listPanel');
		var valueObj='',form=this.getView().down('form');
		var editMode=this.getView().editMode,url='';
		var methodMode='';
		var length=0;
		if(editMode){
			ID=createaddress.ID;
			url=applicationContext+'/rest/address/'+ID;
			form.updateRecord();
			methodMode='PUT';
			valueObj=form.getRecord().getChanges() ;
			length=Object.keys(valueObj).length;
			Msg='Address Updated Successfully';
			var parameters=Ext.JSON.encode(valueObj);
		}
		else{
			url=applicationContext+'/rest/address';
			valueObj=form.getValues(false,true,false,true);
			methodMode='POST';
			length=1;
			Msg='Address Added Successfully';
			var parameters={
					orgCode:valueObj.orgCode,
					partnerName:valueObj.partnerName,
					siteNumber:valueObj.siteNumber,
					description:valueObj.description,
					address1:valueObj.address1,
					address2:valueObj.address2,
					address3:valueObj.address3,
					address4:valueObj.address4,
					address:valueObj.address,
					city:valueObj.city,
					state:valueObj.state,
					country:valueObj.country,
					zip:valueObj.zip,
					contact:valueObj.contact,
					phone1:valueObj.phone1,
					phone2:valueObj.phone2,
					fax:valueObj.fax,
					email:valueObj.email,
					shippingMethod:valueObj.shippingMethod,
					freightTerms:valueObj.freightTerms,
					shippingInstructions:valueObj.shippingInstructions,
					siteType:valueObj.siteType,
					partner:{id:valueObj.partner_id}
		    	}
		}
	
		if(length>0){
			if(panel.getForm().isValid()){
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
		        success : function(response, opts) {
		        	    Ext.getBody().unmask();
		        	    createaddress.destroy();
		        	    AOC.util.Helper.fadeoutMessage('Success',Msg);
			  			grid.store.load();
				  		
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
		        	createaddress.destroy();
              }
      	});
		}else{
			createaddress.down('#messageFieldItemId').setValue('<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please fill valid entry in the field marked as <img src='+errorIcon+' width="15" height="15"></font>').setVisible(true);
		}
		this.runTime.setWindowInEditMode(false);
	}
	},
	onClickMenu:function(obj,rowIndex,colIndex,item,e,record){
	      var me=this;
	      var callout = Ext.widget('callout', {
	          cls                  : 'white more-menu-item-callout extra',
	          html                 : me.buildMenuTpl.apply("{}"),
	          target               : e.target,
	          calloutArrowLocation : 'top-left',
	          relativePosition     : 't-b',
	          relativeOffsets      : [52,23],
	          dismissDelay         : 0,
	          listeners            : {
                  afterrender : me.onAfterRenderEditCallout,
                  edit: function(cmp){
                	  currentRecord=e.record;
                	  var id=currentRecord.get('id');
                	  me.runTime.setWindowInEditMode(true);
  		        	  var mode=me.runTime.getWindowInEditMode();
  		  		      var win=Ext.ComponentQuery.query('#createaddressmanageItemId')[0];
  		  		      var title=mode ?'Edit Address':'Add Address';
  		  		if(!win){
  		  		    var data={"id":""};
  		  		    win=Ext.create('AOC.view.address.AddAddress',{
  		  			modal:true,
  		  			rec:currentRecord,
  		  			editMode:mode,
  		  			ID:id
  		  		});
  		  	    win.down('#titleItemId').setValue('<font size=3><b>'+title+'</b></font>').setVisible(true);
  		  		win.show();
  		  		}
                  	callout.destroy();
                  },
                  deleteaddress: function(cmp){
                	  currentRecord=e.record;
                		var ID=record.get('id');
                		Ext.Msg.confirm('Alert','<b>Are you sure you want to delete the Address?</b>',function(btn){
                			  if(btn=='yes'){
                					Ext.Ajax.request({
                							method:'DELETE',
                							url:applicationContext+'/rest/address/'+ID,
                				        success : function(response, opts) {
                				            AOC.util.Helper.fadeoutMessage('Success','Address Deleted Succesfully');
                							me.runTime.getActiveGrid().store.load();
                				        },
                				        failure: function(response, opts) {
                		                }
                		        	});
                			  }
                		});
                  	callout.destroy();
                  }
              }
	          });
	      callout.show();   
	  },
	  onAfterRenderEditCallout : function(cmp){
	        var me = this;
	        cmp.el.on({
	            delegate: 'div.user-profile-menu-item',
	            click    : function(e,element){
	                var el    = Ext.get(element),
	                    event = el.getAttribute('event');
	                if (event && !el.hasCls('edit-menu-disabled')){
//	                    cmp.destroy();
	                    me.fireEvent(event);
	                }
	            }
	        });
	    },
	  buildMenuTpl : function(){
	    	  var me=this;
	    	 return Ext.create('Ext.XTemplate',
	    	      '<div style="width: 140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="edit"">Edit</div>',
	              '</tpl>',
	              '<div style="width: 140px !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="deleteaddress"">Delete</div>',
	              '</tpl>'
	          );
	       },
	closeWindow: function(){
		Ext.getBody().unmask();
		this.getView().destroy();
		this.runTime.setWindowInEditMode(false);
		var grid=Ext.ComponentQuery.query('#AddressManageGriditemId')[0];
		grid.store.load();
	},
	deleteResource:function(record){
		var ID=record.get('id');
		var me=this;
		Ext.Msg.confirm('Alert','<b>Are you sure you want to delete the Address?</b>',function(btn){
			  if(btn=='yes'){
					Ext.Ajax.request({
							method:'DELETE',
							url:applicationContext+'/rest/address/'+ID,
				        success : function(response, opts) {
							Ext.Msg.alert('Alert Message','<b>Address Deleted Succesfully</b>');
							me.runTime.getActiveGrid().store.load();
				        },
				        failure: function(response, opts) {
		                }
		        	});
			  }
		});
	},
	 HideMandatoryMessage:function(){
		   var createaddress=this.getView();
		   createaddress.down('#messageFieldItemId').setValue('').setVisible(true);
		   createaddress.down('#messageFieldItemId').setHidden('true');
	   },
	  notifyByMessage:function()
	    {
		  var addresssearch=Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
		  addresssearch.down('#messageFieldItemId').setValue('').setVisible(true);
		  addresssearch.down('#messageFieldItemId').setHidden('true');
	    }
});