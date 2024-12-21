import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardComponentInterface } from "./interface";

const CardComponent = ({ icon, title, value }: CardComponentInterface) => {
  if (!title || !value) {
    return null; // Prevent rendering if title or value is missing
  }

  return (
    <div className="max-w-sm p-4 bg-green rounded-lg shadow-lg flex items-start space-x-4">
      {/* Icon */}
      <div className="text-blue-600 flex-shrink-0">
        <FontAwesomeIcon className="text-white text-lg" icon={icon} />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default CardComponent;
