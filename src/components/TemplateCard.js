import { sampleResume } from "../constants/sampleResume";

const TemplateCard = ({ templateComponent: Template, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className=" w-10/12 bg-white rounded-xl shadow hover:shadow-xl cursor-pointer border hover:border-blue-500 overflow-hidden hover:scale-105 transition duration-300"
    >
      {/* Preview Container */}
      <div className="h-64 overflow-hidden bg-gray-100 relative">
        <div className="scale-[0.35] origin-top-left pointer-events-none">
          <div className="w-[794px] h-[1123px] bg-white shadow">
            <Template data={sampleResume} />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {Template.name.replace("Template", "")}
        </h3>
      </div>
    </div>
  );
};

export default TemplateCard;
