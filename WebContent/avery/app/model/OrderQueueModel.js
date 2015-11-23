Ext.define('AOC.model.OrderQueueModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        {
		name : 'PartnerName',
		mapping : 'partner.partnerName',
		type: 'string'
	}, {
		name : 'RBOName',
		mapping : 'rboName',
		type: 'string'
	}, {
		name : 'ProductLineType',
		mapping : 'productLine.name',
		type: 'string'
	}, {
		name : 'Status',
		mapping : 'status',
		type: 'string'
	}, {
		name : 'ReceivedDate',
		mapping : 'receivedDate',
		type: 'string'
	}, {
		name : 'SenderEmailID',
		mapping : 'senderEmailID',
		type: 'string'
	}, {
		name : 'Subject',
		mapping : 'subject',
		type: 'string'
	}, {
		name : 'EmailBody',
		mapping : 'emailBody',
		type: 'string'
	}, {
		name : 'ReceivedDate',
		mapping : 'receivedDate',
		type: 'string'
	}, {
		name : 'OrderSource',
		mapping : 'orderSource',
		type: 'string'
	}, {
		name : 'SubmittedBy',
		mapping : 'submittedBy',
		type: 'string'
	}, {
		name : 'OrderFile',
		mapping : 'OrderFile'
	}, {
		name : 'Comments',
		mapping : 'Comments',
		type: 'string'
	}, {
		name : 'Error',
		mapping : 'Error',
		type: 'string'
	},{
		name : 'attachmentFileList',
		mapping : 'attachmentFileList'
	},{
		name : 'attachmentPresent',
		mapping : 'attachmentPresent',
		type:'boolean'
	},
	{
	    name: 'orderFiles',
	    type: 'string',
	    convert: function( v, record ) {
	    	var attachmentFileList=[];
	    	var employees = [];
			employees.push({id:100,name:'Yashwant',age:30});	
	    	var OrderFile=[];
	        var order=record.get('orderFileAttachment');
	        var length= order.length;
	        var flag=false;
		      for(var i=0;i<length;i++){ 
		    	  var fileContentType=order[i].fileContentType;
		    	  if(fileContentType=='Order'){
		    		  OrderFile.push({fileName:order[i].fileName,id:order[i].id});
		    	  }else{
		    		  attachmentFileList.push({fileName:order[i].fileName,id:order[i].id});
		    		  flag=true;
		    	  }
		      }
	      	 record.set('attachmentPresent',flag);
	      	 record.set('attachmentFileList',attachmentFileList);
	         record.set('OrderFile',OrderFile);
	         record.commit();
	         return true;
	    }
	},
    ]
});