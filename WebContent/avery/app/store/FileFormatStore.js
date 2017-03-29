Ext.define('AOC.store.FileFormatStore', {
	extend : 'Ext.data.Store',
	fields:['name','v'],
	data:[{name:'Excel (xlsx)', v:'1'},{name:'Excel (xls)', v:'2'},{name:'Excel (xlsx & xls)', v:'3'},
	      {name:'Email Content', v:'4'},{name:'Readable pdf', v:'5'},{name:'Text (html)', v:'6'},
	      {name:'Text (htm)', v:'7'},{name:'Word (doc)', v:'8'},{name:'Word (docx)', v:'9'},{name:'Word (doc & docs)', v:'10'},
	      {name:'Zip->pdf', v:'11'},{name:'Zip->doc', v:'12'},{name:'Zip->docs', v:'13'},{name:'Zip->doc&docs', v:'14'},
	      {name:'Zip->xls', v:'15'},{name:'Zip->xlsx', v:'16'},{name:'Zip->xls&xlsx', v:'17'}
	]
});

