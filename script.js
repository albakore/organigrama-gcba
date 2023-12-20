let chart;
let cabecera;

//Funcion para escribir correctamente el nombre:
function convertirNombre(name) {
  if (name) {
    const [apellido, nombre] = name.split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                      ).join(" ").split(', ')


    return nombre + " " + apellido
  } else {
    return ""; //Si es null, devuelve null o lo que sea.
  }
}

//Funcion de la barra de busqueda:
function filterChart(e) {
  const value = e.srcElement.value;

  // Limpia el previo borde rosado
  chart.clearHighlighting();

  // Obtiene los nodos.
  const data = chart.data();

  // Los colapsa a todos
  data.forEach((d) => (d._expanded = false));

  // Veririfica si el value matchea con algun nombre
  data.forEach((d) => {
    if (
      value != "" &&
      convertirNombre(d['apellido-nombre']).toString().toLowerCase().includes(value.toLowerCase())
    ) {
      // If matches, mark node as highlighted

      // document.addEventListener('DOMContentLoaded', function() {
      //   const card = document.getElementById(`id${d.id}`)
      //   card.style.border = '5px solid red !important';
      // });
      d._highlighted = true;
      d._expanded = true;
    }
  });

  // Lo renderiza
  chart.data(data).render().fit();
}

//Funcion para abrir nodo:
const toggleNodeHighlight = (node) => {
  // clearing prev selected node
  // chart.render().clearHighlighting();
  // reusing button click from org chart
  chart.onButtonClick("", node);
  // setting highlight for the actual node and render the chart
  chart.setHighlighted(node.id || "").render();
};

//Get cantidad de childrens nodo:
function getNumberOfChildren(node) {
  if (node.children) {
    return node.children.length;
  } else if (node._children) {
    return node._children.length;
  } else {
    return '';
  }
}

const horizontalSpacing = 350; // Espaciado horizontal entre nodos

const color = "#f5f9fc";
const imageDiffVert = 0; //Margin top de la imagen. (Para modificar su posición en eje x)

d3.json("./newCabecera.json").then((data) => {
  chart = new d3.OrgChart()
    // .nodeHeight((d) => 120) // Altura de cada nodo
    // .nodeWidth((d) => 300) // Ancho de cada nodo
    .childrenMargin((d) => 55) // Margin entre padre/hijo
    .compactMarginBetween((d) => window.innerWidth < 900 ? 50 : 100) // margin top entre nodos
    .compactMarginPair((d) => window.innerWidth < 900 ? 100 : 260) //margin sides
    .neighbourMargin((a, b) => 70)
    .nodeContent(function (d, i, arr, state) {
      return `
        <div
              style=
              'width:${d.width}px;
              padding-top:${imageDiffVert - 2}px;
              padding-left:1px;
              padding-right:1px'
              '
        >
          <div
          class="card parent_${d.data.parentId}"
          id="id${d.data.id}"
          style="
          background-color:${color};
          ">

            <div class="body">
              <div class="name" style="text-align: center; padding-top: 10px;">  ${convertirNombre(
                d.data['apellido-nombre']
              )} </div>
              <div style="background-color:#e6f2f9;color:#716E7B;margin-top:3px;font-size:14px;box-shadow: 0 0 0 1px #007bc7;color:#38485c;border-radius: 0.5rem;padding: 0 0.4em; width: fit-content; font-weight: 700;">
              ${d.data['sigla']}
              </div>
              <div style="background-color:#e6f2f9;color:#716E7B;margin-top:3px;font-size:14px;box-shadow: 0 0 0 1px #007bc7;color:#38485c;border-radius: 0.5rem;padding: 0 0.4em; width: fit-content">
              ${d.data['descripcion-reparticion']}
              </div>
              <div style="background-color:#F3F6F9;color:#716E7B;margin-top:3px;font-size:14px;box-shadow: 0 0 0 1px #505E70;color:#505E70;border-radius: 0.5rem;padding: 0 0.4em; width: fit-content">
              ${getNumberOfChildren(d)}
              </div>
            </div>
          </div>
        </div>
        `;
    })

    .container(".chart-container")
    .data(data)
    .onNodeClick((d) => {
      toggleNodeHighlight(d)
    })
    .render()


});
