import { jslogo, react } from "../assets";
import { companyLogos } from "../constants";
import { FaPython } from "react-icons/fa";
// import { javascript } from "../assets";
const CompanyLogos = ({ className }) => {
  console.log(companyLogos)
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people learning programming languages with easy and enjoyable way
      </h5>
      <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img src={jslogo} width={134} height={28} alt={logo} />
            <img src={react} width={134} height={28} alt={logo} />
            {/* <img src={python} width={134} height={28} alt={python} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
