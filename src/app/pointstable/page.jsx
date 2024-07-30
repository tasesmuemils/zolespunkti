'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { scoreTable } from '@/constants/data';
import React, { useState } from 'react';
import HeaderMain from '@/components/layout/header-main';

export default function PointTable() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event);
  };

  return (
    <>
      <HeaderMain />
      <div className='flex-1 space-y-4 p-4 mt-9 pt-6 md:p-8'>
        <div className='flex items-center justify-between space-y-2'>
          {/* <UserInfo userData={user} /> */}
          <h2 className='text-xl md:text-3xl font-bold tracking-tight'>
            Punktu tabula
          </h2>
          <div className='flex flex-col justify-center'>
            <p className='pb-2'>Cik spēlētājiem?</p>
            <div className='flex justify-center items-center space-x-2'>
              <p>3</p>
              <Switch onCheckedChange={handleChange} />
              <p>4</p>
            </div>
          </div>
        </div>
        <Separator />
        <CustomTable gameType='Lielais' playerCount={isChecked} />
        <CustomTable gameType='Zole' playerCount={isChecked} />
        <CustomTable gameType='Mazā zole' playerCount={isChecked} />
        <CustomTable gameType='Galdiņš' playerCount={isChecked} />
      </div>
    </>
  );
}

const CustomTable = ({ gameType, playerCount }) => {
  return (
    <div className='w-full mt-5 mb-10'>
      <h2 className='text-center text-lg p-5 font-semibold'>{gameType}</h2>
      <div>
        <div className='flex flex-col justify-center'>
          <div
            style={{
              gridTemplateColumns: `${
                playerCount ? '40% 15% 15% 15% 15%' : '40% 20% 20% 20%'
              }`,
            }}
            className={`grid border-b pb-1`}
          >
            <p>Scenārijs</p>
            <p className='text-center'>L</p>
            <p className='text-center'>1.</p>
            <p className='text-center'>2.</p>
            {playerCount && <p className='text-center'>3.</p>}
          </div>
          {Object.keys(scoreTable[gameType]).map((item, index) => (
            <div
              style={{
                gridTemplateColumns: `${
                  playerCount ? '40% 15% 15% 15% 15%' : '40% 20% 20% 20%'
                }`,
              }}
              key={`${item}Table${index}`}
              className={`grid items-center border-b py-2`}
            >
              <div>{item}</div>
              <div className='text-center'>
                {scoreTable[gameType][item][!playerCount ? 3 : 4]['Lielajam']}
              </div>
              <div className='text-center'>
                {scoreTable[gameType][item][!playerCount ? 3 : 4]['1.mazajam']}
              </div>
              <div className='text-center'>
                {scoreTable[gameType][item][!playerCount ? 3 : 4]['2.mazajam']}
              </div>
              {playerCount && (
                <div className='text-center'>
                  {
                    scoreTable[gameType][item][!playerCount ? 3 : 4][
                      '3.mazajam'
                    ]
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
