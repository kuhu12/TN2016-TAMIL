var dataset_3f = [];
		d3.csv("csv/thirdfront_vs_margin.csv", function(data) {

  		data.forEach(function(d) {
		dataset_3f.push([+d['CONUM'], +d['LOG(MAR)']*100,d["WINPARTY"],d["TYPE1"],+d["MARGIN"],+d["3F"],d["CONAME"],+d["RECTPOS"], +d['LOG(3F)']*100, +d["INDEX"], d["CONAME_TAMIL"], d["WINPARTY_TAMIL"]])
    		dataset_3f.push([+d['CONUM'], +d['LOG(3F)']*100,d["WINPARTY"],d["TYPE2"],+d["MARGIN"],+d["3F"],d["CONAME"],+d["RECTPOS"], +d['LOG(MAR)']*100, +d["INDEX"]+1, d["CONAME_TAMIL"], d["WINPARTY_TAMIL"]])
		});

		var w = 1302;
		var h = 605;

		var svg = d3.select("#area3")
				.append("svg")
				.attr("width", w)
				.attr("height", h);
				
		var div = d3.select("#area3").append("div")	
					.attr("class", "tooltip1")				
					.style("opacity", 0);
			 
		var rect = svg.selectAll("rect")
                      .data(dataset_3f)
                      .enter()
					  .append("rect") 
 					  .attr("x", function(d) {
							return d[7];		  
					  }) 
					  .attr("y", 105)
					  .attr("width", 5)
					  .attr("height", 400)
					  .attr("fill","white")
 
					  .on("mouseover", function(d) {	
											d3.select(this).attr("width", 7).style("fill", "rgb(235,235,235)");
											div.transition().duration(200).style("opacity", 1);
											var mouse=d3.mouse(d3.select(this).node());
											div.html("<font size=3>" + "<b>" + d[10] + "</b>" + "</font>" + "<br/>" + d[11] + "<br/>" + "<br/>" + "வெற்றிப்பெற்றவரின் வாக்குகள்" + "&nbsp;" + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + d[4] + "<br/>" + "மூன்றாம் அணி" + "&nbsp; &nbsp; " + d[5]).style("left", (mouse[0] + 25) + "px").style("top", (mouse[1] - 28) + "px");	
											if(d[1]<d[8]) {
											drawLineRollover([{"x": d[0], "y": d[1]+1, "p": d[2]}, {"x": d[0], "y": d[8]-3, "p": d[2]}],2);
											}
											else {
											drawLineRollover([{"x": d[0], "y": d[1], "p": d[2]}, {"x": d[0], "y": d[8]+3, "p": d[2]}],1);
											};
											if(d[9]%2==0) {
												drawPoint(d[0],d[8],3)
											}
											
					  })					
					 .on("mouseout", function(d) {	
											d3.select(this).attr("width", 15).style("fill", "white")
											if(d[1]<d[8]) {
												drawLineRollover([{"x": d[0], "y": d[1], "p": d[2]}, {"x": d[0], "y": d[8]-3, "p": d[2]}],4);
												drawLineRollover([{"x": d[0], "y": d[1], "p": d[2]}, {"x": d[0], "y": d[8]-3, "p": d[2]}],3);
											}
											else {
												drawLineRollover([{"x": d[0], "y": d[1], "p": d[2]}, {"x": d[0], "y": d[8]+3, "p": d[2]}],6);
												drawLineRollover([{"x": d[0], "y": d[1], "p": d[2]}, {"x": d[0], "y": d[8]+3, "p": d[2]}],5);
											};
											div.transition().duration(500).style("opacity", 0);	
					});
			
		function drawLine(A) {
			
			var v1 = A[0].x;
			var v2 = A[0].y;
			var v3 = A[1].x;
			var v4 = A[1].y;
			var v5 = A[0].p;
			var v6 = A[0].t;
			var v7 = A[0].v;
			var v8 = A[1].t;
			var v9 = A[1].v;
			var v10 = A[0].c;
			
			var lineData = [{"x": v1, "y": v2}, {"x": v3, "y": v4}];

			var lineFunction = d3.svg.line()
						.x(function (d) {
								return d.x*5 + 50;
						})
						.y(function (d) {
								return h - d.y;
						})
						.interpolate("linear");

			svg.append("path")
						.attr("d", lineFunction(lineData))
						.style("stroke-width", 0.7)
						.style("stroke", function() {            
											if (v5 == "AIADMK") {return "green"}  
											else { return "red" }          
						;}) 
						.on("mouseover", function (d) {
											div.transition().duration(200).style("opacity", .5);		
											d3.select(this).style("stroke-width", 2);
						})
						.on("mouseout", function () {
											d3.select(this).style("stroke", function() {            
																				if (v5 == "AIADMK") {return "green"}  
																				else { return "red" }
																			;}).style("stroke-width", 0.7);
											div.transition().duration(500).style("opacity", 0);	
						;})
			
		}
			
		function drawLine2(A,k) {
			
			var v1 = A[0].x;
			var v2 = A[0].y;
			var v3 = A[1].x;
			var v4 = A[1].y;

			var lineData = [{"x": v1, "y": v2}, {"x": v3, "y": v4}];

			var lineFunction = d3.svg.line()
						.x(function (d) {
								return d.x*5 + 50;
						})
						.y(function (d) {
								return h - d.y;
						})
						.interpolate("linear");

			if(k==0) {
				svg.append("path")
				   .attr("d", lineFunction(lineData))
			       .style("stroke-width", 0.5)
				   .style("stroke", "rgb(169,169,169)");   
			}
			
			if(k==1) {
				svg.append("path")
				   .attr("d", lineFunction(lineData))
			       .style("stroke-width", 0.5)
				   .style("stroke", "blue");   
			}
		
		}

		function drawLineRollover(A,k) {
			
			var v1 = A[0].x;
			var v2 = A[0].y;
			var v3 = A[1].x;
			var v4 = A[1].y;
			var v5 = A[0].p;
			
			var lineData = [{"x": v1, "y": v2}, {"x": v3, "y": v4}];
			
			var lineFunction = d3.svg.line()
						.x(function (d) {
								return d.x*5 + 50;
						})
						.y(function (d) {
								return h - d.y - 1;
						})
						.interpolate("linear");
			
			var lineFunction1 = d3.svg.line()
						.x(function (d) {
								return d.x*5 + 50;
						})
						.y(function (d) {
								return h - d.y + 1;
						})
						.interpolate("linear");
			
			if(k==1) {
				svg.append("path")
				   .attr("d", lineFunction1(lineData))
			   	   .style("stroke-width", 2)
				   .style("stroke", function () {
										if(v5 == "AIADMK") { return "green"; }
										else { return "red";}
									}); 
			}
			
			if(k==2) {
				svg.append("path")
				   .attr("d", lineFunction(lineData))
			   	   .style("stroke-width", 2)
				   .style("stroke", function () {
										if(v5 == "AIADMK") { return "green"; }
										else { return "red";}
									}); 
			}
			
			if(k==3) {
				svg.append("path")
				   .attr("d", lineFunction(lineData))
				   .style("stroke-width", 0.8)
				   .style("stroke", function () {
										if(v5 == "AIADMK") { return "green"; }
										else { return "red";}
									});
			}
			
			if(k==4) {
				svg.append("path")
				   .attr("d", lineFunction(lineData))
				   .style("stroke-width", 3)
				   .style("stroke", "white");   
			}
			
			if(k==5) {
				svg.append("path")
				   .attr("d", lineFunction1(lineData))
				   .style("stroke-width", 0.8)
				   .style("stroke", function () {
										if(v5 == "AIADMK") { return "green"; }
										else { return "red";}
									});
			}
			
			if(k==6) {
				svg.append("path")
				   .attr("d", lineFunction1(lineData))
				   .style("stroke-width", 3)
				   .style("stroke", "white");   
			}
			
		}
			

		var axisavg_3f = [ [1,100], [235,100], [1,200], [235,200], [1,300], [235,300], [1,400], [235,400], [1,500], [235,500], [1, 100], [1, 500], [1,397], [235, 397] ];
		 
		var aia = [{val:"அ.இ.அ.தி.மு.க+",xpos:1170,ypos:27,col:"black",size:"11"},{val:"தி.மு.க+",xpos:1170,ypos:48,col:"black",size:"11"},{val:"10",xpos:25,ypos:510, col:"black",size:"15"},{val:"100",xpos:18,ypos:410,col:"black",size:"15"},{val:"1000",xpos:13,ypos:310,col:"black",size:"15"},{val:"10000",xpos:7,ypos:210,col:"black",size:"15"},{val:"100000",xpos:1,ypos:110,col:"black",size:"15"},{val:"10",xpos:1220,ypos:510,col:"black",size:"15"},{val:"100",xpos:1220,ypos:410,col:"black",size:"15"},{val:"1000",xpos:1220,ypos:310,col:"black",size:"15"},{val:"10000",xpos:1220,ypos:210,col:"black",size:"15"},{val:"100000",xpos:1220,ypos:110,col:"black",size:"15"},{val:"மூன்றாம் அணி",xpos:1220,ypos:225,col:"blue",size:"13"}, {val:"வின் சராசரி",xpos:1220,ypos:240,col:"blue",size:"13"}, {val:"வாக்குகள்",xpos:0,ypos:260,col:"gray",size:"12"}, {val:"தொகுதிகள்",xpos:620,ypos:524,col:"gray",size:"15"},{val:"தொகுதிவாரியாக மூன்றாம் அணி பெற்ற வாக்குகள்", xpos:54,ypos:18,col:"black",size:"18"}, {val:"இந்த விளக்கப்படத்தில் கீழ் வரிசையில் ஒவ்வொரு தொகுதியிலும் மூன்றாம் அணி பெற்ற வாக்குகளின் எண்ணிக்கை காட்டப்படுகிறது. இந்த வளைவில் மேல் உள்ள புள்ளிகள்", xpos:54,ypos:37,col:"gray",size:"11.8"}, {val:"மூன்றாம் அணியை விட அதிக வாக்குகள் கொண்டு வெற்றிப்பெற்ற தொகுதிகளைக் காட்டுகின்றன. அதேபோல வளைவிற்கு கீழ் உள்ள புள்ளிகள் வெற்றிபெற்றவர்களை விட  ", xpos:54,ypos:53,col:"gray",size:"11.8"},
		{val:"மூன்றாம் அணி அதிக வாக்குகளை பெற்ற தொகுதிகளைக் காட்டுகின்றன.  இந்த கோடுகளின் நீளம் வாக்கு வித்தியாசத்தின் அளவைக் காட்டுகிறது. வாக்குகளுடன் உள்ள Y ", xpos:54,ypos:69,col:"gray",size:"11.8"}, {val:"அச்சு வாக்குகளின் ஒப்பீடை காட்டுகிறது. ", xpos:54,ypos:85,col:"gray",size:"11.8"}, {val:"தொகுதிகளின் விவரங்களைக் காண மவுஸ் கர்சரை நகர்த்திப் பார்க்கவும்.", xpos:295,ypos:85,col:"#d92b2b",size:"11.8"}];
		
		var rect = svg.append("rect") 
			.attr("x", 1145) 
			.attr("y", 15)
			.attr("width", 15)
			.attr("height", 15)
			.attr("fill", "green");

		var rect = svg.append("rect") 
			.attr("x", 1145) 
			.attr("y", 35)
			.attr("width", 15)
			.attr("height", 15)
			.attr("fill", "red");	

		svg.selectAll("text")
		   .data(aia)
	   	   .enter()
		   .append("text")
		   .text(function(d){
				return d.val;
			})
		   .attr("y", function(d){
				return d.ypos;
			})
		   .attr("x", function(d){
				return d.xpos;
			})
		   .attr("font-size",function(d){
				return d.size;
			})
			.attr("fill",function(d){
				return d.col;
			})
		   .attr("font-family","Catamaran");
		   
			
		for (var i=1; i<dataset_3f.length; i=i+1) {
		
			var v1 = dataset_3f[i][0];
			var v2 = dataset_3f[i][1];
			
			drawPoint(v1,v2,1.5)
		};
				
				
		function drawPoint(v1,v2,r) {
		
		var circle = svg.append("circle")
					    .attr("cx",v1*5 + 50)		  
						.attr("cy", h - v2)		  
						.attr("r", r);
		}
										
		for (var i=0; i<dataset_3f.length; i=i+2) {
		
			var v1 = dataset_3f[i][0];
			var v2 = dataset_3f[i][1];
			var v3 = dataset_3f[i+1][0];
			var v4 = dataset_3f[i+1][1];
			var v5 = dataset_3f[i][2];
			var v6 = dataset_3f[i][3];
			var v7 = dataset_3f[i][4];
			var v8 = dataset_3f[i+1][3];
			var v9 = dataset_3f[i+1][5];
			var v10 = dataset_3f[i][6];
			
			drawLine([{"x": v1, "y": v2, "p": v5, "t": v6, "v": v7, "c": v10}, {"x": v3, "y": v4, "p": v5, "t": v8, "v": v9, "c": v10}])
		};
		
		for (var i=0; i<axisavg_3f.length; i=i+2) {
		
			var v1 = axisavg_3f[i][0];
			var v2 = axisavg_3f[i][1];
			var v3 = axisavg_3f[i+1][0];
			var v4 = axisavg_3f[i+1][1];
			
			if(v2%10==0) {
			drawLine2([{"x": v1, "y": v2}, {"x": v3, "y": v4}],0);	}
			else {
			drawLine2([{"x": v1, "y": v2}, {"x": v3, "y": v4}],1);  }
		}
		
	});	
	
