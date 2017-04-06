Ext.define('AOC.store.FileFormatStore', {
	extend : 'Ext.data.Store',
	fields:['name'],
	data:[{name:'Excel (xlsx)'},{name:'Excel (xls)'},{name:'Excel (xlsx & xls)'},
	      {name:'Email Content'},{name:'Readable pdf'},{name:'Text (html)'},
	      {name:'Text (htm)'},{name:'Word (doc)'},{name:'Word (docx)'},{name:'Word (doc & docs)'},
	      {name:'Zip->pdf'},{name:'Zip->doc'},{name:'Zip->docs'},{name:'Zip->doc&docs'},
	      {name:'Zip->xls'},{name:'Zip->xlsx'},{name:'Zip->xls&xlsx'}
	]
});

