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
    
	function reportBuilderService() {
        var self = this;
        
        self.generateReport = _generateReport;            
        function _generateReport() {				
			return { content: [
				{
					alignment: 'justify',
					columns: [				
				{
				text :'BizTech Inc\n159 W. Orangethorpe Ave, STE A\nPlacentia, CA 92870\nU.S.A.\nPhone : 949-954-85959\nFax : 714-961-7493\nWebsite : www.biztechus.com\n\n'		//line-height 넓히기 
				},
				{
						style: 'tableExample',
						table: {
						        widths:['100%'],
								body: [ // 1라인씩 떨어뜨려서
									    [{text:'SalesOrder No', bold: true}],
										['SO9'],
										[{text:'Date',bold:true}],
										['30-09-15'],
										[{text:'Company',bold:true}],
										['Helloworld'],
										[{text:'Address',bold:true}],
										['123 W. helloworld ave, fullerton']
								]
						}
				}]},
				{
						style: 'tableExample',
							table: {
								widths:['20%','20%','10%','20%','20%','10%'],
								body: [
										[ {text:'Product No',bold:true}, {text:'Product Name',bold:true}, {text:'Quantity',bold:true}, {text:'List Price',bold:true},{text:'Discount',bold:true},{text:'Total',bold:true}],
										[ 'Pro18', 'Black Dress','1','78.00','0.00','78.00'],
										[ 'Pro19', 'Black Dress','2','78.00','0.00','78.00'],
										[ 'Pro20', 'Black Dress','3','78.00','0.00','78.00']
								]
						}
				},
					{
						style: 'tableExample1',
							table: {
								widths:[193,46],
								body: [
										[ 'Net Total', '548.00'],
										[ 'Discount(0.00%)', '0.00'],
										[ 'Tax:(8.00%)','12.50'],
										[ 'Shipping & Handling Charges', '0.00'],
										[ 'Shipping & Handling Tax(12.5%)', '0.00'],
										[ 'Adjustment','0.00'],
										[ 'Grand Total($)', '600.00']
								]
						}
				},
					{
						style: 'tableExample',
						table: {
								widths: ['100%'],
								body: [
										[{text:'Description',bold:true}],
										[ 'asdfasdfasdfasdf']
								]
						}
				},
				{
						style: 'tableExample',
						table: {
								widths: ['100%'],
								body: [
										[{text:'Terms & Conditions',bold:true}],
										[ 'asdfasdfasdfasdf']
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
		   margin: [ 257, -20, 0, 30]
		}
	},
	defaultStyle: {
		// alignment: 'justify'
	}};
		};
    }
})();