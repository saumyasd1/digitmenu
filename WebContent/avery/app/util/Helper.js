Ext.define('AOC.util.Helper',{
    singleton : true,
    config : {
        mainContainerTip : null
    },
  getSwitchButtonHtml: function(event, status, cssClass){
	  var switchBorder='',
	  circlePadding;
	  if('on' == status){
		  circlePadding = '16px';
	  }else{
		  switchBorder = 'style="border:1px solid #bcbcbc;"';
		  circlePadding = '0px';
	  }
   var leftStyle = !Ext.isEmpty(cssClass)?'style="top:1px;"':'';
   cssClass = Ext.isEmpty(cssClass)?'':cssClass;
   var html = '<span class="text-style-switch'+cssClass+'">';
   //#AC-3110 Change the literal for off text.
    html +='<span class="onoff-text'+cssClass+'"><b>'+'InActive'+'</b></span>';
    html +='<div '+leftStyle+' event="'+event+'" class="onoffswitch">';
	html +='<label event="'+event+'"'+switchBorder+'  class="onoffswitch-label">';
	html +='<span event="'+event+'" class="onoffswitch-inner-'+status+'"></span>';
	html +='<span event="'+event+'" style="left:'+circlePadding+';" class="onoffswitch-switch"></span>';
	html +='</label>';
	html+='</div>';
	html +='<span class="on-text'+cssClass+'">'+'<b>Active'+'</b></span>';
    html+='</span>';
   return html;
  },
  getVariableComboStore:function(variableName){
	  var store=null;
	        var response = Ext.Ajax.request({
	            async: false,
	            url: applicationContext+'/rest/orderconfigurations/variable/'+variableName
	        });
	        var items = Ext.decode(response.responseText);
	      	var jsonValue=Ext.decode(response.responseText);
        	var serviceStoreData = [];
        	if(jsonValue.length>0){
        	jsonValue.forEach(function(item){
      		var service = [item];
      		serviceStoreData.push(service);
      	});
        	store =  Ext.create('Ext.data.ArrayStore',{
        		storeId:variableName+'id',
       	   		fields : ['variableFieldName'],	
  	            data : serviceStoreData
          });
        	return store;
  }else
	  return null;
	  
  },
  BulkUpdate:function(grid, selection, eOpts){
          if(selection.startCell)
				var store=grid.store;
                  var intialCell=selection.startCell;
                  var dataindex=intialCell.column.dataIndex;
                  var value=intialCell.record.get(dataindex);
                  var initialrowIdx=intialCell.rowIdx;
                  var lastrowIdx=selection.endCell.rowIdx;
                  var start=initialrowIdx,end=lastrowIdx;
                  if(lastrowIdx<initialrowIdx){
                  	start=lastrowIdx;
                  	end=initialrowIdx;
                  }
                  for(var i=(start+1);i<=end;i++){
                      store.getAt(i).set(dataindex,value);
                  }
  	},
    getCodeStore:function(type){
  	  var store=null;
  	    var store=null;
        var response = Ext.Ajax.request({
            async: false,
            url: applicationContext+'/rest/code/type/'+type
        });
        var items = Ext.decode(response.responseText);
      	var jsonValue=Ext.decode(response.responseText);
    	var serviceStoreData = [];
    	if(jsonValue.length>0){
    	jsonValue.forEach(function(item){
  		var service = item;
  		serviceStoreData.push(service);
  	});
    	store =  Ext.create('Ext.data.Store',{
    		storeId:type+'id',
    		fields : ['code','value'],	
	            data : serviceStoreData
      });
    	return store;
}else
  return null;
          	return store;
    }
});
