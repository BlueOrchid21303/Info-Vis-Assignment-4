import * as d3 from "d3";


export let drawScatterPlot = (scatterPlotLayer, data, xScale, yScale, tooltip, scatterPlotWidth, scatterPlotHeight) => {

    scatterPlotLayer.selectAll('.point') //select all the circle elements with the class 'point'
      .data(data) //bind the data to the circle elements
      .enter() //create placeholder for each data point
      .append('circle') //append a circle element for each data point
      .attr('class', d=>`point ${d.station.replace(/[^a-zA-Z]/g, "")}`) //set the class names of the circle element to 'point' and the station name
      .attr('cx', d => xScale(d.tripdurationS))
      .attr('cy', d => yScale(d.tripdurationE))
      .attr('r', "5")
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .on("mouseover", (event, d) => {
        //Task 4: Complete the code for the mouseover event
        //Hint:
        //1. set the radius of the circle to 10 and the color to red
        //2. add a tooltip to show the detailed information of the selected point
        //   1. set the opacity of the tooltip to 0.9
        //   2. set the text of the tooltip to the station name
        //   3. set the position of the tooltip to the mouse position
        //3. append a rect element to isolate the selected point out of the scatter plot
        //   1. set the fill color of the rect element to yellow
        //   2. set the opacity of the rect element to 0.5
        //   3. set the width and height of the rect element to the scatter plot width and height
        d3.select(event.currentTarget)
          .attr("r", 10)
          .style("fill", "red");

        tooltip
          .style("opacity", 0.9)
          .style("left", (event.pageX + 10) + "px") 
          .style("top", (event.pageY + 10) + "px")
          .text(d.station);

        scatterPlotLayer.append("rect")
          .attr("class", "hover-rect") 
          .attr("width", scatterPlotWidth)
          .attr("height", scatterPlotHeight)
          .style("fill", "yellow")
          .style("opacity", 0.5);
        
        d3.select(event.currentTarget).raise();

        //Task 8 part 1: Complete the code for interactive highlighting
        //Hint:
        //1. select all the circle and bar with the same class as the current circle; you may use .arrt("class") to get the class names of the current circle
        //2. set the fill color of the selected the circle and bar to red
        //3. raise the selected circle to the top using .raise()
        //4. remember to use console.log() to debug the code
        const stationClass = d.station.replace(/[^a-zA-Z]/g, "");

        d3.selectAll(`.point.${stationClass}`)
          .style("fill", "red")
          .raise();

        d3.selectAll(`.bar.${stationClass}`)
          .style("fill", "red")
          .raise();


      })
      .on('mouseout',(event, d)=>{
        //Task 5: Complete the code for the mouseout event
        //Hint:
        //1. set the text of the tooltip to "" and the opacity to 0
        //2. remove the rect element
        //3. set the radius of the circle to 5 and color to steelblue
        tooltip
          .style("opacity", 0)
          .text("");

        scatterPlotLayer.selectAll(".hover-rect").remove();

        d3.select(event.currentTarget)
          .attr("r", 5)
          .style("fill", "steelblue");

        //Task 8 part 2: Complete the code for interactive highlighting
        //Hint:
        //1. select the circle and bar with the same class as the current circle; you may use .arrt("class") to get the class names of the current circle
        //2. set the fill color of the selected circles to steelblue
        //3. lower the selected circles to the bottom
        const stationClass = d.station.replace(/[^a-zA-Z]/g, "");

        d3.selectAll(`.point.${stationClass}`)
          .style("fill", "steelblue")
          .lower();

        d3.selectAll(`.bar.${stationClass}`)
          .style("fill", "steelblue")
          .lower();

      });

}