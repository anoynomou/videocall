const myvideostartbutton = document.getElementById("btn1")
const callbutton = document.getElementById("btn")
const calling_id = document.getElementById("id")
const my_id = document.getElementById("myid")
const callList = [];

var peer = new Peer({
    config: {'iceServers': [
      { url: 'stun:stun.l.google.com:19302' },
      {
        url: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com'
    },
    {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
    },
    {
        url: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
    },
    {
        url: 'turn:turn.bistri.com:80',
        credential: 'homeo',
        username: 'homeo'
     },
     {
        url: 'turn:turn.anyfirewall.com:443?transport=tcp',
        credential: 'webrtc',
        username: 'webrtc'
    }
    ]} /* Sample servers, please use appropriate ones */
  });

function Addvideo(holderid,streem){
    var Createvideo = document.createElement("video")
    console.log(holderid)

    Createvideo.srcObject = streem
    Createvideo.autoplay = true;
    var Holder = document.getElementById(holderid)
    Holder.appendChild(Createvideo)

    
}






myvideostartbutton.addEventListener("click",()=>{

    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((streem)=>{
        Addvideo("mybox",streem)
        
        peer.on('call', function(call) {
            // Answer the call, providing our mediaStream
           
           call.answer(streem);
           
            call.on('stream',otherstreem=>{
                if(!callList[call.peer]){
                setTimeout(()=>{
                    console.log("s")
                        
                    Addvideo("otherbox",otherstreem)
                },100)
                callList[call.peer] = call
            }
                
            })
            
          });

       callbutton.addEventListener("click",()=>{
        if(calling_id.value !== ""){


            var call = peer.call(calling_id.value,streem);

            call.on('stream', function(theairstream) {
                // `stream` is the MediaStream of the remote peer.
                // Here you'd add it to an HTML video/canvas element.
                if(!callList[call.peer]){
                setTimeout(()=>{
                    
                    Addvideo("otherbox",theairstream)
                },100)
                callList[call.peer] = call
            }
              });
            }
        
        })





    })


})



peer.on('open', function(id) {

    my_id.innerText = id
});


