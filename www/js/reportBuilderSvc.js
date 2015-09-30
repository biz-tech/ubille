//
// Report Service
//
// This service provides a dummy document definition for the purpose of this sample.  In 
// my real world usage, I split documentDef creation from the reportPDF creation.  The RptBuilderSvc
// is used to receive inputs and return a JSON object w/ the report declarations.  This mock svc
// just creates some random progress matrix and draws a table to display.  The pdfMake.org site
// has a nice playground for drafting your report pieces.  My plan is to share the ionic-pdf
// so users can incorporate PDF generation and focus on creating their docDefs and using ionic-pdf
// to easily render
(function() {
    'use strict';
    // attach the factories and service to the [starter.services] module in angular
    angular.module('ubille.services')
        .service('ReportBuilderSvc', reportBuilderService);
	function reportBuilderService($rootScope) {
        var self = this;
        self.generateReport = _generateReport;    
		
		var d = new Date();
		var localaleDate = d.toLocaleDateString();
		
        function _generateReport() {		
			var externalDataRetrievedFromServer = [];
			for(i=1;i<$rootScope.items.length;i++){					
				externalDataRetrievedFromServer.push($rootScope.items[i]);	
			}		

			function buildTableBody(data, columns) {			
				var body = [];				
				body.push(columns);			    
				data.forEach(function(row) {				
					var dataRow = [];						
					columns.forEach(function(column) {													
						dataRow.push(row[column].toString());
					})			
					body.push(dataRow);
				});			
				return body;
			}			
			function table(data, columns) {						
				return {
					table: {
						headerRows: 1,
						widths:['15%','35%','10%','15%','15%','10%'],
						body: buildTableBody(data, columns)
					}
				};
			}		
			return { content: [
				
				{
					image : 'data:image/png;base64,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',
					fit : [70,70]
				},		
				{
					alignment: 'justify',
					columns: [				
				{
				text :'\nBizTech Inc\n159 W. Orangethorpe Ave, STE A\nPlacentia, CA 92870\nU.S.A.\nPhone : 949-954-85959\nFax : 714-961-7493\nWebsite : www.biztechus.com\n\n'		//line-height 넓히기 
				},
				{
						style: 'tableExample',
						table: {
						        widths:['100%'],
								body: [ 
									    /*[{text:'SalesOrder No', bold: true}],
										['SO9'],*/
										[{text:'Date',bold:true}],
										[localaleDate],
										[{text:'Company',bold:true}],
										[$rootScope.accountName],
										[{text:'Address',bold:true}],
										[$rootScope.accountStreet+', '+$rootScope.accountCity+', '+$rootScope.accountState]
								]
						}
				}]},		
				table(externalDataRetrievedFromServer, ['product_no','productname','itemQnt','unit_price','colorName','total']),
					{
						style: 'tableExample1',
							table: {
								widths:[196,47],								
								body: [
										[ 'Net Total($)', $rootScope.total],
										[ 'Discount('+$rootScope.dcPrice+')', $rootScope.discount],
										[ 'Tax:('+$rootScope.tax+'%)', $rootScope.sales],
										/*[ 'Shipping & Handling Charges', '0.00'],
										[ 'Shipping & Handling Tax', '0.00'],	*/									
										[ 'Grand Total($)', $rootScope.grandTotal]
								],
								pageBreak: 'after'
						}
				},
					{
						style: 'tableExample',
						table: {
								widths: ['100%'],
								body: [
										[{text:'Description',bold:true}],
										[ '']
								]
						}
				},
				{
						style: 'tableExample',
						table: {
								widths: ['100%'],
								body: [
										[{text:'Terms & Conditions',bold:true}],
										[ '']
								]
						}
				}
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 20]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		tableExample1:{
		   margin: [ 253, 0, 0, 30]
		}
	},
	defaultStyle: {
		// alignment: 'justify'
	}};
		};
    }
})();