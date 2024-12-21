import React from "react";
import CardComponent from "../../components/card";
import Header from "../../components/header";
import Table from "../../components/table";
import {
  faCartShopping,
  faCircleDollarToSlot,
  faHourglassEnd,
  faChartGantt,
} from "@fortawesome/free-solid-svg-icons";
import { dashboardInterface } from "./interface";

const DashboardContainer: React.FC<dashboardInterface> = ({
  inventoryList,
  handleAction,
  columns,
}) => {
  return (
    <div className="bg-darkBackground min-h-screen text-light">
      <Header />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Inventory Stats</h2>

        {/* Cards Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CardComponent
              icon={faCartShopping}
              title="Total Products"
              value={inventoryList.reduce(
                (sum, item) => (item.enabled ? sum + item.quantity : sum),
                0
              )}
            />
            <CardComponent
              icon={faCircleDollarToSlot}
              title="Total Store Value"
              value={inventoryList.reduce(
                (sum, item) => (item.enabled ? sum + +item.value : sum),
                0
              )}
            />
            <CardComponent
              icon={faHourglassEnd}
              title="Out of Stock"
              value={
                inventoryList.filter(
                  (item) => item.quantity === 0 && item.enabled
                ).length
              }
            />
            <CardComponent
              icon={faChartGantt}
              title="No. of Categories"
              value={
                new Set(
                  inventoryList
                    .filter((item) => item.enabled)
                    .map((item) => item.category)
                ).size
              }
            />
          </div>
        </section>

        {/* Table Section */}
        <section>
          <Table
            data={inventoryList}
            columns={columns}
            onEdit={(row) => handleAction("Edit", row)}
            onView={(row) => handleAction("View", row)}
            onDelete={(row) => handleAction("Delete", row)}
          />
        </section>
      </div>
    </div>
  );
};

export default DashboardContainer;
