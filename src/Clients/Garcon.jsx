import React from 'react';
import RealTimeClock from '../Template/RealTimeClocks';
import garcon from '../Images/garcon.png'

export default function Garcon() {
  return (
    <div >
      <RealTimeClock image={garcon} name="Fils" message="Joyeux anniversaire
       🎉🥳Que cette journée spéciale t’apporte bonheur et sourires.
Je te souhaite santé, succès et beaucoup d’amour.
Profite de chaque instant avec ceux que tu aimes.
Que tes rêves deviennent réalité cette nouvelle année ✨💖 " />
    </div>
  )
}
