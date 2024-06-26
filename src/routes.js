/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Bills from "views/examples/Bills";
import Inventory from "views/examples/Inventory";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },

  {
    path: "/inventory",
    name: "Inventory",
    icon: "ni ni-single-02 text-yellow",
    component: <Inventory />,
    layout: "/admin",
  },

  {
    path: "/bills",
    name: "Bills",
    icon: "ni ni-single-02 text-yellow",
    component: <Bills />,
    layout: "/admin",
  },
];
export default routes;
