import React, { useState } from "react";
import { InventoryStatusInterface, TableInterface } from "./interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal/form/form.modal";
import ConfirmationPrompt from "../modal/confirmationPrompt/delete.modal";
import { InventoryInterface } from "../../redux/authInterfaces";
import { useSearchParams } from "react-router-dom";

const defaultInventoryValues: InventoryInterface = {
  name: "",
  price: "",
  value: "",
  category: "",
  quantity: 0,
  enabled: false,
};

const Table: React.FC<TableInterface<InventoryInterface>> = ({
  data,
  columns,
  onEdit,
  onView,
  onDelete,
}) => {
  const [searchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState<InventoryStatusInterface>({
    status: false,
    row: defaultInventoryValues,
  });
  const [isPromptVisible, setIsPromptVisible] =
    useState<InventoryStatusInterface>({
      status: false,
      row: defaultInventoryValues,
    });

  const isUser = searchParams.get("role") === "user";
  const isAdmin = searchParams.get("role") === "admin";

  const handleConfirm = () => {
    if (onDelete) onDelete(isPromptVisible.row);
    setIsPromptVisible({ status: false, row: defaultInventoryValues });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-zinc-900">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left px-4 py-3 border-b border-zinc-800 text-sm font-semibold text-lightGreen"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-zinc-950 hover:bg-zinc-900">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 border-b border-zinc-800 text-sm text-zinc-600"
                  >
                    {column.key === "actions" ? (
                      <div className="flex space-x-4">
                        {onEdit && (
                          <FontAwesomeIcon
                            className={`cursor-pointer ${
                              isUser || !row.enabled
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-gray-200 hover:text-green-600"
                            }`}
                            icon={faEdit}
                            aria-label="edit"
                            onClick={() =>
                              isAdmin &&
                              row.enabled &&
                              setModalOpen({ status: true, row })
                            }
                          />
                        )}
                        {onView && (
                          <FontAwesomeIcon
                            className={`cursor-pointer ${
                              isUser
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-purple-500 hover:text-green-600"
                            }`}
                            icon={row.enabled ? faEye : faEyeSlash}
                            aria-label="view"
                            onClick={() =>
                              isAdmin &&
                              onView({ ...row, enabled: !row.enabled })
                            }
                          />
                        )}
                        {onDelete && (
                          <FontAwesomeIcon
                            className={`cursor-pointer ${
                              isUser || !row.enabled
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-red-600 hover:text-green-600"
                            }`}
                            icon={faTrash}
                            aria-label="delete"
                            onClick={() =>
                              isAdmin &&
                              row.enabled &&
                              setIsPromptVisible({ status: true, row })
                            }
                          />
                        )}
                      </div>
                    ) : column.render ? (
                      column.render(
                        row[column.key as keyof InventoryInterface],
                        row
                      )
                    ) : (
                      <span>{(column.prefix || "") + row[column.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() =>
          setModalOpen({ status: false, row: defaultInventoryValues })
        }
        title="Edit Product"
        onSave={onEdit || (() => {})}
      />

      {/* Delete Confirmation */}
      {isPromptVisible.status && (
        <ConfirmationPrompt
          onConfirm={handleConfirm}
          onCancel={() =>
            setIsPromptVisible({ status: false, row: defaultInventoryValues })
          }
        />
      )}
    </>
  );
};

export default Table;
