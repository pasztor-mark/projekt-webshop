import { FaBoltLightning, FaBookAtlas, FaCalculator, FaChartLine, FaCircleQuestion, FaClockRotateLeft, FaCode, FaFire, FaGlobe, FaPaintbrush } from "react-icons/fa6";
import { Subject } from "../../../shared/types";
export const SubjectComponent = ({ subject, size = 32 }: { subject: Subject, size?: number }) => {
    const renderSubjectContent = (): JSX.Element => {
        switch (subject) {
            case Subject.Maths:
                return <FaCalculator size={size} />;
            case Subject.English:
                return <FaBookAtlas size={size} />;
            case Subject.Physics:
                return <FaBoltLightning size={size} />;
            case Subject.Chemistry:
                return <FaFire size={size} />;
            case Subject.Compsci:
                return <FaCode size={size} />;
            case Subject.Languages:
                return <FaGlobe size={size} />;
            case Subject.History:
                return <FaClockRotateLeft size={size} />;
            case Subject.Economics:
                return <FaChartLine size={size} />;
                case Subject.Art:
                    return <FaPaintbrush size={size} />;
            default:
                return <FaCircleQuestion size={size}/>;
        }
    };

    return <div>{renderSubjectContent()}</div>;
};