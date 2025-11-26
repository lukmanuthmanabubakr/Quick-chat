import React, { useState } from 'react'
import {}
import { dummyPublishedImages } from '../assets/assets'

const Community = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchImages = async () => {
    setImages(dummyPublishedImages)
    setLoading
  }
  return (
    <div>

    </div>
  )
}

export default Community