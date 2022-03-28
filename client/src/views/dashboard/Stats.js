import React, { useEffect } from 'react'
import * as d3 from 'd3';
import styles from './styles/Dashboard.module.css';

export const Stats = () => {

  useEffect(() => {

      const dataset = [7, 5, 2, 9];
      const abc = ["a", 'b', 'c', 'd'];

      const dimensions = {
        height: 300,
        width: 400,
        marginTop: 20,
        marginLeft: 20
      }
      
      const xScale = d3.scaleBand()
          .domain(abc)
          .range([40, 300])
          .padding(0.2)

      const yScale = d3.scaleLinear()
          .domain([0, 9])
          .range([dimensions.height - 20, 20])
      
      var colorScale = d3.scaleLinear()
          .domain([0, 9])
          .range(["pink", "#FA7590"])

      const svg = d3.select(".graph")
          .append("svg")
          .attr("width", dimensions.width)
          .attr("height", dimensions.height)
          .append("g")
          .attr("transform", "translate(40, 0)");
          
      svg.append("g")
          .attr("transform", `translate(0, ${dimensions.height - 20})`)
          .call(d3.axisBottom(xScale)); 

      svg.append("g")
          .attr("transform", `translate(40, 0)`)
          .call(d3.axisLeft(yScale));

      svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("width", xScale.bandwidth())
          .attr("x", (d, i) => xScale(abc[i]))
          .attr("y", d =>  yScale(0))
          .attr("height", d => (dimensions.height - yScale(0) - 20))
          .attr("fill", d => colorScale(d));

      svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d =>  yScale(d))
        .attr("height", d => (dimensions.height - yScale(d) - 20))
        .delay((d, i) => i * 100)

      }, []);

    return (
          <main className={styles.dashboard}>
              <div className = {styles['one']}></div>
              {/* <div className = {styles['two'] + " two"}>2</div> */}
              <div className = {styles['three']}>3</div>
              <div className = {styles['four'] + ' graph'}>4</div>
          </main>
    )
}