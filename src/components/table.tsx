import { getPriorityClass } from '@/helpers/buttonStyle';
import Image from 'next/image';
import React, { useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";


interface TableProps {
  headers: string[];
  data: any[];
}

type ActionType = 'view' | 'edit' | 'delete';

const Table: React.FC<TableProps> = ({ headers, data }) => {
  const extractPercentage = (status: string): number => {
    const match = status.match(/(\d+)%/);
    return match ? parseInt(match[1], 10) : 0;
  };


  const ActionDropdown: React.FC<{ onClick: (action: ActionType) => void }> = ({ onClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-gray-500 hover:text-gray-900"
        >
          <HiOutlineDotsVertical className='text-[18px]' />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-100">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button onClick={() => onClick('view')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                View
              </button>
            </li>
            <li>
              <button onClick={() => onClick('edit')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                Edit
              </button>
            </li>
            <li>
              <button onClick={() => onClick('delete')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                Delete
              </button>
            </li>
          </ul>
        </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-[14px] font-medium text-[#0A0A0A] whitespace-nowrap tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => {
            const completionPercent = extractPercentage(row.Status);

            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={row.Logo}
                      alt="Logo"
                      width={34}
                      height={34}
                      className="w-8 h-8"
                    />
                    <div>
                      <div className="text-sm text-[#0A0A0A] font-[600]">{row["Project Name"]}</div>
                      <div className="text-[12px] text-gray-400">
                        Total <span className="font-[600] text-black">{row["Completed Tasks"]}</span> tasks completed
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{row.Description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row["Assigned Date"]}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row["Due Date"]}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="w-full bg-gray-200 rounded-full h-[6px]">
                    <div
                      className="bg-[#5C67F7] h-[6px] rounded-full"
                      style={{ width: `${completionPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-sm whitespace-nowrap text-gray-500 mt-1">
                    <span className='font-[500] text-[#5C67F7]'>{completionPercent}%</span> completed
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className={`px-2 text-[12px] py-[2px] rounded-[7px] ${getPriorityClass(row.Priority)}`}
                  >
                    {row.Priority}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActionDropdown onClick={(action: ActionType) => console.log(`Action: ${action}`)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
