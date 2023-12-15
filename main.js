// main.js
document.addEventListener("DOMContentLoaded", function() {
    // Datos de empleados
    const employees = [ {
        id: 16,
        parentId: "7",
        name: "Tony",
        positionName: "Lead",
        phone: "99887766",
        email: "employee@email.com",
        team: "",
        location: "LA Branch",
        department: "Marketing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
      },
      {
        id: 16,
        parentId: "7",
        name: "Tony",
        positionName: "Lead",
        phone: "99887766",
        email: "employee@email.com",
        team: "",
        location: "LA Branch",
        department: "Marketing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
      },
      {
        id: 16,
        parentId: "7",
        name: "Tony",
        positionName: "Lead",
        phone: "99887766",
        email: "employee@email.com",
        team: "",
        location: "LA Branch",
        department: "Marketing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
      }]; // Coloca aquí tus datos

    // Lógica para mostrar y cerrar el detalle del empleado
    let cardShow = false;
    let employeeId = "";

    const handleShow = (nodeId) => {
      cardShow = true;
      employeeId = nodeId;
      renderEmployeeDetailsCard();
    };

    const handleClose = () => {
      cardShow = false;
      renderEmployeeDetailsCard();
    };

    // Lógica para renderizar la tarjeta de detalles del empleado
    function renderEmployeeDetailsCard() {
      const cardContainer = document.getElementById("org-chart-details");
      if (cardShow) {
        const employee = employees.find((employee) => employee.id === employeeId);
        cardContainer.innerHTML = "";
        cardContainer.appendChild(createEmployeeDetailsCard(employee));
      } else {
        cardContainer.innerHTML = "";
      }
    }

    // Lógica para crear la tarjeta de detalles del empleado
    function createEmployeeDetailsCard(employee) {
      const card = document.createElement("div");
      // TODO: Llena el contenido de la tarjeta aquí
      return card;
    }

    // Configuración del gráfico organizacional con D3.js
    const orgChartContainer = document.getElementById("org-chart");
    const chart = d3.orgChart();
    chart
      .container(orgChartContainer)
      .data(employees)
      .nodeWidth((d) => 300)
      .nodeHeight((d) => 140)
      .compactMarginBetween((d) => 80)
      .onNodeClick((d) => {
        handleShow(d.id);
      })
      .buttonContent((node, state) => {
        // TODO: Implementa la lógica para el botón de expansión aquí
      })
      .nodeContent((d) => {
        // TODO: Implementa la lógica para el contenido del nodo aquí
      })
      .render();
  });
