import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";
const ReviewCard = ({ userRevie }) => {
    console.log(userRevie)
    const {userName , user_photoURL} = userRevie;
    return (
        <div className="max-w-sm bg-white shadow-md rounded-xl p-6 border border-gray-100">
            {/* Quote Icon */}
            <div className="text-teal-500 text-3xl mb-4">
                <FaQuoteLeft />
            </div>

            {/* Text */}
            <p className="text-gray-600 leading-relaxed mb-6">
                A posture corrector works by providing support and gentle alignment to
                your shoulders, back, and spine, encouraging you to maintain proper
                posture throughout the day.
            </p>

            {/* Divider */}
            <div className="border-b border-dashed border-teal-300 mb-4"></div>

            {/* Profile */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-full">
                    <img src={user_photoURL} alt="" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{userName}</h3>
                    <p className="text-gray-500 text-sm">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;