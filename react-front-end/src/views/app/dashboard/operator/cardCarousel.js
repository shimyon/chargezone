/* eslint-disable react/no-array-index-key */
import React from 'react';
import IconCard from '../../../../components/cards/IconCard';
import GlideComponent from "../../../../components/carousel/GlideComponent";
const IconCardsCarousel = ({ className = 'icon-cards-row' }) => {
   

  return (
    <div className={className}> 
      {/* <GlideComponent
        settings={{
          gap: 2,
          perView: 5,
          type: 'carousel',
          breakpoints: {
            320: { perView: 1 },
            520: { perView: 2 },
            620: { perView: 3 },
            720: { perView: 4 },
            
          },
          hideNav: true,
        }}
      >
        {mgr_carousel_data.map((item, index) => {
          return (
            <div key={`icon_card_${index}`}>
              <IconCard {...item} className="mb-3" />
            </div>
          );
        })}
      </GlideComponent>  */}
      <div className="dashboard-top-row">
        {mgr_carousel_data.map((item, index) => {
            return (
              <div key={`icon_card_${index}`} className="dashboard-top-cards">
                <IconCard {...item} className="mb-3" />
              </div>
            );
          })}
      </div>
    </div>
  );
};
let mgr_carousel_data = [
    {title: 'dashboard.active-charger',icon: 'iconsminds-flash-2',value: 0,},
    {title: 'dashboard.connector',icon: 'iconsminds-plug-in',value: 0,},
    { title: 'dashboard.batteries', icon: 'iconsminds-battery-100', value: 0 },
    {title: 'dashboard.ev',icon: 'iconsminds-car',value: 0, },
    { title: 'dashboard.otp', icon: 'simple-icon-envelope', value: 0 },
  ];  
  const setChargerCount = (value) => {mgr_carousel_data[0].value=value;};
  const setConnectorCount = (value) => {mgr_carousel_data[1].value=value;};
  const setBatteriesCount = (value) => {mgr_carousel_data[2].value=value;};
  const setEVCount = (value) => {mgr_carousel_data[3].value=value;};
  const setOTP = (value) => {mgr_carousel_data[4].value=value;};



export  {IconCardsCarousel,setChargerCount,setConnectorCount,setBatteriesCount,setEVCount,setOTP};
