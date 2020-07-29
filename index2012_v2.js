var margin = {top: 30, right: 20, bottom: 60, left: 80},
	                  width = 960 - margin.left - margin.right,
	                  height = 550 - margin.top - margin.bottom;

	              var x = d3.scaleLinear().range([0, width]);
	              var y = d3.scaleLinear().range([height, 0]);

	              var color = d3.scaleOrdinal(d3.schemeCategory10);

                  var xAxis= d3.axisBottom(x.domain([6,32]))
                  var yAxis= d3.axisLeft(y.domain([10,42]))

	              var svg = d3.select("svg")
	                  .attr("width", width + margin.left + margin.right + 15)
	                  .attr("height", height + margin.top + margin.bottom)
	                  .append("g")
	                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                  
                  // Read Data
	              d3.csv("https://raw.githubusercontent.com/yaldar2/yaldar2.github.io/master/Car_2012_Ch_H.csv", function(error, data) {
                  if (error) throw error;

                  data.forEach(function(d) {
                    d.City_MPG = +d.City_MPG;
                    d.Highway_MPG = +d.Highway_MPG;
                    d.Number_of_Forward_Gears = +d.Number_of_Forward_Gears;
                    d.Horsepower = +d.Horsepower;
                  });

                  // Add the X Axis
                  svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis)

                  // Add X Axis Label
                  svg.append("text")             
                  .attr("transform",
                        "translate(" + (width/2) + " ," + 
                                       (height + 45) + ")")
                  .style("text-anchor", "middle")
                  .text("City MPG");

                  // Add the Y Axis
                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    
                  // Add Y Axis Label
                  svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left/2- 20)
                    .attr("x",0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("Highway MPG"); 

                  // Add the Scatterplot
                  svg.selectAll(".dot")
                      .data(data)
                      .enter().append("circle")
                      .attr("class", "dot")
                      .attr("r", function(d) { return 0.05*d.Horsepower; })
                      .attr("cx", function(d) { return x(d.City_MPG); })
                      .attr("cy", function(d) { return y(d.Highway_MPG); })
                      .style("fill", function(d) { return color(d.Make); })
                      .on("mouseover", function(d){
                          d3.selectAll('.dot')
                               .filter(function(dot){
                                return (dot.Make != d.Make)
                               })
                               .transition()
                               .style("opacity", 0.01)
                      })
                          .on("mouseout", function(d){
                           d3.selectAll('.dot')
                            .filter(function(dot){
                             return (dot.Make != d.Make)
                            })
                            .transition()
                            .style("opacity", 1)
                      });

                      const X= d3.scaleLinear().range([0, width]).domain([6,32]);
                      const Y= d3.scaleLinear().range([height, 0]).domain([10,42]);


                  // Add the Legend
                  var legend = svg.selectAll(".legend")
                      .data(color.domain())
                      .enter().append("g")
                      .attr("class", "legend")
                      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

                  legend.append("rect")
                      .attr("x", 15)
                      .attr("width", 18)
                      .attr("height", 18)
                      .style("fill", color);

                  legend.append("text")
                      .attr("x", 45)
                      .attr("y", 9)
                      .attr("dy", ".35em")
                      .style("text-anchor", "start")
                      .style("font-size", "15px")
                      .text(function(d) { return d; });



                  // ADD SIZE LEGEND

                  // legend title
                  var legend_title = svg.append("g")
                    .attr("class", "legend_title");

                  legend_title.append("text")
                    .attr("x", 15)
                    .attr("y", 65)
                    .attr("dy", ".35em")
                    .style("text-anchor", "start")
                    .style("font-size", "15px")
                    .text("Horsepower (10^4 watts)");

                  // Sizes
                  var size_legend_1 = svg.append("g")
                      .attr("class", "size1");
                  var size_legend_2 = svg.append("g")
                      .attr("class", "size2");
                  var size_legend_3 = svg.append("g")
                      .attr("class", "size3");


                  // Size 1
                  size_legend_1.append("circle")
                      .attr("cx", 41.8)
                      .attr("cy", 93)
                      .attr("r", 13.4)
                      .style("fill", "lightgrey")
                      .style("stroke", "black")

                  size_legend_1.append("text")
                      .attr("x", 75)
                      .attr("y", 93)
                      .attr("dy", ".35em")
                      .style("text-anchor", "start")
                      .style("font-size", "15px")
                      .text("20");


                  // Size 2
                  size_legend_2.append("circle")
                      .attr("cx", 41.8)
                      .attr("cy", 130)
                      .attr("r", 20.1)
                      .style("fill", "lightgrey")
                      .style("stroke", "black")

                  size_legend_2.append("text")
                      .attr("x", 75)
                      .attr("y", 130)
                      .attr("dy", ".35em")
                      .style("text-anchor", "start")
                      .style("font-size", "15px")
                      .text("30");
                      

                  // Size 3
                  size_legend_3.append("circle")
                      .attr("cx", 41.8)
                      .attr("cy", 180)
                      .attr("r", 26.8)
                      .style("fill", "lightgrey")
                      .style("stroke", "black")

                  size_legend_3.append("text")
                      .attr("x", 75)
                      .attr("y", 180)
                      .attr("dy", ".35em")
                      .style("text-anchor", "start")
                      .style("font-size", "15px")
                      .text("40");

                });
