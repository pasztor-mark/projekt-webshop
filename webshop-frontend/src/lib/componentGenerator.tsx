import { FaBoltLightning, FaBookAtlas, FaCalculator, FaChartLine, FaCircleQuestion, FaClockRotateLeft, FaCode, FaFire, FaGlobe, FaPaintbrush } from "react-icons/fa6";
import { Subject } from "../../../shared/types";
export const SubjectComponent = ({ subject }: { subject: Subject }) => {
    const renderSubjectContent = (): JSX.Element => {
        switch (subject) {
            case Subject.Maths:
                return <FaCalculator size={32} />;
            case Subject.English:
                return <FaBookAtlas size={32} />;
            case Subject.Physics:
                return <FaBoltLightning size={32} />;
            case Subject.Chemistry:
                return <FaFire size={32} />;
            case Subject.Compsci:
                return <FaCode size={32} />;
            case Subject.Foreign:
                return <FaGlobe size={32} />;
            case Subject.History:
                return <FaClockRotateLeft size={32} />;
            case Subject.Economics:
                return <FaChartLine size={32} />;
                case Subject.Art:
                    return <FaPaintbrush size={32} />;
            default:
                return <FaCircleQuestion size={32}/>;
        }
    };

    return <div>{renderSubjectContent()}</div>;
};