let movieDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"

let movieData

let canvas = d3.select('#canvas')

var body = d3.select('body');

let tooltip = body.append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0);

let drawTreeMap = () => {

    let hierarchy = d3.hierarchy(movieData, (node) => {
        return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2)=> {
        return node2['value'] - node1['value']

    })
    let createTreeMap = d3.treemap()
                            .size([1000, 600])
        
        createTreeMap(hierarchy)

    let movieTiles = hierarchy.leaves()
        console.log(movieTiles)                  

       let block = canvas.selectAll('g')
                .data((movieTiles))
                .enter()
                .append('g')
                .attr('transform', (movie) =>{
                    return 'translate(' + movie['x0'] + ', '+ movie['y0']+ ')'
                })

        block.append('rect')
                .attr('class', 'tile')
                .attr('fill', (movie) => {
                    let category = movie['data']['category']
                    if(category === 'Action') {
                        return '#F94144'
                    }else if (category === 'Drama'){
                        return '#577590'
                    }else if( category === 'Adventure'){
                        return '#90BE6D'
                    }else if(category === 'Family'){
                        return '#F9C74F'
                    }else if(category === 'Animation'){
                        return '#F3722C'
                    }else if(category === 'Comedy'){
                        return '#4d908e'
                    }else if(category === 'Biography'){
                        return '#277da1'
                    }
                }).attr('data-name', (movie) => {
                    return movie['data']['name']
                }).attr('data-category', (movie) =>{
                    return movie['data']['category']
                })
                .attr('data-value', (movie) => {
                    return movie['data']['value']
                })
                .attr('width', (movie) => {
                    return movie['x1'] - movie['x0']
                })
                .attr('height', (movie) => {
                    return movie['y1'] - movie['y0']
                })

            block.append('text')
                    .text((movie) => {
                        return movie['data']['name']
                    })
                    .attr('x', 5)
                    .attr('y', 20)
                    .on('mousemove', function (event, d) {
                        tooltip.style('opacity', 0.9);
                        tooltip
                          .html(
                            'Name: ' +
                              d.data.name +
                              '<br>Category: ' +
                              d.data.category +
                              '<br>Value: ' +
                              d.data.value
                          )
                          .attr('data-value', d.data.value)
                          .style('left', event.pageX + 10 + 'px')
                          .style('top', event.pageY - 28 + 'px');
                      })
                      .on('mouseout', function () {
                        tooltip.style('opacity', 0);
                      });
}

d3.json(movieDataURL).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            movieData = data;
            console.log(movieData)
            drawTreeMap()
        }
    }
)