import { useEffect, useState } from "react";
import DashboardContainer from "./index.container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getInventory } from "../../redux/authThunks";
import { InventoryInterface } from "../../redux/authInterfaces";
import { columnsInterface } from "./interface";
import React from "react";
const DashboardHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inventory = useSelector((state: RootState) => state.inventory);
  const [inventoryList, setInventoryList] = useState<InventoryInterface[]>([]);

  const columns: columnsInterface[] = [
    { key: "name", header: "Name" },
    { key: "category", header: "Category" },
    { key: "price", header: "Price", prefix: "$" },
    { key: "quantity", header: "Quantity" },
    { key: "value", header: "Value", prefix: "$" },
    { key: "actions", header: "Actions" },
  ];

  const handleAction = (action: string, row: InventoryInterface) => {
    if (action === "Delete") {
      setInventoryList((prev) => prev.filter((item) => item.name !== row.name));
    } else if (action === "Edit" || action === "View") {
      setInventoryList((prev) =>
        prev.map((item) =>
          item.name === row.name ? { ...item, ...row } : item
        )
      );
    }
  };
  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  useEffect(() => {
    if (inventory.inventoryList) {
      const list = inventory.inventoryList.map((item) => ({
        ...item,
        value: item.value.replace("$", ""),
        price: item.price.replace("$", ""),
        enabled: true,
      }));
      setInventoryList(list);
    }
  }, [inventory.inventoryList]);
  return (
    <DashboardContainer
      inventoryList={inventoryList}
      handleAction={handleAction}
      columns={columns}
    />
  );
};
export default DashboardHelper;
