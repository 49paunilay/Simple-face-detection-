const video = document.getElementById('video-camera')
let model;
let canvas =document.querySelector('#canvas');
let ctx = canvas.getContext("2d")
const startCamera = ()=>{
    navigator.getUserMedia({video:{}},
    stream=>video.srcObject=stream,
    error=>console.log(error))
}
startCamera()

const detectFace=async()=>{
  const pred = await model.estimateFaces(video,false)
  console.log(pred);
  ctx.drawImage(video,0,0,720,560)
  pred.forEach(element => {
    ctx.beginPath()
    ctx.lineWidth="4"
    ctx.strokeStyle="blue"
    ctx.rect(
      //same logic as python to draw box
      element.topLeft[0],
      element.topLeft[1],
      element.bottomRight[0]-element.topLeft[0],
      element.bottomRight[1]-element.topLeft[1]
    )
    ctx.stroke()
  });
}

video.addEventListener('loadeddata',async()=>{
  model = await blazeface.load()
  setInterval(detectFace,100)
})
