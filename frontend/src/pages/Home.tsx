import React, { useState } from 'react'

const Home = () => {
  const [content, setContent] = useState(null) // 업로드 전용
  const [image, setImage] = useState('') // base64
  const [imageUri, setImageUri] = useState('') // server response

  return <div>
    <form onSubmit={async (event) => {
      try {
        event.preventDefault()
        const formData = new FormData()
        formData.append('img', content)

        const response = await fetch('http://localhost:9003/upload', {
          method: 'POST',
          body: formData
        })
        const json = await response.json()
        if (json.success) {
          setImageUri(json.data)
        } else {
          console.error(json.data)
        }
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }}>
      <input type={'file'} accept={'image/*'} onChange={(event) => {
        let reader = new FileReader()
        reader.onloadend = () => {
          const base64 = reader.result.toString()
          if (base64) {
            setImage(base64)
          }
        }

        if (event.target.files[0]) {
          setContent(event.target.files[0])
          reader.readAsDataURL(event.target.files[0])
        }
      }} />
      <br/>
      <input type={'submit'}/>
    </form>
    <p>
      <img src={image} />
    </p>
    <p>
      <img src={imageUri} />
    </p>
    <p>{image}</p>
  </div>
}

export default Home
