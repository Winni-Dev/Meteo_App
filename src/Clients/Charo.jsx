import React from 'react'
import charo from '../Images/Charo.jpeg'
import RealTimeClock from '../Template/RealTimeClocks'

export default function Charo() {
  return (
    <div>
        <RealTimeClock image={charo} name='Charo' message='Mon fils voila le projet hein je fait des méteo personnalisé avec lien et QR code '/>
    </div>
  )
}
